# Elosztott adatfeldolgozó rendszerek vizualizációja

## Leírás

Az Apache Spark job-execution vizualizációjának kiterjesztése más elosztott adatfeldolgozó rendszerre. Feladat az általánosítások kidolgozása, és az egyes adatkezelő rendszerek specialitásainak implementációja és leképezése a jelenlegi vizualizációs rendszerbe. További feladat a megjelenítés bővítése és finomítása (React, SVG).

<div class="center aligned">

![Képernyőkép a környezetről](assets/images/ddps.gif)

</div>

## Feladatok

1. Canvas alapú megjelenítés

   Jelenleg kétféle HTML alapú renderelésünk van, azonban mindkettőnek határt szab a DOM képessége. Gyorsabb alternatívát a canvas és a WebGL jelenthet, ezek közül a canvas -- bár lassabb a WebGL-nél -- programozástechnikailag egyszerűbb, megközelíthetőbb alternatívát nyújt.

   A feladat az lenne, hogy a jelenlegi megjelenítést és működést át kellene ültetni canvas-es környezetbe. Alapvetően egy fa megjelenítéséről lenne szó, különböző alakú és adattartalmú csomópontokkal, eseménykezeléssel, animációkkal, mindezt átlátható és karbantartható módon (azaz komponensekkel) és hatékonyan kellene megtenni. A feladatot az alábbi részekre lehet bontani.

   - Ismerkedés a canvas technológiával
   - A hatékony megjelenítés (kísérletek, mérések)
   - Fa kirajzolása
   - Komponensek, osztályok bevezetése
   - Eseménykezelés, buborékolás szimulálása
   - Animációk

2. Hatékony canvas alapú megjelenítés Quadtree-kkel

   A megjelenítés során sokszor kell komponenseket keresni, akár a megjelenítés szűréséhez, akár az eseménykezeléshez. Ezt a lineáris szűrést lehet hatékonyabbá tenni az ún. [Quadtree](https://en.wikipedia.org/wiki/Quadtree)-k alkalmazásával. A feladatot vállalóknak meg kellene ismerkednie a Quadtree-k működésével, és ezzel proof-of-concept canvases alkalmazást kellene készíteni, lehetőleg valamilyen egyszerűbb fa megjelenítésével.

3. Különböző méretű csomópontokból álló fák kirajzolása jó helykihasználtsággal

   A jelenlegi fa kirajzolása ún. dobozmodellen alapul, azaz egy csomópontot és gyerekeit egy befoglaló dobozba képzeljük, majd a gyerek és azok gyerekeit is ugyanígy, végig rekurzívan. Így határozzuk meg a csomópontok helyét. A gond ezzel az, hogy így nagyon szellős fák jöhetnek létre, amelyeket "függőleges" irányban összébb lehetne húzni. A feladat olyan fa elrendezés kiszámolása, amely függőleges irányban a legjobb helykihasználást adja. Erre több megközelítést kellene megvizsgálni:

   - A d3 függvénykönyvtár [tree layout modulja](https://github.com/d3/d3-hierarchy#tree) tudja ezt azonos méretű csúcspontokra. Kérdés, hogy az alkalmazott Reingold-Tilford algoritmus módosítható-e eltérő méretű csomópontokra.
   - Fizikai relaxációs modellt is lehetne alkalmazni. Ekkor a csomópontok egy ideig vonzzák egymást, majd bizonyos közelségben taszítják. Több lépéses iterációban relaxáltatni lehetne a fa elrendezését. Ehhez ki lehet indulni a [d3 forced layout](https://github.com/d3/d3-force) modelljéből, de érdemes lehet sajátot írni.


## Felhasznált technológiák

* ECMAScript 6 (Babel transpiler) 
* webpack modulkezelő 
* Reaktív megközelítés 
* React (virtuális DOM) 
* SVG, HTML, CSS a megjelenítéshez 
