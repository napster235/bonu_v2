import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import { Archive } from 'react-feather';

const drawerWidth = 240;
const defaultTextColor =  '#b2c5fb';

const useStyles = makeStyles({
  textColor: {
    color: defaultTextColor,
  },
  divider: {
    background: defaultTextColor,
    opacity: 0.2,
  },
  text: {
    color: defaultTextColor,
    opacity: 0.5,
    fontSize: '0.87rem',
    letterSpacing: '0.2em',
  },
  drawer: {
    width: drawerWidth,
    height: '100%',
    background: '#222843',
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    background: '#222843',
  },
});

const SwipeableDrawer: React.FC = () => {
  const classes = useStyles();

  const routes = [
    { text: 'Listă bonuri', icon: <Archive color="#b2c5fb" />, linkTo: 'dashboard' },
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
        <Box component="h4" my={2} className={`${classes.textColor} content-center`}>
          {'Bonu\''}
        </Box>
        <Divider className={classes.divider} />

        <List>
          {
            routes.map(route => {
              return (
                <ListItem button key={route.text}>
                  <ListItemIcon className="content-center">
                    {route.icon}
                  </ListItemIcon>
                  <div className={classes.text}>{route.text}</div>
                </ListItem>
              );
            })}

        </List>
      </div>
    </Drawer>
  );
};

export default SwipeableDrawer;