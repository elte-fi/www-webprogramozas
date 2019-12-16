## 2. ZH (PHP)

### Leírás

A feladatod egy írószerbolt bolti nyilvántartásához készíteni egy egyszerű programot. A feladatot a webprogramozás szerveren készítsd el, majd a EBR rendszerben, tömörítve add be. A megoldásokat úgy készítsd el, hogy hibás bemenet esetén se legyen semmilyen hibaüzenet.

#### 1. feladat (index.php)

Készíts egy oldalt, ami képes listázni az adatbázisban található termékeket! Az adatbázisban az alábbi séma szerint tárolják az adatokat:

![Séma](assets/images/webfejl2-otak/ab-sema-2018.png)

Az adatbázis-csatlakozáshoz szükséges adatok:
- DSN sztring: `"mysql:host=localhost;dbname=wf2_wp1c0x"`
- felhasználónév: `"wp1c0x"`
- jelszó: `"wp1c0x"`
- tábla neve: `"wf2zh-2018"`

Az adatokat táblázatos formában (értelmező fejlécekkel együtt) jelenítsd meg. Ha egy adott termék darabszáma 0, akkor jelenjen meg az adott oszlopban az "Elfogyott" szöveg.

#### 2. feladat (lekerdez.php)

Az `index.php` oldal alján jelenjen meg egy link, ami a `lekerdez.php` oldalra mutat. Ezen az oldalon jelenjen meg egy űrlap, rajta egy szöveges beviteli mező és egy küldés gomb. Az űrlap `GET` metódust használjon. Az elküldést követően egy listában jelenjen meg a összes olyan termék neve, mely tartalmazza a szövegmezőbe beírt szórészletet!

#### 3. feladat (atvalt.php)

A bolt nem csak forintban, hanem euróban is elfogad fizetést. Ehhez szüksége van egy gyors átváltó eszközre. Az `index.php` alján szerepeljen még egy link, ami az `atvalt.php` oldalra mutat. Ezen az oldalon két űrlap szerpeljen, mindkettő tartalmazzon egy szám beviteli mezőt, illetve egy küldés gombot. Az űrlap elküldésére az oldal írja ki az adott számértéket átváltva a másik pénznembe. Az oldalról derüljön ki, hogy melyik űrlap milyen irányba végzi az átváltást! Az átváltást 325 Ft/EUR árfolyamon számold!