# Webes programozási környezet fejlesztése

## Leírás

Különböző oktatási és módszertani igényeket kiszolgáló webes programozási környezet fejlesztése. A felület egy egyoldalas alkalmazás, amely REST API-n keresztül kapcsolódik a szerveroldali logikához, ahol a programkódok virtuális konténerekben futnak le. Jelenleg a C++ nyelvet támogatja a környezet.

::: center aligned
![Képernyőkép a környezetről](assets/images/progenv.png)
:::

## Feladatok

- **Hitelesítés és jogosultságkezelés**: JSON Web Token alapú hitelesítés kidolgozása és React integrációja. Google és Github azonosítás támogatása. Hasonló megoldás már implementálva volt az előző verzióban, most cél ennek elkülönítése és megbízható kidolgozása.
- **LDAP hitelesítés implementálása**: célunk az INF-es authentikáció használata, ebben a részben ennek megvalósítása a cél.
- **Meglévő feladatsorok használata**: több ezer feladat elérhető más formátumban. Cél ezeknek a feladatoknak a rendszerbe való átkonvertálása és kereshetővé tétele.
- **Architektúra finomítása**: hibakezelés, újraindítás, több nyelv támogatása, task mód támogatása.
- **Gyors kereshetőség biztosítása ElasticSearch segítségével**: keresés a feladatok között egy kifejezetten erre szolgáló eszköz segítségével.
- **Billentyűleütések vizsgálata gépi tanulással**: cél a gépelő azonosítása a gépelése alapján.
- **Editor tartalmának streamelése**: tetszőleges editor képének megtekintése egy másik felhasználónál.
- **Kollaboratív szerkesztés**: két felhasználó közösen dolgozhat egy editorban. Technológiák: [Conflict-free replicated data type](https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type), [Operational transformation](https://hackernoon.com/operational-transformation-the-real-time-collaborative-editing-algorithm-bf8756683f66), WebRTC.
- **Tanári tesztek írásához szükséges keretrendszer** készítése különböző típusú tesztekhez. Pl. I/O testing, unit testing, functional testing.
- **In-browser language server és fordító** WebAssemblyvel (pl. clang).
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