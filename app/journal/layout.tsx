import Link from 'next/link';
import SiteFooter from '../site-footer';
export default function JournalLayout({ children }: { children: React.ReactNode }) {
  return <div className="journal-shell"><header className="journal-header"><Link className="wordmark" href="/">alnera</Link><nav aria-label="Journal navigacija"><Link href="/#kolekcija">Kolekcija ↗</Link><Link href="/journal">Journal</Link></nav></header>{children}<SiteFooter/></div>;
}
