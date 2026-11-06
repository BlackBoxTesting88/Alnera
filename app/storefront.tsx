'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useRouter } from 'next/navigation';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import SiteFooter from './site-footer';
import EditorialPhoto from './editorial-photo';
import { articles } from './journal/articles';

const products = [
  { id: 'glow', name: 'Glow', number: '01', color: '#efc4ad', caption: 'Trenutak za tvoj sjaj.', ingredients: 'Ceramidi · Hijaluronska kiselina · Q10 · Astaksantin', subtitle: 'Tvoj ritual za kožu, kosu i nokte.' },
  { id: 'calm', name: 'Calm', number: '02', color: '#bfd3e4', caption: 'Pronađi svoj mir.', ingredients: 'Magnezijum · Pasiflora · Lavanda', subtitle: 'Tvoj trenutak predaha u svakodnevici.' },
  { id: 'balance', name: 'Balance', number: '03', color: '#d8bddb', caption: 'U svom ritmu.', ingredients: 'Mio-inozitol · Vitamin B6 · Vitamin B12 · Vitamin D3', subtitle: 'Pažnja posvećena tvojoj ravnoteži.' },
];

function Bottle({ index }: { index: number }) {
  const p = products[index];
  return <img className={`bottle-photo bottle-photo-${p.id}`} src={p.id === 'balance' ? '/images/alnera-balance-bottle-clean.png' : `/images/alnera-${p.id}-bottle.png`} alt={`Alnera ${p.name}, bočica od 60 kapsula`} />;
}

const descriptions = [
  'Glow okuplja ceramide, hijaluronsku kiselinu, Q10 i astaksantin u jednoj formuli. Deo Alnera kolekcije posvećen nezi kože, kose i noktiju.',
  'Calm povezuje magnezijum, pasifloru i lavandu. Formula iz Alnera kolekcije posvećena trenucima predaha u svakodnevnom ritmu.',
  'Balance kombinuje mio-inozitol sa vitaminima B6, B12 i D3. Formula iz Alnera kolekcije posvećena temi hormonalne ravnoteže.',
];

