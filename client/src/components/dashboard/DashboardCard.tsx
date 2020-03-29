/* eslint-disable no-console */
import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Tooltip from '@material-ui/core/Tooltip';

import Grid from '@material-ui/core/Grid';

import { makeStyles, createStyles } from '@material-ui/core/styles';
import {
  Tag, Calendar, Info, Edit, Trash,
} from 'react-feather';
import { DELETE_BON, CREATE_BON } from './queries.tsx';
import ActionButton from './ActionButton.tsx';

const defaultTextColor =  '#3d4977';
const gridContainerPadding = 200;


const useStyles =  makeStyles(() =>   createStyles({
  textColor: {
    color: defaultTextColor,
  },
  text: {
    color: defaultTextColor,
    fontSize: '1rem',
  },
  root: {
    minWidth: 275,
    margin: '0 4rem',
  },
  title: {
    fontSize: 14,
  },
  fieldValue: {
    fontWeight: 'bold',
    color: defaultTextColor,
    fontSize: '1rem',
    marginLeft: '0.5rem',
    width: '100%',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  grid: {
    maxHeight: `calc(100% - ${gridContainerPadding}px)`,
    height: `calc(100% - ${gridContainerPadding}px)`,
    overflowY: 'auto',
  },
  cardControllers: {
    width: '10% !important',
    display: 'flex',
    flexDirection: 'column',
  },
}));


const CardContentItem = ({
  classes, label, value, icon,
}) => {
  return (
    <div className="d-flex align-items-center">
      { icon() }
      <div className={classes.text}>
        {`${label}: `}
      </div>
      <Tooltip title={`${label}: ${value}`} placement="left-start">
        <div className={classes.fieldValue}>
          {value}
        </div>
      </Tooltip>
    </div>
  );
};


interface DashboardCardProps {
  data: {
    purchaseDate?: string,
    notes?: string,
    amount?: number,
    id: number,
  }
}

const DashboardCard:React.FC<DashboardCardProps> = ({ data }) => {
  const {
    purchaseDate = '', notes = '', amount = 0, id,
  } = data;
  const classes = useStyles();

  return (
    <Grid item xs={6} key={`${id}`}>
      <Card className={classes.root}>
        <div className="d-flex w-100">
          <div className="w-90">
            <CardContent>
              <CardContentItem
                classes={classes}
                label="Suma"
                value={`${amount} RON`}
                icon={() => <Tag size={16} color={defaultTextColor} className="mr-2" />}
              />
              <CardContentItem
                classes={classes}
                label="Data"
                value={purchaseDate}
                icon={() => <Calendar size={16} color={defaultTextColor} className="mr-2" />}
              />

              {notes
                ? (
                  <CardContentItem
                    classes={classes}
                    label="Note"
                    value={notes}
                    icon={() => <Info size={16} color={defaultTextColor} className="mr-2" />}
                  />
                ) : null}
            </CardContent>
          </div>
          <div className={classes.cardControllers}>
            <ActionButton
              tooltipText="Editare"
              icon={() => <Edit size={16} color={defaultTextColor}  />}
              id={id}
              actionQuery={CREATE_BON}
            />
            <ActionButton
              tooltipText="Stergere"
              icon={() => <Trash size={16} color={defaultTextColor}  />}
              id={id}
              actionQuery={DELETE_BON}
            />
          </div>
        </div>

      </Card>
    </Grid>
  );
};

export default DashboardCard;