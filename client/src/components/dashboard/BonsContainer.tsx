/* eslint-disable no-console */
import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import { pathOr } from 'ramda';
import { GET_PAGINATED_BONS } from './queries.tsx';
import BonsHeader from './BonsHeader.tsx';
import BonsBody from './BonsBody.tsx';

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
      {(props) => renderResponse({
        ...props,  orderBy, first, skip,
      })}
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
  first,
}) => {
  return (
    <Fragment>
      <BonsHeader fetchMore={first} refetch={refetch} orderBy={orderBy} />
      <BonsBody data={pathOr([], ['bons'], data)} loading={loading} error={error} refetch={refetch} fetchMore={fetchMore} />
    </Fragment>
  );
};

export default BonsContainer;
