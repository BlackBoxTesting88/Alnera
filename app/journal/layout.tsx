import Link from 'next/link';
import SiteFooter from '../site-footer';
import styles from './journal.module.css';

export default function JournalLayout({ children }: { children: React.ReactNode }) {
  return <div className={styles.shell}>
    <a href="#journal-main" className={styles.skipLink}>Pređi na sadržaj</a>
    <header className={styles.header}>
      <Link className="wordmark" href="/" aria-label="Alnera početna">alnera</Link>
      <nav aria-label="Journal navigacija"><Link href="/#kolekcija">Kolekcija</Link><Link href="/journal" aria-current="location">Journal / Blog</Link></nav>
    </header>
    {children}<SiteFooter/>
  </div>;
}
