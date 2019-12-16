## 2. ZH (PHP)

### Leírás

Feladatod egy mini "órarendkezelő" alkalmazás egyes funkcióinak megvalósítása.
A feladatot a webprogramozás szerveren készítsd el, majd a EBR rendszerben, tömörítve add be. A megoldásokat úgy készítsd el, hogy hibás vagy hiányzó bemenet esetén se legyen semmilyen hibaüzenet.

Az adatbázisban az alábbi séma szerint tárolják az adatokat:  
![Séma](assets/images/webfejl2-otak/ab-sema.png)

*Megjegyzés*: Minden kurzusról feltételezzük, hogy 2 óra hosszú, illetve, hogy egy időpontban egyszerre csak egy kurzus van. (Tudom, hogy irreális, de ez azt jelenti, hogy nincs ütközés! 😯)

#### 0. feladat (index.php)

Készíts egy navigációs főoldalt, amin linkek találhatóak az egyes részfeladatok aloldalaira:

1. feladat: Tárgy adatlap: `adatlap.php`
2. feladat: Órarend: `orarend.php`
3. feladat: Kreditindex-számítás: `kreditindex.php`

#### 1. feladat (adatlap.php)

Készíts egy oldalt, amin ki lehet választani egy tantárgyat és részletesen le lehet kérni annak az adatait!

Az adatbázis-csatlakozáshoz szükséges adatok:
- szerver: `"localhost`
- felhasználónév: `"wp1c0x"`
- jelszó: `"wp1c0x"`
- adatbázis: `"wf2_wp1c0x"`
- tábla neve: `"wf2zh"`

a) Az oldalon legyen egy legördülő lista, melyben egy elemet ki tárgyat lehet kiválasztani. A legördülő listában a tárgyak "Név (kód)" formátumban jelenjenek meg. Az egyes kiválasztható tárgyakhoz a hozzárendelt `value` attribútum mindenhol legyen az adott tárgy `id`-je!

b) A lista melletti "Kiválaszt" gombra kattintva az oldal kérdezze le és írja ki a legördülő lista alá a tárgy összes adatát a minta szerinti formátumban!

##### Minta
![1. feladat](assets/images/webfejl2-otak/f1.png)

##### Segítség
<details>
  <summary>Segítség 1</summary>

  A legördülő lista generálásához használd a `select`, azon belül az `option` HTML tag-eket. Az `option` tag `value` attribútumának beállításával kézzel adhatod meg, hogy milyen adat kerüljön elküldésre a szervernek.
</details>

<details>
  <summary>Segítség 2</summary>
  <p>
  
  Szerveroldalon a beérkezett adatot felhasználva készíts lekérdezést ami egy darab elemet kérdez le az adatbázisból. A lekérdezett elemet kiolvasva jelenítsd meg annak az adatait.
  </p>
</details>

<details>
  <summary>Segítség 3</summary>
  <p>
  
  A kiíratás megkönnyítéséhez tárold el a napok nevét egy erre alkalmas adatszerkezetben.
  </p>
</details>

#### 2. feladat (orarend.php)

Készíts egy oldalt, ahol táblázatos, a mintának megfelelő formátumban látszik az adatbázisban tárolt órarend! A megjelenített időpontok 8 órától 16 óráig tartanak 2 órás bontásban. Az órarendben az előadások sárga, a gyakorlatok kék, az "X-es" tárgyak zöld háttérszínnel jelenjenek meg!

A táblázat formázásához illeszd be az alábbi kódot az oldalra:

```html
<style>
  th, td {
    border: solid 1px black;
    height: 50px;
    width: 180px;
  }
  .ea {
    background: yellow;
  }
  .gy {
    background: blue;
  }
  .x {
    background: lime;
  }
</style>
```
##### Minta
![2. feladat](assets/images/webfejl2-otak/f2.png)

##### Segítség
<details>
  <summary>Segítség 4</summary>

  Már a lekérdezésnél érdemes olyan formában tárolni az adatokat, hogy azzal könnyű legyen a megjelenítésnél dolgozni.
</details>

<details>
  <summary>Segítség 5</summary>

  Az órarend megjelenítéséhez használj egyszerű számlálós ciklusokat! A HTML táblázatok felépítéséének megfelelően 2 óránként, majd azon túl napoként jelenítsd meg az adatokat! A lekérdezéskor olyan formátumban tárold az adatokat, hogy erre a sémára illeszkedjen!
</details>

<details>
  <summary>Segítség 6</summary>

  Feltételes kifejezéssel ellenőrizd, hogy az egyes időpontokban van-e kurzus.
</details>

<details>
  <summary>Segítség 7</summary>

  A háttérszínekhez használd a mellékelt CSS kódban található CSS osztályokat! Ezek az osztályok megegyeznek az adatbázisban található "típus" mezőben tárolt lehetséges értékekkel.
</details>

#### 3. feladat (kreditindex.php)

Ezen az oldalon legyen lehetőség kiszámítani, hogy egy adott elért kreditindex esetén mekkora ösztöndíjra számíthat egy hallgató. Az oldalon szerepeljen egy szám beviteli mező és egy küldés gomb. Az adatok elküldése esetén jelenjen meg Ft-ban, hogy mekkora ösztöndíj jár a hallgatónak, illetve a "Nem jár tanulmányi ösztöndíj" szöveg, ha nem éri el a minimális kreditindex-értéket.

A kreditindex alapján az ösztöndíjat alábbi módon számítjuk:

- Ha a kreditindex nem éri el a 3,65 értéket, akkor nem jár ösztöndíj
- Ha eléri, akkor az ösztöndíjat az alábbi képlet alapján számítjuk: `ÖD = 4325 * KI - 50`, ahol `ÖD` az ösztöndíj értéke, `KI` pedig a megadott kreditindex

##### Minta
![2. feladat](assets/images/webfejl2-otak/f3.png)

##### Segítség
<details>
  <summary>Segítség 8</summary>

  A bementhez használd az `<input type="number">` HTML elemet. Ahhoz, hogy tört értékek is megadhatóak legyenek állítsd be a `step` attribútumot.
</details>