import Link from 'next/link';
import { notFound } from 'next/navigation';
import EditorialPhoto from '../../editorial-photo';
import { articles } from '../articles';
export function generateStaticParams() { return articles.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const article = articles.find(a => a.slug === slug); return { title: `${article?.title ?? 'Priča'} — Alnera journal`, description: article?.intro }; }
export default async function Article({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles.find(a => a.slug === slug);
  if (!article) notFound();
  const next = articles[(articles.indexOf(article) + 1) % articles.length];
  return <main className="journal-article"><header className="article-heading"><Link className="article-back" href="/journal">← Sve priče</Link><div className="eyebrow">{article.category.toUpperCase()} / {article.time.toUpperCase()}</div><h1>{article.title}</h1><p>{article.intro}</p></header><EditorialPhoto className="article-cover" scene={article.image} eager/><article className="article-body">{article.sections.map(section => <section key={section.title}><h2>{section.title}</h2>{section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</section>)}<div className="article-signoff">alnera journal <span>Male priče. Prostor za sebe.</span></div></article><aside className="article-next"><span className="eyebrow">SLEDEĆA PRIČA</span><Link href={`/journal/${next.slug}`}><h2>{next.title}</h2><span>↗</span></Link><Link className="text-link" href="/journal">Nazad u journal <span>←</span></Link></aside></main>;
}
