# PHP alapok

1. PHP segítségével írj ki különböző üdvözlő szövegeket!

    1. Írd ki, hogy "Hello világ!"!
    2. Egy `$nev` változóba vegyél fel egy nevet, majd üdvözöld őt!

2. Írj egy faktoriálist kiszámító függvényt!

3. Írd ki egy szöveget 10-szer egyre növekvő betűmérettel!

4. Adott hibák listája egy tömbben. Jelenítsd meg felsorolásként!

5. Készíts egy olyan oldalt, amelynek be lehet állítani a háttérszínét!

    1. Készítsd el a statikus prototípust!
    2. Készíts belőle dinamikus sablont, a háttérszín értéke változóból jöjjön!
    3. Add meg a háttérszín értékét az URL `query` részében `?szin=123456` formában! Olvasd ezt be az alkalmazáson belül (`$_GET['szin']`)!
    4. Ha nem érkezik URL-ben a háttérszín, akkor legyen valamilyen alapértelmezett értéke a háttérszínnek!
    5. Készíts egy hivatkozást az oldalra, amelyre kattintva az oldal háttérszíne pirosra válik!
    6. Legyen lehetőség megadni a háttérszínt űrlapon keresztül!

        ```html
        <form action="">
            <input type="color" name="szin">
            <button>Beállít</button>
        </form>
        ```

6. Készíts egy elsőfokú egyenletet kiszámító programot!

    1. Először jelenjen meg maga az űrlap!
    2. A helyesen felküldött adatok alapján számoljuk ki az eredményt és jelenítsük meg az űrlap alatt!
    3. Készüljünk fel arra, hogy az adatok hibásan is érkezhetnek! A hibaüzeneteket az űrlap fölött jelenítsük meg felsorolásként!
    4. Minden esetben az űrlap őrizze meg az állapotát, azaz a beviteli mezőkbe írjuk vissza a felküldött adatokat!

