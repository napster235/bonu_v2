/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { fetchData, deleteBon } from 'api/bonuri';
import { ensureArray } from 'utils/list';
import LoadingSpinner from 'lib/components/LoadingSpinner';
import { isEmpty } from 'ramda';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';


import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import {
  Tag, Calendar, Info, Edit, Trash,
} from 'react-feather';

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
const gridContainerPadding = 200;

const useStyles = makeStyles((theme: Theme) =>   createStyles({
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
  title: {
    fontSize: 14,
  },
  fieldValue: {
    fontWeight: 'bold',
    color: defaultTextColor,
    fontSize: '1rem',
    marginLeft: '0.5rem',
    width: '100%',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  grid: {
    maxHeight: `calc(100% - ${gridContainerPadding}px)`,
    height: `calc(100% - ${gridContainerPadding}px)`,
    overflowY: 'auto',
  },
  cardControllers: {
    width: '10% !important',
    display: 'flex',
    flexDirection: 'column',
  },
  button: {
    minWidth: '100%',
    backgroundColor: '#b2c5fb',
  },
}));


const CardContentItem = ({
  classes, label, value, icon,
}) => {
  return (
    <div className="d-flex align-items-center">
      { icon() }
      <div className={classes.text}>
        {`${label}: `}
      </div>
      <Tooltip title={`${label}: ${value}`} placement="left-start">
        <div className={classes.fieldValue}>
          {value}
        </div>
      </Tooltip>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const [data, setData] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    fetchData()
      .then(({ body }) => setData(body))
      .catch((err) => console.log('Fetch Error :-S', err));
  }, []);


  const deleteItem = (d) => {
    deleteBon(d)
      .then(({ body }) => setData(body))
      .catch((err) => console.log('Fetch Error :-S', err));
  };

  if (isEmpty(data)) {
    return <LoadingSpinner />;
  }


  return (
    <div className="container mt-5 w-100 h-100">
      <Box component="h4" my={3} className={`${classes.textColor} content-center`}>
        Lista bonuri
      </Box>
      <Grid container spacing={1} className={classes.grid}>
        {ensureArray(data).map(d => {
          const date = formatDate(new Date(d.purchase_date));
          return (
            <Grid item xs={6} key={`${d.id}`}>
              <Card className={classes.root}>
                <div className="d-flex w-100">
                  <div className="w-90">
                    <CardContent>
                      <CardContentItem
                        classes={classes}
                        label="Suma"
                        value={`${d.amount} RON`}
                        icon={() => <Tag size={16} color={defaultTextColor} className="mr-2" />}
                      />
                      <CardContentItem
                        classes={classes}
                        label="Data"
                        value={date}
                        icon={() => <Calendar size={16} color={defaultTextColor} className="mr-2" />}
                      />

                      {d.notes
                        ? (
                          <CardContentItem
                            classes={classes}
                            label="Note"
                            value={d.notes}
                            icon={() => <Info size={16} color={defaultTextColor} className="mr-2" />}
                          />
                        ) : null}
                    </CardContent>
                  </div>
                  <div className={classes.cardControllers}>
                    <Tooltip title="Editare" placement="right-end">
                      <Button variant="contained" className={`h-50 content-center m-0 p-0 ${classes.button}`}>
                        <Edit size={16} color={defaultTextColor}  />
                      </Button>
                    </Tooltip>

                    <Tooltip title="Sterge" placement="right-end">
                      <Button variant="contained" className={`h-50 content-center m-0 p-0 ${classes.button}`} onClick={() => deleteItem(d)}>
                        <Trash size={16} color={defaultTextColor}  />
                      </Button>
                    </Tooltip>

                  </div>
                </div>

              </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default Dashboard;
