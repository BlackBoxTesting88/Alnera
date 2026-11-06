'use client';

import Link from 'next/link';

function SocialIcon({ name }: { name: 'Facebook' | 'Instagram' | 'TikTok' }) {
  return <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">{name === 'Facebook' ? <path fill="currentColor" d="M13.7 21v-8.2h2.8l.4-3.2h-3.2V7.5c0-.9.3-1.5 1.6-1.5H17V3.1c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.3H7.5v3.2h2.8V21h3.4Z"/> : name === 'Instagram' ? <g stroke="currentColor" strokeWidth="1.5"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.8" r=".8" fill="currentColor" stroke="none"/></g> : <path fill="currentColor" d="M14 3h3c.2 2 1.4 3.4 3.5 3.6v3a8.1 8.1 0 0 1-3.5-1v7a5.8 5.8 0 1 1-5-5.8v3.1a2.8 2.8 0 1 0 2 2.7V3Z"/>}</svg>;
}

export default function SiteFooter() {
  return <footer className="site-footer"><div className="footer-main"><div className="footer-brand"><Link className="wordmark" href="/" aria-label="Alnera početna">alnera</Link><p>Tri formule.<br/><em>Tvoj svakodnevni ritual.</em></p><div className="footer-color-signature" aria-hidden="true"><i/><i/><i/></div></div>
    <div className="footer-column"><h2>Kolekcija</h2><Link href="/proizvodi/glow">Glow <span>01</span></Link><Link href="/proizvodi/calm">Calm <span>02</span></Link><Link href="/proizvodi/balance">Balance <span>03</span></Link><Link href="/#kolekcija">Svi proizvodi ↗</Link></div>
    <div className="footer-column"><h2>Alnera svet</h2><Link href="/#alnera-svet">Naša priča</Link><Link href="/journal/paznja-je-u-detaljima">Ambalaža i detalji</Link><Link href="/journal">Alnera journal ↗</Link><Link href="/journal/ritual-koji-staje-u-tvoj-dan">Svakodnevni rituali</Link><Link href="/journal/prostor-za-predah">Prostor za predah</Link></div>
    <div className="footer-social"><h2>Prati naš ritam</h2><p>Alnera, i između rituala.</p><div className="footer-social-icons">{(['Facebook','Instagram','TikTok'] as const).map(name => <button key={name} disabled title={`${name} — profil uskoro`} aria-label={`${name} — profil uskoro`}><SocialIcon name={name}/></button>)}</div><small>Facebook / Instagram / TikTok<br/>Profili uskoro.</small></div>
    </div><div className="footer-bottom"><span>© {new Date().getFullYear()} Alnera</span><p>Dodatak ishrani · Glow / Calm / Balance</p><span className="footer-demo">Vizuelni prototip</span><button onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })}>Na početak ↑</button></div></footer>;
}
