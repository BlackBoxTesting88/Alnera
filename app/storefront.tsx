'use client';

import { assetPath } from './asset-path';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useRouter } from 'next/navigation';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import SiteFooter from './site-footer';
import { LegalFooterLink } from './legal/legal-links';
import EditorialPhoto from './editorial-photo';
import { cartKey, cartTotals, emptyCart, money, readCart, singlePrices, maxSubscriptionDiscount, subscriptionOffers, trioDiscount, trioIndex, trioPrice, trioRegularPrice } from './pricing';
import { articles } from './journal/articles';
import { products, productPath } from './product-catalog';
import { glowContent } from './glow-content';
import GlowStory from './glow-story';
import { calmContent } from './calm-content';
import CalmStory from './calm-story';
import calmStyles from './calm-story.module.css';
import glowStyles from './glow-story.module.css';
import { balanceContent } from './balance-content';
import BalanceStory from './balance-story';
import balanceStyles from './balance-story.module.css';
import introStyles from './product-intro.module.css';


function Bottle({ index }: { index: number }) {
  const p = products[index];
  return <img className={`bottle-photo bottle-photo-${p.id}`} src={assetPath(`/images/${p.image}`)} alt={`Alnera ${p.name}, bočica od ${p.capsules} kapsula`} />;
}


function DeliveryPlans({ offers, planIndex, onSelect, name }: {
  offers: typeof subscriptionOffers;
  planIndex: number;
  onSelect: (index: number) => void;
  name: string;
}) {
  return (
    <fieldset className="subscription-plans">
          <legend className="eyebrow">Učestalost isporuke</legend>
          {offers.map(offer => (
            <label key={offer.index} className="subscription-plan">
              <input type="radio" name={name} checked={planIndex === offer.planIndex} onChange={() => onSelect(offer.planIndex)}/>
              <div>
                <strong>{offer.label}</strong>
                <small>{offer.months} {offer.productIndex === trioIndex ? (offer.months === 1 ? 'kutija' : offer.months === 3 ? 'kutije' : 'kutija') : (offer.months === 1 ? 'pakovanje' : 'pakovanja')} po isporuci</small>
                <small>Uštedi {offer.discount}%{offer.discount === maxSubscriptionDiscount && ' · Najveća ušteda'}</small>
              </div>
              <div className="subscription-plan-price">
                <strong>{money(offer.price / offer.months)} / mesec</strong>
                <small>{money(offer.price)} po isporuci</small>
              </div>
            </label>
          ))}
          <p className="purchase-note">Iznos za sva pakovanja obračunava se odjednom. Ovo je demo pretplata.</p>
        </fieldset>
  );
}

