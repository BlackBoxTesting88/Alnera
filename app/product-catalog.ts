import { glowContent } from './glow-content';
import { calmContent } from './calm-content';
import { balanceContent } from './balance-content';

// Redosled proizvoda ostaje usklađen sa indeksima postojeće korpe i cenovnika.
export const products = [
  { id: 'glow', name: 'Glow', number: '01', color: '#efc4ad', caption: 'Beauty From Within.', ingredients: glowContent.summaryIngredients, fullIngredients: glowContent.ingredients.map(item => item.name).join(' · '), subtitle: glowContent.slogan, capsules: glowContent.capsules, image: 'alnera-glow-bottle.png', description: glowContent.intro[0] },
  { id: 'calm', name: 'Calm', number: '02', color: '#bfd3e4', caption: calmContent.signature, ingredients: calmContent.summaryIngredients, fullIngredients: calmContent.ingredients.map(item => item.name).join(' · '), subtitle: calmContent.slogan, capsules: calmContent.capsules, image: 'alnera-calm-bottle.png', description: calmContent.hero[0] },
  { id: 'balance', name: 'Balance', number: '03', color: '#d8bddb', caption: balanceContent.slogan, ingredients: balanceContent.summaryIngredients, fullIngredients: balanceContent.ingredients.map(item => item.name).join(' · '), subtitle: balanceContent.slogan, capsules: balanceContent.capsules, image: 'alnera-balance-bottle-clean.png', description: balanceContent.hero[0] },
] as const;

export function productPath(id: string) {
  return id === 'balance' ? balanceContent.seo.path : `/proizvodi/${id}`;
}
