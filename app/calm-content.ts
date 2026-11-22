// Tekst i planirani režim upotrebe dostavljeni 21.11.2026.
// Podatke pre prodaje uskladiti sa potvrđenom deklaracijom proizvoda.
export const calmContent = {
  slogan: 'Your support through everyday stress',
  tagline: 'Unwind. Relax. Restore.',
  signature: 'Tvoj večernji ritual. Tvoj trenutak mira.',
  capsules: 60,
  dailyCapsules: 2,
  durationDays: 30,
  doseLabel: '2 kapsule uveče',
  summaryIngredients: 'Magnezijum-bisglicinat · Vitamin B6 · L-teanin · Biljni sastojci',
  hero: [
    'ALNERA CALM je pažljivo osmišljena kombinacija magnezijuma, vitamina B6, L-teanina i biljnih sastojaka – matičnjaka, pasiflore i lavande.',
    'Formulisan je kao nutritivna podrška normalnom funkcionisanju nervnog sistema i psihološkoj funkciji, uz koncept opuštanja nakon svakodnevnih obaveza.',
  ],
  why: [
    'Svakodnevni život donosi brojne obaveze, odgovornosti i trenutke mentalnog opterećenja.',
    'ALNERA CALM nastao je sa idejom da večernja rutina postane trenutak posvećen sebi.',
    'Njegova formulacija kombinuje pažljivo odabrane nutritivne i biljne sastojke, povezujući savremena saznanja o ishrani sa tradicionalnom upotrebom biljaka.',
  ],
  concepts: [
    { number: '01', title: 'Nervous System Support', text: 'Magnezijum i vitamin B6 doprinose normalnom funkcionisanju nervnog sistema.' },
    { number: '02', title: 'Psychological Balance', text: 'Magnezijum i vitamin B6 doprinose normalnoj psihološkoj funkciji.' },
    { number: '03', title: 'Evening Ritual', text: 'Matičnjak, pasiflora i lavanda tradicionalno se koriste u preparatima namenjenim opuštanju.' },
  ],
  ingredients: [
    { name: 'Magnezijum-bisglicinat', description: 'Oblik magnezijuma, odabran kao osnovna mineralna komponenta formulacije. Magnezijum doprinosi normalnoj funkciji nervnog sistema, normalnoj psihološkoj funkciji i smanjenju umora i iscrpljenosti.' },
    { name: 'L-teanin', description: 'Aminokiselina prirodno prisutna u listovima zelenog čaja. Istražuje se zbog svoje potencijalne uloge u mentalnom opuštanju i fiziološkom odgovoru na stres.' },
    { name: 'Matičnjak', description: 'Biljka sa dugom tradicijom upotrebe u preparatima namenjenim opuštanju i večernjoj rutini.' },
    { name: 'Pasiflora', description: 'Biljna komponenta tradicionalno korišćena u kontekstu blagog mentalnog opterećenja i opuštanja.' },
    { name: 'Lavanda', description: 'Aromatična biljka tradicionalno povezana sa smirivanjem i večernjim ritualima.' },
    { name: 'Vitamin B6', description: 'Doprinosi normalnom funkcionisanju nervnog sistema, normalnoj psihološkoj funkciji i smanjenju umora i iscrpljenosti.' },
  ],
  composition: [
    { name: 'Magnezijum-bisglicinat', amount: '400 mg', partOfPrevious: false },
    { name: 'Od toga elementarni magnezijum', amount: '80 mg', partOfPrevious: true },
    { name: 'Matičnjak', amount: '50 mg', partOfPrevious: false },
    { name: 'Pasiflora', amount: '50 mg', partOfPrevious: false },
    { name: 'Lavanda', amount: '50 mg', partOfPrevious: false },
    { name: 'L-teanin', amount: '50 mg', partOfPrevious: false },
    { name: 'Vitamin B6', amount: '3 mg', partOfPrevious: false },
  ],
  ritualSlogan: 'Two capsules. One evening ritual.',
  ritual: [
    'Nakon dana ispunjenog obavezama, odvoji trenutak za sebe.',
    'Uvedi ALNERA CALM u svoju večernju rutinu uz dve kapsule i čašu vode.',
    'Jedno pakovanje sadrži 60 kapsula, dovoljno za 30 dana korišćenja.',
  ],
  faq: [
    { question: 'Da li je ALNERA CALM preparat za spavanje?', answer: 'Ne. ALNERA CALM je dodatak ishrani formulisan za nutritivnu podršku normalnoj funkciji nervnog sistema i psihološkoj funkciji. Njegov koncept je svakodnevno večernje opuštanje, a ne lečenje nesanice.' },
    { question: 'Kada se uzima ALNERA CALM?', answer: 'Prema planiranom režimu korišćenja, dve kapsule uveče.' },
    { question: 'Koliko traje jedno pakovanje?', answer: 'Pakovanje od 60 kapsula dovoljno je za 30 dana korišćenja.' },
    { question: 'Da li CALM sadrži magnezijum?', answer: 'Da. Dnevna doza sadrži 400 mg magnezijum-bisglicinata, što obezbeđuje 80 mg elementarnog magnezijuma.' },
    { question: 'Da li CALM sadrži biljne sastojke?', answer: 'Da. Formulacija sadrži matičnjak, pasifloru i lavandu.' },
  ],
  closing: 'Make room for calm.',
} as const;
