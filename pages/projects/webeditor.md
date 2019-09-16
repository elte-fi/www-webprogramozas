# Testreszabható webes szövegszerkesztő fejlesztése

## Leírás

Célunk egy olyan webes WYSIWYG szerkesztő fejlesztése, amely testreszabható és speciális elemekkel kiegészíthető. Jelenleg nagyon sok WYSIWYG szerkesztő közül választhat, aki böngészőben szeretne formázásokkal ellátott szöveget szerkeszteni (rich text editors). A legtöbb szerkesztő azonban véges számú funkciót képes nyújtani. Számunkra egy olyan szerkesztő készítése a cél, amelyet tetszőleges funkcióval kiegészíthetünk, és a szöveg megjelenését tetszőleges módon testre szabhatjuk. Ezt általában úgy biztosítják, hogy a szerkesztő a szöveget egy megfelelő adatszerkezetben tárolja, a módosításokat ott érvényesíti, a dokuemtumot pedig ez alapján jeleníti meg. Az egyes kiegészítők (pluginek) ebbe a folyamatba épülnek bele. A nagy tudású és magas szintű rich text editorok mellett léteznek olyan alacsonyabb szintűek (pl. ProseMirror, Draft.js), amelyek kifejezetten a variálhatóság és kiegészíthetőség jegyében lettek megtervezve. Cél az ezekhez hasonló szerkesztőknek a megkeresése, lehetőségeinek a felmérése, az egyik kiválasztása, és egy példaimplementáció elkészítése pár egyedi pluginnel. 

## Feladatok

A szerkesztőnek tudnia kell:

- az alap rich text editálási funkciókat
    - vastag, dőlt, aláhúzott betűk
    - címsor, paragrafus
    - linkek, képek
    - táblázatok
- kód blokkok megadása szintaxiskiemeléssel
- kollaboratív szerkesztés támogatása
- egyedi pluginek támogatása, ahol a pluginnek külön szerkesztő felülete lehet, és egyedi logikája is.
