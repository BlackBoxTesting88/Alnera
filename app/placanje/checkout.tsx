'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import SiteFooter from '../site-footer';
import EditorialPhoto from '../editorial-photo';
import { cartTotals, emptyCart, money, readCart, singlePrices, subscriptionOffers, trioDiscount, trioIndex, trioPrice } from '../pricing';

const products = [{ name:'Glow', image:'alnera-glow-bottle.png' },{ name:'Calm', image:'alnera-calm-bottle.png' },{ name:'Balance', image:'alnera-balance-bottle-clean.png' }];
export default function Checkout() {
  const [cart,setCart] = useState<number[]>(emptyCart);
  const [ready,setReady] = useState(false);
  const [method,setMethod] = useState<'cod'|'card'>('card');
  const [preview,setPreview] = useState(false);
  const [cardName,setCardName] = useState('');
  const [cardNumber,setCardNumber] = useState('');
  const [cardExpiry,setCardExpiry] = useState('');
  const previewNumber = cardNumber.replace(/ /g,'').padEnd(16,'•').match(/.{1,4}/g)?.join(' ');
  const clearCard = () => { setCardName('');setCardNumber('');setCardExpiry('');setPreview(false); };
  useEffect(() => { setCart(readCart()); setReady(true); }, []);
  const totals = cartTotals(cart);
  const firstSubscription = subscriptionOffers.find(offer => cart[offer.index] > 0);
  const firstSingle = cart.slice(0, trioIndex).findIndex(quantity => quantity > 0);
  const summaryProduct = firstSingle >= 0 ? firstSingle : (firstSubscription?.productIndex ?? 0);
  const summaryScene = cart[trioIndex] > 0 || summaryProduct === trioIndex
    ? 'packaging'
    : (['glow', 'calm', 'balance'] as const)[summaryProduct];
  const count = cart.reduce((a,b) => a+b,0);
  return <div className="checkout-shell"><header className="checkout-header"><Link className="wordmark" href="/">alnera</Link><Link href="/#kolekcija">← Nastavi kupovinu</Link></header><main className="checkout-page"><div className="checkout-progress" aria-label="Koraci kupovine"><span>01 / Tvoja korpa</span><i/><strong>02 / Dostava i plaćanje</strong><i/><span>03 / Potvrda</span></div><div className="checkout-heading"><span className="checkout-watermark" aria-hidden="true">A</span><span className="eyebrow">ALNERA / TVOJ IZBOR</span><h1>Još jedan korak.<br/><em>Tvoj ritual stiže.</em></h1><p>Podaci za dostavu, način plaćanja i pregled tvog izbora.</p></div><div className="checkout-demo" role="note">Demo prodavnica — prikazane cene su probne, a dostava i naplata još nisu aktivne. Podaci se ne šalju niti čuvaju.</div>
    {!ready ? <p role="status">Učitavanje korpe…</p> : count === 0 ? <section className="checkout-empty"><h2>Tvoja korpa je prazna.</h2><p>Izaberi svoju formulu pre nego što nastaviš na plaćanje.</p><Link href="/#kolekcija" className="text-link">Istraži kolekciju <span>↗</span></Link></section> : <form className="checkout-grid" onSubmit={event => { event.preventDefault();setPreview(true); }}>
      <div className="checkout-form"><section><div className="checkout-section-title"><span>01</span><h2>Podaci za dostavu</h2></div><div className="checkout-fields"><div className="checkout-field-group"><span>01 / KONTAKT</span><p>Da znamo kome stiže ritual.</p></div><label>Ime<input autoComplete="given-name" name="firstName" required maxLength={80}/></label><label>Prezime<input autoComplete="family-name" name="lastName" required maxLength={80}/></label><label className="field-wide">Email adresa<input type="email" autoComplete="email" name="email" required maxLength={160}/></label><label className="field-wide">Telefon<input type="tel" autoComplete="tel" name="phone" required maxLength={35}/></label><div className="checkout-field-group address-group"><span>02 / ADRESA</span><p>Gde šaljemo tvoj izbor?</p></div><label className="field-wide">Ulica i broj<input autoComplete="street-address" name="address" required maxLength={200}/></label><label>Grad<input autoComplete="address-level2" name="city" required maxLength={100}/></label><label>Poštanski broj<input autoComplete="postal-code" name="postalCode" inputMode="numeric" required maxLength={12}/></label><details className="checkout-note"><summary>Dodaj napomenu za dostavu <span>+</span></summary><label>Napomena <span>(opciono)</span><textarea name="note" rows={3} maxLength={600}/></label></details></div></section>
      <fieldset className="payment-methods"><legend><span>02</span> Način plaćanja</legend><label className={`payment-choice ${method==='card'?'selected':''}`}><input type="radio" name="payment" value="card" checked={method==='card'} onChange={() => {setMethod('card');setPreview(false);}}/><div><strong>Kartično plaćanje</strong><p>Online plaćanje karticom preko banke.</p><small>Unesi test podatke u formular ispod. Stvarna naplata još nije aktivna.</small></div><span className="payment-symbol" aria-hidden="true">01</span></label>{method === 'card' && <div className="demo-card-form"><div className="demo-card-heading"><span>PODACI SA KARTICE</span><span>DEMO / TEST</span></div><div className="demo-card-visual" aria-hidden="true"><span className="demo-card-brand">alnera</span><span className="demo-card-chip"/><p className="live-card-number">{previewNumber}</p><div><span className="live-card-name">{cardName.trim().toUpperCase() || 'IME I PREZIME'}</span><span>{cardExpiry || 'MM/GG'}</span></div></div><p className="demo-card-help" id="card-test-help">Koristi samo test podatke: <strong>4242 4242 4242 4242</strong>, datum <strong>12/30</strong>, CVC <strong>123</strong>. Ne unosi stvarnu karticu.</p><div className="checkout-fields card-fields"><label className="field-wide">Ime i prezime na kartici<input autoComplete="off" placeholder="TEST KUPAC" value={cardName} onChange={event => {setCardName(event.target.value);setPreview(false);}} required maxLength={80} aria-describedby="card-test-help"/></label><label className="field-wide">Broj kartice<input autoComplete="off" inputMode="numeric" placeholder="4242 4242 4242 4242" required maxLength={19} pattern="4242 4242 4242 4242" title="Za demo koristi isključivo 4242 4242 4242 4242" aria-describedby="card-test-help" value={cardNumber} onChange={event => {setCardNumber(event.target.value.replace(/\D/g,'').slice(0,16).replace(/(.{4})/g,'$1 ').trim());setPreview(false);}}/></label><label>Datum isteka<input autoComplete="off" inputMode="numeric" placeholder="MM/GG" required maxLength={5} pattern="12/30" title="Za demo koristi 12/30" aria-describedby="card-test-help" value={cardExpiry} onChange={event => {const digits=event.target.value.replace(/\D/g,'').slice(0,4);setCardExpiry(digits.length>2 ? digits.slice(0,2)+'/'+digits.slice(2) : digits);setPreview(false);}}/></label><label>CVC / CVV<input type="password" autoComplete="off" inputMode="numeric" placeholder="123" required maxLength={3} pattern="123" title="Za demo koristi 123" aria-describedby="card-test-help"/></label></div><div className="card-pay-action"><button className="buy-button" type="submit">Plati <span>↗</span></button><small className="demo-card-footnote">Demo plaćanje — bez naplate, slanja ili čuvanja kartičnih podataka.</small>{preview && <p className="card-pay-result" role="status">Test unos je proveren. Naplata nije izvršena i porudžbina nije poslata.</p>}</div></div>}<label className={`payment-choice ${method==='cod'?'selected':''}`}><input type="radio" name="payment" value="cod" checked={method==='cod'} onChange={() => {setMethod('cod');clearCard();}}/><div><strong>Plaćanje pouzećem</strong><p>Plaćanje prilikom preuzimanja pošiljke.</p><small>Uslovi i troškovi dostave biće potvrđeni pre početka prodaje.</small></div><span className="payment-symbol" aria-hidden="true">02</span></label>{method === 'cod' && <div className="card-pay-action cod-order-action"><button className="buy-button" type="submit">Poruči <span>↗</span></button><small className="demo-card-footnote">Demo porudžbina — bez slanja prodavcu i bez naplate.</small>{preview && <p className="card-pay-result" role="status">Demo porudžbina je pregledana. Plaćanje je pouzećem; porudžbina nije poslata.</p>}</div>}</fieldset></div>
      <aside className="checkout-summary"><div className="checkout-summary-photo"><EditorialPhoto scene={summaryScene}/><div><span>ALNERA / SVAKODNEVNI RITUALI</span><p>Nešto malo.<br/><em>Sasvim tvoje.</em></p></div></div><span className="eyebrow">TVOJA KORPA / {count} U KORPI</span><h2>Pregled porudžbine.</h2><div>{products.map((p,i) => cart[i] > 0 && <article className="checkout-item" key={p.name}><img src={`/images/${p.image}`} alt={`ALNERA ${p.name}`}/><div><h3>{p.name}</h3><p>60 kapsula · Količina: {cart[i]}</p></div><span>{money(singlePrices[i] * cart[i])}</span></article>)}
      {subscriptionOffers.map(offer => {
        if (!cart[offer.index]) return null;
        const isTrio = offer.productIndex === trioIndex;
        const name = isTrio ? 'ALNERA Trio kutija' : products[offer.productIndex].name;
        return (
        <article className="checkout-item" key={offer.index}>
          {isTrio ? <EditorialPhoto scene="packaging"/> : <img src={`/images/${products[offer.productIndex].image}`} alt={`ALNERA ${name}`}/>}
          <div>
            <h3>{name}</h3>
            <p>Pretplata · {offer.label} · {offer.months} {isTrio ? 'kut.' : 'pak.'} po isporuci</p>
            <p>{money(offer.price)} po isporuci · Količina: {cart[offer.index]}</p>
          </div>
          <span>{money(offer.price * cart[offer.index])}</span>
        </article>
        );
      })}
      {cart[trioIndex] > 0 && <article className="checkout-item">
        <EditorialPhoto scene="packaging"/>
        <div><h3>ALNERA Trio kutija</h3><p>Glow, Calm i Balance · Količina: {cart[trioIndex]}</p></div>
        <span>{money(trioPrice * cart[trioIndex])}</span>
      </article>}</div><dl className="checkout-totals"><div><dt>Proizvodi pre popusta</dt><dd>{money(totals.subtotal)}</dd></div>{totals.trioSavings > 0 && <div><dt>Popust za trio ({trioDiscount}%)</dt><dd>−{money(totals.trioSavings)}</dd></div>}{totals.subscriptionSavings > 0 && <div><dt>Popust za pretplatu</dt><dd>−{money(totals.subscriptionSavings)}</dd></div>}<div><dt>Dostava</dt><dd>Biće potvrđena</dd></div><div><dt>Način plaćanja</dt><dd>{method==='cod'?'Pouzećem':'Karticom'}</dd></div><div className="checkout-total"><dt>Ukupno bez dostave</dt><dd>{money(totals.total)}</dd></div></dl><p className="checkout-submit-note">Ovo je pregled demo koraka. Ne kreira se porudžbina i ne vrši se naplata.</p>{preview && <div className="checkout-result" role="status"><h3>{method==='cod'?'Izabrano je plaćanje pouzećem.':'Demo plaćanje je pregledano.'}</h3><p>{method==='cod'?'U aktivnoj prodavnici ovde će porudžbina biti prosleđena prodavcu.':'U aktivnoj prodavnici ovde ćeš biti preusmeren na stranicu banke za unos kartice.'} Demo je završen; podaci nisu poslati, korpa ostaje sačuvana.</p></div>}</aside>
    </form>}</main><SiteFooter/></div>;
}
