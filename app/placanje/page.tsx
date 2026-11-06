import type { Metadata } from 'next';
import Checkout from './checkout';
export const metadata: Metadata = { title: 'Završetak kupovine — ALNERA', description: 'Podaci za dostavu, pregled porudžbine i izbor načina plaćanja.' };
export default function Page() { return <Checkout/>; }
