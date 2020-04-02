/* eslint-disable no-console */
import React from 'react';
import LoadingSpinner from 'lib/components/LoadingSpinner';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import DashboardCard from './card/DashboardCard';

const useStyles = makeStyles({
  container: {
    maxHeight: '70vh',
    overflowY: 'auto',
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
  if (!data) {
    return <LoadingSpinner />;
  }
  const classes = useStyles();


  if (loading || !data.length) {
    return <LoadingSpinner />;
  }

  if (error) {
    console.log(error);
  }


  return (
    <Grid container spacing={1} className={`${classes.container}`}>
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
