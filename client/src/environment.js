import { mergeDeepLeft } from 'ramda';

// Variable set by rails with values from 'config/settings.yml'
let ENV = window.ENV;

if (!ENV) { // we are in development
  // we can't get variables from the ruby config file, we need to manually set them
  ENV = {
    base_url: 'http://localhost:8080',
    client_env: 'development',
    debug: true,
  };
}

const defaultENV = {
  base_url: '',
  debug: false,
  client_env: 'not set', // this will usually be Rails.env
  features: {
  },
};

export default mergeDeepLeft(ENV, defaultENV);
