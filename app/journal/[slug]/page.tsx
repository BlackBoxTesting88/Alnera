import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import EditorialPhoto from '../../editorial-photo';
import { absoluteUrl, jsonLd } from '../../seo';
import ArticleCard from '../article-card';
import { articles } from '../articles';
import styles from '../journal.module.css';

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return articles.map(({ slug }) => ({ slug })); }
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find(item => item.slug === slug);
  if (!article) notFound();
  const title = `${article.title} | ALNERA Journal`;
  const url = absoluteUrl(`journal/${slug}/`);
  return {
    title, description: article.intro, alternates: { canonical: url },
    openGraph: { title, description: article.intro, url, siteName: 'ALNERA', type: 'article', locale: 'sr_RS', modifiedTime: article.updatedAt },
  };
}

export default async function Article({ params }: Props) {
  const { slug } = await params;
  const article = articles.find(item => item.slug === slug);
  if (!article) notFound();
  const related = [...articles.filter(item => item !== article && item.category === article.category),
    ...articles.filter(item => item !== article && item.category !== article.category)].slice(0, 2);
  const structuredData = {
    '@context': 'https://schema.org', '@graph': [
      {
        '@type': 'BlogPosting', '@id': absoluteUrl(`journal/${slug}/#article`),
        headline: article.title, description: article.intro, articleSection: article.category,
        url: absoluteUrl(`journal/${slug}/`), mainEntityOfPage: absoluteUrl(`journal/${slug}/`),
        inLanguage: 'sr-Latn', ...(article.updatedAt && { dateModified: article.updatedAt }),
        publisher: { '@type': 'Organization', name: 'ALNERA', url: absoluteUrl() },
        ...(article.sources?.length && { citation: article.sources.map(source => source.url) }),
      },
      {
        '@type': 'BreadcrumbList', itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Alnera', item: absoluteUrl() },
          { '@type': 'ListItem', position: 2, name: 'Journal', item: absoluteUrl('journal/') },
          { '@type': 'ListItem', position: 3, name: article.title, item: absoluteUrl(`journal/${slug}/`) },
        ],
      },
    ],
  };
  return <main id="journal-main" className={styles.article}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }}/>
    <header className={styles.articleHeader}>
      <nav className={styles.breadcrumbs} aria-label="Putanja stranice"><Link href="/">Alnera</Link><span aria-hidden="true">/</span><Link href="/journal">Journal</Link><span aria-hidden="true">/</span><span>{article.category}</span></nav>
      <div className={styles.meta}><span>{article.category}</span><span>{article.time}</span></div>
      <h1>{article.title}</h1><p className={styles.articleIntro}>{article.intro}</p>
      <div className={styles.byline}><span>ALNERA journal</span>{article.updatedAt && <span>Ažurirano: <time dateTime={article.updatedAt}>{new Intl.DateTimeFormat('sr-Latn-RS', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(article.updatedAt))}</time></span>}</div>
    </header>
    <div className={styles.cover}><EditorialPhoto scene={article.image} eager/></div>
    <div className={styles.readingLayout}>
      <aside className={styles.contents} aria-label="Sadržaj teksta"><span className={styles.eyebrow}>U OVOM TEKSTU</span><ol>{article.sections.map((section, index) => <li key={section.title}><a href={`#deo-${index + 1}`}>{section.title}</a></li>)}</ol>{article.sources && <a className={styles.sourcesJump} href="#izvori">Izvori i dodatno čitanje</a>}</aside>
      <article className={styles.prose}>
        {article.sections.map((section, index) => <section key={section.title} id={`deo-${index + 1}`}>
          <h2>{section.title}</h2>{section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
          {section.bullets && <ul>{section.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}</ul>}
          {section.sourceIds && <div className={styles.sourceNote}>Izvor: {section.sourceIds.map(id => <a key={id} href={`#izvor-${id}`}>{id === 'nih-ods' ? 'NIH ODS' : 'NIH NCCIH'}</a>)}</div>}
        </section>)}
        {article.note && <p className={styles.articleNote}>{article.note}</p>}
        {article.sources && <section className={styles.sources} id="izvori"><h2>Izvori i dodatno čitanje</h2><ol>{article.sources.map(source => <li id={`izvor-${source.id}`} key={source.id}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.title}<span>Otvara se na sajtu izvora</span></a></li>)}</ol></section>}
        <div className={styles.signoff}><span>alnera</span><p>Malo pažnje.<br/>Svakog dana.</p></div>
      </article>
    </div>
    <aside className={styles.articleCollection}><div><span className={styles.eyebrow}>ISTRAŽI FORMULE</span><h2>Upoznaj sastav.<br/><em>Pronađi informacije koje tražiš.</em></h2></div><nav aria-label="Informacije o proizvodima">{(!article.product || article.product === 'glow') && <Link className={styles.productGlow} href="/proizvodi/glow">O proizvodu Glow</Link>}{(!article.product || article.product === 'calm') && <Link className={styles.productCalm} href="/proizvodi/calm">O proizvodu Calm</Link>}{(!article.product || article.product === 'balance') && <Link className={styles.productBalance} href="/proizvod/balance/">O proizvodu Balance</Link>}</nav></aside>
    <section className={styles.related} aria-labelledby="related-title"><div className={styles.relatedHeading}><h2 id="related-title">Još malo <em>inspiracije.</em></h2><Link className={styles.readLink} href="/journal">Svi tekstovi</Link></div><div className={styles.relatedGrid}>{related.map(item => <ArticleCard key={item.slug} article={item}/>)}</div></section>
  </main>;
}
