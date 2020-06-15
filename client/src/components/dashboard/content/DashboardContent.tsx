/* eslint-disable no-console */
import React from 'react';
import LoadingSpinner from 'lib/components/LoadingSpinner';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import { Typography } from '@material-ui/core';
import DashboardCard from './card/DashboardCard';

const useStyles = makeStyles({
  container: {
    maxHeight: '70vh',
    overflowY: 'auto',
  },
  loadingContainer: {
    height: '70vh',
  },
});


interface BonsBodyProps {
  data: Array<{
    id: number,
    amount: number,
    purchaseDate: string,
    notes: string,
  }>,
  loading: boolean,
  error?: any,
  refetch: any,
}

const DashboardContent:React.FC<BonsBodyProps> =   ({
  data, loading, error, refetch,
}) => {
  const classes = useStyles();

  if (loading && !data.length) {
    return (
      <div className={`${classes.loadingContainer} content-center flex-column`}>
        <LoadingSpinner />
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className={`${classes.loadingContainer} content-center flex-column`}>
        <Typography>Nu exista niciun bon</Typography>
      </div>
    );
  }

  if (error) {
    console.log(error);
  }


  return (
    <Grid container spacing={3} className={`${classes.container} w-100`}>
      {data.map((bon: { id: any; purchaseDate?: string | undefined; notes?: string | undefined; amount?: number | undefined; }) => {
        return (
          <DashboardCard
            key={bon.id}
            data={bon}
            refetch={refetch}
          />
        );
      })}
    </Grid>
  );
};

export default DashboardContent;
