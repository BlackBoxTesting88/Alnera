'use client';

import { useState } from 'react';
import { assetPath } from './asset-path';
import EditorialPhoto from './editorial-photo';
import { glowContent as content } from './glow-content';
import styles from './glow-story.module.css';

const views = ['lifestyle', 'bottle', 'closeup'] as const;

export default function GlowScienceCards() {
  const [revealed, setRevealed] = useState<string | null>(null);
  const toggle = (number: string) => setRevealed(current => current === number ? null : number);

  return <div className={styles.scienceGrid}>
    {content.science.map((section, index) => <article
      key={section.number}
      className={styles.scienceCard}
      aria-labelledby={`glow-science-card-${section.number}`}
      data-revealed={revealed === section.number}
      onPointerLeave={event => { if (event.pointerType === 'mouse') setRevealed(null); }}
    >
      <div className={styles.sciencePhoto} data-view={views[index]} aria-hidden="true">
        {index === 1
          ? <img src={assetPath('/images/alnera-glow-bottle.png')} alt="" loading="lazy" decoding="async" />
          : <EditorialPhoto scene="glow" />}
      </div>
      <div className={styles.scienceCardContent}>
        <span className={styles.number}>{section.number}</span>
        <h3 id={`glow-science-card-${section.number}`}>{section.title}</h3>
        <p className={styles.nutrients}>{section.ingredients}</p>
        <div className={styles.body}>{section.paragraphs.map(text => <p key={text}>{text}</p>)}</div>
      </div>
      <button
        className={styles.scienceToggle}
        type="button"
        aria-label={`Fotografija GLOW — ${section.title}`}
        aria-pressed={revealed === section.number}
        onClick={() => toggle(section.number)}
      />
    </article>)}
  </div>;
}
