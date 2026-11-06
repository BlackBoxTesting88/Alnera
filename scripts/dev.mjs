import { execFileSync, spawn } from 'node:child_process';
import { readFileSync, realpathSync, rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { setTimeout as delay } from 'node:timers/promises';

const project = realpathSync(fileURLToPath(new URL('../', import.meta.url)));
const lockPath = new URL('../.next/dev/lock', import.meta.url);
const cachePath = new URL('../.next/dev/cache', import.meta.url);

function isRunning(pid) {
  try {
    process.kill(pid, 0);
    return true;
  } catch (error) {
    if (error.code === 'ESRCH') return false;
    throw error;
  }
}

let previous;
try {
  previous = JSON.parse(readFileSync(lockPath, 'utf8'));
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
}

const pid = previous?.pid;
if (Number.isInteger(pid) && pid > 1 && isRunning(pid)) {
  const command = execFileSync('ps', ['-p', String(pid), '-o', 'command='], { encoding: 'utf8' }).trim();
  const cwd = process.platform === 'linux'
    ? realpathSync('/proc/' + pid + '/cwd')
    : execFileSync('lsof', ['-a', '-p', String(pid), '-d', 'cwd', '-Fn'], { encoding: 'utf8' })
        .split('\n').find(line => line.startsWith('n'))?.slice(1);

  if (!/^next-server\b/.test(command) || cwd !== project) {
    throw new Error('Ne mogu da potvrdim da proces iz Next.js zaključavanja pripada ovom projektu.');
  }

  console.log('Zaustavljam prethodni ALNERA server…');
  process.kill(pid, 'SIGTERM');
  for (let attempt = 0; attempt < 80 && isRunning(pid); attempt++) await delay(100);
  if (isRunning(pid)) throw new Error('Prethodni ALNERA server još radi. Zaustavi ga sa Ctrl+C i pokušaj ponovo.');
}

rmSync(cachePath, { recursive: true, force: true });
rmSync(lockPath, { force: true });

const args = process.argv.slice(2);
const hasPort = args.some(arg => arg === '-p' || arg === '--port' || arg.startsWith('--port=') || /^-p\d/.test(arg));
const reusePort = !hasPort && !process.env.PORT && Number.isInteger(previous?.port)
  && previous.port > 0 && previous.port < 65536;
if (reusePort) args.push('--port', String(previous.port));

const child = spawn(process.execPath, [
  fileURLToPath(new URL('../node_modules/next/dist/bin/next', import.meta.url)),
  'dev', '--webpack', '--hostname', '127.0.0.1', ...args,
], { cwd: project, stdio: 'inherit' });

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => child.kill(signal));
}
child.on('error', error => {
  console.error(error.message);
  process.exitCode = 1;
});
child.on('exit', (code, signal) => {
  process.exitCode = code ?? (signal === 'SIGINT' ? 130 : 1);
});
