import Link from 'next/link';
import styles from './legal.module.css';

export function LegalFooterLink() {
  return <Link className={styles.footerLink} href="/pravne-informacije/">Pravne informacije</Link>;
}

export function PrivacyNotice() {
  return <p className={styles.checkoutNotice}>Podatke koristimo za obradu porudžbine i dostavu. <Link href="/pravne-informacije/#privatnost" target="_blank" rel="noopener">Kako obrađujemo tvoje podatke ↗</Link></p>;
}

export function CheckoutTerms() {
  return <div className={styles.checkoutTerms}><label><input type="checkbox" name="termsAccepted" required /><span>Prihvatam <Link href="/pravne-informacije/#uslovi" target="_blank" rel="noopener">uslove kupovine</Link>, uključujući <Link href="/pravne-informacije/#dostava" target="_blank" rel="noopener">dostavu i plaćanje</Link>.</span></label><p><Link href="/pravne-informacije/#reklamacije" target="_blank" rel="noopener">Reklamacije i odustanak</Link> · <Link href="/pravne-informacije/#privatnost" target="_blank" rel="noopener">Privatnost</Link></p></div>;
}
