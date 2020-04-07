
# Node.js, express

Ez a leírás a Node.js, illetve a REST API anyagrészt részletezi.

## Szükséges programok
Az alábbi programokat be kell szerezni, ha még nincsenek feltelepítve.

- Node.js: [https://nodejs.org/en/download/](https://nodejs.org/en/download/) (az LTS verziót érdemes letölteni)
- Advanced REST client: [https://install.advancedrestclient.com/install](https://install.advancedrestclient.com/install) (vagy [Chrome áruházból](https://chrome.google.com/webstore/detail/advanced-rest-client/hgmloofddffdnphfgcellkdfbfbjeloo) egyszerűbb telepíteni)

Mindkét program elérhető Windowsra és Linuxra is.

A telepítést ellenőrizhetjük az alábbi parancsok segítségével:
```powershell
node --version
npm --version
```

## Node.js

Az anyag első részét a **Node.js** képezi. Ez egy nyílt forráskódú szoftverrendszer, amit skálázható webes alkalmazások írására hoztak létre. Az alkalmazásokat JavaScript nyelven tudjuk elkészíteni, a rendszer pedig a háttérben a Chrome által is használt V8 JS motor segítségével futtatja őket. Eseményalapú, aszinkron I/O-t használ, így minimalizálja a túlterhelést, és maximalizálja a skálázhatóságot. 

### npm
A Node.js mellett feltelepül az **npm** (ami a **Node Package Manager** rövidítése). Ez egy széles körben használt csomagkezelő rendszer, amihez rengeteg könyvtár érhető el. (Lásd [https://www.npmjs.com/](https://www.npmjs.com/))

### Új projekt létrehozása
Amikor az npm segítségével készítünk egy projektet, akkor a projektünk adatait, valamint a benne használt csomagokat a **package.json** fájlban írjuk le. Új projektet úgy tudunk indítani, hogy a kívánt mappában kiadjuk az alábbi parancsot:
`npm init`

Ekkor a rendszer bekéri a csomag adatait (nevét, leírását, stb.). Az adatok bekérését követően pedig összeállítja belőlük a package.json fájlt.

### npm csomagok telepítése
Két lehetőségünk van egy npm csomag telepítésekor.

1. Globálisan telepítjük
	- Ilyenkor a csomagot nem kell minden egyes projektünkhöz telepíteni, hanem bárhonnan hozzájuk tudunk férni. Tipikusan a CLI alapú csomagoknál érdemes ezt a telepítést választani, pl. Nodemon, Angular CLI, stb. A telepítéshez szükséges parancs:
		- `npm install -g <CSOMAG NEVE>` 
2. Lokálisan telepítjük
	- Ilyenkor csak az adott projektből férünk hozzá a csomaghoz. Tipikusan keretrendszereket vagy különböző könyvtárakat érdemes ilyen módon telepíteni. A parancs ugyanaz, mint az előbb, csak itt nem kell a **-g** kapcsoló. 
		- `npm install <CSOMAG NEVE>` 

A telepített csomagokat az `npm ls` parancssal tudjuk kilistázni.

### Egy alap Node.js program
Itt látható egy példa az alap Node.js alkalmazásra. Készítsünk új projektet, majd az **index.js** fájlba másoljuk be az alábbi kódot:

```javascript
var http = require('http');  
  
http.createServer(function (req, res) {  
	res.writeHead(200, {'Content-Type': 'text/plain'});  
	res.end('Hello World!');  
}).listen(8080);
```

Ezt követően mentsük el a fájt, és indítsuk el a programot az alábbi paranccsal:
`node index.js`

#### Próbáljuk ki
Egy tetszőleges böngészővel nyissuk meg a következő címet: [http://localhost:8080/](http://localhost:8080/)
Ekkor a betöltött oldalon meg kell, hogy jelenjen a *Hello World!* szöveg.

#### Hogy működik?
Beimportáljuk a Node **http modulját**, amihez utána a **http változón** keresztül hozzáférünk. A http modul **createServer** metódusával létrehozunk egy szervert, amiben van egy úgynevezett callback function, aminek van egy request és egy response paramétere (vagyis a szerver felé beérkező kérés - ez a request, és a kliensnek adott válasz - ez a response). 

Ez a callback function minden egyes kérés alkalmával le fog futni, aszinkron módon. Tulajdonképpen annyit csinál, hogy 200-as állapotkóddal (ami azt jelenti, hogy a kérés rendben ki lett szolgálva, lásd [http állapotkódok](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes)) egy plain text típusú választ ad, majd beírja a Hello World! szöveget a válaszba és elküldi azt a kliens felé.

Végpontkezelés nincs benne, tehát bármilyen végponttal is hívom meg a szervert, ugyanazt a választ fogom kapni. Ki lehet próbálni mondjuk a [http://localhost:8080/valami](http://localhost:8080/valami) címmel.

#### Mi ezzel a "probléma"?
Az, hogy ez egy nagyon alacsony szintű kód. Igazából ebből a példából annyira nem is érzékelhető ez a probléma, viszont gondoljunk bele, ha szeretnénk kezelni sok összetett végpontot (vagyis egy végpont kezelhet mondjuk GET és POST kéréseket is, különböző adatokat kaphat, amiket fel kell dolgozzon, az URL-ből kell kinyerjen adatot, vagy az URL-nek egy adott mintára kell illeszkednie, stb.) Érezhető, hogy ez ilyen alacsony szintű eszközökkel elég sok munka lenne...

Mi pedig nem szeretnénk ennek kitenni magunkat, tehát jó lenne nekünk egy olyan eszköz, ami egy magasabb szintű api-val elfedi ezt a sok alacsony szintű kódot, és ezáltal könnyebbé, átláthatóbbá tenné számunkra a fejlesztést. **Itt jön képbe az Express.**

## Express

### Express telepítése a projekthez
Ha készen áll a projektünk, akkor hozzá kell adnunk az Express-t. Ezt a projektünk mappájában az alábbi parancs kiadásával tehetjük meg:
`npm install --save express`

Ekkor egy távoli szerverről letölti a csomaghoz szükséges fájlokat, amik a **node_modules** mappába kerülnek. 

A **--save** kapcsoló helyettesíthető az **-S** kapcsolóval is, és azt mondja meg, hogy az Express-t a **package.json** fájlhoz is hozzá szeretnénk adni a csomagot. 

Ez azt jelenti, hogy legközelebb elég kiadnunk az `npm install` (vagy rövidebben: `npm i`) parancsot, és a **package.json** fájlban leírt adatok alapján a rendszer automatikusan fel fogja telepíteni az ide mentett csomagokat.

### Nodemon telepítése a projekthez
Könnyítsük tovább a saját dolgunkat, és telepítsük a **nodemon**-t. Ez arra való, hogyha módosítunk egy fájlt, akkor automatikusan újraindítja a szerverünket a háttérben, hogy a változásokat azonnal láthassuk és ne nekünk kelljen minden egyes mentés után kézzel megejteni az újraindítást.

A következő paranccsal lehet telepíteni:
`npm install -g nodemon`

### Az első Express alkalmazás
Ha minden szükséges csomagot feltelepítettünk, elkezdhetjük az alkalmazásunk tényleges fejlesztését. Ehhez készítsünk egy **index.js** nevű fájlt, amibe írjuk bele az alábbi kódot:

```javascript
var express =  require('express');
var app =  express();

app.get('/',  function(req, res){
	res.send("Hello World!");
});

app.listen(3000);
```

Miután elmentettük a fájlt, a következő paranccsal indítható az alkalmazás:
`nodemon index.js`

(Ha ez nem működik, mert a környezeti változók nem jól vannak beállítva, és ismeretlen parancsnak tekinti a rendszer, akkor az `npx nodemon index.js` parancsot érdemes megpróbálni).

#### Próbáljuk ki
Egy tetszőleges böngészővel nyissuk meg a következő címet: [http://localhost:3000/](http://localhost:3000/)
Ekkor a betöltött oldalon meg kell, hogy jelenjen a *Hello World!* szöveg.

Próbáljunk meg olyan végpontot is meghívni, ami nem létezik:
[http://localhost:3000/valami](http://localhost:3000/valami)

A válasz ekkor egy értelmes hibaüzenet lesz.

Kipróbálhatjuk azt is, hogy a Hello World!-öt átírjuk valami másra és elmentjük a fájlt. A szerver mindenféle manuális újraindítás nélkül az új szöveget fogja elküldeni.

#### De tulajdonképpen mi is történik itt?
A programunk első sora beimportálja az Express-t, amihez az **express** változón keresztül kapunk hozzáférést. Ennek segítségével csinálunk egy alkalmazást, amit az **app** nevű változóhoz kötünk.

Majd pedig az alkalmazás az alábbi funkciókat használja:

- app.get(route, callback)
  - Azt írja le, hogy mi történjen, ha get metódussal hívjuk meg az adott route-ot. A callback funkciónak 2 paramétere van, a **request (req)**, illetve a **response (res)**. Ezek szabványos HTTP kéréseket reprezentálnak, amelyeknek vannak tulajdonságaik, paramétereik, fejléceik, törzsük, stb.
- res.send()
    - Ez a funkció fog egy objektumot, és továbbítja a válaszban a kérést küldő kliens felé. Ezen a ponton küldjük át a kliensnek (jelen esetben pl. böngészőnek) a *Hello world!* szöveget.
- app.listen(port, [host], [backlog], [callback]])
    - Ennek hatására a program elkezdi figyelni a kapcsolódásokat a megadott címen. A portot mindenképpen meg kell adni, a többi opcionális paraméter.

#### Miért jó ez nekünk?
Látszik, hogy a kód sokkal strukturáltabb, átláthatóbb, a végpontok pedig szépen elkülönülnek majd egymástól. Magasabb szinten tudunk fejleszteni, mintha csak a sima http modult használnánk.

