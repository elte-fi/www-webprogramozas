# Modern technológiák 2.

## Általános információk

Óraszám
: 1 előadás + 2 gyakorlat

Előfeltétel
: Modern technológiák 1. (IK-INKF1MT1EG)

Célkitűzés
: A dinamikus kliens- és szerveroldali webprogramozás alapjainak a megismertetése. A félév első felében a JavaScript nyelvvel és a hozzá kapcsolódó alapfokú webes technológiákkal, azok multiplatform környezetben való használatával ismerkednek meg a hallgatók, a félév második felében a PHP nyelven keresztül ismerkednek meg a szerveroldali webprogramozás alapjaival.

Környezet
: A szerveroldali dinamikus weblapok készítését a webprogramozas.inf.elte.hu szerver segítségével végezzük el. A szerveren Nginx webszerver, 7-es verziójú PHP fut. A szerverre a félév elején, a gyakorlati jelentkezések lejártakor minden hallgató kap hozzáférést. A webprogramozás szerverre kell a beadandó feladatokat feltölteni, ezen folyik a félév második felében a gyakorlati munka.

## Számonkérés

Összevont (folyamatos) értékelésű tárgy.

### Az értékelés összetevői

- Beadandó feladat: JavaScript
  Határidő: 2019. április 28. 23:59
- Beadandó feladat: PHP
  Határidő: 2019. ...

### JavaScript beadandó (Blackjack)

Feladatod a Blackjack kártyajáték (másik nevén 21) megvalósítása JavaScript segítségével. A játék lényege hogy van egy osztó (számítógép) és egy játékos, akinek a célja, hogy a felcsapott kártyákból több pontja legyen, mint az osztónak, de legfeljebb 21. A játékot **négy** pakli francia kártyával játszák.

A játék az alábbi módon zajlik:

- A játékos 100 "zsetonnal" kezdik a játékot
- Minden kör elején 1-50 zseton tétet tesz fel a következő körre
- A kör menete:
  - A játékos megteszi a tétet.
  - Az osztó oszt egy lapot a játékosnak és magának képpel felfelé.
  - Az osztó egyből oszt a játékosnak még egy lapot képpel felfelé, illetve magának egyet képpel lefelé.
  - Ha a játékosnak így 21 pontja van, és az osztónak nem, akkor a játékos automatikusan nyer.
  - Ha az osztónak így 21 pontja van, és a játékosnak nem, akkor az osztó automatikusan nyer.
  - Ha az osztónak és a játékosnak is 21 pontja van, akkor döntetlen
  - Ha a játékosnak kevesebb, mint 21 pontja van, akkor:
    - Újabb lapot kér (akár többször is)
      - Ha az új lappal több, mint 21 pontja van, akkor automatikusan veszít.
      - Ha az új lappal pontosan 21 pontja van, akkor automatikusan nyer.
      - Különben a játék folytatódik.
    - Vagy megáll.
      - A játékos nem kap új lapokat, a meglévő lapjaival játszik tovább.
  - A játékos után az osztó következik:
    - Felfordítja a lefordított kártyáját
      - Ha 17 vagy több pontja van, akkor megáll, nem kap több lapot.
      - Ha 16 vagy kevesebb pontja van, akkor lapot kell kérnie.
        - Ha az új lappal 21-nél több pontja van, akkor a játékos nyert.
        - Ha az új lappal 17-21 pontja van, akkor megáll.
        - Ha az új lappal 16 vagy kevesebb pontja van, akkor újra lapot kér.
  - Ezt követően ha
    - Az osztónak van több pontja, akkor az osztó nyer.
    - Ha a játékosnak van több pontja, akkor a játékos nyer.
    - Ha azonos a pontszám, akkor döntetlen.
  - Zsetonok:
    - Ha a játékos nyer, akkor kap annyi zsetont, amennyit feltett a körre.
    - Ha az osztó nyer, akkor a játékos minden zsetont elveszít, amit feltett a körre.
    - Döntetlen esetén a játékos visszakapja a zsetonjait.

