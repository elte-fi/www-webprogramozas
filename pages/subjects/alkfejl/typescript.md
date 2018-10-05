# Alkalmazások fejlesztése -- A TypeScript nyelv

[TypeScript honlap][ts honlap]

## Bevezetés

- JavaScript
- TypeScript

## Futtató környezet

- böngésző (JavaScript)
- parancssor, Node.js (JavaScript)
- REPL: [TypeScript Playground]

## Szerkesztő

- Visual Studio Code

## Lokális futtatás

### Parancssor

```sh
# Előkészítés
mkdir ts-proba
cd ts-proba

# TypeScript fordító telepítése
npm install typescript

# Konfigurációs fájlok létrehozása (opcionális)
tsc --init

# file.ts létrehozása és szerkesztése

# Fordítás: file.ts --> file.js
npx tsc file.ts     # npm 5.2 felett
./node_modules/.bin/tsc file.ts     # régebbi npm 

# Futtatás
node file.js
```

Továbbfejlesztve (változások figyelése és automatikus újratöltés):

```sh
npm install nodemon

# console 1
npx tsc --watch file.ts
./node_modules/.bin/tsc --watch file.ts     # régebbi npm

# console 2
npx nodemon file.js
./node_modules/.bin/nodemon file.js         # régebbi npm
```

Vagy mindezt előkészítve használhatjuk [ezt a kódtárat](https://github.com/vimtaai/typescript-repl) letöltve.

### Editor plugin

Használhatjuk a [Quokka.js](https://quokkajs.com/docs/) plugint, ami helyben futtatja a kódot és jeleníti meg a kifejezések értékeit.

## Témakörök

0. Adatszerkezetek, típusok
1. Összeadó függvény
2. Kiválogatás evolúció
    + Saját fgv.
    + Általánosított
    + `filter`
3. Osztályok és interfészek
    + objektumokkal dolgozó függvények
    + osztályok
    + öröklés, `super`
    + public paraméter
    + interfész implementálása
4. Generic-ek
5. Castolás (`as`)
6. [JSON értelmezés][ts json]


## Feladatok

1. Define a variable with each basic type!

2. Count

    Define the `count` function, if we would like to use it in this way:

    ```ts
    count([1, 11, 22, 4, 33], e => e % 2 === 0);
    count(['alma', 'korte', 'szilva'], e => e.startsWith('a'));
    ```

3. What is the difference between the `var`, `let` and `const` keywords?

4. Define the `Square` and `Circle` classes which implement a common interface called `IShape`!

    ```ts
    interface IShape {
        getArea(): number;
    }
    ```

5. Define a generic Stack<T> class!

6. Define a specific stack called OrderBook that can only store IOrder instances!

7. Define a generic BinaryTree class!

    ```ts
    let bt: BinaryTree<number>;
    ```

8. Define a generic LinkedList class!

8. Put these solutions into multiple files with the right import/export syntax!

9. Define a [decorator] that adds a static field indicating that the subject has been decorated!



[ts honlap]: https://www.typescriptlang.org/
[ts docs]: https://www.typescriptlang.org/docs/home.html
[ts in 5 minutes]: https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html
[ts handbook]: https://www.typescriptlang.org/docs/handbook/basic-types.html
[TypeScript Playground]: https://www.typescriptlang.org/play/index.html 
[ts json]: http://choly.ca/post/typescript-json/
[decorator]: https://www.typescriptlang.org/docs/handbook/decorators.html
[btree1]: https://github.com/basarat/typescript-collections/blob/release/src/lib/BSTree.ts
[btree2]: https://github.com/theAlgorithmist/TSBinaryTreeLibrary/blob/master/src/BTreeLight.ts