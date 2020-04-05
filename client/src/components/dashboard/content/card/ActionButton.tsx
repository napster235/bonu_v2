/* eslint-disable no-console */
import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles =  makeStyles((theme: Theme) =>   createStyles({
  button: {
    minWidth: '100%',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.white,
  },
}));

interface ActionButtonProps {
  variables: any,
  actionQuery: any,
  icon: any,
  tooltipText: string,
  tooltipPosition: string | undefined,
  refetch: any | undefined,
  handleClick: (any) => void,
}

const ActionButton:React.FC<ActionButtonProps> = ({
  icon,
  tooltipText = 'Sterge',
  tooltipPosition = 'right-end',
  handleClick,
}) => {
  const classes = useStyles();

  return (
    <Tooltip title={tooltipText} placement={tooltipPosition}>
      <Button variant="contained" className={`h-50 border-0 content-center m-0 p-0 ${classes.button}`} onClick={handleClick}>
        {icon()}
      </Button>
    </Tooltip>
  );
};
export default ActionButton;