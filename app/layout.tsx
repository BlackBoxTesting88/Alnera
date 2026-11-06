import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = { title: 'alnera — Otvori svoj ritual', description: 'Glow, Calm i Balance. Tri formule, tvoj svakodnevni ritual.' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="sr-Latn"><body>{children}</body></html>;
}