export default function Storefront({ initialProduct = null }: { initialProduct?: number | null }) {
  const router = useRouter();
  const story = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [detail, setDetail] = useState<number | null>(initialProduct);
  const [menu, setMenu] = useState(false);
  const [promoOpen, setPromoOpen] = useState(false);
  const promoSeen = useRef(false);
  const promoDialog = useRef<HTMLDialogElement>(null);
  const [quantity, setQuantity] = useState(1);
  const [trioSubscribe, setTrioSubscribe] = useState(false);
  const [trioPlanIndex, setTrioPlanIndex] = useState(0);
  const [subscribe, setSubscribe] = useState(false);
  const [planIndex, setPlanIndex] = useState(0);
  const [cart, setCart] = useState<number[]>(emptyCart);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const [cartReady, setCartReady] = useState(false);
  const totals = cartTotals(cart);
  const trioOffers = subscriptionOffers.filter(offer => offer.productIndex === trioIndex);
  const selectedTrioOffer = trioSubscribe ? trioOffers[trioPlanIndex] : undefined;
  const offers = subscriptionOffers.filter(offer => offer.productIndex === detail);
  const selectedOffer = subscribe ? offers[planIndex] : undefined;
  const totalItems = cart.reduce((a, b) => a + b, 0);
  const detailStyles = detail === 0 ? glowStyles : detail === 1 ? calmStyles : balanceStyles;
  useEffect(() => { setDetail(initialProduct); setQuantity(1); setSubscribe(false); setPlanIndex(0); const frame = requestAnimationFrame(() => document.querySelector('.product-dialog')?.scrollTo({ top: 0 })); return () => cancelAnimationFrame(frame); }, [initialProduct]);
  useEffect(() => {
    setCart(readCart());
    setCartReady(true);
  }, []);
  useEffect(() => { if (cartReady) { try { localStorage.setItem(cartKey, JSON.stringify(cart)); } catch {} } }, [cart, cartReady]);
  useEffect(() => {
    if (initialProduct !== null || detail !== null || cartOpen || menu || promoSeen.current) return;
    const showAfterIntro = () => {
      if (promoSeen.current || !story.current || story.current.getBoundingClientRect().bottom > 0) return;
      promoSeen.current = true;
      setPromoOpen(true);
    };

    window.addEventListener('scroll', showAfterIntro, { passive: true });
    showAfterIntro();
    return () => window.removeEventListener('scroll', showAfterIntro);
  }, [initialProduct, detail, cartOpen, menu]);

  const showPromo = promoOpen && initialProduct === null && detail === null && !cartOpen && !menu;
  useEffect(() => {
    const dialog = promoDialog.current;
    if (showPromo && dialog && !dialog.open) dialog.showModal();
  }, [showPromo]);

  const dismissPromo = () => {
    promoDialog.current?.close();
    setPromoOpen(false);
  };

  const openProduct = (i: number) => router.push(productPath(products[i].id), { scroll: false });
  const closeProduct = () => { setDetail(null); router.push('/#kolekcija', { scroll: false }); };
  const changeCart = (i: number, amount: number) => setCart(items => items.map((n, index) => index === i ? Math.max(0, Math.min(99, n + amount)) : n));
  const addToCart = (i: number) => { changeCart(i, quantity); setCartOpen(true); setCheckout(false); };


  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: story.current, start: 'top top', end: 'bottom bottom', scrub: 1.35 } });
        tl.to('.intro-copy', { opacity: 0, y: -35, duration: .25 }, 0)
          .to('.lid', { xPercent: -48, yPercent: -100, rotation: -17, scale: .82, duration: .72, ease: 'power2.inOut' }, .07)
          .to('.physical-scene', { scale: 1, duration: .8, ease: 'power1.inOut' }, 0)
          .to('.opening-copy', { opacity: 1, y: 0, duration: .25 }, .3)
          .to('.scroll-label', { opacity: 0, duration: .15 }, .05)
          .to('.stage-footnote', { opacity: 0, duration: .3 }, .7)
          .to('.opening-copy', { opacity: 0, y: -24, duration: .33, ease: 'power1.inOut' }, .66)
          .to('.physical-scene', { opacity: 0, scale: .97, duration: .65, ease: 'power1.inOut' }, .7)
          .to('.reveal-copy', { opacity: 1, y: 0, duration: .7, ease: 'power1.inOut' }, .7)
          .from('.ritual-backdrop', { scale: .94, y: 75, duration: .85, ease: 'power2.out' }, .7)
          .from('.reveal-copy > .eyebrow, .reveal-copy > h2, .reveal-copy > .text-link', { autoAlpha: 0, y: 25, duration: .5, stagger: .1, ease: 'power2.out' }, 1.05)
          .from('.reveal-product-links', { autoAlpha: 0, y: 15, duration: .4 }, 1.5)
          .to({}, { duration: .25 });
      }, story);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  useEffect(() => {
    const open = detail !== null || menu || cartOpen;
    const previous = document.activeElement as HTMLElement | null;
    document.body.style.overflow = open ? 'hidden' : '';
    const trap = (event: KeyboardEvent) => {
      if (!open || event.key !== 'Tab') return;
      const items = document.querySelector('.overlay:last-of-type')?.querySelectorAll<HTMLElement>('button:not(:disabled), a[href], summary, input, [tabindex="0"]');
      if (!items?.length) return;
      const first = items[0], last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    window.addEventListener('keydown', trap);
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') { if (cartOpen) { setCartOpen(false); setCheckout(false); } else if (detail !== null) { closeProduct(); } else { setMenu(false); } } };
    window.addEventListener('keydown', close);
    if (open) document.querySelector<HTMLElement>('.overlay:last-of-type button:not(:disabled)')?.focus();
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', close); window.removeEventListener('keydown', trap); if (open) previous?.focus(); };
  }, [detail, menu, cartOpen]);

  const goCollection = () => { setMenu(false); if (initialProduct !== null) { closeProduct(); return; } document.getElementById('kolekcija')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }); };

  return <main>
    <header className="header"><a className="wordmark" href="#" aria-label="Alnera početna">alnera</a><nav aria-label="Glavna navigacija"><button onClick={goCollection}>Kolekcija <span>↗</span></button><button onClick={() => router.push('/journal')}>Journal</button><button onClick={() => { setCartOpen(true); setCheckout(false); }}>Korpa ({totalItems})</button></nav><button className="mobile-cart" onClick={() => { setCartOpen(true); setCheckout(false); }} aria-label={`Otvori korpu, ${totalItems} proizvoda`}>Korpa ({totalItems})</button><button className="menu-button" onClick={() => setMenu(true)} aria-label="Otvori meni">Meni +</button></header>

    <section className="story" ref={story} aria-label="Otvori svoj ritual — skroluj za otvaranje kutije">
      <div className="stage">
        <div className="physical-scene"><img className="stage-photo" src={assetPath("/images/alnera-open-box.png")} alt="Otvorena breskvasta Alnera kutija sa Glow bočicom" fetchPriority="high"/>
        <div className="lid" aria-hidden="true"><div className="lid-face"><span className="emboss">A</span><span className="lid-wordmark">alnera</span><span className="lid-note">More balance<br/>for your every day.</span></div><div className="lid-side"/></div></div>
        <div className="intro-copy"><p className="eyebrow">NEŠTO SAMO ZA TEBE</p><h1>Otvori<br/>svoj ritual.</h1><p className="intro-note">Mali trenutak.<br/>Sasvim tvoj.</p></div>
        <div className="opening-copy"><span className="eyebrow">01 / IZNUTRA</span><h2>Prostor<br/>za sebe.</h2><span className="hairline"/><p>Pažnja je u detaljima.<br/>I u onome što biraš za sebe.</p></div>
        <div className="reveal-copy"><div className="ritual-backdrop" aria-hidden="true">{products.map((product, index) => <div key={product.id} className={`ritual-backdrop-bottle ritual-backdrop-${index}`}><Bottle index={index}/></div>)}</div><p className="eyebrow">TRI FORMULE. TVOJ RITAM.</p><h2>Šta je danas<br/><em>tvoj ritual?</em></h2><button className="text-link" onClick={goCollection}>Otkrij kolekciju <span>↓</span></button><div className="reveal-product-links" aria-label="Izaberi formulu">{products.map((product,i) => <button key={product.id} onClick={() => openProduct(i)}><i style={{ background:product.color }}/><span>{product.number}</span>{product.name}<b aria-hidden="true">↗</b></button>)}</div></div>
        <div className="scroll-label"><span className="scroll-line"/>Skroluj za otvaranje <span>↓</span></div>
        <span className="stage-footnote">OSMIŠLJENO SA PAŽNJOM.</span>
      </div>
    </section>

    <section className="collection" id="kolekcija" aria-label="Alnera kolekcija">
      <div className="collection-top"><span>KOLEKCIJA / 01—03</span><span>Izaberi svoj ritual ↘</span></div>
      <div className="panels">{products.map((p, i) => <article key={p.id} className={`panel ${active === i ? 'active' : ''}`} style={{ backgroundColor: p.color }} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)}>
        <button className="panel-select" onClick={() => setActive(i)} aria-expanded={active === i} aria-label={`Istraži ${p.name}`}><span className="product-number">{p.number}</span><h2>{p.name}</h2><span className="expand-icon">{active === i ? '−' : '+'}</span></button>
        <div className="panel-content"><p>{p.caption}</p><p className="collection-price">{money(singlePrices[i])}</p><button className="text-link" onClick={() => openProduct(i)}>Istraži {p.name} <span>↗</span></button></div>
        <span className="panel-a" aria-hidden="true">A</span><div className="product-scene"><Bottle index={i}/></div>
      </article>)}</div>
    </section>

    <section className="home-ritual" id="alnera-svet"><div className="ritual-image"><div className="ritual-photo-frame"><EditorialPhoto scene="ritual"/><div className="ritual-photo-note"><div><span>SVAKODNEVNA PAŽNJA</span><p>Počinje od tebe.</p></div></div><span className="photo-coordinate" aria-hidden="true">A / 01—03</span></div><span className="image-caption">01 / TRENUTAK KOJI PRIPADA TEBI</span></div><div className="ritual-copy"><span className="eyebrow">VIŠE OD SVAKODNEVNE NAVIKE</span><h2>Nešto malo.<br/><em>Sasvim tvoje.</em></h2><p>Prva čaša vode. Svetlo kroz prozor. Nekoliko minuta pre nego što dan ubrza.</p><p>Alnera okuplja tri formule u jednom svetu pažnje prema sebi. Glow, Calm i Balance — svaka sa svojim sastavom, bojom i mestom u tvojoj svakodnevici.</p><Link className="text-link" href="/journal/ritual-koji-staje-u-tvoj-dan">O malim ritualima <span>↗</span></Link></div></section>
    <section className="formula-index" aria-label="Pregled formula i sastojaka"><div className="formula-index-heading"><span className="eyebrow">ALNERA / POGLED U FORMULU</span><p>Tri različita sastava.<br/><em>Pažnja u svakom detalju.</em></p><span className="formula-index-caption">DODACI ISHRANI / TRI FORMULE</span></div><div className="formula-index-list">{products.map((product,i) => <Link key={product.id} href={productPath(product.id)} className="formula-index-row"><span className="formula-index-number">{product.number}</span><span className="formula-index-dot" style={{ background: product.color }}/><h3>{product.name}<small>{product.capsules} kapsula</small></h3><span className="formula-index-ingredients">{product.ingredients}</span><span className="formula-index-arrow" aria-hidden="true">↗</span></Link>)}</div><small className="formula-index-note">Upoznaj sastav i informacije o svakoj formuli na stranici proizvoda.</small></section>
    <section className="packaging-story"><div className="packaging-copy"><span className="eyebrow">TRI BOJE / JEDAN POTPIS</span><h2>Pažnja se vidi.<br/><em>I pre otvaranja.</em></h2><p>Breskva, puderasta plava i lavanda. Tamno staklo i prepoznatljiv potpis. Svaki detalj deo je iste Alnera priče.</p><div className="packaging-imprint"><EditorialPhoto scene="detail"/><div className="imprint-copy"><span className="imprint-overline">U ALNERA KOLEKCIJI</span><p><strong>3</strong><em>formule</em></p><div className="imprint-colors" aria-hidden="true"><i/><i/><i/></div><span className="imprint-formulas">Glow · Calm · Balance</span></div><span className="imprint-caption">ALNERA / DETALJ PO DETALJ</span></div><Link className="text-link" href="/journal/paznja-je-u-detaljima">Zavirimo u detalje <span>↗</span></Link>
      <section className="trio-reasons" aria-labelledby="trio-reasons-title">
        <h3 id="trio-reasons-title">Zašto izabrati <em>Trio?</em></h3>
        <ul>
          <li>
            <strong>Cela kolekcija u jednoj kutiji</strong>
            <p>Po jedno pakovanje Glow, Calm i Balance.</p>
          </li>
          <li>
            <strong>{trioDiscount}% povoljnije u kompletu</strong>
            <p>Pri jednokratnoj kupovini Trio kutije uštediš {money(trioRegularPrice - trioPrice)} u odnosu na kupovinu sva tri proizvoda pojedinačno.</p>
          </li>
        </ul>
      </section>
    </div><div className="packaging-image"><div className="packaging-photo-frame"><EditorialPhoto scene="packaging"/><span className="packaging-label"><i/><i/><i/> ALNERA / KOLEKCIJA</span></div><div className="trio-offer" id="trio-kutija">
      <span className="eyebrow">GLOW / CALM / BALANCE</span>
      <h3>ALNERA Trio kutija</h3>
      <p>Sva tri proizvoda u jednoj kutiji.</p>
      <fieldset className="purchase-options">
        <legend className="eyebrow">Izaberi način kupovine</legend>
        <label className="purchase-choice">
          <input type="radio" name="trio-purchase-mode" checked={!trioSubscribe} onChange={() => setTrioSubscribe(false)}/>
          <strong>Jednokratna kupovina</strong>
        </label>
        <label className="purchase-choice">
          <input type="radio" name="trio-purchase-mode" checked={trioSubscribe} onChange={() => setTrioSubscribe(true)}/>
          <strong>Tvoj trio, redovno</strong>
          <small>Uštedi do {maxSubscriptionDiscount}%</small>
        </label>
      </fieldset>
      {trioSubscribe && <DeliveryPlans offers={trioOffers} planIndex={trioPlanIndex} onSelect={setTrioPlanIndex} name="trio-subscription-period"/>}
      {!trioSubscribe && <div className="trio-prices"><strong>{money(trioPrice)}</strong><del>{money(trioRegularPrice)}</del><span>−{trioDiscount}%</span></div>}
      <button className="buy-button" onClick={() => {
        changeCart(selectedTrioOffer?.index ?? trioIndex, 1);
        setCartOpen(true);
        setCheckout(false);
      }} disabled={cart[selectedTrioOffer?.index ?? trioIndex] >= 99}>
        Dodaj u korpu · {money(selectedTrioOffer?.price ?? trioPrice)} <span aria-hidden="true">↗</span>
      </button>
    </div></div></section>
    <section className="home-journal"><div className="home-journal-heading"><div><span className="eyebrow">PROSTOR ZA INSPIRACIJU</span><h2>Alnera <em>journal.</em></h2></div><Link className="text-link" href="/journal">Sve priče <span>↗</span></Link></div><div className="journal-context"><p>O sastavu, malim navikama i pažnji koju posvećuješ sebi.<br/>Priče koje povezuju Alnera svet i tvoju svakodnevicu.</p><span>ČITAJ. ISTRAŽI. PRONAĐI SVOJ RITAM.</span></div><div className="home-journal-grid">{articles.slice(0,2).map((article,i) => <Link className="home-journal-card" href={`/journal/${article.slug}`} key={article.slug}><div className="journal-photo-frame"><EditorialPhoto scene={i === 0 ? "travel" : article.image}/><span className="journal-photo-label">ALNERA JOURNAL / 0{i+1}</span></div><div className="story-card-meta"><span>0{i+1} / {article.category}</span><span>{article.time}</span></div><h3>{article.title}</h3><p className="home-journal-excerpt">{article.intro}</p><span className="journal-read">Pročitaj priču</span><span className="story-arrow" aria-hidden="true">↗</span></Link>)}</div></section>
    <SiteFooter/>

    {menu && <div className="overlay" role="dialog" aria-modal="true" aria-label="Navigacija"><button className="close" autoFocus onClick={() => setMenu(false)}>Zatvori ×</button><div className="menu-links"><button onClick={goCollection}>Kolekcija ↗</button><button onClick={() => { setMenu(false); router.push('/journal'); }}>Journal ↗</button></div></div>}
    {detail !== null && <div className="overlay product-dialog" role="dialog" aria-modal="true" aria-label={products[detail].name} style={{ background: products[detail].color }}>
      <div className="product-nav"><Link className="wordmark" href="/">alnera</Link><button onClick={() => { setCartOpen(true); setCheckout(false); }}>Korpa ({totalItems})</button><button autoFocus onClick={closeProduct}>Kolekcija ×</button></div>
      <div className="product-main"><div className="detail-art"><span className="product-ghost" aria-hidden="true">{products[detail].name}</span><Bottle index={detail}/><span className="photo-caption">ALNERA / {products[detail].name.toUpperCase()} / {products[detail].capsules} KAPSULA{detail === 0 && <small className={glowStyles.assetNote}>Privremeni prikaz ambalaže. Finalna etiketa je u pripremi.</small>}</span></div>
      <div className={`detail-copy ${detailStyles.heroCopy} ${introStyles.hero}`} data-product={products[detail].id}>
      <span className="eyebrow">{detail === 0 ? glowContent.positioning : detail === 1 ? 'DODATAK ISHRANI / VEČERNJI RITUAL' : balanceContent.category.toUpperCase()}</span>
      <h1>{detail === 0 ? products[detail].name : products[detail].name.toUpperCase()}</h1>
      {detail === 0 && <span className={glowStyles.heroBadge}>{glowContent.badge}</span>}
      <p className={`product-subtitle ${introStyles.subtitle}`}>{products[detail].subtitle}</p>
      <p className={introStyles.tagline}>{detail === 0 ? glowContent.tagline : detail === 1 ? calmContent.tagline : balanceContent.tagline}</p>
      <p className={`product-description ${introStyles.description}`}>{products[detail].description}</p>
      <div className={`product-facts ${introStyles.facts}`}><span>{products[detail].capsules} kapsula</span>{detail === 1 ? <><span>{calmContent.doseLabel}</span><span>{calmContent.durationDays} dana</span></> : detail === 2 ? <><span>{balanceContent.doseLabel}</span><span>{balanceContent.durationDays} dana</span></> : <><span>Dodatak ishrani</span><span>Jedna formula</span></>}</div>
      <div className={`buy-block ${detailStyles.buyAnchor}`} id={`${products[detail].id}-buy`}>
        <div className="price-row"><span>{money(selectedOffer?.price ?? singlePrices[detail])}</span><small>{selectedOffer ? 'Po isporuci' : 'Po pakovanju'}</small></div>
        <fieldset className="purchase-options">
          <legend className="eyebrow">Izaberi način kupovine</legend>
          <label className="purchase-choice">
            <input type="radio" name="purchase-mode" checked={!subscribe} onChange={() => setSubscribe(false)}/>
            <strong>Jednokratna kupovina</strong>
          </label>
          <label className="purchase-choice">
            <input type="radio" name="purchase-mode" checked={subscribe} onChange={() => setSubscribe(true)}/>
            <strong>Tvoj ritual, redovno</strong>
            <small>Uštedi do {maxSubscriptionDiscount}%</small>
          </label>
        </fieldset>
        {subscribe && <DeliveryPlans offers={offers} planIndex={planIndex} onSelect={setPlanIndex} name="subscription-period"/>}
        <div className="buy-controls">
          {!selectedOffer && <div className="quantity" role="group" aria-label="Količina">
            <button aria-label="Smanji količinu" disabled={quantity <= 1} onClick={() => setQuantity(n => n - 1)}>−</button>
            <output aria-live="polite">{quantity}</output>
            <button aria-label="Povećaj količinu" disabled={quantity >= 99} onClick={() => setQuantity(n => n + 1)}>+</button>
          </div>}
          <button className="buy-button" disabled={cart[selectedOffer?.index ?? detail] >= 99} onClick={() => {
            if (selectedOffer) {
              changeCart(selectedOffer.index, 1);
              setCartOpen(true);
              setCheckout(false);
            } else addToCart(detail);
          }}>Dodaj u korpu · {money(selectedOffer?.price ?? singlePrices[detail] * quantity)} <span aria-hidden="true">↗</span></button>
        </div>
        <small className="purchase-note">Probne cene. Porudžbine i naplata još nisu aktivni.</small>
      </div>
      <div className="product-accordions">
        <details open><summary>Šta je u formuli <span>+</span></summary><p>{products[detail].fullIngredients}</p><small>{detail === 0 ? 'Sastav prema dostavljenom radnom tekstu. Količine sastojaka i konačna deklaracija biće dodati po potvrdi.' : detail === 1 ? <a href="#calm-sastav">Pogledaj količine u dnevnoj dozi od 2 kapsule ↓</a> : <a href="#balance-sastav">Pogledaj količine po jednoj kapsuli</a>}</small></details>
        <details><summary>Tvoj ritual <span>+</span></summary><p>{detail === 1 ? calmContent.ritual[1] : detail === 2 ? balanceContent.ritual[0] : <>{products[detail].caption} Izaberi trenutak u danu koji posvećuješ sebi.</>}</p><p>{detail === 1 ? calmContent.ritual[2] : detail === 2 ? balanceContent.ritual[1] : 'Način primene i preporučena dnevna doza biće navedeni prema zvaničnoj deklaraciji proizvoda.'}</p></details>
        <details><summary>Pakovanje i informacije <span>+</span></summary><p>Bočica od tamnog stakla sa {products[detail].capsules} kapsula, u kutiji u boji formule.{detail === 1 && <> Pakovanje traje {calmContent.durationDays} dana prema planiranom režimu od {calmContent.dailyCapsules} kapsule uveče.</>}{detail === 2 && <> Pakovanje traje {balanceContent.durationDays} dana uz preporučenu upotrebu od {balanceContent.dailyCapsules} kapsule uveče.</>} Uslovi dostave, povraćaja i konačna deklaracija biće dostupni pre početka prodaje.</p></details>
      </div>
      </div></div>
      {detail === 0 ? <GlowStory /> : detail === 1 ? <CalmStory /> : <BalanceStory />}
      <section className="product-story"><span className="eyebrow">MALI RITUALI / PAŽLJIVO ODABRANI</span><h2>Vreme koje<br/><em>pripada tebi.</em></h2><p>Tri formule. Tri različita trenutka pažnje.<br/>Istraži ostatak Alnera kolekcije.</p><div className="related-products">{products.map((p,i) => i !== detail && <button key={p.id} onClick={() => openProduct(i)} style={{ background:p.color }}><Bottle index={i}/><span><small>{p.number} / ALNERA</small><strong>{p.name}</strong><i>Istraži ritual ↗</i></span></button>)}</div></section>
      <div className="product-legal-footer"><LegalFooterLink /></div>
    </div>}
    {showPromo && (
      <dialog
        className="trio-promo"
        ref={promoDialog}
        aria-labelledby="trio-promo-title"
        aria-describedby="trio-promo-description"
        onClose={() => setPromoOpen(false)}
        onClick={event => { if (event.target === event.currentTarget) dismissPromo(); }}
      >
        <div className="trio-promo-layout">
          <button className="trio-promo-close" type="button" aria-label="Zatvori ponudu" autoFocus onClick={dismissPromo}>×</button>
          <EditorialPhoto scene="packaging"/>
          <div className="trio-promo-copy">
            <span className="eyebrow">ALNERA TRIO · UŠTEDI {trioDiscount}%</span>
            <h2 id="trio-promo-title">Malo pažnje, <em>samo za tebe.</em></h2>
            <p id="trio-promo-description">Glow, Calm i Balance, zajedno u jednoj kutiji. Tri formule za trenutke koje odvajaš za sebe.</p>
            <div className="trio-promo-prices"><strong>{money(trioPrice)}</strong><del>{money(trioRegularPrice)}</del></div>
            <a href="#trio-kutija" className="buy-button" onClick={dismissPromo}>Pogledaj Trio kutiju <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </dialog>
    )}
    {cartOpen && <div className="overlay cart-dialog" role="dialog" aria-modal="true" aria-label="Tvoja korpa"><button className="close" autoFocus onClick={() => { setCartOpen(false); setCheckout(false); }}>Zatvori ×</button><span className="eyebrow">ALNERA / TVOJ IZBOR</span><h2>{checkout ? 'Tvoj izbor je spreman.' : 'Tvoja korpa.'}</h2><p className="cart-notice">Demo kupovina — bez naplate i slanja porudžbine.</p>{totalItems === 0 ? <div className="empty-cart"><p>Tvoja korpa čeka prvi ritual.</p><button className="text-link" onClick={() => { setCartOpen(false); if (detail === null) goCollection(); }}>Nastavi istraživanje ↗</button></div> : <><div className="cart-items">{products.map((p,i) => cart[i] > 0 && <article key={p.id}><Bottle index={i}/><div><h3>{p.name}</h3><small>{p.capsules} kapsula · {money(singlePrices[i])} po komadu · {money(singlePrices[i] * cart[i])}</small><div className="quantity"><button aria-label={`Smanji ${p.name}`} onClick={() => changeCart(i,-1)}>−</button><output aria-live="polite">{cart[i]}</output><button aria-label={`Povećaj ${p.name}`} disabled={cart[i]>=99} onClick={() => changeCart(i,1)}>+</button></div></div><button className="remove-item" aria-label={`Ukloni ${p.name}`} onClick={() => setCart(items => items.map((n,index) => index === i ? 0 : n))}>×</button></article>)}
      {subscriptionOffers.map(offer => {
        if (!cart[offer.index]) return null;
        const isTrio = offer.productIndex === trioIndex;
        const name = isTrio ? 'ALNERA Trio kutija' : products[offer.productIndex].name;
        return (
        <article key={offer.index}>
          {isTrio ? <EditorialPhoto scene="packaging"/> : <Bottle index={offer.productIndex}/> }
          <div>
            <h3>{name}</h3>
            <small>Pretplata · {offer.label} · {offer.months} {isTrio ? 'kut.' : 'pak.'} po isporuci</small>{!isTrio && <small>{products[offer.productIndex].capsules} kapsula po pakovanju</small>}
            <small>{money(offer.price)} po isporuci · {money(offer.price * cart[offer.index])} ukupno</small>
            <div className="quantity">
              <button aria-label={`Smanji pretplatu ${name} · ${offer.label}`} onClick={() => changeCart(offer.index, -1)}>−</button>
              <output aria-live="polite">{cart[offer.index]}</output>
              <button aria-label={`Povećaj pretplatu ${name} · ${offer.label}`} disabled={cart[offer.index] >= 99} onClick={() => changeCart(offer.index, 1)}>+</button>
            </div>
          </div>
          <button className="remove-item" aria-label={`Ukloni pretplatu ${name} · ${offer.label}`} onClick={() => setCart(items => items.map((n, index) => index === offer.index ? 0 : n))}>×</button>
        </article>
        );
      })}
      {cart[trioIndex] > 0 && <article>
        <EditorialPhoto scene="packaging"/>
        <div><h3>ALNERA Trio kutija</h3><small>Glow, Calm i Balance · {money(trioPrice)} po kutiji · {money(trioPrice * cart[trioIndex])}</small>
          <div className="quantity">
            <button aria-label="Smanji količinu Trio kutija" onClick={() => changeCart(trioIndex, -1)}>−</button>
            <output aria-live="polite">{cart[trioIndex]}</output>
            <button aria-label="Povećaj količinu Trio kutija" disabled={cart[trioIndex] >= 99} onClick={() => changeCart(trioIndex, 1)}>+</button>
          </div>
        </div>
        <button className="remove-item" aria-label="Ukloni Trio kutije" onClick={() => setCart(items => items.map((n, index) => index === trioIndex ? 0 : n))}>×</button>
      </article>}
      </div>
      <dl className="checkout-totals">
        <div><dt>Proizvodi pre popusta</dt><dd>{money(totals.subtotal)}</dd></div>
        {totals.trioSavings > 0 && <div><dt>Popust za trio ({trioDiscount}%)</dt><dd>−{money(totals.trioSavings)}</dd></div>}
        {totals.subscriptionSavings > 0 && <div><dt>Popust za pretplatu</dt><dd>−{money(totals.subscriptionSavings)}</dd></div>}
        <div className="checkout-total"><dt>Ukupno bez dostave</dt><dd>{money(totals.total)}</dd></div>
      </dl>{checkout ? <div className="checkout-message" role="status"><h3>Ovde završavamo probnu kupovinu.</h3><p>Izabrani proizvodi ostaju u korpi. Kada brend potvrdi cene, dostavu i sistem plaćanja, ovde ćeš moći da završiš porudžbinu.</p><button className="text-link" onClick={() => { setCartOpen(false); setCheckout(false); }}>Nastavi razgledanje ↗</button></div> : <><button className="buy-button" onClick={() => { setCartOpen(false); router.push('/placanje'); }}>Nastavi ka kupovini <span>↗</span></button><small className="purchase-note">Demo korak. Ne prikupljamo podatke i ne kreiramo porudžbinu.</small></>}</>}</div>}

  </main>;
}
