export type ArticleSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
  sourceIds?: string[];
};

export type JournalArticle = {
  slug: string;
  category: string;
  title: string;
  shortTitle: string;
  image: 'glow' | 'calm' | 'balance' | 'ritual' | 'collection' | 'travel' | 'packaging' | 'detail';
  time: string;
  intro: string;
  sections: ArticleSection[];
  tags?: string[];
  product?: 'glow' | 'calm' | 'balance';
  updatedAt?: string;
  sources?: { id: string; title: string; url: string }[];
  note?: string;
};

export const articles: JournalArticle[] = [
  {
    slug: 'ritual-koji-staje-u-tvoj-dan', tags: ['rutina', 'navike', 'briga o sebi'], category: 'Svakodnevica', title: 'Ritual koji staje u tvoj dan.', shortTitle: 'Nešto malo. Sasvim tvoje.', image: 'ritual' as const, time: '2 min čitanja',
    intro: 'Ne mora svaki trenutak da bude isplaniran. Ponekad je dovoljno napraviti malo prostora između dve obaveze.',
    sections: [
      { title: 'Počni od trenutka koji već postoji.', paragraphs: ['Jutarnje otvaranje prozora. Prva čaša vode. Nekoliko minuta pre nego što pogledaš telefon. Mali ritual ne mora da bude još jedna stavka na listi — može da bude drugačiji odnos prema onome što već radiš.', 'Izaberi jedan poznat trenutak i posveti mu punu pažnju. Bez cilja da ga učiniš savršenim i bez potrebe da svaki dan izgleda isto.'] },
      { title: 'Ostavi malo praznog prostora.', paragraphs: ['Ritual može da bude sasvim jednostavan: omiljena šolja, čista površina stola, svetlo koje ulazi u sobu. Važno je da taj izbor ima smisla u tvojoj svakodnevici.', 'Umesto deset novih navika, izaberi jednu kojoj želiš da se vraćaš. Ako je preskočiš, nastavi sledećeg dana. Taj mali prostor pripada tebi; nema razloga da postane još jedna obaveza.'] },
      { title: 'Tvoj ritam je dovoljan.', paragraphs: ['Nekome prija tišina jutra, nekome predah tokom dana, a nekome mir predveče. Ne postoji jedinstven raspored koji svima odgovara.', 'U Alnera journalu ritual posmatramo kao trenutak pažnje, a ne kao obećanje promene preko noći. Počni od onoga što ti je blisko. Ostalo može da sačeka.'] },
    ],
  },
  {
    slug: 'prostor-za-predah', tags: ['predah', 'večernji ritual', 'calm'], product: 'calm', category: 'Mali rituali', title: 'Prostor za predah.', shortTitle: 'Malo tiši deo dana.', image: 'calm' as const, time: '2 min čitanja',
    intro: 'Šolja koja ti lepo leži u ruci, knjiga kojoj se vraćaš i nekoliko minuta bez žurbe. Predah ne traži veliku pripremu.',
    sections: [
      { title: 'Napravi mesto.', paragraphs: ['To može da bude ugao stola, fotelja pored prozora ili klupa na poznatoj putanji. Ne treba ti posebna soba niti savršeno uređen prostor. Dovoljno je mesto na kom možeš nakratko da zastaneš.', 'Predmet koji voliš može da bude mali podsetnik: šolja, knjiga ili beležnica. Ne kao nova kupovina koju moraš da obaviš, već kao nešto što već imaš i čemu želiš da posvetiš pažnju.'] },
      { title: 'Bez još jednog zadatka.', paragraphs: ['Ne moraš da meriš trajanje pauze, pratiš rezultat niti praviš fotografiju. Možeš samo da sedneš, pogledaš kroz prozor i ostaviš nekoliko minuta bez posebnog plana.', 'Ako je dan gust, predah može da bude kratak. Ako imaš više vremena, ostani malo duže. Poenta je u prostoru koji biraš za sebe, a ne u ispunjavanju još jednog pravila.'] },
      { title: 'Vrati se kada ti odgovara.', paragraphs: ['Poznat mali ritual može da postane prijatan deo dana upravo zato što je jednostavan. Ne zahteva novu verziju tebe niti drugačiju svakodnevicu.', 'Calm je plavo poglavlje Alnera kolekcije. Ovde je inspiracija za mirniju vizuelnu atmosferu; informacije o samoj formuli i njenom sastavu nalaze se na stranici proizvoda.'] },
    ],
  },
  {
    slug: 'paznja-je-u-detaljima', tags: ['ambalaža', 'kolekcija', 'glow', 'calm', 'balance'], category: 'Alnera svet', title: 'Pažnja je u detaljima.', shortTitle: 'Pre nego što otvoriš kutiju.', image: 'packaging' as const, time: '2 min čitanja',
    intro: 'Tri boje, jedan prepoznatljiv potpis. Pogled na vizuelni svet Alnere, od prve kutije do malog slova na etiketi.',
    sections: [
      { title: 'Boja kao orijentir.', paragraphs: ['Breskva pripada Glow formuli, puderasta plava prati Calm, a lavanda označava Balance. Zajedno čine mirnu paletu u kojoj svaki proizvod ima svoje mesto.', 'Isti odnos boja prelazi sa ambalaže na sajt. Kada odabereš proizvod, njegov svet se proširuje: boja, fotografija i tekst nastavljaju istu priču.'] },
      { title: 'Jedan potpis, tri poglavlja.', paragraphs: ['Veliki vertikalni alnera natpis povezuje različita pakovanja. Naziv formule ostaje jasan, dok manji tekst čuva prostor za informacije o proizvodu.', 'Kontrast tamnog stakla, crnog čepa i nežne etikete daje kolekciji prepoznatljiv karakter. Na fotografijama ga dopunjuju prirodno svetlo i krupni kadrovi detalja.'] },
      { title: 'Otvaranje kao početak.', paragraphs: ['Ideja sajta nastala je iz jednostavnog pokreta: otvaranja kutije. Poklopac se pomera, bočica se otkriva, a zatim se pred tobom pojavljuju tri formule.', 'Taj trenutak je vizuelna nit celog Alnera sveta. U njemu su sabrani boja, tipografija i pažljivo odmeren prostor — pre nego što pročitaš prvu rečenicu.'] },
    ],
  },

  {
    slug: 'kako-citati-deklaraciju-dodatka-ishrani',
    category: 'Sastav i deklaracije',
    title: 'Kako čitati deklaraciju dodatka ishrani?',
    shortTitle: 'Šta ti etiketa zapravo govori?',
    image: 'glow',
    time: '3 min čitanja',
    tags: ['etiketa', 'sastojci', 'kapsule', 'dnevna doza', 'suplementi', 'deklaracija'],
    updatedAt: '2026-11-24',
    intro: 'Od količine sastojaka do preporučene upotrebe: mali vodič kroz informacije koje vredi pogledati pre izbora dodatka ishrani.',
    sections: [
      {
        title: 'Kreni od sastava, ne od prednje strane.',
        paragraphs: [
          'Naziv proizvoda je početak. Zatim potraži spisak sastojaka, njihove količine i preporučenu upotrebu. U vodiču Nacionalnih instituta za zdravlje SAD (NIH) o dodacima ishrani naglašena je razlika između aktivnih i ostalih sastojaka navedenih na etiketi.',
          'Raspored i nazivi podataka mogu se razlikovati među tržištima i proizvodima. Ovaj tekst je praktičan vodič za čitanje; informacije za tvoje pakovanje proveri na njegovoj deklaraciji.',
        ],
        sourceIds: ['nih-ods'],
      },
      {
        title: 'Po kapsuli i po dnevnoj dozi nisu ista stvar.',
        paragraphs: [
          'Pre nego što uporediš dva broja, pogledaj na koju se količinu proizvoda odnose. Tabela može prikazivati sastav jedne kapsule ili preporučene dnevne doze.',
          'Zamisli izmišljen primer: u tabeli piše 100 mg po kapsuli, a preporučena dnevna doza na etiketi je dve kapsule. Dnevna doza u tom primeru sadrži ukupno 200 mg. To je samo računski primer, a ne preporuka za upotrebu nekog proizvoda.',
          'I broj kapsula u bočici posmatraj zajedno sa uputstvom. Pakovanje od 60 kapsula, pri preporučenoj upotrebi dve kapsule dnevno, traje 30 dana. Sam broj kapsula ne govori koliko dana traje upotreba.',
        ],
      },
      {
        title: 'Pročitaj i ostale sastojke i napomene.',
        paragraphs: [
          'Pored istaknutih sastojaka, etiketa može navoditi materijal kapsule i pomoćne sastojke. Proveri i upozorenja, uslove čuvanja i informacije o alergenima kada su navedene.',
          'Ako ti nešto nije jasno, fotografiši čitavu deklaraciju, ne samo naziv sa prednje strane. Tako ćeš moći da postaviš preciznije pitanje proizvođaču ili farmaceutu.',
        ],
        sourceIds: ['nih-ods'],
      },
      {
        title: 'Veća količina nije automatski bolji izbor.',
        paragraphs: [
          'Dodaci ishrani ne zamenjuju raznovrsnu ishranu. Veća količina nije sama po sebi dokaz veće koristi, a pojedini suplementi mogu uticati na delovanje lekova. Ako koristiš terapiju, izbor i kombinovanje preparata proveri sa lekarom ili farmaceutom.',
          'Deklaraciju zato čitaj kao skup informacija: šta proizvod sadrži, u kojoj količini i kako je predviđen za upotrebu. Nemoj izbor svesti na jedan najupadljiviji broj.',
        ],
        sourceIds: ['nih-ods'],
      },
      {
        title: 'Sačuvaj ovaj mali podsetnik.',
        paragraphs: ['Pri sledećem poređenju pakovanja, prođi kroz ista pitanja. Tako ćeš lakše primetiti i ono što nedostaje ili zahteva dodatno objašnjenje.'],
        bullets: [
          'Koji su sastojci i u kojim količinama?',
          'Da li se količina odnosi na jednu kapsulu ili dnevnu dozu?',
          'Koliko kapsula predviđa preporučena dnevna upotreba?',
          'Postoje li napomene koje se odnose na mene?',
          'Kome mogu da se obratim ako mi podatak nije jasan?',
        ],
      },
    ],
    note: 'Informativni tekst o čitanju deklaracije. Za procenu da li je dodatak ishrani prikladan za tebe obrati se lekaru ili farmaceutu.',
    sources: [{ id: 'nih-ods', title: 'NIH Office of Dietary Supplements — Dietary Supplements: What You Need to Know (PDF, engleski)', url: 'https://ods.od.nih.gov/pubs/DS_WhatYouNeedToKnow.pdf' }],
  },
  {
    slug: 'pitanja-za-farmaceuta-o-dodacima-ishrani',
    category: 'Sastav i deklaracije',
    title: 'Šta pitati farmaceuta pre izbora suplementa?',
    shortTitle: 'Dobra pitanja pre prvog izbora.',
    image: 'collection',
    time: '3 min čitanja',
    tags: ['suplementi', 'dodaci ishrani', 'farmaceut', 'lekovi', 'sastav'],
    updatedAt: '2026-11-24',
    intro: 'Pripremi deklaraciju, spisak preparata koje već koristiš i nekoliko konkretnih pitanja. Razgovor može da počne mnogo jednostavnije nego što misliš.',
    sections: [
      {
        title: 'Počni od onoga što već koristiš.',
        paragraphs: [
          'Pre razgovora zapiši lekove i dodatke ishrani koje uzimaš. Američki Nacionalni centar za komplementarno i integrativno zdravlje, NCCIH, navodi da suplementi mogu imati interakcije sa lekovima i da je važno razgovarati sa zdravstvenim stručnjakom o njihovoj upotrebi.',
          'Za svoj spisak napravi četiri kolone: naziv, količina navedena na pakovanju, način na koji ga koristiš i pitanje koje želiš da postaviš. Ako podatak ne znaš, ponesi pakovanje ili fotografiju.',
        ],
        sourceIds: ['nih-nccih'],
      },
      {
        title: 'Ponesi celu deklaraciju.',
        paragraphs: [
          'Fotografija prednje strane često nije dovoljna za konkretan razgovor. Sačuvaj i deo sa sastavom, količinama, načinom upotrebe i napomenama.',
          'Možeš reći: „Razmišljam o ovom proizvodu. Ovo su preparati koje već koristim. Da li postoji nešto u sastavu ili preporučenoj upotrebi što treba da proverim pre odluke?”',
        ],
      },
      {
        title: 'Pitaj o svom slučaju, ne samo o proizvodu.',
        paragraphs: [
          'NCCIH upozorava da bezbednost dodataka ishrani nije jednako ispitana u svim grupama, uključujući trudnice i dojilje. Navedi zdravstvene okolnosti i planirane intervencije koje su važne za razgovor sa lekarom ili farmaceutom.',
          'Ne moraš unapred da znaš stručne nazive. Važnije je da objasniš šta te zanima i šta već uzimaš. Ako odgovor nije jasan, zamoli za jednostavnije objašnjenje ili pisanu napomenu.',
        ],
        sourceIds: ['nih-nccih'],
      },
      {
        title: 'Zapiši pitanja pre nego što kreneš.',
        paragraphs: ['Ovu listu možeš sačuvati u beleškama na telefonu i prilagoditi svom razgovoru. Ne moraš postaviti sva pitanja; izaberi ona koja su ti zaista važna.'],
        bullets: [
          'Da li ovaj preparat ima smisla u mom slučaju?',
          'Da li se neki sastojci ponavljaju u preparatima koje već koristim?',
          'Da li postoji moguća interakcija sa mojom terapijom?',
          'Kako da razumem preporučenu upotrebu na ovoj deklaraciji?',
          'Šta treba da uradim ako primetim neželjenu reakciju?',
        ],
      },
      {
        title: 'Ostavi prostor za odluku.',
        paragraphs: [
          'Posle razgovora proveri da li si dobila odgovor na ono zbog čega si došla. Ako nedostaje podatak o proizvodu, zatraži ga od proizvođača pre odluke.',
          'U beleškama odvoji ono što piše na deklaraciji od saveta koji si dobila za svoj slučaj. Tako ćeš kasnije lakše pronaći informacije i postaviti dodatno pitanje ako bude potrebno.',
        ],
      },
    ],
    note: 'Vodič za pripremu razgovora, bez individualnih preporuka za izbor preparata ili doziranje.',
    sources: [{ id: 'nih-nccih', title: 'NIH NCCIH — Using Dietary Supplements Wisely (engleski)', url: 'https://www.nccih.nih.gov/health/using-dietary-supplements-wisely' }],
  },
];
