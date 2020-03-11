/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { fetchData } from 'api/bonuri';
import { ensureArray } from 'utils/list';
import LoadingSpinner from 'lib/components/LoadingSpinner';
import { isEmpty } from 'ramda';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { Tag, Calendar, Info } from 'react-feather';

const formatDate = (date) => {
  let dd = date.getDate();
  let mm = date.getMonth() + 1;

  const yyyy = date.getFullYear();
  if (dd < 10) {
    dd = `0${dd}`;
  }
  if (mm < 10) {
    mm = `0${mm}`;
  }
  return `${dd}/${mm}/${yyyy}`;
};

const defaultTextColor =  '#3d4977';

const useStyles = makeStyles({
  textColor: {
    color: defaultTextColor,
  },
  text: {
    color: defaultTextColor,
    fontSize: '1rem',
  },
  root: {
    minWidth: 275,
    margin: '0 4rem',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  fieldValue: {
    fontWeight: 'bold',
    color: defaultTextColor,
    fontSize: '1rem',
    marginLeft: '0.5rem',
  },
});

const Dashboard: React.FC = () => {
  const [data, setData] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    fetchData()
      .then(({ body }) => setData(body))
      .catch((err) => console.log('Fetch Error :-S', err));
  }, []);


  if (isEmpty(data)) {
    return <LoadingSpinner />;
  }


  return (
    <div className="container mt-5">
      <Box component="h4" my={3} className={`${classes.textColor} content-center`}>
        Dashboard
      </Box>
      <Grid container spacing={1}>
        {ensureArray(data).map(d => {
          const date = formatDate(new Date(d.purchase_date));
          return (
            <Grid item xs={6} md={3}>
              <Card className={classes.root}>
                <CardContent>
                  <div className="d-flex align-items-center">
                    <Tag size={16} color={defaultTextColor} className="mr-2" />
                    <div className={classes.text}>
                      Amount:
                    </div>
                    <div className={classes.fieldValue}>
                      {d.amount}
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <Calendar size={16} color={defaultTextColor} className="mr-2" />
                    <div className={classes.text}>
                      Date:
                    </div>
                    <div className={classes.fieldValue}>
                      {date}
                    </div>
                  </div>
                  {d.notes ? (
                    <div className="d-flex align-items-center">
                      <Info size={16} color={defaultTextColor} className="mr-2" />
                      <div className={classes.text}>
                      Notes:
                      </div>
                      <div className={classes.fieldValue}>
                        {d.notes}
                      </div>
                    </div>
                  ) : null}
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default Dashboard;
