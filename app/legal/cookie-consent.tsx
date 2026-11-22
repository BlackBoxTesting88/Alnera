'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { legalConfig as config } from './config';
import { createConsent, parseConsent } from './consent-store';
import styles from './legal.module.css';

const openEvent = `${config.consentKey}:open`;
export const consentChangedEvent = `${config.consentKey}:changed`;
export const marketingConfigured = config.marketingEnabled && /^\d{5,30}$/.test(config.metaPixelId);

export function openCookiePreferences() {
  window.dispatchEvent(new Event(openEvent));
}

export function CookieSettingsButton() {
  return <button type="button" className={styles.action} onClick={openCookiePreferences}>Podešavanja kolačića <span aria-hidden="true">↗</span></button>;
}

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [settings, setSettings] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [storageNotice, setStorageNotice] = useState('');
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const sync = () => {
      let choice = null;
      try { choice = parseConsent(localStorage.getItem(config.consentKey), config.consentVersion); } catch {}
      setShowBanner(!choice);
      setMarketing(marketingConfigured && choice?.marketing === true);
    };
    const open = () => { sync(); setSettings(true); };
    const storage = (event: StorageEvent) => { if (event.key === config.consentKey || event.key === null) sync(); };
    sync();
    window.addEventListener(openEvent, open);
    window.addEventListener('storage', storage);
    return () => { window.removeEventListener(openEvent, open); window.removeEventListener('storage', storage); };
  }, []);

  useEffect(() => {
    if (settings && !dialog.current?.open) dialog.current?.showModal();
    else if (!settings && dialog.current?.open) dialog.current.close();
  }, [settings]);

  function save(allowMarketing: boolean) {
    const choice = createConsent(marketingConfigured && allowMarketing, config.consentVersion);
    try { localStorage.setItem(config.consentKey, JSON.stringify(choice)); setStorageNotice(''); }
    catch { setStorageNotice('Pregledač ne dozvoljava trajno čuvanje izbora. Podešavanje važi za ovu posetu.'); }
    setMarketing(choice.marketing);
    setShowBanner(false);
    setSettings(false);
    window.dispatchEvent(new CustomEvent(consentChangedEvent, { detail: choice }));
  }

  return <div className={`${styles.consentRoot} ${styles[config.theme]}`}>
    {showBanner && !settings && <section className={styles.banner} aria-label="Privatnost i kolačići">
      <div><h2>Tvoja privatnost.</h2><p>Korpa i osnovne funkcije koriste neophodno čuvanje podataka. Opcioni alati za praćenje trenutno nisu aktivni. <Link href="/pravne-informacije/#kolacici">Više informacija</Link></p></div>
      <div className={styles.bannerActions}><button type="button" onClick={() => save(false)}>Samo neophodno</button><button type="button" onClick={() => setSettings(true)}>Podesi</button>{marketingConfigured && <button type="button" onClick={() => save(true)}>Prihvati sve</button>}</div>
    </section>}
    <dialog ref={dialog} className={styles.preferences} aria-labelledby={`${config.consentKey}-title`} onClose={() => setSettings(false)}>
      <div className={styles.preferencesHeader}><div><span className={styles.kicker}>PRIVATNOST / {config.brand}</span><h2 id={`${config.consentKey}-title`}>Tvoj izbor kolačića.</h2></div><button type="button" className={styles.close} aria-label="Zatvori podešavanja" onClick={() => setSettings(false)}>×</button></div>
      <p>Osnovne funkcije ostaju dostupne i kada odbiješ opcione kolačiće. Izbor možeš promeniti u svakom trenutku.</p>
      <label className={styles.preferenceRow}><span><strong>Neophodno</strong><small>Korpa, bezbednost i pamćenje ovog izbora. Uvek uključeno.</small></span><input type="checkbox" checked disabled aria-label="Neophodno — uvek uključeno" /></label>
      <label className={styles.preferenceRow}><span><strong>Marketing / Meta Pixel</strong><small>{marketingConfigured ? 'Merenje oglasa i aktivnosti na sajtu uz tvoju saglasnost.' : 'Trenutno nije aktivan. Nema marketinškog praćenja.'}</small></span><input type="checkbox" checked={marketing} disabled={!marketingConfigured} onChange={event => setMarketing(event.target.checked)} /></label>
      <p className={styles.fine}>Kontakt za privatnost: {config.privacyEmail}. Izbor čuvamo do 180 dana ili do promene pravila. <Link href="/pravne-informacije/#privatnost">Politika privatnosti</Link></p>
      <div className={styles.preferenceActions}><button type="button" className={styles.action} onClick={() => save(false)}>Samo neophodno</button><button type="button" className={styles.primary} onClick={() => save(marketing)}>Sačuvaj izbor</button></div>
    </dialog>
    {storageNotice && <p className={styles.storageNotice} role="status">{storageNotice}</p>}
  </div>;
}