export default function Storefront({ initialProduct = null }: { initialProduct?: number | null }) {
  const router = useRouter();
  const story = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [detail, setDetail] = useState<number | null>(initialProduct);
  const [menu, setMenu] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState<number[]>([0, 0, 0]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const [cartReady, setCartReady] = useState(false);
  const totalItems = cart.reduce((a, b) => a + b, 0);
  useEffect(() => { setDetail(initialProduct); setQuantity(1); const frame = requestAnimationFrame(() => document.querySelector('.product-dialog')?.scrollTo({ top: 0 })); return () => cancelAnimationFrame(frame); }, [initialProduct]);
  useEffect(() => {
    try { const saved = JSON.parse(localStorage.getItem('almera-cart') || 'null'); if (Array.isArray(saved) && saved.length === 3 && saved.every(n => Number.isInteger(n) && n >= 0 && n <= 99)) setCart(saved); } catch {}
    setCartReady(true);
  }, []);
  useEffect(() => { if (cartReady) { try { localStorage.setItem('almera-cart', JSON.stringify(cart)); } catch {} } }, [cart, cartReady]);
  const openProduct = (i: number) => router.push(`/proizvodi/${products[i].id}`, { scroll: false });
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
        <div className="physical-scene"><img className="stage-photo" src="/images/alnera-open-box.png" alt="Otvorena breskvasta Alnera kutija sa Glow bočicom" fetchPriority="high"/>
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
        <div className="panel-content"><p>{p.caption}</p><button className="text-link" onClick={() => openProduct(i)}>Istraži {p.name} <span>↗</span></button></div>
        <span className="panel-a" aria-hidden="true">A</span><div className="product-scene"><Bottle index={i}/></div>
      </article>)}</div>
    </section>

    <section className="home-ritual" id="alnera-svet"><div className="ritual-image"><div className="ritual-photo-frame"><EditorialPhoto scene="ritual"/><div className="ritual-photo-note"><div><span>SVAKODNEVNA PAŽNJA</span><p>Počinje od tebe.</p></div></div><span className="photo-coordinate" aria-hidden="true">A / 01—03</span></div><span className="image-caption">01 / TRENUTAK KOJI PRIPADA TEBI</span></div><div className="ritual-copy"><span className="eyebrow">VIŠE OD SVAKODNEVNE NAVIKE</span><h2>Nešto malo.<br/><em>Sasvim tvoje.</em></h2><p>Prva čaša vode. Svetlo kroz prozor. Nekoliko minuta pre nego što dan ubrza.</p><p>Alnera okuplja tri formule u jednom svetu pažnje prema sebi. Glow, Calm i Balance — svaka sa svojim sastavom, bojom i mestom u tvojoj svakodnevici.</p><Link className="text-link" href="/journal/ritual-koji-staje-u-tvoj-dan">O malim ritualima <span>↗</span></Link></div></section>
    <section className="formula-index" aria-label="Pregled formula i sastojaka"><div className="formula-index-heading"><span className="eyebrow">ALNERA / POGLED U FORMULU</span><p>Tri različita sastava.<br/><em>Pažnja u svakom detalju.</em></p><span className="formula-index-caption">DODACI ISHRANI / 60 KAPSULA</span></div><div className="formula-index-list">{products.map((product,i) => <Link key={product.id} href={`/proizvodi/${product.id}`} className="formula-index-row"><span className="formula-index-number">{product.number}</span><span className="formula-index-dot" style={{ background: product.color }}/><h3>{product.name}</h3><span className="formula-index-ingredients">{product.ingredients}</span><span className="formula-index-arrow" aria-hidden="true">↗</span></Link>)}</div><small className="formula-index-note">Upoznaj sastav i informacije o svakoj formuli na stranici proizvoda.</small></section>
    <section className="packaging-story"><div className="packaging-copy"><span className="eyebrow">TRI BOJE / JEDAN POTPIS</span><h2>Pažnja se vidi.<br/><em>I pre otvaranja.</em></h2><p>Breskva, puderasta plava i lavanda. Tamno staklo i prepoznatljiv potpis. Svaki detalj deo je iste Alnera priče.</p><div className="packaging-imprint"><EditorialPhoto scene="detail"/><div className="imprint-copy"><span className="imprint-overline">U SVAKOJ BOČICI</span><p><strong>60</strong><em>kapsula</em></p><div className="imprint-colors" aria-hidden="true"><i/><i/><i/></div><span className="imprint-formulas">Glow · Calm · Balance</span></div><span className="imprint-caption">ALNERA / DETALJ PO DETALJ</span></div><Link className="text-link" href="/journal/paznja-je-u-detaljima">Zavirimo u detalje <span>↗</span></Link></div><div className="packaging-image"><div className="packaging-photo-frame"><EditorialPhoto scene="packaging"/><span className="packaging-label"><i/><i/><i/> ALNERA / KOLEKCIJA</span></div><span className="image-caption">GLOW / CALM / BALANCE</span></div></section>
    <section className="home-journal"><div className="home-journal-heading"><div><span className="eyebrow">PROSTOR ZA INSPIRACIJU</span><h2>Alnera <em>journal.</em></h2></div><Link className="text-link" href="/journal">Sve priče <span>↗</span></Link></div><div className="journal-context"><p>O sastavu, malim navikama i pažnji koju posvećuješ sebi.<br/>Priče koje povezuju Alnera svet i tvoju svakodnevicu.</p><span>ČITAJ. ISTRAŽI. PRONAĐI SVOJ RITAM.</span></div><div className="home-journal-grid">{articles.slice(0,2).map((article,i) => <Link className="home-journal-card" href={`/journal/${article.slug}`} key={article.slug}><div className="journal-photo-frame"><EditorialPhoto scene={i === 0 ? "travel" : article.image}/><span className="journal-photo-label">ALNERA JOURNAL / 0{i+1}</span></div><div className="story-card-meta"><span>0{i+1} / {article.category}</span><span>{article.time}</span></div><h3>{article.title}</h3><p className="home-journal-excerpt">{article.intro}</p><span className="journal-read">Pročitaj priču</span><span className="story-arrow" aria-hidden="true">↗</span></Link>)}</div></section>
    <SiteFooter/>

    {menu && <div className="overlay" role="dialog" aria-modal="true" aria-label="Navigacija"><button className="close" autoFocus onClick={() => setMenu(false)}>Zatvori ×</button><div className="menu-links"><button onClick={goCollection}>Kolekcija ↗</button><button onClick={() => { setMenu(false); router.push('/journal'); }}>Journal ↗</button></div></div>}
    {detail !== null && <div className="overlay product-dialog" role="dialog" aria-modal="true" aria-label={products[detail].name} style={{ background: products[detail].color }}>
      <div className="product-nav"><a className="wordmark" href="/">alnera</a><button onClick={() => { setCartOpen(true); setCheckout(false); }}>Korpa ({totalItems})</button><button autoFocus onClick={closeProduct}>Kolekcija ×</button></div>
      <div className="product-main"><div className="detail-art"><span className="product-ghost" aria-hidden="true">{products[detail].name}</span><Bottle index={detail}/><span className="photo-caption">ALNERA / {products[detail].name.toUpperCase()} / 60 KAPSULA</span></div>
      <div className="detail-copy"><span className="eyebrow">TVOJ SVAKODNEVNI RITUAL / {products[detail].number}</span><h1>{products[detail].name}</h1><p className="product-subtitle">{products[detail].subtitle}</p><p className="product-description">{descriptions[detail]}</p>
      <div className="product-facts"><span>60 kapsula</span><span>Dodatak ishrani</span><span>Jedna formula</span></div>
      <div className="buy-block"><div className="price-row"><span>Cena uskoro</span><small>Demo prodavnica</small></div><div className="buy-controls"><div className="quantity" role="group" aria-label="Količina"><button aria-label="Smanji količinu" disabled={quantity <= 1} onClick={() => setQuantity(n => n - 1)}>−</button><output aria-live="polite">{quantity}</output><button aria-label="Povećaj količinu" disabled={quantity >= 99} onClick={() => setQuantity(n => n + 1)}>+</button></div><button className="buy-button" onClick={() => addToCart(detail)}>Dodaj u korpu <span>↗</span></button></div><small className="purchase-note">Isprobaj kupovinu. Porudžbine i naplata još nisu aktivni.</small></div>
      <div className="product-accordions"><details open><summary>Šta je u formuli <span>+</span></summary><p>{products[detail].ingredients}</p><small>Sastojci prema referentnoj ambalaži. Količine i potpuna deklaracija biće dopunjeni.</small></details><details><summary>Tvoj ritual <span>+</span></summary><p>{products[detail].caption} Izaberi trenutak u danu koji posvećuješ sebi.</p><p>Način primene i preporučena dnevna doza biće navedeni prema zvaničnoj deklaraciji proizvoda.</p></details><details><summary>Pakovanje i informacije <span>+</span></summary><p>Bočica od tamnog stakla sa 60 kapsula, u kutiji u boji formule. Uslovi dostave, povraćaja i konačna deklaracija biće dostupni pre početka prodaje.</p></details></div>
      </div></div>
      <section className="product-editorial"><EditorialPhoto scene={products[detail].id as 'glow' | 'calm' | 'balance'}/><div><span className="eyebrow">{products[detail].name.toUpperCase()} / TVOJ TRENUTAK</span><h2>{detail === 0 ? <>Malo svetla.<br/><em>Samo za tebe.</em></> : detail === 1 ? <>Napravi prostor.<br/><em>Uspori trenutak.</em></> : <>Svakog dana.<br/><em>U svom ritmu.</em></>}</h2><p>{detail === 0 ? 'Na polici, uz tvoje omiljene stvari, u trenutku koji odvajaš za sebe. Glow je breskvasto poglavlje Alnera kolekcije.' : detail === 1 ? 'Omiljena šolja, nekoliko stranica i deo dana bez žurbe. Calm je plavo poglavlje tvoje Alnera priče.' : 'Prepoznatljiva lavanda nijansa i formula sa mio-inozitolom i vitaminima. Balance ima svoje mesto u Alnera kolekciji.'}</p><Link href={detail === 1 ? '/journal/prostor-za-predah' : '/journal/ritual-koji-staje-u-tvoj-dan'} className="text-link">Pronađi inspiraciju <span>↗</span></Link></div></section>
      <section className="product-story"><span className="eyebrow">MALI RITUALI / PAŽLJIVO ODABRANI</span><h2>Vreme koje<br/><em>pripada tebi.</em></h2><p>Tri formule. Tri različita trenutka pažnje.<br/>Istraži ostatak Alnera kolekcije.</p><div className="related-products">{products.map((p,i) => i !== detail && <button key={p.id} onClick={() => openProduct(i)} style={{ background:p.color }}><Bottle index={i}/><span><small>{p.number} / ALNERA</small><strong>{p.name}</strong><i>Istraži ritual ↗</i></span></button>)}</div></section>
    </div>}
    {cartOpen && <div className="overlay cart-dialog" role="dialog" aria-modal="true" aria-label="Tvoja korpa"><button className="close" autoFocus onClick={() => { setCartOpen(false); setCheckout(false); }}>Zatvori ×</button><span className="eyebrow">ALNERA / TVOJ IZBOR</span><h2>{checkout ? 'Tvoj izbor je spreman.' : 'Tvoja korpa.'}</h2><p className="cart-notice">Demo kupovina — bez naplate i slanja porudžbine.</p>{totalItems === 0 ? <div className="empty-cart"><p>Tvoja korpa čeka prvi ritual.</p><button className="text-link" onClick={() => { setCartOpen(false); if (detail === null) goCollection(); }}>Nastavi istraživanje ↗</button></div> : <><div className="cart-items">{products.map((p,i) => cart[i] > 0 && <article key={p.id}><Bottle index={i}/><div><h3>{p.name}</h3><small>60 kapsula / Cena uskoro</small><div className="quantity"><button aria-label={`Smanji ${p.name}`} onClick={() => changeCart(i,-1)}>−</button><output aria-live="polite">{cart[i]}</output><button aria-label={`Povećaj ${p.name}`} disabled={cart[i]>=99} onClick={() => changeCart(i,1)}>+</button></div></div><button className="remove-item" aria-label={`Ukloni ${p.name}`} onClick={() => setCart(items => items.map((n,index) => index === i ? 0 : n))}>×</button></article>)}</div><div className="cart-summary"><span>Broj pakovanja</span><strong>{totalItems}</strong></div>{checkout ? <div className="checkout-message" role="status"><h3>Ovde završavamo probnu kupovinu.</h3><p>Izabrani proizvodi ostaju u korpi. Kada brend potvrdi cene, dostavu i sistem plaćanja, ovde ćeš moći da završiš porudžbinu.</p><button className="text-link" onClick={() => { setCartOpen(false); setCheckout(false); }}>Nastavi razgledanje ↗</button></div> : <><button className="buy-button" onClick={() => { setCartOpen(false); router.push('/placanje'); }}>Nastavi ka kupovini <span>↗</span></button><small className="purchase-note">Demo korak. Ne prikupljamo podatke i ne kreiramo porudžbinu.</small></>}</>}</div>}

  </main>;
}
