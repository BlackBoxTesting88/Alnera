# Alnera — Otvori svoj ritual

Next.js / React / TypeScript / GSAP prototip.

Pokretanje: `npm install`, zatim `npm run dev`. Pregled: http://127.0.0.1:3100/ . Provera: `npm run build`.

`npm run dev` zaustavlja prethodne razvojne procese ovog projekta, čuva razvojni keš i otvara sajt. Za čišćenje razvojnog keša i ponovno pokretanje koristi `npm run dev:clean`. Za pokretanje bez otvaranja pregledača dodaj `-- --no-open`.

## Urađeno

- Uvod sa otvaranjem kutije kroz skrol i interaktivna kolekcija.
- Zasebne adrese /proizvodi/glow, /proizvodi/calm, /proizvodi/balance.
- Fotorealistični PNG prikazi bočica sa providnom pozadinom, generisani ugrađenim imagegen alatom prema korisnikovoj referentnoj ambalaži. Brief: jedna studijska bočica, originalna etiketa i boja, tamno staklo, prirodni odsjaji, bez kutije i pozadine. Fajlovi: public/images/{glow,calm,balance}-bottle.png.
- Opisi, sastojci sa reference, proširive informacije, povezani proizvodi.
- Izbor količine 1–99, torba sa promenom i uklanjanjem stavki, pamćenje u localStorage.
- Jasno označen demo nastavak kupovine, bez slanja porudžbina, naplate ili prikupljanja podataka.
- Mobilni raspored, fokus u dijalozima, Escape zatvaranje, smanjeno kretanje.

## Sledeća faza

Brend treba da dostavi potvrđene cene, zvanične fotografije/deklaracije, doziranje, uslove dostave i povraćaja i odabir prodajnog sistema. Generisane etikete su vizuelni koncept, ne finalna deklaracija. Google Fonts koristi mrežu sa lokalnim rezervnim fontovima.

## Fotografije i Journal

Početna sadrži sekcije o ritualima, pakovanju i dva izdvojena članka. Sve tri stranice proizvoda imaju odgovarajući lifestyle kadar. Fotografije su odabrane iz korisnikovih kolaža 00-31-16-156 i 00-31-15-194; originali su sačuvani u public/images/alnera-lifestyle.jpg i alnera-packaging.jpg. EditorialPhoto prikazuje precizne kadrove pomoću SVG viewBox-a bez izmene originala.

Journal: /journal i tri adrese /journal/ritual-koji-staje-u-tvoj-dan, /journal/prostor-za-predah, /journal/paznja-je-u-detaljima. Početni autorski tekstovi su u app/journal/articles.ts; ne iznose medicinske savete. CMS nije povezan.

## Ispravan naziv brenda

Brend je ALNERA. Originalni folder Almera ostaje na istoj putanji radi kontinuiteta rada. Ispravljeni vizuali imaju prefiks alnera- u public/images. Originali su zadržani. Imagegen izmene: isključivo zamena naziva almera u alnera uz očuvanje kompozicije, boje, tipografije i providnosti. Ključ almera-cart ostaje radi očuvanja postojeće demo torbe.

## GLOW sadržaj — radna verzija, 21.11.2026.

- Marijanin dostavljeni tekst je u `app/glow-content.ts`; prikaz sekcija je u `app/glow-story.tsx` i pripadajućem CSS modulu. Stranica zadržava kupovinu pri vrhu, zatim uvod, tri naučne teme, OPC ekstrakt, jednu objedinjenu sekciju sa osam sastojaka na otvaranje i Everyday Glow. Odvojena Skin/Hair/Nails lista je objedinjena sa sastojcima da se ista objašnjenja ne ponavljaju; uvod je zadržan uz formulu, a pojedinačni opisi i naučne teme pokrivaju navedene uloge sastojaka.
- `app/product-catalog.ts` je zajednički izvor naziva, opisa, sastava, fotografija i broja kapsula. GLOW koristi 30 kapsula i novu formulu bez Q10 i astaksantina; postojeći podaci za Calm i Balance ostaju 60 kapsula do njihovog potvrđivanja. Početna, korpa i pregled kupovine koriste isti izvor.
- Vizuelni prikazi su privremeni. Na sadašnjoj GLOW bočici još je stara štampa sa 60 kapsula; uz prikaz je napomena o privremenoj ambalaži. Finalnu fotografiju/etiketu treba zameniti kada je dizajner dostavi.
- Interna napomena o radnom statusu teksta čuva se u izvoru i dokumentaciji, bez prikaza na stranici; količine, dnevna doza i uputstvo nisu izmišljeni. Pre prodaje tekst treba uskladiti sa finalnom deklaracijom i potvrdom stručnog saradnika. Cene, kupovina, pretplate, animacija kutije i ostali proizvodi ostaju u postojećem demo režimu.

- GLOW naučne kartice otkrivaju postojeće fotografije proizvoda prelaskom miša. Dodirom cele kartice fotografija se uključuje/isključuje; kontrola nema vidljiv natpis ili ikonicu, samo jedna ostaje izabrana. Tekst je uvek prisutan uz jači tamni sloj, veći font i blag senčeni tekst; cele kartice rade i tastaturom, a smanjeno kretanje isključuje prelaze. Fotografije su postojeći privremeni vizuali, bez novih zahteva za spoljne resurse.


