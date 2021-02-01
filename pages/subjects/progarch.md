# Progresszív szoftverarchitektúrák a felhőben

## Általános információk

Óraszám
: 2 gyakorlat

Előfeltétel
: BSc: Telekommunikációs hálózatok (IP-18TKHE, IP-18TKHG)  
 MSc: nincs

Célkitűzés
: A Kar kurzuskínálatában lévő kötelező és kötelezően választható webes tárgyak végigvezetik a hallgatókat a kliensoldali, szerveroldali és full-stack webprogramozás technológiáin. Az itt elkészült alkalmazások azonban méretüknél fogva nem vetnek fel olyan igényeket, amelyek egy valós, sok felhasználós, adat- vagy processzorintenzív webes alkalmazás felvet. Ez a speciális tárgy ezekbe az irányokba lépne el, megmutatva, hogyan tudjuk webes alkalmazások fejlesztésében figyelembe venni a jól skálázhatóságot és hosszú távon karbantarthatóságot.

: A hallgatók megismerik az újszerű, kizárólag a korai adoptálók körében ismert szoftver-tervezői és fejlesztői módszereket az általuk választott technológiák mentén. A megközelítés egy újszerű mikroarchitektúrális felhő környezet, melyben a cél egy komplex, heterogén szoftver architektúra felépítése és továbbfejlesztése, külön figyelmet fordítva arra, hogy a rendszer skálázható legyen, hibatűrő, automatikusan frissüljön és tetszőleges környezetben triviálisan reprodukálható lehessen. A Hallgatók olyan technológiákat ismernek meg és kutatnak, amelyek a későbbiekben széles körben elterjedtek lesznek.

: Technológiai választás és kombináció szabad. Lehet deep learning, frontend, data processing, web-services, továbbá bármilyen más technológia használható.

: Az órákon a Hallgatók által kiválasztott technológiák mentén tervezzük meg a csoportosan elvégzendő feladat bonyolultabb részleteit. A Hallgatók bemutatják a haladásukat, szinkronizálják a közös törekvéseket, rövid előadásokkal részletezik folyamatos kutatásuk és fejlesztésük eredményeit. A Hallgatókat továbbá megtanítjuk a helyes kutatási módszertanra és a rapid, sikeres megvalósíthatósági tanulmány (Proof of Concept) elvégzésére, a gyors prototipizálásra.

## Tematika

1. Adminisztráció, tematika bemutatása, célkitűzések, csoportok kialakítása
2. Csoportok kutatási és fejlesztői terveinek bemutatása, az elkészítendő architektúrák ismertetése
3. Kubernetes mikroarchitektúra felépítése, Docker repository elkészítése, folytonos integráció folyamatainak megtervezése, felállítása
4. Felhő-architektúrák telepítése Helm csomagkezelővel Kubernetes-en
5. Kutatások rész-eredményeinek bemutatása, előadások, projekt-problémák azonosítása
6. Flux automatikus architektúra frissítés, visszaállítás
7. Automatikus programcsomagfrissítések és refactoring CI-tól Flux-ig
8. Különböző futtatási környezetek kialakítása (development, staging, production)
9. Function as a Service (Kubeless)
10. Event-driven architektúrák, Edge, Fog computing, függvénykompozíció és nagy adatáteresztő üzenetkezelő rendszerek

## Számonkérés

Csoportos kutatás (beadandó), egyéni architektúra (beadandó)

## Ajánlott irodalom

- Casalicchio, Emiliano. "Container orchestration: A survey." Systems Modeling: Methodologies and Tools. Springer, Cham, 2019. 221-235.
- Altaf, Umer, et al. "Auto-scaling a defence application across the cloud using Docker and Kubernetes." 2018 IEEE/ACM International Conference on Utility and Cloud Computing Companion (UCC Companion). IEEE, 2018.
- Javadzadeh, Ghazaleh, and Amir Masoud Rahmani. "Fog computing applications in smart cities: A systematic survey." Wireless Networks 26.2 (2020): 1433-1457.
- Pham, Quoc-Viet, et al. "A survey of multi-access edge computing in 5G and beyond: Fundamentals, technology integration, and state-of-the-art." IEEE Access 8 (2020): 116974-117017.

## Oktatók

- Zvara Zoltán
- Horváth Győző (tárgyfelelős)
