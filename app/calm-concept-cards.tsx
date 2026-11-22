'use client';

import { useState } from 'react';
import { assetPath } from './asset-path';
import EditorialPhoto from './editorial-photo';
import { calmContent } from './calm-content';
import styles from './calm-story.module.css';

export default function CalmConceptCards() {
  const [revealed, setRevealed] = useState<string | null>(null);
  return <div className={styles.conceptGrid}>
    {calmContent.concepts.map((concept, index) => <article className={styles.conceptCard} key={concept.number} data-revealed={revealed === concept.number} aria-labelledby={`calm-concept-${concept.number}`} onPointerLeave={event => { if (event.pointerType === 'mouse') setRevealed(null); }}>
      <div className={styles.conceptPhoto} data-view={index} aria-hidden="true">{index === 1 ? <img src={assetPath('/images/alnera-calm-bottle.png')} alt="" loading="lazy" decoding="async" /> : <EditorialPhoto scene="calm" />}</div>
      <div className={styles.conceptCopy}><span className={styles.number}>{concept.number}</span><h3 id={`calm-concept-${concept.number}`}>{concept.title}</h3><p>{concept.text}</p></div>
      <button type="button" className={styles.photoToggle} aria-label={`Fotografija CALM — ${concept.title}`} aria-pressed={revealed === concept.number} onClick={() => setRevealed(current => current === concept.number ? null : concept.number)} />
    </article>)}
  </div>;
}
