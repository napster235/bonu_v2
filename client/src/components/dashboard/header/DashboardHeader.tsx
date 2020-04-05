/* eslint-disable no-console */
import React from 'react';

import SortBy from 'lib/components/SortBy.tsx';


interface DashboardHeaderProps {
  orderBy?: String,
  handleClick: () => void,
  handleSortBy: () => void,
}

const DashboardHeader:React.FC<DashboardHeaderProps> =  ({
  handleSortBy,
  orderBy,
}) => {
  const sortByOptions = [
    {
      id: 'createdAt_DESC',
      name: 'Descrescător după data creării',
    },
    {
      id: 'createdAt_ASC',
      name: 'Crescător după data creării',
    },
    {
      id: 'purchase_dates_ASC',
      name: 'Crescător după data achizitionarii',
    },
    {
      id: 'purchase_dates_DESC',
      name: 'Descrescător după data achizitionarii',
    },
    {
      id: 'amount_ASC',
      name: 'Crescător după sumă',
    },
    {
      id: 'amount_DESC',
      name: 'Descrescător după sumă',
    },
  ];


  return (
    <div className="w-100 mt-3 mb-5 mx-auto d-flex justify-content-between">
      <SortBy
        options={sortByOptions}
        defaultValue={orderBy}
        handleSelect={handleSortBy}
      />

    </div>
  );
};

export default DashboardHeader;
