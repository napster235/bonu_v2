/* eslint react/no-render-return-value: 0 */

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import { SnackbarProvider } from 'notistack';


import Main from 'components/Main';

// 1
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

// Import main css file.
import 'style.js';


// 2
const httpLink = createHttpLink({
  uri: 'http://localhost:3000/graphql',
});

// 3
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

// 4
ReactDOM.render(

  <ApolloProvider client={client}>
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      iconVariant={{
        success: '✅',
        error: '✖️',
        warning: '⚠️',
        info: 'ℹ️',
      }}
    >
      <Main />
    </SnackbarProvider>
  </ApolloProvider>,
  document.getElementById('app-container'),
);
