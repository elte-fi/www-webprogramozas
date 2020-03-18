# Diákok, szűrés, jegyek

Adott diákok adatai: azonosító, név, jegy minden diáknál. Készítsünk olyan alkalmazást, amelyben egy szűrőmezőben gépelve csak azok a diákok jelennek meg, akiknek neve tartalmazza a szűrőmezőbe írt értéket. A megjelent diákoknak szeretnénk átírni a jegyét is.

Gondoljuk át a feladatot:
1. Felület tervezése
2. Adatok és feldolgozó függvények
3. Eseménykezelők

## Felület tervezése

A felület adott a sablonban. Egy `input` mezőből áll és egy olyan `div`-ből, amelyben majd a diákok adatait kell feltüntetni.

## Állapottér

Az adat is adott, hallgatók listája. Ennél több nem kell.

A feldolgozó függvényeket illetően:
- vissza kell tudni adni egy szűrőértéknek megfelelő diákok tömbjét (milyen tétel?). Segítség: `'alma'.includes('lm') === true`
- egy adott azonosítójú diáknak meg kell tudni változtatni a jegyét

## Felület kezelése, kiírás

A szűrés során folyamatosan változik a `div` tartalma, ezért a felület ezen részénél deklaratív megközelítést kell használni, azaz mindig újragenerálni a diákok listáját.

## Eseménykezelés

Kétféle esemény lesz:
- a szűrőmezőbe gépelés: szűrőmezőből egy van
- valamelyik diáknál megjelenő beviteli mezőbe gépelés: diákból sok lehet --> delegálás

## Lépések

1. Készítsd el azt a függvényt, ami kiválogatja azokat a hallgatókat, akiknek a neve tartalmazza a szűrőfeltételt.
2. A szűrőmezőben gépelve szűrd le a hallgatókat és írd ki a konzolra!
3. Jelenítsd meg a hallgatókat a `diaklista` azonosítójú elemben!
4. Delegálással írasd ki az input mezőbe írt jegyet.
5. Válaszd ki azt a diákot a tömbből, akinek a jegyét éppen módosítjuk! Segítség: generáljuk az `input` mezőnek a `data-azon` attribútumába a diák azonosítóját. Ezt olvassuk ki a gépeléskor, és ezzel keressük ki a tömbből a diákot!
    ```html
    <input data-azon="647353" type="number" min="1" max="5" value="4">
    ```
6. A kiválaszott diák jegyét módosítsuk a beolvasott jegyre! Ellenőrizzük, hogy valóban módosult-e, pl. úgy, hogy a szűrőfeltétel változtatásával újrageneráljuk a listát.
