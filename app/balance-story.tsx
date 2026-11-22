import EditorialPhoto from './editorial-photo';
import BalanceBenefitCards from './balance-benefit-cards';
import { balanceContent as content } from './balance-content';
import styles from './balance-story.module.css';
import introStyles from './product-intro.module.css';

export default function BalanceStory() {
  return <div className={styles.story}>
    <section className={styles.why} aria-labelledby="balance-why-title">
      <div><span className={styles.eyebrow}>ZAŠTO ALNERA BALANCE</span><h2 id="balance-why-title">Your Daily<br/><em>Moment of Balance.</em></h2><p className={styles.signature}>{content.signature}</p></div>
      <div className={styles.body}>{content.why.map(text => <p key={text}>{text}</p>)}<details className={introStyles.more}><summary>Više o BALANCE formuli <span aria-hidden="true">+</span></summary><div className={introStyles.moreBody}><p>{content.headline}</p>{content.hero.slice(1).map(text => <p key={text}>{text}</p>)}</div></details></div>
    </section>

    <section className={styles.benefits} aria-labelledby="balance-benefits-title">
      <header className={styles.sectionHeading}><span className={styles.eyebrow}>BALANCE / TRI OSNOVE FORMULE</span><h2 id="balance-benefits-title">Pažnja tvojoj<br/><em>svakodnevnoj ravnoteži.</em></h2></header>
      <BalanceBenefitCards />
    </section>

    <section className={styles.formula} id="balance-formula" aria-labelledby="balance-formula-title">
      <div className={styles.formulaHeading}><span className={styles.eyebrow}>SASTOJCI KOJI ČINE RAZLIKU</span><h2 id="balance-formula-title">Šest pažljivo odabranih <em>sastojaka.</em></h2><p className={styles.formulaSlogan}>{content.formulaSlogan}</p></div>
      <div className={styles.ingredientList}>{content.ingredients.map((ingredient, index) => <details key={ingredient.name}><summary><span className={styles.ingredientNumber}>{String(index + 1).padStart(2, '0')}</span><h3>{ingredient.name}</h3><span className={styles.plus} aria-hidden="true">+</span></summary><p>{ingredient.description}</p></details>)}</div>
    </section>

    <section className={styles.composition} id="balance-sastav" aria-labelledby="balance-composition-title">
      <div className={styles.compositionCard}>
        <header className={styles.compositionIntro}><div><span className={styles.eyebrow}>ALNERA BALANCE / AKTIVNI SASTOJCI</span><h2 id="balance-composition-title">Sastav <em>jedne kapsule.</em></h2></div><span className={styles.dose}>Količine po kapsuli</span></header>
        <div className={styles.tableWrap}><table className={styles.table}><caption>ALNERA BALANCE — sastav po jednoj kapsuli</caption><thead><tr><th scope="col">Aktivni sastojak</th><th scope="col">Po kapsuli</th></tr></thead><tbody>{content.composition.map(row => <tr key={row.name}><th scope="row">{row.name}</th><td>{row.amount}</td></tr>)}</tbody></table><p className={styles.tableNote}>Sve prikazane količine odnose se na jednu kapsulu. Preporučena upotreba je {content.dailyCapsules} kapsule dnevno, uveče.</p></div>
      </div>
    </section>

    <section className={styles.ritual} aria-labelledby="balance-ritual-title">
      <div className={styles.ritualPhoto}><EditorialPhoto scene="balance" /><span className={styles.photoLabel}>TVOJ BALANCE RITUAL</span></div>
      <div className={styles.ritualCopy}><span className={styles.eyebrow}>NAČIN UPOTREBE</span><h2 id="balance-ritual-title">Your Evening<br/><em>Balance Ritual.</em></h2><div className={styles.body}>{content.ritual.map(text => <p key={text}>{text}</p>)}</div><div className={styles.packFacts}><span><strong>{content.capsules}</strong> kapsula</span><span><strong>{content.durationDays}</strong> dana</span><span><strong>{content.dailyCapsules}</strong> kapsule uveče</span></div></div>
    </section>

    <section className={styles.audience} aria-labelledby="balance-audience-title"><header><span className={styles.eyebrow}>KOME JE NAMENJEN</span><h2 id="balance-audience-title">Podrška koja prati<br/><em>tvoj ritam.</em></h2></header><div className={styles.body}>{content.audience.map(text => <p key={text}>{text}</p>)}</div></section>

    <section className={styles.faq} id="balance-faq" aria-labelledby="balance-faq-title">
      <header><span className={styles.eyebrow}>BALANCE / ODGOVORI</span><h2 id="balance-faq-title">Često postavljana <em>pitanja.</em></h2></header>
      <div className={styles.faqList}>{content.faq.map((item, index) => <details key={item.question} open={index === 0}><summary><h3>{item.question}</h3><span className={styles.plus} aria-hidden="true">+</span></summary><p>{item.answer}</p></details>)}</div>
    </section>

    <section className={styles.closing} aria-labelledby="balance-closing-title"><span className={styles.eyebrow}>ALNERA BALANCE / WOMEN’S DAILY BALANCE</span><h2 id="balance-closing-title">Support Your<br/><em>Inner Balance.</em></h2><p>{content.supportLine}</p><span className={styles.meta}>Dodatak ishrani | {content.capsules} kapsula | {content.durationDays} dana</span><a className={styles.cta} href="#balance-buy">Izaberi svoj BALANCE</a></section>
  </div>;
}
