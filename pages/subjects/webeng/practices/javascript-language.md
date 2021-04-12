# JavaScript -- Web engineering

## JavaScript documentations

- [MDN JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
- [JavaScript technologies](http://webprogramozas.inf.elte.hu/tananyag/jstech/slides/language.html#/javascript-technologies)
- Search Google: MDN + statement

## Programming environment

- Runtime environment
  - Browser
  - Node.js (command-line JavaScript interpreter)
    - npm: Node Package Manager for installing and managing JavaScript modules
- Editor: Visual Studio Code (Notepad++, Visual Studio)

## Trying out

- Browser console
- Command line (Node.js)
- [Repl.it](https://repl.it/languages/javascript)
- [JSBin](https://jsbin.com)

## Node, npm, npx

Install [Node.js](https://nodejs.org/en/) and it will install npm too.

### JavaScript REPL

```sh
node
```

### Run JavaScript file

```sh
node main.js
```

### Managing dependencies

```sh
# package.json
npm init --yes
# or
echo "{}" > package.json

# Install package
npm install package-name
npm i package-name
# Install locally (recommended)
npm install --save-dev package-name
npm i -D package-name
# Install globally (in rare cases, for general utilities)
npm install -g package-name

# Running local packages
npx package <par>
./node_modules/.bin/package <par>
```

## ES2015 modules

To use ES2015 modules, we have to indicate it in the `package.json` file:

```json
{
  "type": "module"
}
```

```js
// math.js
export const add = (a, b) => a + b;
```

```js
// app.js
import { add } from "./math.js";

console.log(add(3, 5));
```

You can also require external dependency:

```js
import { something } from "package-name";
```

## CommonJS modules

```js
// math.js
const add = (a, b) => a + b;

// one value
module.exports = add;
// multiple values
module.exports.add = add;
// shorthand
module.exports = { add };
```

```js
// app.js
const { add } = require("./math");

console.log(add(3, 5));
```

You can also require external dependency:

```js
const { something } = require("package-name");
```

## Tasks

1. Write an `isPrime(n)` function!

2. Given an array of numbers. Filter the negative numbers into a new array!

   a. Own function
   b. General function
   c. With array method (`filter`)

3. Model an address structure with a JavaScript object! (object literal, dynamic object) Extend it with methods!

4. Create constructors generating point and circle objects! (`class`, `extends`, prototype)

5. Create a mathematical module with add and multiply functionality! Use this module in the main program! (`module.exports`, `require`)
