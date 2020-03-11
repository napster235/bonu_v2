import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

class PrivateRoute extends React.Component {
  render() {
    const { allow, redirectTo } = this.props;

    return (
      allow
        ? <Route {...this.props} />
        : (
          <Redirect
            to={{
              pathname: redirectTo,
            }}
          />
        )
    );
  }
}

PrivateRoute.propTypes = {
  /* Specifies if user is authenticated. If user is not authenticated, component redirects to 'redirectTo'. */
  allow: PropTypes.bool.isRequired,
  /* Path to redirect in case 'allow' is false. */
  redirectTo: PropTypes.string,
  /* ... accepts all the props <Route /> component accepts. */
};

PrivateRoute.defaultProps = {
  redirectTo: '/login',
};

export default PrivateRoute;
