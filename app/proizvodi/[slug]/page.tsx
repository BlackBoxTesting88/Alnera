import Storefront from '../../storefront';
import { notFound } from 'next/navigation';
const slugs = ['glow', 'calm', 'balance'];
export function generateStaticParams() { return slugs.map(slug => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; return { title: `alnera — ${slug.charAt(0).toUpperCase() + slug.slice(1)}` }; }
export default async function Product({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const index = slugs.indexOf(slug); if (index < 0) notFound(); return <Storefront initialProduct={index}/>; }