A játék addig tart, amíg a játékosnak el nem fogy minden zsetonja, vagy el nem éri az 1000 zsetont.

További szabályok:

- Minden lap annyi pontot ér, amennyi a rajta szereplő szám, a figurás lapok 10 pontot érnek.
- Az ász lap 11 pontot ér mindaddig, amíg ezzel túl nem lépné a játékos/osztó a 21 pontot, ha túllépné, akkor a kártya 1 pontot ér csak.
- Minden kör elején a 4 pakli kártya újra megkeverésre kerül

A programnak nem kell foglalkoznia az alábbi Blackjack szabályokkal:

- "Splitting pairs"
- "Doubling down"
- "Insurance"

### Értékelési szempontok

#### Minimum elvárások:

- A játéktér megjelenik, látszanak a játékos kártyái, az osztó kártyái és a pakli
- A játék elején a játékos kap két lapot, ezek megjelennek
- A játékosnak van lehetősége újabb lapot kérni vagy megállni
- A játék elején az osztó kap két lapot
- Miután a játékos befejezte a körét, az osztó a szabályoknak megfelelően újabb lapokat kap
- A játék helyesen dönti el, hogy ki nyerte a kört

#### További elvárások

- A játék több körből áll, miután egy kör lement új kör kezdődik (1 pont)
- A játékosnak vannak zsetonjai, ezek száma megjelenik a játék során (1 pont)
- A játékos minden kör elején tétet tehet, amit attól függően, hogy nyert, vesztett vagy döntetlen az eredmény megdupláz, elveszít vagy visszakap (2 pont)
- A játékos 100 zsetonnal kezd és a játék véget ér, ha a játékosnak elfogytak a zsetonjai vagy elérte az 1000 zsetont (2 pont)
- A kártyák megfelelően képpel lefelé vagy képpel felfelé jelennek meg (1 pont)
- A játék megfelelően kezeli a négy pakli kártyáit, mintha valós paklik lennének. Minden kör elején a négy pakli megkeveredik és abból osztunk a játék során (2 pont)
- A játék minden szabályt megfelelően kezel (2 pont)
- A játék során nincsenek fura jelenségek, bug-ok (1 pont)

#### Érdemjegy

- csak a kötelezők vannak meg: **2**
- 1-4 pont: **3**
- 5-8 pont: **4**
- 9-12 pont: **5**

### A beadandók értékelése

