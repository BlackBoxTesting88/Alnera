// Probne cene u RSD. Ovde se menjaju cene i procenat popusta.
export const prices = { glow: 3290, calm: 2990, balance: 3490 } as const;
export const trioDiscount = 10;

export const singlePrices = [prices.glow, prices.calm, prices.balance];
export const trioRegularPrice = singlePrices.reduce((sum, price) => sum + price, 0);
const savingsPerTrio = Math.round(trioRegularPrice * trioDiscount / 100);
export const trioPrice = trioRegularPrice - savingsPerTrio;
export const trioIndex = singlePrices.length;
// Probni planovi. Svaka isporuka sadrži jedno pakovanje po mesecu plana.
export const subscriptionPlans = [
  { months: 1, discount: 10, label: 'Jednom mesečno' },
  { months: 3, discount: 15, label: 'Na 3 meseca' },
  { months: 6, discount: 20, label: 'Na 6 meseci' },
] as const;
export const maxSubscriptionDiscount = Math.max(...subscriptionPlans.map(plan => plan.discount));

export const subscriptionOffers = [...singlePrices, trioRegularPrice].flatMap((price, productIndex) =>
  subscriptionPlans.map((plan, planIndex) => {
    const regularPrice = price * plan.months;
    const saving = Math.round(regularPrice * plan.discount / 100);
    return {
      ...plan, productIndex, planIndex, regularPrice, saving,
      index: trioIndex + 1 + productIndex * subscriptionPlans.length + planIndex,
      price: regularPrice - saving,
    };
  }),
);
export const emptyCart = Array<number>(trioIndex + 1 + subscriptionOffers.length).fill(0);
export const cartKey = 'almera-cart';
export const money = (amount: number) => new Intl.NumberFormat('sr-Latn-RS').format(amount) + ' RSD';

export function readCart(): number[] {
  try {
    const saved = JSON.parse(localStorage.getItem(cartKey) || 'null');
    const legacySubscriptionCartSize = trioIndex + 1 + singlePrices.length * subscriptionPlans.length;
    if (Array.isArray(saved) && (saved.length === trioIndex || saved.length === trioIndex + 1 || saved.length === legacySubscriptionCartSize || saved.length === emptyCart.length)
      && saved.every(n => Number.isInteger(n) && n >= 0 && n <= 99)) {
      return emptyCart.map((_, index) => saved[index] ?? 0);
    }
  } catch {}
  return emptyCart;
}

export function cartTotals(cart: number[]) {
  const boxes = cart[trioIndex] ?? 0;
  const singles = singlePrices.map((_, index) => cart[index] ?? 0);
  const regularSubtotal = singlePrices.reduce((sum, price, index) => sum + price * singles[index], boxes * trioRegularPrice);
  const trioSavings = (Math.min(...singles) + boxes) * savingsPerTrio;
  const subscriptionSubtotal = subscriptionOffers.reduce((sum, offer) => sum + (cart[offer.index] ?? 0) * offer.regularPrice, 0);
  const subscriptionSavings = subscriptionOffers.reduce((sum, offer) => sum + (cart[offer.index] ?? 0) * offer.saving, 0);
  const subtotal = regularSubtotal + subscriptionSubtotal;
  return { subtotal, trioSavings, subscriptionSavings, total: subtotal - trioSavings - subscriptionSavings };
}
