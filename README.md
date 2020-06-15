# Setup client app
  1. clone this repo
  2. run `yarn install`
  3. run `yarn start`
  4. navigate to `http://localhost:8080`
  5. experience extreme joy

# Setup server app
  1. run `bundle install`
  2. run `rake db:create` 
  3. run `rake db:migrate`
  4. run `rake db:seed`
  5. run `rails s`
  

# ENV variables
  * Variables should come from the server, declare them in `config/settings.yml` under the key `ui_config` and the name should always be prefixed by ui(example `UI_SOMETHING`)
  * For dev variables, or if you need to set defaults(although this should also be set in be) see `environment.js`
  * To use a variable simply `import ENV from 'environment.js'`
 

# Description
 - [React](https://reactjs.org/) 
 - [Apollo](https://www.apollographql.com/)  
 - [GrapQL](https://graphql.org/)
 - [Material-ui](https://material-ui.com/)
 - [Redux](https://redux.js.org/) 
 - [react-router](https://github.com/ReactTraining/react-router) 
 - [Ramda](https://ramdajs.com/docs/) 

