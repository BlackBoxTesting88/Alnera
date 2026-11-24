import type { Metadata } from 'next';
import Link from 'next/link';
import EditorialPhoto from '../editorial-photo';
import { absoluteUrl, jsonLd } from '../seo';
import ArticleLibrary from './article-library';
import { articles } from './articles';
import styles from './journal.module.css';

const title = 'ALNERA Journal | Sastav, mali rituali i briga o sebi';
const description = 'Praktični vodiči kroz deklaracije i dodatke ishrani, male svakodnevne navike i priče iz ALNERA sveta. Pronađi temu za svoj ritam.';
export const metadata: Metadata = {
  title, description, alternates: { canonical: absoluteUrl('journal/') },
  openGraph: { title, description, url: absoluteUrl('journal/'), siteName: 'ALNERA', locale: 'sr_RS', type: 'website' },
};

export default function Journal() {
  const featured = articles.find(article => article.slug === 'kako-citati-deklaraciju-dodatka-ishrani') || articles[0];
  return <main id="journal-main" className={styles.index}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd({
      '@context': 'https://schema.org', '@type': 'CollectionPage', name: title,
      description, url: absoluteUrl('journal/'), inLanguage: 'sr-Latn',
      mainEntity: { '@type': 'ItemList', itemListElement: articles.map((article, index) => ({
        '@type': 'ListItem', position: index + 1, name: article.title, url: absoluteUrl(`journal/${article.slug}/`),
      })) },
    }) }}/>
    <header className={styles.masthead}>
      <div><span className={styles.eyebrow}>MALO ZNANJA. MALO INSPIRACIJE. VREME ZA SEBE.</span><h1>Alnera <em>journal.</em></h1></div>
      <div className={styles.mastheadIntro}><p>Za pitanja koja postavljaš.<br/>I trenutke koje biraš za sebe.</p><a href="#tekstovi" className={styles.readLink}>Istraži sve teme</a></div>
    </header>
    <section className={styles.feature} aria-labelledby="featured-title">
      <Link href={`/journal/${featured.slug}`} className={styles.featureImage} aria-label={`Pročitaj: ${featured.title}`}><EditorialPhoto scene="glow" eager/><span className={styles.photoCaption}>U FOKUSU / SASTAV I DEKLARACIJE</span></Link>
      <div className={styles.featureCopy}>
        <div className={styles.meta}><span>PRAKTIČNI VODIČ</span><span>{featured.time}</span></div>
        <h2 id="featured-title"><Link href={`/journal/${featured.slug}`}>{featured.title}</Link></h2>
        <p>{featured.intro}</p>
        <Link href={`/journal/${featured.slug}`} className={styles.primaryLink}>Pročitaj vodič</Link>
        <span className={styles.featureFootnote}>Od prvog pogleda na etiketu do jasnijeg izbora.</span>
      </div>
    </section>
    <ArticleLibrary articles={articles}/>
    <aside className={styles.collection}>
      <div><span className={styles.eyebrow}>UPOZNAJ ALNERA KOLEKCIJU</span><h2>Tri formule.<br/><em>Tvoj svakodnevni ritual.</em></h2><p>Sastav, način upotrebe i sve informacije o svakom proizvodu, na jednom mestu.</p></div>
      <nav aria-label="Istraži Alnera proizvode"><Link href="/proizvodi/glow">Glow<span>Beauty From Within</span></Link><Link href="/proizvodi/calm">Calm<span>Unwind. Relax. Restore.</span></Link><Link href="/proizvod/balance/">Balance<span>Women’s Daily Balance</span></Link></nav>
    </aside>
  </main>;
}
