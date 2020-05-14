# Setup app
  1. clone this repo
  2. run yarn install
  3. run yarn start
  4. navigate to http://localhost:8080
  5. experience extreme joy


# ENV variables

  * Variables should come from the server, declare them in `config/settings.yml` under the key `ui_config` and the name should always be prefixed by ui(example `UI_SOMETHING`)
  * For dev variables, or if you need to set defaults(although this should also be set in be) see `environment.js`
  * To use a variable simply `import ENV from 'environment.js'`
 

# Description
Packed full of goodies such as:
 - [React](https://reactjs.org/) 
 - [Apollo](https://www.apollographql.com/) and 
 - [GrapQL](https://graphql.org/)
 - [Material-ui](https://material-ui.com/)
 - [Redux](https://redux.js.org/) with
 - [react-router](https://github.com/ReactTraining/react-router) for routing
 - [Ramda](https://ramdajs.com/docs/) as a functional utility library (don't let me catch any of you using lodash or underscore)
 - [Superagent with Bluebird](https://github.com/KyleAMathews/superagent-bluebird-promise) for api requests
 - [Seamless Immutable](https://github.com/rtfeldman/seamless-immutable) for store

