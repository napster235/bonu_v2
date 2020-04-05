import { Route, Redirect, Switch } from 'react-router-dom';
import React, { Fragment } from 'react';
import Dashboard from 'components/dashboard/Dashboard.tsx';
import {
  makeStyles,
} from '@material-ui/core/styles';
import { User } from 'react-feather';


import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  container: {
    width: '100%',
    height: '100%',
  },
  title: {
    flexGrow: 1,
  },
});


const Application: React.FC = () => {
  const classes = useStyles();
  return (
    <Fragment>
      <div className="w-100">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Lista de bonuri
            </Typography>
            <Button
              startIcon={<User className="p-0 m-0" color="#f9fafc" />}
              color="inherit"
            />
          </Toolbar>
        </AppBar>
      </div>
      <main className="w-100 h-100 main-bg d-flex">
        {/* <SwipeableDrawer /> */}
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
    </Fragment>
  );
};

export default Application;
