/* eslint-disable no-console */
import React, { Fragment } from 'react';
import LoadingSpinner from 'lib/components/LoadingSpinner';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Query,  Mutation } from 'react-apollo';
import faker from 'faker';

import SortBy from 'lib/components/SortBy.tsx';


import { GET_PAGINATED_BONS, CREATE_BON } from './queries.tsx';
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
  button: {
    minWidth: 200,
    backgroundColor: '#12a295',
    color: '#3d4977',
    fontSize: '0.87rem',
    '&:hover': {
      backgroundColor: '#12a275',
    },
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

interface BonsContainerProps {
  first?: number,
  skip?: number,
  orderBy?: String,
}

const BonsContainer:React.FC<BonsContainerProps> = ({ first, skip, orderBy = 'createdAt_DESC' }) => {
  return (
    <Query
      query={GET_PAGINATED_BONS}
      variables={{ first, skip, orderBy }}
    >
      {(props) => renderResponse({ ...props,  orderBy })}
    </Query>
  );
};

const renderResponse =  ({
  data,
  loading,
  error,
  fetchMore,
  refetch,
  orderBy,
}) => {
  const sortByOptions = [
    {
      id: 'createdAt_DESC',
      name: 'Descrescător',
    },
    {
      id: 'createdAt_ASC',
      name: 'Crescător',
    },
  ];

  const classes = useStyles();

  return (
    <Fragment>
      <div className="w-80 my-3 mx-auto d-flex justify-content-between">
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

        <Mutation
          mutation={CREATE_BON}
          variables={{
            userId: 1,
            purchaseDate: faker.fake('{{date.past}}'),
            notes: faker.fake('{{commerce.productName}}'),
            amount: parseInt(faker.fake('{{random.number}}'), 10),
          }}
          update={(cache, fetchMoreResult) => {
            const { bons } = cache.readQuery({
              query: GET_PAGINATED_BONS,
              variables: 'createdAt_DESC',
            });

            if (!fetchMoreResult) return cache;

            cache.writeQuery({
              query: GET_PAGINATED_BONS,
              data: { bons: bons.concat([fetchMoreResult.data.createBon.bon]) },
            });

            return refetch(
              { variables: 'createdAt_DESC' },
            );
          }}
        >
          {(action) => {
            return (
              <Button variant="contained" className={`h-50 content-center m-0 p-0 ${classes.button}`} onClick={action}>
                <div className="p-2 font-weight-bold">
                  Adaugă bon
                </div>
              </Button>
            );
          }}
        </Mutation>


      </div>

      <QueryContent data={data} error={error} loading={loading} />
    </Fragment>
  );
};

export default BonsContainer;
