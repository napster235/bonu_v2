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
  id: number,
  actionQuery: any,
  icon: any,
  tooltipText: string,
  tooltipPosition: string | undefined,
}

const ActionButton:React.FC<ActionButtonProps> = ({
  id, actionQuery, icon, tooltipText = 'Sterge', tooltipPosition = 'right-end',
}) => {
  const classes = useStyles();

  return (
    <Mutation
      mutation={actionQuery}
      variables={{ id }}
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