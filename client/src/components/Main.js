/* eslint react/prop-types: 0 */
/* eslint class-methods-use-this: 0 */

import { HashRouter, Route } from 'react-router-dom';

import React, { Component } from 'react';
import LoadingSpinner from 'lib/components/LoadingSpinner';
import Application from 'components/Application.tsx';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    color: '#f9fafc',
  },
  palette: {
    type: 'dark',
    primary: {
      main: '#806ce9',
      light: '#1bbc9b',
      dark: '#222328',
      contrastText: '#f9fafc',
      blue: '#3598db',
      warning: '#f1c40f',
      pink: '#f1798c',
      white: '#f9fafc',
      red: '#ff5556',
      success: '#1bbc9b',
    },
    secondary: {
      main: '#f1c40f',
    },
  },
});

class Main extends Component {
  renderApp() {
    return (
      <HashRouter>
        <ThemeProvider theme={theme}>
          <Route component={Application} />
        </ThemeProvider>
      </HashRouter>
    );
  }

  render() {
    const { loading } = this.props;
    if (loading) {
      return <LoadingSpinner />;
    }
    return this.renderApp();
  }
}
export default Main;