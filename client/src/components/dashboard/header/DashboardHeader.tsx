/* eslint-disable no-console */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import SortBy from 'lib/components/SortBy.tsx';


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


interface DashboardHeaderProps {
  orderBy?: String,
  handleClick: () => void,
  handleSortBy: () => void,
}

const DashboardHeader:React.FC<DashboardHeaderProps> =  ({
  handleSortBy,
  orderBy,
  handleClick,
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
        handleSelect={handleSortBy}
      />

      <Button onClick={handleClick} variant="contained" className={`h-50 content-center m-0 p-0 ${classes.button}`}>
        <div className="p-2 font-weight-bold">
          Adaugă bon
        </div>
      </Button>
    </div>
  );
};

export default DashboardHeader;
