import React, { FC } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute:FC = (props) => {
  const { allow, redirectTo } = props;
  return (
    allow
      ? <Route {...props} />
      : (
        <Redirect
          to={{
            pathname: redirectTo,
          }}
        />
      )
  );
};

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
