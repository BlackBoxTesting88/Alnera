'use client';

import { useId, useState } from 'react';
import ArticleCard from './article-card';
import type { JournalArticle } from './articles';
import styles from './journal.module.css';

function normalize(value: string) {
  return value.toLocaleLowerCase('sr-Latn').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'dj');
}

export default function ArticleLibrary({ articles }: { articles: JournalArticle[] }) {
  const [category, setCategory] = useState('Sve teme');
  const [search, setSearch] = useState('');
  const searchId = useId();
  const categories = ['Sve teme', ...Array.from(new Set(articles.map(article => article.category)))];
  const words = normalize(search.trim()).split(/\s+/).filter(Boolean);
  const visible = articles.filter(article => {
    const content = normalize([article.title, article.intro, article.category, ...(article.tags || []),
      ...article.sections.flatMap(section => [section.title, ...section.paragraphs, ...(section.bullets || [])])].join(' '));
    return (category === 'Sve teme' || article.category === category) && words.every(word => content.includes(word));
  });
  function reset() { setCategory('Sve teme'); setSearch(''); }

  return <section className={styles.library} id="tekstovi" aria-labelledby="library-title">
    <div className={styles.libraryHeading}>
      <div><span className={styles.eyebrow}>ISTRAŽI JOURNAL</span><h2 id="library-title">Čitaj svojim <em>ritmom.</em></h2></div>
      <div className={styles.search}>
        <label htmlFor={searchId}>Pronađi temu</label>
        <div><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 5 5"/></svg>
          <input id={searchId} type="search" value={search} onChange={event => setSearch(event.target.value)} placeholder="npr. deklaracija, rutina, Calm" autoComplete="off"/>
        </div>
      </div>
    </div>
    <div className={styles.filters} role="group" aria-label="Filtriraj tekstove po temi">
      {categories.map(item => <button type="button" key={item} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}
    </div>
    <p className={styles.resultCount} role="status" aria-live="polite">{category === 'Sve teme' ? 'Sve priče' : category}<span aria-hidden="true"> · </span>Prikazano: {visible.length}</p>
    {visible.length ? <div className={styles.grid}>{visible.map(article => <ArticleCard key={article.slug} article={article}/>)}</div> :
      <div className={styles.empty}><h3>Ovu temu još nismo otvorili.</h3><p>Probaj kraći pojam ili pogledaj sve tekstove iz journala.</p><button type="button" onClick={reset}>Prikaži sve tekstove</button></div>}
  </section>;
}
