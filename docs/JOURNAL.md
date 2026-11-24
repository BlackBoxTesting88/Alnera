# ALNERA Journal

Blog je na `/journal`. Postojeće tri adrese tekstova ostaju važeće. Glavna i mobilna navigacija vode na blog običnim linkom, a početna strana prikazuje dva postojeća teksta.

## Dodavanje sadržaja

Članci se uređuju u `app/journal/articles.ts`. Svaki tekst ima svoj trajni `slug`, naslov, uvod, temu, fotografiju i sekcije. Opciono se dodaju ključni pojmovi za lokalnu pretragu, izvori, stvarni datum ažuriranja i povezani proizvod. Nema CMS-a ili skrivenih automatskih objava.

Novi članak automatski dobija stranicu, mesto u pretrazi i temama, povezane tekstove, metadata podatke i zapis u sitemap.xml. Sadržaj i linkovi dostupni su u početnom HTML-u, i bez JavaScripta. Pretraga zanemaruje velika slova i dijakritike.

Datum objave i ime stručnog recenzenta nisu izmišljeni. Novi informativni tekstovi imaju označene izvore; prikaz datuma ažuriranja odnosi se na stvarni datum pripreme ovog sadržaja. Pre objave novih tekstova o zdravlju proveriti sve tvrdnje, izvore i njihovu primenljivost na konkretan proizvod. Fotografije ambalaže su postojeći ilustrativni materijal sajta.

## Javna adresa i SEO

`NEXT_PUBLIC_SITE_URL` je puna javna adresa, sa putanjom ako postoji (npr. `https://blackboxtesting88.github.io/Alnera/`). To je i podrazumevana postojeća demo adresa. Za budući domen promeniti ovu vrednost pri izgradnji. `NEXT_PUBLIC_BASE_PATH` i dalje zasebno određuje Next.js putanje i putanje do resursa.

Blog koristi canonical i Open Graph metadata, CollectionPage/ItemList i BlogPosting/BreadcrumbList JSON-LD. Mapa sajta je `/sitemap.xml` (odnosno `/Alnera/sitemap.xml` u postojećem demo izvozu). Nema lažnih ocena, autora ili obećanja rezultata pretrage. Datum objave i prava imena autora treba dodati kada budu poznati. Prelazak na pravi domen uključuje i prijavu odgovarajućeg sitemap-a u Search Console nalogu vlasnika.

## Sledeće teme za razradu

- Razlika između količine po kapsuli i dnevnoj dozi, sa primerima sa konačnih deklaracija.
- Vodič kroz sastav GLOW: uz finalnu formulaciju i odobrene tvrdnje.
- Magnezijum u CALM formulaciji: tačan oblik, količine i uloga, nakon provere deklaracije.
- Mio-inozitol i BALANCE: šta je sastojak, a šta tvrdnja o konkretnom proizvodu.
- Pitanja o upotrebi, čuvanju i trajanju pakovanja: samo prema finalnim podacima proizvoda.
- Kako proveriti izvor tvrdnje o suplementima i razlikovati istraživanje od reklame.

Ovo su uredničke ideje, ne automatski objavljeni ili stručno odobreni tekstovi. Svaka nova tema treba da odgovara zasebnom pitanju, umesto da ponavlja isti tekst drugim ključnim rečima.
