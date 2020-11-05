# Szakdolgozati témák

## 1. Gyerekeknek szóló kognitív tesztek megvalósítása webes technológiákkal

Az alábbi feladat az Etológia Tanszékkel közös együttműködésben történne.
A feladat 4 gyerekeknek szóló kognitív teszt megvalósítása webes technológiákkal (HTML, CSS, JS), reszponzív módon.

- Érzelem felismerés tesztek: elhangzik egy érzelem neve, megjelenik 4 érzelemkifejező arc vagy 2 videó, ki kell választani a megfelelőt. A válaszlehetőségeket egy nagyobb halmazból kell véletlenszerűen kiválasztani, és több ilyen kérdés van egymás után.
- Valós-látszólagos érzelmek teszt: elhangzik 2 random történet (hanglejátszás), mindkettő után egy-egy kérdőív jelenik meg, 2 kérdéssel, a válaszlehetőségek képek.
- Faux pas teszt: elhangzik 2 random történet (hanglejátszás + slideshow), mindkettő után egy-egy kérdőív jelenik meg, 6 kérdéssel, a válaszlehetőségek képek.
- Mentális rotáció teszt: megjelenik 3 síkidom/térbeli forma, az egyik a célinger, a másik kettő közül ki kell választani azt, ami a célinger elforgatott változata. Kiválasztáskor az ábra beforog a célingernek megfelelő pozícióba.

A kognitív teszteknek egységes dizájnnal kell készülnie, igazodva már meglévő 2 másik teszthez, illetve támogatniuk kell a válaszok naplózását (meg kell hívniuk egy naplózó függvényt, ami adott).

## 2. Kollaboratív fejlesztői környezet készítése

Feladatok
- felhasználók csoportokba rendezése
- csoportoknak események kiírása (pl. gyakorlat)
- eseményekhez több feladat kiírása
- tanár-diák nézőpont
- kollaboratív szerkesztés
- tanár képes a hallgatók kódját figyelni

Technológiák:
- React, redux
- REST API, RPC

## 3. Webes REPL felület készítése különböző programozási nyelvekhez

Feladatok:
- böngészőben futó szerkesztő
- kód futtatása egy virtuális környezetben a szerveren
- futás termináljának kivezetése a böngészőbe (pl. xterm.js)
- több felhasználó támogatása
- az így írt REPL kódok szerkesztése, futtatása, mentése
Nyelvek:
- C++
- TypeScript

## 4. Böngészőben futó fejlesztői környezet webes alkalmazások írásához

Feladatok:
- HTML, CSS, JS fájlok szerkesztése a böngészőben, a generált oldal megtekintése, kipróbálása
- PHP projekt írása böngészőben, a szerveroldali alkalmazás kipróbálása
- Node.js alkalmazás írása böngészőben, a szerveroldali alkalmazás kipróbálása

Technológiák:
- virtuális futtató környezet a szerveroldalon


## 5. Sokfunkciós kódszerkesztő a böngészőben (kísérleti, nehéz!!!)

- Monaco editor
- több fájl szerkesztése
- language serverek futtatása
- több felhasználó támogatása
- debuggolás megvalósítása valamelyik nyelven
