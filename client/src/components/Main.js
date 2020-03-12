/* eslint react/prop-types: 0 */
/* eslint class-methods-use-this: 0 */

import { HashRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import React, { Component } from 'react';
import LoadingSpinner from 'lib/components/LoadingSpinner';
import Application from 'components/Application.tsx';

class Main extends Component {
  renderApp() {
    return (
      <HashRouter>
        <Route component={Application} />
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

function mapStateToProps(state) {
  return {
    loading: state.app.appLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
    }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);
