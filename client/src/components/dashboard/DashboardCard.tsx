/* eslint-disable no-console */
import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';

import { makeStyles } from '@material-ui/core/styles';
import { Tag, Calendar, Info } from 'react-feather';

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
interface DashboardCardProps {
  data: Array<{
    purchaseDate?: string,
    notes?: string,
    amount?: number,
  }>
}

const DashboardCard:React.FC<DashboardCardProps> = ({ data }) => {
  const { purchaseDate = new Date(), notes = '', amount = 0 } = data;
  const classes = useStyles();

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
              {amount}
            </div>
          </div>
          <div className="d-flex align-items-center">
            <Calendar size={16} color={defaultTextColor} className="mr-2" />
            <div className={classes.text}>
                Date:
            </div>
            <div className={classes.fieldValue}>
              {purchaseDate}
            </div>
          </div>
          {notes ? (
            <div className="d-flex align-items-center">
              <Info size={16} color={defaultTextColor} className="mr-2" />
              <div className={classes.text}>
                Notes:
              </div>
              <div className={classes.fieldValue}>
                {notes}
              </div>
            </div>
          ) : null}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default DashboardCard;