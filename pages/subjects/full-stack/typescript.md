# Full-stack webprogramozás -- A TypeScript nyelv

## Introduction

> TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.

JavaScript is dynamic, weakly typed, interpreted language. TypeScript brings static types and compilation into the language. Advantages:

- type errors during compilation
- enhanced code completion

## Documentation

- [TypeScript homepage][ts honlap]
- [TypeScript documentation][ts docs]
- [TypeScript in 5 minutes][ts in 5 minutes] (Getting started)
- [TypeScript handbook][ts handbook] (detailed descriptions)

## Runtime environment

- browser (JavaScript)
- command line, Node.js (JavaScript)
- REPL: [TypeScript Playground]

## Editor

**Visual Studio Code** is tailored for editing TypeScript code.

## Lokális futtatás

### Parancssor

```sh
# Előkészítés
mkdir ts-proba
cd ts-proba

# Node projekt inicializálása
npm init --yes

# TypeScript fordító telepítése
npm install --save-dev typescript

# Konfigurációs fájlok létrehozása (opcionális)
tsc --init

# file.ts létrehozása és szerkesztése

# Fordítás: file.ts --> file.js
npx tsc file.ts     # npm 5.2 felett
./node_modules/.bin/tsc file.ts     # régebbi npm 

# Futtatás
node file.js
```

Implicit fordítással:

```sh
npm install --save-dev ts-node
npx ts-node file.ts
```

Változások figyelése és automatikus újratöltés:

```sh
npm install --save-dev nodemon
nodemon file.ts
```

## Examples

### JavaScript is a subset of TypeScript

```js
function add(a, b) {
    return a + b;
}
const c = add(3, 5);
```

### Variables and constants

```js
const i: number = 12;
const s: string = "apple";
const b: boolean = true;

// Type annotation is optional
const j = 13;
```

### Functions

```js
function add(a: number, b: number): number {
    return a + b;
}
const c: number = add(3, 5);
```

### Interfaces

```js
interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person: Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

let user = { firstName: "Jane", lastName: "User" };

console.log(greeter(user));
```


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


## Tasks

1. Define a variable with each basic type!

2. Define the `count` function, if we would like to use it in this way:

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
    bt = new BinaryTree();
    bt.createNode(3);
    bt.Left = new BinaryTree(1);
    bt.Right = new BinaryTree(5);
    console.log(f1.Value, f1.Left.Value, f1.Right.Value);
    console.log(f1.Left.Left.isEmpty());
    ```

8. Define a generic LinkedList class!

8. Put these solutions into multiple files with the right import/export syntax!

9. Define a [decorator] that adds a static field indicating that the subject has been decorated!



[ts honlap]: https://www.typescriptlang.org/
[ts docs]: https://www.typescriptlang.org/docs
[ts in 5 minutes]: https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html
[ts handbook]: https://www.typescriptlang.org/docs/handbook/basic-types.html
[TypeScript Playground]: https://www.typescriptlang.org/play 
[ts json]: http://choly.ca/post/typescript-json/
[decorator]: https://www.typescriptlang.org/docs/handbook/decorators.html
[btree1]: https://github.com/basarat/typescript-collections/blob/release/src/lib/BSTree.ts
[btree2]: https://github.com/theAlgorithmist/TSBinaryTreeLibrary/blob/master/src/BTreeLight.ts