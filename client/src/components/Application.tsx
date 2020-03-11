import { Route, Redirect, Switch } from 'react-router-dom';
import React from 'react';
import Dashboard from 'components/dashboard/Dashboard.tsx';
import SwipeableDrawer from 'components/drawer/SwipeableDrawer.tsx';
import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;
const useStyles = makeStyles({
  container: {
    width: `calc(100% - ${drawerWidth}px)`,
    height: '100%',
  },

});

const Application: React.FC = () => {
  const classes = useStyles();
  return (
    <main className="w-100 h-100 main-bg d-flex">
      <SwipeableDrawer />
      <div className={classes.container}>
        <Switch>
          <Route
            exact
            path="/dashboard"
            component={Dashboard}
          />
          <Redirect to="/dashboard" />
        </Switch>
      </div>
    </main>

  );
};

export default Application;
