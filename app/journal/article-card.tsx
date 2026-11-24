import Link from 'next/link';
import EditorialPhoto from '../editorial-photo';
import type { JournalArticle } from './articles';
import styles from './journal.module.css';

export default function ArticleCard({ article }: { article: JournalArticle }) {
  return <Link href={`/journal/${article.slug}`} className={styles.card}>
    <div className={styles.cardImage}><EditorialPhoto scene={article.image}/></div>
    <div className={styles.cardCopy}>
      <div className={styles.meta}><span>{article.category}</span><span>{article.time}</span></div>
      <h3>{article.title}</h3>
      <p>{article.intro}</p>
      <span className={styles.readLink}>Pročitaj tekst</span>
    </div>
  </Link>;
}
