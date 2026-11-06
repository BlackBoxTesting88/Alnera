# Alnera — Otvori svoj ritual

Next.js / React / TypeScript / GSAP prototip.

Pokretanje: `npm install`, zatim `npm run dev`. Pregled: http://127.0.0.1:3000 . Provera: `npm run build`.

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
