/* eslint-disable no-console */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import BonsContainer from './BonsContainer';

const defaultTextColor =  '#3d4977';

const useStyles = makeStyles({
  textColor: {
    color: defaultTextColor,
  },
});


const Dashboard = () => {
  const classes = useStyles();

  return (
    <div className="container mt-5">
      <div className="w-100 d-flex flex-column">
        <Box component="h4" my={3} className={`${classes.textColor} content-center`}>
          Listă bonuri
        </Box>
      </div>
      <BonsContainer />
    </div>
  );
};

export default Dashboard;
