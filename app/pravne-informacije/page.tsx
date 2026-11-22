import type { Metadata } from 'next';
import LegalPage from '../legal/legal-page';
export const metadata: Metadata = { title: 'Pravne informacije', description: 'Uslovi kupovine, dostava, reklamacije, privatnost i kolačići na jednom mestu.' };
export default function Page() { return <LegalPage />; }
