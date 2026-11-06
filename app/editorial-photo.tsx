type Scene = 'glow' | 'calm' | 'balance' | 'ritual' | 'collection' | 'travel' | 'packaging' | 'detail';
// Exact viewports into the client's original contact sheets. No source files are modified.
const crops: Record<Scene, [number, number, number, number]> = {
  glow: [5, 5, 407, 431], calm: [842, 5, 407, 431],
  balance: [5, 835, 407, 412], ritual: [5, 450, 407, 369],
  collection: [429, 450, 395, 369], travel: [842, 835, 407, 412],
  packaging: [755, 8, 744, 663], detail: [538, 693, 465, 324],
};
const descriptions: Record<Scene, string> = {
  glow: 'Glow bočica i breskvasta kutija u toplom prirodnom svetlu',
  calm: 'Calm bočica uz keramičku šolju i knjigu',
  balance: 'Balance bočica i kutija uz grančice lavande',
  ritual: 'Trenutak predaha uz čašu vode i jutarnje svetlo',
  collection: 'Tri Alnera bočice u zajedničkoj kompoziciji',
  travel: 'Glow, Calm i Balance pakovanja u putnoj torbi',
  detail: 'Krupni detalj teksture Alnera kutije i utisnutog natpisa',
  packaging: 'Otvorena Alnera kutija sa tri formule u breskvastoj, plavoj i lavanda boji',
};
export default function EditorialPhoto({ scene, className = '', eager = false }: { scene: Scene; className?: string; eager?: boolean }) {
  const packaging = scene === 'packaging' || scene === 'detail';
  return <div className={`editorial-photo ${packaging ? 'photo-packaging' : 'photo-grid'} ${className}`} data-priority={eager ? 'high' : undefined}>
    <svg viewBox={crops[scene].join(' ')} preserveAspectRatio="xMidYMid slice" role="img" aria-label={descriptions[scene]}><title>{descriptions[scene]}</title><image href={`/images/${packaging ? 'alnera-packaging' : 'alnera-lifestyle'}.png`} width={packaging ? 1536 : 1254} height={packaging ? 1024 : 1254}/></svg>
  </div>;
}
