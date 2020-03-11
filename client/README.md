# React starter kit.

## Table of contents

- [Setup](#setup)  
  - [Node](#install-node)
  - [Setup app](#setup-app)
  - [Add to existing Project](#add-to-existing-project)
  - [ENV variables](#env-variables)
- [Plugins](#plugins)  
- [Misc](#misc)  
  - [Description](#description)
  - [Other commands](#other-commands)
  - [Notes, guidelines, tips and tricks](#notes-guidelines-tips-and-tricks)
  - [Testing](#testing)
  - [Sass in JS](#sass-in-js)
  - [Troubleshooting](#troubleshooting)
  - [Contributing](#contributing)

## Setup
#### Install Node

Refer to this [wiki page](https://wiki.sparktech.ro/doku.php?id=devteams:frontend_adi:setup_node) for instructions

#### Setup app
  1. clone this repo
  2. run yarn install
  3. run yarn start
  4. navigate to http://localhost:8080
  5. experience extreme joy

#### Add to existing Project

  1. clone this repo(preferably in a folder named client inside that project)
  2. rm -rf client/.git
  3. follow the rest from above

#### ENV variables

  * Variables should come from the server, declare them in `config/settings.yml` under the key `ui_config` and the name should always be prefixed by ui(example `UI_SOMETHING`)
  * For dev variables, or if you need to set defaults(although this should also be set in be) see `environment.js`
  * To use a variable simply `import ENV from 'environment.js'`
  * Why we need this?
    *  For projects with multiple environments it becomes hard to maintain all the variables from every config.
    *  The idea with one config is that we will generate an `index.html.erb` which will be rendered by ruby and will add env variables from `config/settings.yml`.
    *  All variables will come from environment variables and will have sensible defaults.
    *  Example [here](https://gitlab.sparktech.ro/ignite/ignite-annotation-tool/blob/develop/config/settings.yml#L7)

## Plugins

## Misc

#### Description
Packed full of goodies such as:
 - [React](https://reactjs.org/) (duh!)
 - [Redux](https://redux.js.org/) with
 [react-redux](https://github.com/reduxjs/react-redux),
 [redux-actions](https://redux-actions.js.org/),
 [redux-thunk](https://github.com/reduxjs/redux-thunk).
 - [react-router](https://github.com/ReactTraining/react-router) for routing
 - [Boostrap](https://getbootstrap.com/) with [Reactstrap](https://reactstrap.github.io/) and
 [ionicons 2](https://ionicons.com/v2/cheatsheet.html)
 with [sass](https://sass-lang.com/).
 - [Ramda](https://ramdajs.com/docs/) as a functional utility library (don't let me catch any of you using lodash or underscore)
 - [Superagent with Bluebird](https://github.com/KyleAMathews/superagent-bluebird-promise) for api requests
 - [Seamless Immutable](https://github.com/rtfeldman/seamless-immutable) for store
 - If you need something that is not in react kit see [here](https://wiki.sparktech.ro/doku.php?id=devteams:frontend_adi:react_components)

#### Other commands
  - yarn test: runs all `.test.js` files
  - yarn staging-build : generate staging build
  - yarn compressed-build: generate smaller build
  - yarn jake -T : see jake tasks

#### Testing
  - Test components/functions by creating a `__tests__` folder at the same level with your files that you want to test. Inside this folder create a file with the same name as the file you want to test. (Ex. `Navbar.test.js`).
  - Run `yarn test` to run all tests or `yarn test Component` to test only one file.
  * [Jest matchers](https://jestjs.io/docs/en/expect.html)
  * [Enzyme matchers](https://github.com/FormidableLabs/enzyme-matchers/tree/master/packages/jest-enzyme)
  * [Mocking Node modules](https://jestjs.io/docs/en/manual-mocks#mocking-node-modules)

#### Sass in JS

What happens when you have to use some variable both in your stylesheets
and your JavaScript code? You want to use some theme colors in D3
or you want to do some computation based on a height defined in CSS.

Read the following guidelines to learn how to use Sass variables inside JS.

##### Before

Let's say you have this file:

```scss
// src/style/components/_my-component.scss

.my-component {
  height: 400px;
}
```

and you need that height in your javascript code:

```jsx
// MyComponentButInReact.js

const HEIGHT = 400;

// ...
```

You realize that changing the dimension in stylesheets will break
your height based computations so you do the following changes.

##### After

Extract height into a variable:

```scss
// src/style/_variables.scss

// ...

$my-component-height: 400px;
```

Update the code in your scss component:

```scss
// src/style/components/_my-component.scss

.my-component {
  height: $my-component-height;
}
```

Mention that variable in the exports file:

```scss
// src/style/helpers/_exports.scss

:export {
  // ...
  my-component-height: $my-component-height;
}
```

Update the code in your javascript file:
```jsx
// MyComponentButInReact.js

import { styleVars } from 'style';

const HEIGHT = parseFloat(styleVars['my-component-height']);

// ...
```


#### Extra Documentation

  * [What component should I use?](https://wiki.sparktech.ro/doku.php?id=devteams:frontend_adi:react_components)
  * [IE 11 issues](https://wiki.sparktech.ro/doku.php?id=development:ie11issues)
  * [Gotchas](https://wiki.sparktech.ro/doku.php?id=devteams:frontend_adi:gotchas)
  * [Useful links](https://wiki.sparktech.ro/doku.php?id=devteams:frontend_adi:useful_links)

#### Notes, guidelines, tips and tricks
  - Use [functional programming](https://drboolean.gitbooks.io/mostly-adequate-guide/content/) concepts as much as possible
    - prefer use of [stateless functions](https://facebook.github.io/react/blog/2015/09/10/react-v0.14-rc1.html#stateless-function-components) as React components
    - use [pure functions](https://en.wikipedia.org/wiki/Pure_function)
    - favor [composition](http://ramdajs.com/docs/#compose) over inheritance
    - prefer [free point](https://drboolean.gitbooks.io/mostly-adequate-guide/content/ch5.html#pointfree) programming style
  - Use `//husky__nocommit!` at the end of the lines you want to remove before the code is commited (local configs, temporal state changes etc.). An exception will be thrown indicating the filepath and the line number where the comment is found.
  - Style folder structure is explained into these guidelines -> https://gitlab.sparktech.ro/react-kit/react-kit/wikis/Style-guidelines
  - For precommit related options see precommit-opts.js.sample
  - To generate React components and containers boilerplate inside Visual Studio Code, use `rcomp` and `rcont` snippets. All shared snippets are placed inside *.vscode/javascript.code-snippets*.

#### Troubleshooting

##### Webpack is not reloading on change (Ubuntu)

Try running the following command ([more info](https://github.com/guard/listen/wiki/Increasing-the-amount-of-inotify-watchers#the-technical-details)):
```shell
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```

##### ESLint is not checking some file

Check the content of `.eslintignore`

##### ESLint is not highlighting the errors in VS Code

By default VS Code activates eslint errors highlighting only for
*javascript* and *javascriptreact* syntaxes. There is an override
inside [this file](./.vscode/settings.json) but it only applies
if *.vscode* is located in the root of your working directory.
Copy the content of `"eslint.validate"` in your editor's settings
to fix that.

#### Contributing
