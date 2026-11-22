import { execFileSync, spawn } from 'node:child_process';
import { createHash } from 'node:crypto';
import { readFileSync, readlinkSync, realpathSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';
import { fileURLToPath } from 'node:url';

const project = realpathSync(fileURLToPath(new URL('../', import.meta.url)));
const devDir = join(project, '.next', 'dev');
const next = join(project, 'node_modules', 'next', 'dist', 'bin', 'next');
const projectKey = createHash('sha256').update(project).digest('hex').slice(0, 16);
const startupLock = join(tmpdir(), 'next-dev-' + projectKey + '.lock');

const input = process.argv.slice(2);
const openBrowser = !input.includes('--no-open');
const cleanCache = input.includes('--clean');
const args = input.filter(arg => arg !== '--no-open' && arg !== '--clean');
const portIndex = args.findIndex(arg => /^(--port(?:=|$)|-p(?:\d|$))/.test(arg));
const hostnameIndex = args.findIndex(arg => /^(--hostname(?:=|$)|-H(?:\S|$))/.test(arg));

function optionValue(index, shortName, fallback) {
  if (index < 0) return fallback;
  const option = args[index];
  if (option.includes('=')) return option.split('=')[1];
  return option.startsWith(shortName) && option.length > 2 ? option.slice(2) : args[index + 1];
}

const port = Number(optionValue(portIndex, '-p', process.env.PORT || '3100'));
const hostname = optionValue(hostnameIndex, '-H', '127.0.0.1');

function running(pid) {
  try {
    process.kill(pid, 0);
    return true;
  } catch (error) {
    if (error.code === 'ESRCH') return false;
    throw error;
  }
}

function readNextLock() {
  try {
    return JSON.parse(readFileSync(join(devDir, 'lock'), 'utf8'))?.pid;
  } catch (error) {
    if (error.code === 'ENOENT' || error instanceof SyntaxError) return undefined;
    throw error;
  }
}

function projectCwd(pid) {
  try {
    const cwd = process.platform === 'linux'
      ? readlinkSync('/proc/' + pid + '/cwd')
      : execFileSync('lsof', ['-a', '-p', String(pid), '-d', 'cwd', '-Fn'], { encoding: 'utf8' })
        .split('\n').find(line => line.startsWith('n'))?.slice(1);
    return cwd && realpathSync(resolve(cwd)) === project;
  } catch (error) {
    if (error.code === 'ENOENT' || error.status === 1) return false;
    throw error;
  }
}

function getProcesses() {
  return execFileSync('ps', ['-ax', '-o', 'pid=,ppid=,stat=,command='], { encoding: 'utf8' })
    .split('\n')
    .map(line => line.match(/^\s*(\d+)\s+(\d+)\s+(\S+)\s+(.*)$/))
    .filter(match => match && !match[3].startsWith('Z'))
    .map(([, pid, parentPid, , command]) => ({ pid: Number(pid), parentPid: Number(parentPid), command }));
}

function portUsers() {
  try {
    return execFileSync('lsof', ['-nP', '-iTCP:' + port, '-sTCP:LISTEN', '-t'], { encoding: 'utf8' })
      .trim().split(/\s+/).filter(Boolean).map(Number);
  } catch (error) {
    if (error.status === 1) return [];
    throw error;
  }
}

function previousDevProcesses() {
  const processes = getProcesses();
  const workerPid = readNextLock();
  const launcher = /^(?:\S*\/)?node\s+(?:.*\/)?scripts\/dev\.mjs(?:\s|$)/;
  const nextDev = /^(?:(?:\S*\/)?node\s+(?:.*\/)?)?next\s+dev(?:\s|$)/;
  const owned = new Set(processes
    .filter(({ pid, command }) => pid !== process.pid
      && (launcher.test(command) || nextDev.test(command) || (pid === workerPid && /^next-server\b/.test(command)))
      && projectCwd(pid))
    .map(({ pid }) => pid));

  // Next starts workers as child processes, including before the server has opened its port.
  let size;
  do {
    size = owned.size;
    for (const { pid, parentPid } of processes) {
      if (owned.has(parentPid)) owned.add(pid);
    }
  } while (size !== owned.size);
  return owned;
}

function signal(pid, name) {
  try {
    process.kill(pid, name);
  } catch (error) {
    if (error.code !== 'ESRCH') throw error;
  }
}

async function stopPrevious() {
  const previous = previousDevProcesses();
  const other = portUsers().filter(pid => !previous.has(pid));
  if (other.length) throw new Error('Port ' + port + ' već koristi drugi proces.');
  if (!previous.size) return;

  console.log('Zaustavljam prethodni Alnera server…');
  for (const pid of previous) signal(pid, 'SIGTERM');
  for (let attempt = 0; attempt < 30 && [...previous].some(running); attempt++) await delay(100);

  const remaining = getProcesses().filter(({ pid }) => previous.has(pid));
  for (const { pid } of remaining) signal(pid, 'SIGKILL');
  for (let attempt = 0; attempt < 30; attempt++) {
    const stillRunning = getProcesses().some(({ pid }) => previous.has(pid));
    if (!stillRunning && !portUsers().length) return;
    await delay(100);
  }
  throw new Error('Prethodni razvojni proces ili port ' + port + ' još nije oslobođen.');
}

async function start() {
  if (args.includes('--help') || args.includes('-h')) {
    execFileSync(process.execPath, [next, 'dev', '--help'], { cwd: project, stdio: 'inherit' });
    return;
  }

  if (!Number.isInteger(port) || port < 1 || port > 65535 || !hostname) {
    throw new Error('Proveri argumente za port i adresu servera.');
  }

  // Serialize the restart until the new Next process exists.
  for (;;) {
    try {
      writeFileSync(startupLock, String(process.pid), { flag: 'wx' });
      break;
    } catch (error) {
      if (error.code !== 'EEXIST') throw error;
      let pid;
      try {
        pid = Number(readFileSync(startupLock, 'utf8'));
      } catch (readError) {
        if (readError.code === 'ENOENT') continue;
        throw readError;
      }
      if (pid > 1 && !running(pid)) {
        rmSync(startupLock, { force: true });
        continue;
      }
      throw new Error('Pokretanje ovog projekta je već u toku. Pokušaj ponovo za nekoliko sekundi.');
    }
  }

  let child;
  try {
    await stopPrevious();
    if (cleanCache) {
      console.log('Čistim razvojni keš…');
      rmSync(devDir, { recursive: true, force: true });
    } else {
      rmSync(join(devDir, 'lock'), { force: true });
    }
    child = spawn(process.execPath, [
      next, 'dev', '--webpack',
      ...(hostnameIndex < 0 ? ['--hostname', hostname] : []),
      ...(portIndex < 0 ? ['--port', String(port)] : []),
      ...args,
    ], { cwd: project, stdio: 'inherit' });
  } finally {
    rmSync(startupLock, { force: true });
  }

  let done = false;
  let shuttingDown = false;
  for (const name of ['SIGINT', 'SIGTERM']) {
    process.on(name, () => {
      shuttingDown = true;
      child.kill(name);
    });
  }
  child.on('error', error => {
    done = true;
    console.error(error.message);
    process.exitCode = 1;
  });
  child.on('exit', (code, name) => {
    done = true;
    process.exitCode = code ?? (name === 'SIGINT' || shuttingDown ? 0 : 1);
  });

  const browserHost = ['0.0.0.0', '::'].includes(hostname) ? '127.0.0.1' : hostname;
  const address = 'http://' + (browserHost.includes(':') ? '[' + browserHost + ']' : browserHost) + ':' + port + '/';
  for (let attempt = 0; attempt < 100 && !done && !shuttingDown; attempt++) {
    try {
      const response = await fetch(address, { signal: AbortSignal.timeout(2000) });
      await response.body?.cancel();
      if (response.ok) {
        console.log('\nAlnera je spreman: ' + address);
        if (openBrowser) {
          const opener = { darwin: 'open', linux: 'xdg-open' }[process.platform];
          if (opener) {
            const browser = spawn(opener, [address], { stdio: 'ignore' });
            browser.on('error', () => console.log('Otvori adresu iz terminala u pregledaču.'));
            browser.unref();
          }
        }
        return;
      }
    } catch {}
    await delay(500);
  }
  if (!done && !shuttingDown) console.log('Server se još pokreće: ' + address);
}

try {
  await start();
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
