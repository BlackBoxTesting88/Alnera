'use client';
import styles from './legal.module.css';

export function PrintLegalInformation() {
  return <button type="button" className={styles.action} onClick={() => window.print()}>Sačuvaj ili štampaj <span aria-hidden="true">↗</span></button>;
}
