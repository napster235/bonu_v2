import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Box from '@material-ui/core/Box';
import { Archive } from 'react-feather';

const drawerWidth = 240;

const useStyles = makeStyles(() => createStyles({
  drawer: {
    width: drawerWidth,
    height: '100%',
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
}));

const SwipeableDrawer: React.FC = () => {
  const classes = useStyles();

  const routes = [
    { text: 'Listă bonuri', icon: <Archive color="#acacac" />, linkTo: 'dashboard' },
  ];

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <div
        className="w-100"
        role="presentation"
      >
        <Box component="h4" my={2} className=" content-center">
          {'Bonu\''}
        </Box>

        <List>
          {
            routes.map(route => {
              return (
                <ListItem button key={route.text}>
                  <ListItemIcon className="content-center">
                    {route.icon}
                  </ListItemIcon>
                  <div>{route.text}</div>
                </ListItem>
              );
            })}

        </List>
      </div>
    </Drawer>
  );
};

export default SwipeableDrawer;