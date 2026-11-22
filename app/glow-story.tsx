import EditorialPhoto from './editorial-photo';
import GlowScienceCards from './glow-science-cards';
import { glowContent as content } from './glow-content';
import styles from './glow-story.module.css';

export default function GlowStory() {
  return <div className={styles.story}>
    <section className={styles.intro} aria-labelledby="glow-intro-title">
      <div><span className={styles.eyebrow}>ALNERA GLOW / BEAUTY FROM WITHIN</span><h2 id="glow-intro-title">Jedna formula.<br /><em>Svakodnevna podrška tvojoj prirodnoj lepoti.</em></h2></div>
      <div className={styles.body}>{content.intro.slice(1).map(text => <p key={text}>{text}</p>)}</div>
    </section>

    <section className={styles.science} id="glow-science" aria-labelledby="glow-science-title">
      <div className={styles.sectionHeading}><span className={styles.eyebrow}>NAUKA IZA LEPOTE</span><h2 id="glow-science-title">Nauka iza <em>lepote.</em></h2></div>
      <GlowScienceCards />
    </section>

    <section className={styles.opc} aria-labelledby="glow-opc-title">
      <div className={styles.opcVisual}><span className={styles.eyebrow}>EKSTRAKT KOŠTICA GROŽĐA</span><p className={styles.percentage}>95<span>%</span></p><strong>OPC</strong><span className={styles.opcFootnote}>Ekstrakt standardizovan na 95% OPC</span><i className={styles.orbit} aria-hidden="true" /></div>
      <div className={styles.opcCopy}><span className={styles.eyebrow}>GRAPE SEED EXTRACT — 95% OPC</span><h2 id="glow-opc-title">Snaga pažljivo odabranih <em>biljnih sastojaka.</em></h2><div className={styles.body}>{content.opc.map(text => <p key={text}>{text}</p>)}</div><p className={styles.opcSignature}>Sa OPC ekstraktom koštica grožđa.</p></div>
    </section>

    <section className={styles.formula} id="glow-formula" aria-labelledby="glow-formula-title">
      <div className={styles.formulaHeading}><span className={styles.eyebrow}>INSIDE THE FORMULA</span><h2 id="glow-formula-title">Osam pažljivo odabranih <em>sastojaka.</em></h2><p className={styles.formulaIntro}>{content.beautyIntro}</p><p className={styles.formulaMeta}>ALNERA GLOW / {content.capsules} KAPSULA</p></div>
      <div className={styles.ingredientList}>{content.ingredients.map((ingredient, index) => <details key={ingredient.name}>
        <summary><span className={styles.ingredientNumber}>{String(index + 1).padStart(2, '0')}</span><h3>{ingredient.name}</h3><span className={styles.plus} aria-hidden="true">+</span></summary><p>{ingredient.description}</p>
      </details>)}</div>
    </section>

    <section className={styles.everyday} aria-labelledby="glow-everyday-title">
      <div className={styles.everydayPhoto}><EditorialPhoto scene="glow" /><span className={styles.photoNote}>YOUR EVERYDAY GLOW</span></div>
      <div className={styles.everydayCopy}><span className={styles.eyebrow}>YOUR EVERYDAY GLOW</span><h2 id="glow-everyday-title">Neka nega iznutra postane deo tvoje <em>svakodnevice.</em></h2><div className={styles.body}>{content.everyday.map(text => <p key={text}>{text}</p>)}</div><div className={styles.signature}><strong>ALNERA GLOW</strong><p>Beauty From Within.</p><small>Dodatak ishrani | {content.capsules} kapsula</small></div><a className={styles.cta} href="#glow-buy">Izaberi svoj GLOW <span aria-hidden="true">↑</span></a></div>
    </section>
  </div>;
}
