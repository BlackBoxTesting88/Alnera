'use client';

import { useState } from 'react';
import { assetPath } from './asset-path';
import EditorialPhoto from './editorial-photo';
import { balanceContent } from './balance-content';
import styles from './balance-story.module.css';

export default function BalanceBenefitCards() {
  const [revealed, setRevealed] = useState<string | null>(null);

  return <div className={styles.benefitGrid}>
    {balanceContent.benefits.map((benefit, index) => <article
      className={styles.benefitCard}
      key={benefit.title}
      data-revealed={revealed === benefit.title}
      aria-labelledby={`balance-benefit-${index}`}
      onPointerLeave={event => { if (event.pointerType === 'mouse') setRevealed(null); }}
    >
      <div className={styles.benefitPhoto} data-view={index} aria-hidden="true">
        {index % 2 === 1 ? <img src={assetPath('/images/alnera-balance-bottle-clean.png')} alt="" loading="lazy" decoding="async" /> : <EditorialPhoto scene="balance" />}
      </div>
      <div className={styles.benefitCopy}>
        <span className={styles.nutrients}>{benefit.nutrients}</span>
        <h3 id={`balance-benefit-${index}`}>{benefit.title}</h3>
        <div className={styles.benefitText}>{benefit.paragraphs.map(text => <p key={text}>{text}</p>)}</div>
      </div>
      <button
        className={styles.photoToggle}
        type="button"
        aria-label={`Prikaži fotografiju BALANCE — ${benefit.title}`}
        aria-pressed={revealed === benefit.title}
        onClick={() => setRevealed(current => current === benefit.title ? null : benefit.title)}
      />
    </article>)}
  </div>;
}
