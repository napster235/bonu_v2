/* eslint-disable no-console */
import React, { Fragment } from 'react';
import LoadingSpinner from 'lib/components/LoadingSpinner';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import SortBy from 'lib/components/SortBy.tsx';

import { Query } from 'react-apollo';

import { GET_PAGINATED_BONS } from './queries.tsx';
import DashboardCard from './DashboardCard';

const defaultTextColor =  '#3d4977';

const useStyles = makeStyles({
  textColor: {
    color: defaultTextColor,
  },
  container: {
    maxHeight: '70vh',
    overflowY: 'auto',
  },
});


const QueryContent = ({
  data, loading, error,
}) => {
  if (!data) {
    return <LoadingSpinner />;
  }
  const classes = useStyles();

  const { bons } = data;

  if (loading || !bons.length) {
    return <LoadingSpinner />;
  }

  if (error) {
    console.log(error);
  }

  return (
    <Grid container spacing={1} className={`${classes.container}`}>
      {bons.map((bon: { id: any; purchaseDate?: string | undefined; notes?: string | undefined; amount?: number | undefined; }) => <DashboardCard key={bon.id} data={bon} />)}
    </Grid>
  );
};

const BonsContainer = ({ first, skip, orderBy = 'createdAt_ASC' }) => {
  const sortByOptions = [
    {
      id: 'createdAt_DESC',
      name: 'Descrescator',
    },
    {
      id: 'createdAt_ASC',
      name: 'Crescator',
    },
  ];
  return (
    <Query
      query={GET_PAGINATED_BONS}
      variables={{ first, skip, orderBy }}
    >

      {({
        data,
        loading,
        error,
        fetchMore,
      }) => (
        <Fragment>
          <Box mx={8} mb={5}>
            <SortBy
              options={sortByOptions}
              defaultValue={orderBy}
              handleSelect={(value: any) => fetchMore({
                variables: { orderBy: value },
                updateQuery: (prev: any, { fetchMoreResult }: any) => {
                  if (!fetchMoreResult) return prev;
                  return Object.assign({}, prev, {
                    bons: [...fetchMoreResult.bons],
                  });
                },
              })}
            />
          </Box>
          <QueryContent data={data} error={error} loading={loading} />
        </Fragment>
      )}
    </Query>
  );
};


const Dashboard = () => {
  const classes = useStyles();


  return (
    <div className="container mt-5">
      <div className="w-100 d-flex flex-column">
        <Box component="h4" my={3} className={`${classes.textColor} content-center`}>
          Lista bonuri
        </Box>
      </div>
      <BonsContainer />
    </div>
  );
};

export default Dashboard;
