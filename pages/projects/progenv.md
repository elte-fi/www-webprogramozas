# Webes programozási környezet fejlesztése

## Leírás

Különböző oktatási és módszertani igényeket kiszolgáló webes programozási környezet fejlesztése. A felület egy egyoldalas alkalmazás, amely REST API-n keresztül kapcsolódik a szerveroldali logikához, ahol a programkódok virtuális konténerekben futnak le. Jelenleg a C++ nyelvet támogatja a környezet.

<img src="assets/images/progenv.png" alt="Képernyőkép a környezetetről" style="width: 100%">

## Feladatok

A jelenlegi funkciók mellett számos további feladattal lehet az alkalmazást bővíteni. Ezeket először egy független projekt keretében kell implementálni, és onnan kerülnek az alkalmazásba.

- **Versenyarchitektúra kialakítása**: a jelenlegi rendszer a kezdő programozásoktatásra lett tervezve, ahol haladó hatékonysági megfontolásokat nem vesz figyelembe, azaz nincsenek feladatonkénti memória- és időlimitek.
    - a jelenlegi elosztott architektúra robosztusságának ellenőrzése, és hibatűrésének javítása
    - jól tesztelhető rétegek és komponensek kialakítása
    - Logok aggregálása a különböző részrendszerekből, folyamat nyomon követése a logok alapján
- **Gyors kereshetőség biztosítása ElasticSearch segítségével**: keresés a feladatok között egy kifejezetten erre szolgáló eszköz segítségével.
    - ElasticSearch megismerése
    - feladatok adatainak bevitele az ElasticSearch katalógusába
    - összetett keresés megvalósítása a feladat szövege és a hozzá tartozó metaadatok alapján
    - szótövezés beállítása
    - implementálás JavaScript modulként (Node.js)
- **Kód evolúciójának megfigyelése**: a kódszerkesztés folyamatának időbeli követése, visszajátszása.
    - megfelelő adatszerkezet keresése, vizsgálata (billentyűleütések, snapshot diffs)
    - az adatok tárolása
    - kód fejlődés visszajátszása
    - statisztikák és diagramok
- **Billentyűleütések vizsgálata**: cél a gépelő azonosítása a gépelése alapján. A vizsgálat lehetséges statisztikai módszerekkel vagy gépi tanulással is.
    - nyers billentyűleütési adatok gyűjtése és hatékony tárolása
    - különböző metrikák kipróbálása
    - példaimplementáció
    - [Tanulmány](pages/projects/progenv/billentyuleutesek_vizsgalata.pdf)
- **Editor tartalmának streamelése**: tetszőleges editor képének megtekintése egy másik felhasználónál.
    - megfelelő technológia kiválasztása (pl. WebRTC, Websockets, stb)
    - két gép közötti kapcsolat (pl. tanár belenéz a hallgató kódjába)
    - broadcast üzemmód (1 gépet többen is láthatnak)
- **Kollaboratív szerkesztés**: két felhasználó közösen dolgozhat egy editorban. Technológiák: Conflict-free replicated data type, Operational transformation, WebRTC.
    - megfelelő adatszerkezet kiválasztása
    - hozzá tartozó függvénykönyvtár keresése és megismerése
    - 1 böngészőn belüli 2 textarea közötti közös szerkesztés
    - 1 böngészőn belüli több textarea közötti közös szerkesztés
    - 2 böngészőben lévő textareák közötti közös szerkesztés
    - Több böngészőben lévő textareák közötti közös szerkesztés
    - Monaco editor használata textarea helyett
    - [Tanulmány](pages/projects/progenv/kollaborativ_szerkesztes.pdf)
- **Online feladatszerkesztő**
    - Új feladat felvitele
    - Meglévő feladatok módosítása
    - A feladatokhoz tartozó adatok ellenőrzése
- **Függvénykönyvtár készítése funkcionális tesztek készítéséhez**: funkcionális tesztekhez jelenleg a puppeteer eszközt használjuk. Ennek az API-ja azonban nagyon alacsony szintű és a rengeteg aszinkron funkció miatt bonyolult. Ezt szeretnénk egy egyszerűbb API-val elfedni, ami a tipikus tesztelési lépéseknek felel meg. Az új API-hoz egy kiindulási specifikációt tudunk adni.
- **In-browser language server és fordító** WebAssemblyvel (pl. clang). Cél, hogy backend sandbox környezet nélkül magában a böngészőben történjen a C++ kód fordítása és futtatása.
- **In-browser debugger**.

## Felhasznált technológiák

* TypeScript
* React
* React-router
* MobX
* PostgreSQL
* RabbitMQ
* Docker, Docker-compose
* Express vagy Koa
* Monaco editor
* Blueprint.js (CSS framework)