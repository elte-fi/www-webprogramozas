# Alkalmazások fejlesztése

## Általános információk

Óraszám
: 2 gyakorlat

Előfeltétel
: Programozási technológia 2. (IP-08CPROGT2EG)

Célkitűzés
: A hagyományos asztali egyfelhasználós alkalmazásoktól továbblépve ebben a tárgyban a hallgatók megismerkedhetnek a kliens-szerver architektúrákkal, annak is egy igen népszerű ágával, a webes protokollokat és technológiákat használó alkalmazások fejlesztésével. A webes alkalmazások készítéséhez felhasználjuk a programozási technológiákon megismert modellezési eszközöket, és azokat webes környezetre ültetjük át. A tantárgy célja, hogy kiindulási ponttul szolgálhasson azok számára, akik modern webes alkalmazásokat szeretnének fejleszteni.

Környezet
: Az órai munkákat a lokális gépeken telepített futtató- és fejlesztőkörnyezetek segítségével igyekszünk megoldani. A használt környezetek és szerkesztőprogramok a választott technológiáktól is függenek. Bizonyos esetekben felhőalkalmazások segítségét is igénybe vehetjük.

## Tematika

1. 2018.09.10.-i hét: [Alapok: HTTP, JSON, architektúrák, REST](#/subjects/alkfejl/01)
2. 2018.09.17.-i hét: [Java REST API -- adatbázis, modellek és vezérlők](#/subjects/alkfejl/02) ([Spring Boot cheat sheet](#/subjects/alkfejl/spring_boot_cheat_sheet), [Issue tracker alkalmazás](#/subjects/alkfejl/issue_tracker))
3. 2018.09.24.-i hét: Java REST API -- [modellek közötti relációk (1-N)](#/subjects/alkfejl/03)
4. 2018.10.01.-i hét: Java REST API -- [modellek közötti relációk (N-N)](#/subjects/alkfejl/03), valamint [hitelesítés és jogosultságkezelés](#/subjects/alkfejl/spring_boot_secure_endpoints)
5. 2018.10.08.-i hét: [HTML és CSS alapok](#/subjects/alkfejl/html_css), [TypeScript](#/subjects/alkfejl/typescript), [git](#/subjects/alkfejl/git)
6. 2018.10.15.-i hét: [Angular -- telepítés, komponensek, stílusok, menü](#/subjects/alkfejl/angular1)
7. 2018.10.22.-i hét: 1. bemutató
8. 2018.10.29.-i hét: Őszi szünet
9. 2018.11.05.-i hét: [Angular -- dinamikus adatok, komponensek kapcsolata](#/subjects/alkfejl/angular2)
10. 2018.11.12.-i hét: [Angular -- űrlapkezelés, service-ek](#/subjects/alkfejl/angular2#4.-services)
11. 2018.11.19.-i hét: Angular -- aszinkronitás kezelése, REST API használata
12. 2018.11.26.-i hét: Angular -- hitelesítés
13. 2018.12.03.-i hét: Konzultáció
14. 2018.12.10.-i hét: 2. bemutató

## Számonkérés

### Az értékelés összetevői

* Összetett webes feladat készítése az órán tanult technológiákkal
* Határidők:
    * [Projektötlet](#/subjects/alkfejl#projektötlet)  
      4\. tanulmányi hét (2017.10.01.)
    * [Backend megvalósítása](#/subjects/alkfejl#backend-megvalósítása) és 1. bemutató   
      7\. tanulmányi hét (2018.10.22)
    * [Működő prototípus megvalósítása](#/subjects/alkfejl#működő-prototípus)  
      10\. tanulmányi hét (2017.11.12)
    * [Kész alkalmazás, dokumentáció, bemutatás](#/subjects/alkfejl#kész-alkalmazás)  
      14\. tanulmányi hét (2018.12.10., utolsó gyakorlat)


### A beadandó feladat

A félév során egyetlen feladat lépésenkénti elkészítése lesz a cél. A feladatot **kétfős csoportok** végzik el. A fejlesztéshez **git** verziókövető rendszert kell használni, az egyes fázisokat megfelelően rögzítve a rendszerben (azaz nem a teljes fejlesztést követően kell a kódtárat feltölteni). Az alkalmazást **publikus Github kódtár**ként kell közzétenni a csoporttagok egyikének azonosítója alatt. A csoport másik tagja közreműködőként van a kódtárhoz rendelve. A feladathoz **dokumentáció** írása is szükséges. Végül az elkészült alkalmazást a dokumentációval együtt **be kell mutatni**. A fejlesztés egyes fázisait a megfelelő határidőre el kell készíteni, és erről a gyakorlatvezetőt értesíteni kell.

A fejlesztendő alkalmazásnak hasonló komplexitásúnak kell lennie, mint ami a [webes alkalmazások fejlesztése](http://people.inf.elte.hu/groberto/elte_waf/feladatok/elte_waf_feladatok.pdf) tárgynál elvárnak. A feladatnak tartalmaznia kell:

- Adatbázis
    + legalább 4 táblát
    + legyen benne 1-sok kapcsolat
    + legyen benne sok-sok kapcsolat
    + az adatbázis-kezelő az órán megismert `h2` rendszer lehet
- Szerveroldal
    + Java Spring Boot technológia használata
    + MVC modell
    + REST API
    + authorizált végpontokkal
- Kliensoldal
    + technológiát illetően az órán megismert Angular keretrendszert kell használni (6+ verzió).
    + legalább három tábla adatait szerkeszteni kell tudni a felületen: lista, új, módosít, töröl (vagy inaktívvá tesz)
    + legyenek benne csak hitelesítés után elérhető funkciók (autentikáció)
    + ügyelni kell, hogy csak a megfelelő adatokhoz férjen hozzá a megfelelő felhasználó (autorizáció)
    + a szerverrel AJAX kérésekkel történjen a kommunikáció

További feladatötletek:

- Receptek és hozzávalók
- Tantárgyak felvétele (mini Neptun)
- Raktár bevételezés
- Családi todo
- Családi büdzsé
- Névjegyek kezelése
- Munkaidő nyilvántartás

### Projektötlet

Első lépésként egy rövid feladatleírást kell megadni a projekt Github főoldalán a `README.md` állományban. A feladatleírásnak a következő elemeket kell tartalmaznia rövid leírás vagy felsorolás formájában:

- feladat funkcionális követelményeit 
- feladat nem funkcionális követelményei
- szakterületi fogalomjegyzék (azon fogalmak definiálása, ami köré az alkalmazás épül)
- szerepkörök

### Backend megvalósítása

Első fejlesztési fázisként a Java backend és az adatbázis elkészítése szükséges az órán tanult módszerekkel, illetve -- ha szükséges -- további megoldásokkal. Az elkészült munkának meg kell felelnie a feladatleírásnál fentebb leírt követelményeknek. Az elkészült kód mellé szükséges elkészíteni az adott réteg aktuális dokumentációját, ami a következőket tartalmazza:

- fejlesztői környezet bemutatása, beállítása, használt technológiák
- adatbázis-terv: táblák kapcsolati UML diagramja
- alkalmazott könyvtárstruktúra bemutatása
- Végpont-tervek és leírások
- 1 db végpont működésének leírása, mi történik, milyen lépések követik egymást (szekvenciadiagram)
- fontosabb specifikumok bemutatása (ha van ilyen)

### Működő prototípus

A következő lépésben a felhasználói felület kialakítása a cél backend szolgáltatások nélkül. Egy olyan, komponensekből, oldalakból és végpontokból álló alkalmazást kell készíteni, amely működik, de egyelőre statikus, beégetett adatokkal dolgozik. A dokumentációt a következő elemekkel szükséges bővíteni:

- használati eset diagram: melyik szerepkör mely felületekhez fér hozzá
- fejlesztői környezet bemutatása, beállítása, használt technológiák
- az alkalmazott könyvtárstruktúra bemutatása
- (felületi tervek, oldalvázlatok)

### Kész alkalmazás

Utolsó fázisban összekötjük a backendet a frontenddel, a felületek működését a szerveren tárolt adatokkal biztosítjuk, az alkalmazást végső állapotra csiszoljuk. A dokumentáció a következőket tartalmazza:

- kliensoldali szolgáltatások listája, rövid leírással
- kapcsolat a szerverrel
- állapotdiagram (ha szükséges)
- egy funkció folyamatának leírása, azaz mi történik kattintástól a visszajelzésig
- tesztelés
- felhasználói dokumentáció

### Bemutatás

A bemutatás két fázisban történik: a félév közepén és a félév végén. Félév közepén az első két határidőhöz tartozó munka bemutatása történik, azaz a szerveroldali komponensek bemutatása. A teljes alkalmazás bemutatására az utolsó gyakorlaton kerül sor. 20 fős gyakorlatokkal számolva minden csapatra kb. 9 perc jut, de számítsunk arra, hogy bemutatókkor alkalomadtán túlléphetjük a gyakorlat időkeretét. A bemutatónak tartalmaznia kell:

- a feladat ismertetését (fél perc)
- az alkalmazás bemutatását (2 perc)
- az alkalmazás működésének részleteit (1 perc)
- a dokumentáció gyors bemutatását (1 perc)
- fejlesztési tapasztalatokat (fél perc)
- a csapatmunka részleteit (fél perc)

A bemutatás után a gyakorlatvezető és a csoporttagok is kérdéseket tehetnek fel, megjegyzéseket fűzhetnek a munkához. Az értékelés helyben történik.

### Jegyszerzés feltételei

* Részvétel a gyakorlatok legalább 75%-án (maximum 3 hiányzás)
* Minden "milestone" beadása időben
* Elkészített és bemutatott alkalmazás
* Kérdőív kitöltése

### Értékelés

* Mindkét bemutatóra 0-10 pont kapható, ezt a csoport két tagja saját belátása szerint osztja el egymás között (1-5). Félév végén ezek átlagból alakul ki a jegy. 

## Segédanyagok

* [HTML tananyag (Abonyi-Tóth Andor): A weblapkészítés technikája (HTML5, CSS3) és ergonómiája](http://tamop412.elte.hu/tananyagok/weblapkeszites)
* [A böngésző mint alkalmazásfejlesztési platform (elektronikus tananyag)](http://webprogramozas.inf.elte.hu/tananyag/kliens/)
* [Dinamikus weboldalak előállítása szerveroldali technológiákkal (elektronikus tananyag)](http://webprogramozas.inf.elte.hu/tananyag/szerver/)
* [Bevezetés a kliens- és szerveroldali webalkalmazások készítésébe (elektronikus tananyag)](http://webprogramozas.inf.elte.hu/tananyag/wf2/)
* [Webadatbázis-programozás (elektronikus tananyag, PHP alapokon, de a tervezés, az MNV-minta bemutatása és a kliensoldali fejlesztés része itt is aktuális)](http://ade.web.elte.hu/wabp)
* [A tárgy tavalyi Github oldala](https://github.com/horvathgyozo/alkfejl-2017)
* [Segítség a dokumentációhoz](https://github.com/horvathgyozo/alkfejl_minta)
* Mintadokumentációk
    - [Képgalériás alkalmazás (Bartalos Gábor)](https://github.com/KisGabo/gallery-elteik/wiki)
    - [Szerepjáték (Teleki Miklós)](https://github.com/Telmike91/alkfejlszerver)

## Oktatók

### Tárgyfelelős

Horváth Győző

### Gyakorlatvezetők

* Horváth Győző
* Kereszti Krisztián
* Kereszti Zalán
* Móger Tibor
* Rakonczai Sándor
* Visnovitz Márton