# Cheat Sheet - Styling React Components

> There are multiple ways of styling a React component. This handout gives an overview of the various ways of formatting components in a React application.

## Using global CSS classes

To style React components you have to include a CSS library globally in your application. To do so you have to install the CSS library as a local dependency of your React application or include if from a CDN.

> This example uses Fomantic UI (a community fork of Semantic UI) as an example, but many other CSS frameworks exist with React components. (Bootstrap, Material, etc.)

#### `CLI`
```bash
npm install --save fomantic-ui
```

To include the necessary CSS in your application you have to import the CSS file in the `index.js` file of your application.

#### `index.js`
```jsx
import "node_modules/fomantic-ui/dist/semantic.min.css";
```

Once you included the necessary CSS files in your app, you can use the global classes defined in your CSS framework on your React component. Use the `className` property to set CSS classes.

#### `my-component.component.js`
```jsx
export function MyComponent() {
  return (
    <div className="ui segment">
      <h1>My Component</h1>
    </div>
  );
}
```

For managing more complex classes the usage of the `classnames` NPM library is recommended. With `classnames` you can set the classes used dynamically (based on state or properties). If you want to format multiple elements in your component you can compose multiple `className` properties.

#### `my-button.component.js`
```jsx
import classnames from "classnames";

export function MyButton({ text, isBasic = true, color = "red", icon = "plus" }) {
  const styles = {
    button: classnames("ui", "button", {
      // referencing a CSS class by name
      basic: isBasic,
      // dynamically referencing a CSS class
      [color]: true
    }),
    icon: classnames("icon", icon)
  };

  return (
    <button className={styles.button}>
      <i className={styles.icon}></i>
      {text}
    </button>
  );
}
```

> See the [documentation of `classnames`](https://www.npmjs.com/package/classnames) for more details on how to use it.

## Using CSS modules

The usage of CSS modules is an optional feature of Webpack and many other module bundlers. The CSS loader feature of Webpack allows us to load CSS files as modules in out React components. To use CSS modules you have to name your CSS file `*.module.css`.

```jsx
import "./my-component.module.css";
```

You can also use your preferred it CSS preprocessor if you have the proper Webpack loader included in your build toolchain. This means you can import SCSS files too.

```jsx
import "./my-component.module.scss";
```

It is recommended to use a CSS module when it is necessary to apply custom CSS to your React components. This ensures encapsulation. To use global settings (like theme colors, etc.) in your CSS it is recommended to load these in form of variables from a global SCSS config file.

In your (S)CSS module each CSS class will be unique to the component that loads it. The bundler will create unique ids for each CSS class when it is loaded by a component. You can reference these unique ids by importing you (S)CSS module.

#### `my-button.module.scss`
```scss
@import "variables"; // Load global variables

.button {
  background: none;
  border: solid 2px black;
  border-radius: $border-radius; // global variable
  padding: 5px 10px;

  &.red {
    border-color: red;
  }

  &.blue {
    border-color: blue;
  }
}
```

#### `my-button.component.js`
```jsx
import classnames from "classnames";
import classes from "./my-button.module.scss"

export function MyButton({ text, color = "red" }) {
  const styles = {
    // referencing the unique id of the generated CSS class
    button: classnames(classes.button, {
      // using a property to dynamically refenence a CSS class
      [classes[color]]: true
    })
  };

  return (
    <button className={styles.button}>
      {text}
    </button>
  );
}
```

You can combine your custom CSS in your CSS modules with global CSS classes (e.g. loaded from a CSS framework).

> Create React App comes with all the necessary Webpack loaders configured.

## Using a React component library

Many CSS frameworks have a complementing React component library as well. These libraries implement the components of a CSS framework as React components. You can import these components and use them in your JSX code to build your own higher level components and your application. These React libraries usually require you to load the necessary CSS frameworks globally but they usually implement all JavaScript functionality within the components themselves. This means that they usually are not dependent on any external or third party JS file or library (e.g. jQuery).

React component based CSS frameworks use React props instead of CSS classes to configure the various components.

#### `CLI`
```bash
npm install --save fomantic-ui semantic-ui-react
```

#### `index.js`
```jsx
import "node_modules/fomantic-ui/dist/semantic.min.css";
```

#### `my-button.component.js`
```jsx
import { Button } from "semantic-ui-react";

export function MyButton({ text, isBasic = true, color = "red" }) {
  return (
    <Button basic={isBasic} color={color}>
      {text}
    </Button>
  );
}
```


