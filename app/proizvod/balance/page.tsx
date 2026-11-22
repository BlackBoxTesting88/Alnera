import type { Metadata } from 'next';
import Storefront from '../../storefront';
import { balanceContent } from '../../balance-content';

export const metadata: Metadata = {
  title: balanceContent.seo.title,
  description: balanceContent.seo.description,
  category: balanceContent.category,
};

export default function BalanceProduct() {
  return <Storefront initialProduct={2} />;
}
