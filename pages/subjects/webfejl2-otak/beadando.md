# Webfejlesztés 2. (OTAK) Beadandó feladat

## Leírás

Feladatod egy olyan környezet készítése, mely lehetővé teszi egyszerű teknőc utasítások futtatását. A felület egy egyszerű szövegmezőt tartalmaz, melybe a teknőc utasításokat lehet beírni mellette egy gomb, melyre kattintva az utasítás lefut. E mellett látható egy vászon, amin a futtatások eredménye látszik.

A teknőc kezdetben a rajztábla közepén található és jobbra néz. A teknőc az alábbi utasításokat ismeri:

- `e [hossz]` - az éppen aktuális irányba halad a teknőc 1 egységet
- `j [fok]` - a teknőc 1 fokot fordul jobbra
- `b [fok]` - a teknőc 1 fokot fordul balra
- `tsz [szin]` - a toll színe megváltozik

A beviteli mezőbe egymást követően akár több utasítás is írható. Ezeket `;` karakter kell, hogy elválassza. Ha több utasítás szerepel, akkor a "Futtatás" gombra kattintva ezek egymás után azonnal lefutnak. Ha bármelyik utasítás nem megfelelő (nem egy érvényes betű és egy szám szóközzel elválasztva), akkor azt valamilyen hibaüzenettel jelezze a program. 

A program az alábbi színeket tudja kezelni:

1. fekete
2. vörös
3. narancs
4. sárga
5. zöld
6. kék
7. lila
8. fehér

Legyen a felületen egy szám beviteli mező, melynek az értéke alapból 1, és pozitív egész számokat lehet bele írni. A futtatás gombra kattintva a beviteli mezőbe írt utasítás(sorozat) annyiszor fusson le egymás után, amennyi a szám mezőbe bevitt számérték.

Helyezz el a felületen továbbá egy "Újrakezdés" gombot, ami mindent alapállapotba állít.

### Példa

A program az alábbi bemenettel futtatva:

- Ismétlések száma: `4`
- Parancs: `tsz 1;e 30;b 90;tsz 2;e 60;b 90;tsz 3;e 90;b 90;tsz 4;e 120`

Az alábbi képet rajzolja:

![Teknőcgrafika rajz](assets/images/webfejl2/rajz.png)

### Segítség

- Nem szükséges, hogy maga a teknőc megjelenjen, elég az általa készített ábrát kirajzolni!
- A parancsok feldolgozásához használd a `string` típus `.split` metódusát!

## Minimális elvárások

- a felhasználó felület megjelenik
- egy egyszerű (`e`, `j`, `b`) utasítást (pl. `e 20`) képes futtatni, az eredményt megjeleníteni
- egymás után több utasítás is futtatható külön külön, ilyenkor az ábra rajzolása folytatódik

## További elvárások

- Egy parancsban akár több utasítás is megadható pontosvesszővel elválasztva (2 pont)
- Ha bármelyik parancs hibás, akkor azt a program hibaüzenettel jelzi (2 pont)
- A toll színe állítható a megfelelő színekre (1 pont)
- Ha a toll színe egy utasítás-sorozatban változik, akkor a változás a kimeneti ábrán is látható (2 pont)
- Egy adott utasítás(sor) többször is ismétlődik a szám beviteli mező értékének megfelelően (2 pont)
- A program alaphelyzetbe állítható a megfelelő gombbal (1 pont)
- Nincsenek fura hibajelenségek, bugok (1 pont)
- A forráskód jól szervezett, szépen tagolt, jól olvasható (1 pont)

## Értékelés

10-12 pont : 5  
7-9 pont : 4  
3-6 pont : 3  
minimum elvárások megvannak : 2