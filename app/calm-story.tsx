import EditorialPhoto from './editorial-photo';
import CalmConceptCards from './calm-concept-cards';
import { calmContent as content } from './calm-content';
import styles from './calm-story.module.css';

export default function CalmStory() {
  return <div className={styles.story}>
    <section className={styles.why} aria-labelledby="calm-why-title">
      <div><span className={styles.eyebrow}>ALNERA / TRENUTAK POSVEĆEN SEBI</span><h2 id="calm-why-title">Zašto ALNERA <em>CALM?</em></h2></div>
      <div className={styles.body}>{content.why.map(text => <p key={text}>{text}</p>)}</div>
    </section>

    <section className={styles.concepts} id="calm-koncept" aria-labelledby="calm-concepts-title">
      <header className={styles.sectionHeading}><span className={styles.eyebrow}>CALM / TRI OSNOVE</span><h2 id="calm-concepts-title">Tri osnove <em>CALM koncepta.</em></h2></header>
      <CalmConceptCards />
    </section>

    <section className={styles.formula} id="calm-formula" aria-labelledby="calm-formula-title">
      <div className={styles.formulaHeading}><span className={styles.eyebrow}>POGLED U FORMULU</span><h2 id="calm-formula-title">Šest pažljivo odabranih <em>sastojaka.</em></h2><p className={styles.meta}>ALNERA CALM / {content.capsules} KAPSULA</p></div>
      <div className={styles.ingredientList}>{content.ingredients.map((ingredient, index) => <details key={ingredient.name}><summary><span className={styles.ingredientNumber}>{String(index + 1).padStart(2,'0')}</span><h3>{ingredient.name}</h3><span className={styles.plus} aria-hidden="true">+</span></summary><p>{ingredient.description}</p></details>)}</div>
    </section>

    <section className={styles.composition} id="calm-sastav" aria-labelledby="calm-composition-title">
      <div className={styles.compositionCard}>
        <header className={styles.compositionIntro}><div><span className={styles.eyebrow}>ALNERA CALM / SASTAV</span><h2 id="calm-composition-title">Sastav <em>dnevne doze.</em></h2></div><div className={styles.dose}><strong>{content.dailyCapsules} kapsule</strong><span>uveče</span></div></header>
        <div className={styles.tableWrap}><table className={styles.table}><caption>Sastav dnevne doze: {content.dailyCapsules} kapsule</caption><thead><tr><th scope="col">Aktivni sastojak</th><th scope="col">Količina</th></tr></thead><tbody>{content.composition.map(row => <tr key={row.name} className={row.partOfPrevious ? styles.elementalRow : undefined}><th scope="row">{row.partOfPrevious && <span aria-hidden="true">↳ </span>}{row.name}</th><td>{row.amount}</td></tr>)}</tbody></table><p className={styles.tableNote}>80 mg je količina elementarnog magnezijuma sadržana u navedenih 400 mg magnezijum-bisglicinata.</p></div>
      </div>
    </section>

    <section className={styles.ritual} aria-labelledby="calm-ritual-title">
      <div className={styles.ritualPhoto}><EditorialPhoto scene="calm" /><span className={styles.photoLabel}>TVOJ CALM RITUAL</span></div>
      <div className={styles.ritualCopy}><span className={styles.eyebrow}>TVOJ CALM RITUAL</span><h2 id="calm-ritual-title">Two capsules.<br/><em>One evening ritual.</em></h2><div className={styles.body}>{content.ritual.map(text => <p key={text}>{text}</p>)}</div><div className={styles.packFacts}><span><strong>{content.capsules}</strong> kapsula</span><i aria-hidden="true"/><span><strong>{content.durationDays}</strong> dana</span></div></div>
    </section>

    <section className={styles.faq} id="calm-faq" aria-labelledby="calm-faq-title">
      <header><span className={styles.eyebrow}>CALM / ODGOVORI</span><h2 id="calm-faq-title">Često postavljana <em>pitanja.</em></h2></header>
      <div className={styles.faqList}>{content.faq.map((item,index) => <details key={item.question} open={index === 0}><summary><h3>{item.question}</h3><span className={styles.plus} aria-hidden="true">+</span></summary><p>{item.answer}</p></details>)}</div>
    </section>

    <section className={styles.closing} aria-labelledby="calm-closing-title"><span className={styles.eyebrow}>ALNERA CALM</span><h2 id="calm-closing-title">Make room<br/><em>for calm.</em></h2><p>{content.slogan}.</p><span className={styles.meta}>{content.capsules} kapsula | {content.durationDays} dana</span><a className={styles.cta} href="#calm-buy">Izaberi svoj CALM <span aria-hidden="true">↑</span></a></section>
  </div>;
}
