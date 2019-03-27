# JavaScript -- Web engineering

## Table of contents

- Basic language elements
- Functions, arrays and objects
- Modules

## JavaScript documentations

- [MDN JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
- [JavaScript technologies](http://webprogramozas.inf.elte.hu/tananyag/jstech/slides/language.html#/javascript-technologies)
- Search Google: MDN + statement

## Programming environment

- Runtime environment
    - Node.js (command-line JavaScript interpreter)
        + npm: Node Package Manager for installing and managing JavaScript modules
    - Browser
- Editor: Visual Studio Code (Notepad++, Visual Studio)

## Trying out

- [Repl.it](https://repl.it/languages/javascript)
- [JSBin](https://jsbin.com)

## JavaScript: basic language elements, arrays and functions

-  JavaScript is a "high-level, dynamic, weakly typed, prototype-based, multi-paradigm, and interpreted programming language"

- Versions
    + -2011: ECMAScript 3
    + 2011: ECMAScript 5
    + 2015: ECMAScript 2015 (ECMAScript 6, ES6, ES2015)
    + 2016: ECMAScript 2016
    + 2017: ECMAScript 2017
    + ... new version every year

- C-like syntax --> control flow, operators

- literals

    ```js
    // boolean
    true, false
    // number
    12, 13.45, 1e5
    // string
    'apple'
    "peach"
    `plum`
    // special
    null
    undefined
    // array
    ['one', 'two', 'three']
    // object
    {
        name: 'Nobody',
        age: 99
    }
    ```

- variable declaration

    ```js
    // ES2015+
    const a = 12;
    let b; // undefined
    let c = 13;
    // old
    var d; // undefined
    var e = 14;
    ```

- control flow
    + `if`, `switch`
    + `for`, `for..of`, `for..in`, `while`, `do..while`

- functions
    
    ```js
    function add(a, b) {
        return a + b;
    }
    ```

- complex data structures (with nesting)

    ```js
    {
        name: 'Some Body',
        subjects: [
            {
                id: 12,
                name: 'Web engineering',
                code: 'ITE1234'
            },
            {
                id: 13,
                name: 'Java language',
                code: 'ITE3456'
            }
        ]
    }
    ```

- JavaScript Object Notation (JSON)

    ```js
    {
        "name": "Some Body",
        "subjects": [
            {
                "id": 12,
                "name": "Web engineering",
                "code": "ITE1234"
            },
            {
                "id": 13,
                "name": "Java language",
                "code": "ITE3456"
            }
        ]
    }
    ```

- Built-in objects
    + Math
    + String
    + Date
    + Array
    + RegExp

- Functions
    
    ```js
    // function declaration
    function add(a, b) {
        return a + b;
    }
    // function expression
    let add = function (a, b) {
        return a + b;
    }
    // arrow function
    let add = (a, b) => a + b;
    
    // function as a parameter
    function linearSearch(x, T) {
        var i = 0;
        while (i < x.length && !T(x[i])) {
            i++;
        }
        return {
            isExist: i < x.length,
            offset: i
        };
    }

    function isNegative(p) {
        return p < 0;
    }
      
    var myArr = [1, 3, -2, 8];
    linearSearch(myArr, isNegative);

    // function as a return value
    function operationGenerator(op) {
        if (op === '+') {
            return function (a, b) {
                return a + b;
            };
        }
        else if (op === '*') {
            return function (a, b) {
                return a * b;
            };
        }
    }
      
    //Generating a summing function
    var operation = operationGenerator('+');
    operation(10, 32);    //42

    // closure
    // Every function remain in connection with the containing function, even if the external function ends.
    function createIncrementor(start) {
        return function () {  // (1)
            start++;
            return start;
        }
    }

    var inc = createIncrementor(5);
    inc()   // 6
    inc()   // 7
    inc()   // 8
    ```

- Arrays

    ```js
    const x = [1, 2, 3, 4, 5];
    // iteration 1
    for (let i = 0; i<x.length; i++) {
        console.log(x[i]);
    }
    // iteration 2
    for (let e of x) {
        console.log(e);
    }
    // iteration 3
    x.forEach(e => console.log(e));
    ```

    + `map`, `filter`, `reduce`, `reduceRight`, `some`, `every`, `find`, `findIndex`

        ```js
        const x = [1, 2, 3, 4, 5];
        const evens = x.filter(e => e % 2 === 0)
        ```

    + `push`, `pop`, `shift`, `unshift`, `sort`, `reverse`, `indexOf`, `includes`

- Objects
    + dynamic objects

        ```js
        //Creating an object
        var obj = {
            a: 1,
            b: 2
        };

        //New property
        obj.c = 3;      

        //Accessing property (read)
        obj.a    === 1
        obj['a'] === 1  
        obj.d    === undefined

        //Modifying the value of a property (write)
        obj.b = 42;   

        //Deleting a property
        delete obj.c;
        ```

    + prototype object
    + object generators
    + object constructors, classes

        ```js
        class Person {
            constructor(name) {
                this.name = name;
            }

            describe() {
                return 'Person called '+this.name;
            }
        }

        //Inheritance
        class Employee extends Person {
            constructor(name, title) {
                super(name);
                this.title = title;
            }

            describe() {
                return super.describe() + ' (' + this.title + ')';
            };
        }
        ```

- Modules
    + ECMAScript: `export`, `import`
    + Node: `module.exports`, `require`

- External modules
    + npm (Node Package Manager) (aka mvn)
    + `package.json` (aka `pom.xml`)
    + `npm init`
    + `npm install --save` or `npm install --save-dev`
    + scripts, `npm run script-name`

## Tasks

1. Write an `isPrime(n)` function!

2. Given an array of numbers. Filter the negative numbers into a new array!

    a. Own function
    b. General function
    c. With array method (`filter`)

3. Model an address structure with a JavaScript object! (object literal, dynamic object) Extend it with methods!

4. Create constructors generating point and circle objects! (`class`, `extends`, prototype) 

5. Create a mathematical module with add and multiply functionality! Use this module in the main program! (`module.exports`, `require`)

