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

* Beadandó feladat: JavaScript
    Határidő: 2019. április
* Beadandó feladat: PHP
    Határidő: 2019. május

### A beadandók értékelése

* A beadandók értékelése jeggyel történik: 1-5 jegy kapható rá.
* Az értékelés egy mindenki számára elérhető szempontok alapján történik.
* A beadandókat határidőre kell elkészíteni.
* A beadandókat a webprogramozás szerverre kell feltölteni a [feltöltő felületen](http://webprogramozas.inf.elte.hu/ebr) keresztül.
* A beadandók plágiumellenőrzésen mennek keresztül az esetleges másolásokat kiszűrendő.
* A beadandók készítőit szükség esetén megkérhetjük megoldásaik megvédésére.

### Jegyszerzés feltételei

* Részvétel a gyakorlatok legalább 75%-án (maximum 3 hiányzás)
* Két elfogadott beadandó

### Értékelés

* A két beadandó feladat jegyének átlaga


## Előadások

1. 2019.02.13. [Bevezetés, követelmények, JavaScript nyelvi alapok](http://webprogramozas.inf.elte.hu/moderntech2/ea/01/)
2. 2019.02.20. [A HTML programozás alapjai](http://webprogramozas.inf.elte.hu/moderntech2/ea/02/)
3. 2019.02.27. [Események, nyelvi elemek, beépített objektumok](http://webprogramozas.inf.elte.hu/moderntech2/ea/03/)
4. 2019.03.06. [DOM, BOM, kódszervezés](http://webprogramozas.inf.elte.hu/moderntech2/ea/04/)
5. 2019.03.13. [Stílusok, animációk kezelése](http://webprogramozas.inf.elte.hu/moderntech2/ea/05/)
6. 2019.03.20. [HTML5 JavaScript API-K, 2D Rasztergrafika](http://webprogramozas.inf.elte.hu/moderntech2/ea/06/)
7. 2019.03.27. [PHP nyelvi alapok](http://webprogramozas.inf.elte.hu/moderntech2/ea/07/)
8. 2019.04.03. [Bemenet, űrlapok](http://webprogramozas.inf.elte.hu/moderntech2/ea/08/)
9. 2019.04.10. [Adattárolás](http://webprogramozas.inf.elte.hu/moderntech2/ea/09/)
10. 2019.04.17. elmarad (tavaszi szünet)
11. 2019.04.24. [Munkamenet-kezelés, hitelesítés](http://webprogramozas.inf.elte.hu/moderntech2/ea/10/)
12. 2019.05.01. elmarad (munka ünnepe)
13. 2019.05.06. [AJAX](http://webprogramozas.inf.elte.hu/moderntech2/ea/11/)
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

<!-- Ezeken az egyszerű feladatokon lehet otthon gyakorolni az órákon érintett témaköröket. -->

## Segédanyagok

## Elektronikus tananyag

* [Bevezetés a kliens- és szerveroldali webalkalmazások készítésébe (elektronikus tananyag)](http://webprogramozas.inf.elte.hu/tananyag/wf2/index.html)
* [A böngésző mint alkalmazásfejlesztési platform](http://webprogramozas.inf.elte.hu/tananyag/kliens)
* [Dinamikus weboldalak előállítása szerveroldali technológiákkal](http://webprogramozas.inf.elte.hu/tananyag/szerver)
* [Webadatbázis-programozás](http://ade.web.elte.hu/wabp)

## Oktatók

### Előadó

Horváth Győző

### Gyakorlatvezető

[Visnovitz Márton](https://github.com/vimtaai/elte/tree/master/2018-19-2)
