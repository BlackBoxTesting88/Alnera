import type { Metadata } from 'next';
import Link from 'next/link';
import EditorialPhoto from '../editorial-photo';
import { articles } from './articles';
export const metadata: Metadata = { title: 'Alnera journal — Prostor za sebe', description: 'Priče o malim ritualima, pažnji i svakodnevici. Uđi u Alnera journal.' };
export default function Journal() {
  const feature = articles[0];
  return <main className="journal-index"><div className="journal-masthead"><span className="eyebrow">BELEŠKE O SVAKODNEVICI / ALNERA</span><h1>Alnera <em>journal.</em></h1><div><p>Male priče.<br/>Prostor za sebe.</p><span>ČITAJ POLAKO ↓</span></div></div>
    <Link className="journal-feature" href={`/journal/${feature.slug}`}><EditorialPhoto scene={feature.image} eager/><div className="feature-copy"><span className="eyebrow">01 / {feature.category.toUpperCase()}</span><h2>{feature.title}</h2><p>{feature.intro}</p><span className="text-link">Pročitaj priču <span>↗</span></span><small>{feature.time}</small></div></Link>
    <div className="journal-divider"><span>JOŠ IZ JOURNALA</span><span>02 — 03</span></div><div className="journal-stories">{articles.slice(1).map((article, i) => <Link className="journal-story-card" key={article.slug} href={`/journal/${article.slug}`}><EditorialPhoto scene={article.image}/><div className="story-card-meta"><span>0{i + 2} / {article.category}</span><span>{article.time}</span></div><h2>{article.title}</h2><p>{article.intro}</p><span className="text-link">Pročitaj priču <span>↗</span></span></Link>)}</div>
    <aside className="journal-endnote"><span className="eyebrow">OD PRIČE DO RITUALA</span><p>Pronađi svoje<br/><em>Alnera poglavlje.</em></p><Link className="text-link" href="/#kolekcija">Glow, Calm i Balance <span>↗</span></Link></aside>
  </main>;
}
