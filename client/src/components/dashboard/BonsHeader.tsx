/* eslint-disable no-console */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Mutation } from 'react-apollo';
import faker from 'faker';

import SortBy from 'lib/components/SortBy.tsx';


import { GET_PAGINATED_BONS, CREATE_BON } from './queries.tsx';


const useStyles = makeStyles({
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


interface BonsHeaderProps {
  fetchMore?: any,
  refetch?: any,
  orderBy?: String,
}

const BonsHeader:React.FC<BonsHeaderProps> =  ({
  fetchMore,
  refetch,
  orderBy,
}) => {
  const classes = useStyles();

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


  return (
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
  );
};

export default BonsHeader;