- A beadandók értékelése jeggyel történik: 1-5 jegy kapható rá.
- Az értékelés egy mindenki számára elérhető szempontok alapján történik.
- A beadandókat határidőre kell elkészíteni.
- A beadandókat a webprogramozás szerverre kell feltölteni a [feltöltő felületen](http://webprogramozas.inf.elte.hu/ebr) keresztül.
- A beadandók plágiumellenőrzésen mennek keresztül az esetleges másolásokat kiszűrendő.
- A beadandók készítőit szükség esetén megkérhetjük megoldásaik megvédésére.

### Jegyszerzés feltételei

- Részvétel a gyakorlatok legalább 75%-án (maximum 3 hiányzás)
- Két elfogadott beadandó

### Értékelés

- A két beadandó feladat jegyének átlaga

## Előadások

1. 2019.02.13. [Bevezetés, követelmények, JavaScript nyelvi alapok](http://webprogramozas.inf.elte.hu/moderntech2/ea/01/)
2. 2019.02.20. [A HTML programozás alapjai](http://webprogramozas.inf.elte.hu/moderntech2/ea/02/)
3. 2019.02.27. [Események, nyelvi elemek, beépített objektumok](http://webprogramozas.inf.elte.hu/moderntech2/ea/03/)
4. 2019.03.06. [DOM, BOM, kódszervezés](http://webprogramozas.inf.elte.hu/moderntech2/ea/04/)
5. 2019.03.13. [Stílusok, animációk kezelése](http://webprogramozas.inf.elte.hu/moderntech2/ea/05/)
6. 2019.03.20. [HTML5 JavaScript API-K, 2D Rasztergrafika](http://webprogramozas.inf.elte.hu/moderntech2/ea/06/)
7. 2019.03.27. [PHP nyelvi alapok](http://webprogramozas.inf.elte.hu/moderntech2/ea/07/)
8. 2019.04.03. [Bemenet, űrlapok, adattárolás](http://webprogramozas.inf.elte.hu/moderntech2/ea/08/)
9. 2019.04.10. [Munkamenet-kezelés, hitelesítés](http://webprogramozas.inf.elte.hu/moderntech2/ea/10/)
10. 2019.04.17. elmarad (tavaszi szünet)
11. 2019.04.24. [AJAX](http://webprogramozas.inf.elte.hu/moderntech2/ea/11/)
12. 2019.05.01. elmarad (munka ünnepe)
13. 2019.05.06. gyakorlat
14. 2019.05.13. gyakorlat

<!--
### Beadandó feladat: JavaScript

A feladatod, hogy elkészítsd a "Tic-Tac-Toe" játékot. A játék egy 3x3-as mátrixban játszódik két féle üzemmódban.
Az egyik lehetőség, amikor két játékos játszik. Ilyenkor felváltva rakhatnak a pálya egy üres mezőjébe a saját szimbólumukból (kék "X" és piros "O").
Az a játékos nyer, akinek sikerül három egybefüggő (vízszintesen, függőlegesen vagy átlósan) saját szimbólumot összehozni.
Ha megtelik a pálya és senki nem nyert, akkor a játék döntetlen.

Minimális elvárások:

* A játéktábla megjelenik, a játékos el tudja helyezni a saját szimbólumát
* A játékosok felváltva követik egymás után és tudnak lépni
* A lehelyezett szimbólumok megjelennek a játéktáblában, ahol már van szimbólum, oda nem lehet újabbat rakni
* A játék újraindítható kétjátékos módban

További elvárások:

* A játékosok meg tudják nyerni a játékot, ezt a program kielzi; ha vége a játéknak, azután újra lehet indítani (2 pont)
* A játék kijelzi, ha döntetlennel ért véget a játék (1 pont)
* Mindig látszik valamilyen formában, hogy éppen melyik játékos következik (2 pont)
* A játék véletlenszerűen dönti el, hogy melyik játékos kezd (1 pont)
* A játék játszható a számítógép ellen is (2 pont)
  - A számítógép véletlenszerűen lépésekkel tud játszani (2 pont)
  - A számítógép valamilyen "mesterséges intelligencia" alapján tud játszani (az, hogy mennyire komplex a mesterséges intelligencia, az rád van bízva) (3 pont)
* Nincsenek bugok, fura jelenségek (1 pont)

#### Értékelés

10-14 pont: 5
5-9 pont: 4
1-4 pont: 3
minimum elvárások megvannak: 2

### Beadandó feladat: PHP

Készíts egy alkalmazást, amelyben nyilván tarthatod az elolvasott és elolvasandó könyveidet! Az adatok tárolása tetszőleges formában (adatbázis, fájl) történhet.

Az alkalmazásnak a következő funkciókat kell tudnia:

1. **Főoldal** A főoldal megjelenít egy üdvözlő szöveget, és kiírja, hogy jelenleg hány felhasználónak összesen hány könyve van az alkalmazásban.

2. **Hitelesítés** Minden további funkció csak hitelesítés után érhető el. A főoldalon legyen lehetőség bejelentkezni: ehhez email címet és jelszót kérjünk be. Ugyancsak a főoldalon legyen egy link, amin keresztül a regisztrációs oldalra mehetünk. Itt meg kell adni a teljes nevet (kötelező), az email címet (kötelező, email formátum) és a jelszót (kötelező, legalább 6 karakter hosszú). Sikeres regisztráció után újra a főoldalra kerülünk, ahol bejelentkezhetünk. Bejelentkezés után legyen lehetőség kijelentkezni!

3. **Listázó oldal** Sikeres bejelentkezés után a listázó oldalra kerülünk, ahol táblázatos formában megjelennek a bejelentkezett felhasználóhoz tartozó könyvek: szerző, cím, kategória, elolvasva-e.

4. **Új könyv** A listázó oldalról egy link vigyen át egy olyan oldalra, ahol új könyv adatait lehet felvenni. Egy könyvről a következőket kell megadni:

    - szerző (kötelező)
    - cím (kötelező)
    - oldalszám (csak egész szám)
    - kategória (legördülő)
    - ISBN szám (10 vagy 13 hosszú számsor)
    - elolvasva-e (jelölőmező).

    Hibás kitöltés esetén a hibákat jelezni kell! Siker esetén irányítsuk át az oldalt a listázó oldalra!


5. **Könyv törlése** A listázó oldalon minden könyv mellett jelenjen meg egy "Törlés" link is. Erre kattintva az adott könyvet töröljük az adatbázisból, és újra jelenjen meg a listázó oldal.

6. **AJAX keresés** A képernyő újratöltése nélkül legyen lehetőség a listában szereplő könyvek *címei* között keresni. A lista automatikusan legyen szűrve, ahogyan gépelünk a keresőmezőbe.

#### Pontozás

- Főoldal: megjelenik (kötelező)
- Főoldal: számláló (1 pont)
- Hitelesítés: Regisztráció (1 pont)
- Hitelesítés: Bejelentkezés (kötelező)
- Hitelesítés: Kijelentkezés (kötelező)
- Listázó oldal: könyvlista (kötelező)
- Új könyv oldal: hibaellenőrzés (1 pont)
- Új könyv oldal: sikeres mentés (kötelező)
- Könyv törlése: sikeres törlés (1 pont)
- AJAX keresés (2 pont)
- 1 hét késés (-2 pont)
- 1 hétnél több késés (nincs elfogadva a beadandó, nincs jegy)

#### Értékelés

5-6 pont: 5
3-4 pont: 4
1-2 pont: 3
minimum elvárások megvannak: 2

-->

## Gyakorlófeladatok

- [1. gyakorlat](#!/subjects/webfejl2-pti/gyak/01)
- [2. gyakorlat](#!/subjects/webfejl2-pti/gyak/02)
- [3. gyakorlat](#!/subjects/webfejl2-pti/gyak/03)
- [4. gyakorlat](#!/subjects/webfejl2-pti/gyak/04)
- [5. gyakorlat](#!/subjects/webfejl2-pti/gyak/05)
- [6. gyakorlat](#!/subjects/webfejl2-pti/gyak/06)
- [7. gyakorlat](#!/subjects/webfejl2-pti/gyak/07)
- [8. gyakorlat](#!/subjects/webfejl2-pti/gyak/08)
- [9. gyakorlat](#!/subjects/webfejl2-pti/gyak/09)
- [10. gyakorlat](#!/subjects/webfejl2-pti/gyak/10)
- [11. gyakorlat](#!/subjects/webfejl2-pti/gyak/11)
- [12. gyakorlat](#!/subjects/webfejl2-pti/gyak/12)

## Letöltések

- [Aknakereső](http://webprogramozas.inf.elte.hu/moderntech2/gyak/aknakereso.zip)

## Segédanyagok

## Elektronikus tananyag

- [A böngésző mint alkalmazásfejlesztési platform](http://webprogramozas.inf.elte.hu/tananyag/kliens)
- [Dinamikus weboldalak előállítása szerveroldali technológiákkal](http://webprogramozas.inf.elte.hu/tananyag/szerver)
- [Bevezetés a kliens- és szerveroldali webalkalmazások készítésébe (elektronikus tananyag)](http://webprogramozas.inf.elte.hu/tananyag/wf2/index.html)
- [Webadatbázis-programozás](http://ade.web.elte.hu/wabp)

## Oktatók

### Előadó

Horváth Győző

### Gyakorlatvezető

[Visnovitz Márton](https://github.com/vimtaai/elte/tree/master/2018-19-2)
