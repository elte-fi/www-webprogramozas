# Webes programozási környezet fejlesztése

## Leírás

Különböző oktatási és módszertani igényeket kiszolgáló webes programozási környezet fejlesztése. A felület egy egyoldalas alkalmazás, amely REST API-n keresztül kapcsolódik a szerveroldali logikához, ahol a programkódok virtuális konténerekben futnak le. Jelenleg TypeScript és C++ nyelveket támogatja a környezet. Feladat: felhasználó- és csoportkezelés hozzáadása, feladatok felhasználókhoz rendelése, további nyelvek támogatása.

::: center aligned
![Képernyőkép a környezetről](assets/images/progenv.png)
:::

## Feladatok

- Feladatok kezelése: keresés, betöltés, megoldás
- Csoportok és események kezelése
- Feladatok online feltöltése
- Tutorial-szerű feladatok létrehozása
- Tesztelés
- Kollaboratív munka
- Backend architektúra: polling lecserélése üzenetküldésre (PostgreSQL, Redis pubsub vagy GRPC)
- A felület újragondolása UX szempontból
- Kód refaktorálása

## Felhasznált technológiák

* React
* React-router
* MobX
* Docker
* Express
* Monaco
* Bootstrap, Bootswatch