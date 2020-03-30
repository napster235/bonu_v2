/* eslint-disable no-console */
import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import {  Mutation } from 'react-apollo';

import { makeStyles, createStyles } from '@material-ui/core/styles';
import { GET_PAGINATED_BONS } from './queries.tsx';

const useStyles =  makeStyles(() =>   createStyles({
  button: {
    minWidth: '100%',
    backgroundColor: '#b2c5fb',
  },
}));

interface ActionButtonProps {
  variables: any,
  actionQuery: any,
  icon: any,
  tooltipText: string,
  tooltipPosition: string | undefined,
  refetch: any | undefined,
}

const ActionButton:React.FC<ActionButtonProps> = ({
  variables, actionQuery, icon, tooltipText = 'Sterge', tooltipPosition = 'right-end', refetch,
}) => {
  const classes = useStyles();

  return (
    <Mutation
      mutation={actionQuery}
      variables={{ ...variables }}
      update={cache => {
        const data = cache.readQuery({
          query: GET_PAGINATED_BONS,
        });

        cache.writeQuery({
          query: GET_PAGINATED_BONS,
          data: {
            ...data,
            bons: {
              ...data.bons,
            },
          },
        });
        return refetch();
      }}
    >
      {(action) => {
        return (
          <Tooltip title={tooltipText} placement={tooltipPosition}>
            <Button variant="contained" className={`h-50 content-center m-0 p-0 ${classes.button}`} onClick={action}>
              {icon()}
            </Button>
          </Tooltip>
        );
      }}
    </Mutation>


  );
};
export default ActionButton;