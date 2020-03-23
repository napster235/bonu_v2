/* eslint-disable no-console */
import React from 'react';
import LoadingSpinner from 'lib/components/LoadingSpinner';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import DashboardCard from './DashboardCard';

const defaultTextColor =  '#3d4977';

const useStyles = makeStyles({
  textColor: {
    color: defaultTextColor,
  },
});

const GET_PAGINATED_BONS = gql`
  query($first: Int!) {
    bons(first: $first)
      @connection(key: "MessagesConnection") {
      id
      notes
      createdAt
      purchaseDate
      amount
    }
  }
`;

const QueryContent = ({
  data, loading, error,
}) => {
  if (!data) {
    return (
      <div>
        Nu exista bonuri adaugate. Incearca sa adaugi unul
      </div>
    );
  }

  const { bons } = data;

  if (loading || !bons.length) {
    return <LoadingSpinner />;
  }

  if (error) {
    console.log(error);
  }

  return (
    <Grid container spacing={1}>
      {bons.map(bon => <DashboardCard data={bon} />)}
    </Grid>
  );
};

const BonsContainer = ({ first = 10, skip = 0 }) => {
  return (
    <Query
      query={GET_PAGINATED_BONS}
      variables={{ first, skip }}
    >
      {response => (<QueryContent {...response} />)}
    </Query>
  );
};


const Dashboard: React.FC = () => {
  const classes = useStyles();

  return (
    <div className="container mt-5">
      <Box component="h4" my={3} className={`${classes.textColor} content-center`}>
        Dashboard
      </Box>
      <BonsContainer />
    </div>
  );
};

export default Dashboard;