## Pravne informacije i privatnost — radna verzija 21.11.2026.

- Jedna stranica `/pravne-informacije/` objedinjuje prodavca, uslove, dostavu i plaćanje, reklamacije/odustanak, privatnost i kolačiće; link je u podnožjima, a uz checkout su zasebno informisanje o privatnosti i obavezna potvrda uslova. Linkovi iz obrasca otvaraju novu karticu i čuvaju unos.
- Centralni podaci: `app/legal/config.ts`. Privremeni email za privatnost je `testmail@test.com`. Telefon ALNERE nije dostavljen; nije izmišljen niti je ubačen tuđi broj.
- Cookie izbor se čuva do 180 dana u zasebnom ključu `alnera-cookie-consent-v1`; ne menja i ne briše korpu. Nepoznate/oštećene/istekle verzije ne daju pristanak. Podešavanja su dostupna u odeljku Kolačići; dijalog podržava tastaturu i Escape.
- Meta Pixel nije instaliran niti aktivan; ID je prazan i `marketingEnabled` je false. Email nije Pixel ID. Ne prikupljamo saglasnost za nepostojeću integraciju. Pri uvođenju identifikovati primaoce, tokove i rokove, implementirati učitavanje/evente isključivo posle važećeg pristanka i gašenje pri opozivu, promeniti `consentVersion` i tekst politike. Sama promena ID-a ne uključuje praćenje.
- Radni tekstovi prate Zakon o zaštiti potrošača 35/2026 (čl. 27–38, 63), Zakon o zaštiti podataka o ličnosti 87/2018 i ZEK 35/2023, čl. 160. Obrazac u TXT sadrži rubrike Pravilnika 82/2026. Konačne tekstove i obrazac mora potvrditi pravnik i vlasnik pre aktiviranja prodaje. Ova stranica sama ne predstavlja potvrdu potpune usklađenosti poslovanja.
- Pre stvarne prodaje: zameniti privremene kontakte, potvrditi identitet i kontakt prodavca, konačnu dostavu/rokove/cene, deklaracije i alergene gde su primenljivi, pravila pretplate ako se uvede, stvarne obrađivače i prenose podataka (uključujući Google Fonts), rokove čuvanja, način trajnog dostavljanja ugovora i potvrde kupcu, aktivan prijem reklamacija i povraćaje. Checkout ostaje probni, bez slanja narudžbine ili naplate.
- Provera: `npm run test:legal`; postojeći testovi i proizvodna izrada ostaju dostupni. Izmena pripremljena lokalno, bez objave.

Izvori: https://pravno-informacioni-sistem.rs/eli/rep/sgrs/skupstina/zakon/2026/35/1/reg ; https://www.parlament.gov.rs/upload/archive/files/lat/pdf/zakoni/2018/2959-18-lat.pdf ; https://www.ratel.rs/storage/upload/2024/09/Novi%20Zakon%20o%20elektronskim%20komunikacijama.pdf ; https://www.neobilten.com/pravilnik-o-obliku-i-sadrzini-obrasca-za-odustanak-od-ugovora-na-daljinu-ili-ugovora-koji-se-zakljucuje-izvan-poslovnih-prostorija/?lang=lat


## CALM sadržaj — 21.11.2026.

- Dostavljeni tekst je u `app/calm-content.ts`; nova stranica u `app/calm-story.tsx` i scoped CSS modulu. Hero, Zašto CALM, tri osnove koncepta, šest sastojaka na otvaranje, tabela dnevne doze, večernji ritual, pet FAQ pitanja i završni poziv na kupovinu prate poslati materijal.
- `app/product-catalog.ts` sada koristi novu CALM formulu na početnoj i stranici proizvoda: magnezijum-bisglicinat, L-teanin, matičnjak, pasiflora, lavanda i vitamin B6. Pakovanje ostaje 60 kapsula; dostavljeni plan je 2 kapsule uveče i 30 dana po pakovanju. Cene, numerički indeksi korpe i izbori pretplate ostaju postojeći.
- Količine u tabeli odnose se na 2 kapsule. 400 mg je magnezijum-bisglicinat, a 80 mg elementarni magnezijum sadržan u njemu, vizuelno izdvojen kao podred. Četiri sastojka imaju po 50 mg, a vitamin B6 3 mg. Nisu računati procenti NRV niti dopisane nove zdravstvene tvrdnje.
- Kartice koriste postojeće privremene CALM vizuale, sa otkrivanjem fotografije mišem, dodirom ili tastaturom. Tekst je čitljiv uz tamni sloj; nema dodatnih vidljivih dugmadi na karticama. Interni status teksta nije prikazan kao marketinška sekcija.
- Količine i režim upotrebe su prepisani iz poslatog materijala, bez samostalne medicinske ili regulatorne potvrde. Pre prodaje vlasnik treba da potvrdi podatke i uskladi ih sa konačnom deklaracijom i ambalažom.
