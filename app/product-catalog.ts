import { glowContent } from './glow-content';
import { calmContent } from './calm-content';

// Redosled proizvoda ostaje usklađen sa indeksima postojeće korpe i cenovnika.
export const products = [
  { id: 'glow', name: 'Glow', number: '01', color: '#efc4ad', caption: 'Beauty From Within.', ingredients: glowContent.summaryIngredients, fullIngredients: glowContent.ingredients.map(item => item.name).join(' · '), subtitle: glowContent.slogan, capsules: glowContent.capsules, image: 'alnera-glow-bottle.png', description: glowContent.intro[0] },
  { id: 'calm', name: 'Calm', number: '02', color: '#bfd3e4', caption: calmContent.signature, ingredients: calmContent.summaryIngredients, fullIngredients: calmContent.ingredients.map(item => item.name).join(' · '), subtitle: calmContent.slogan, capsules: calmContent.capsules, image: 'alnera-calm-bottle.png', description: calmContent.hero[0] },
  { id: 'balance', name: 'Balance', number: '03', color: '#d8bddb', caption: 'U svom ritmu.', ingredients: 'Mio-inozitol · Vitamin B6 · Vitamin B12 · Vitamin D3', fullIngredients: 'Mio-inozitol · Vitamin B6 · Vitamin B12 · Vitamin D3', subtitle: 'Pažnja posvećena tvojoj ravnoteži.', capsules: 60, image: 'alnera-balance-bottle-clean.png', description: 'Balance kombinuje mio-inozitol sa vitaminima B6, B12 i D3. Formula iz Alnera kolekcije posvećena temi hormonalne ravnoteže.' },
] as const;
