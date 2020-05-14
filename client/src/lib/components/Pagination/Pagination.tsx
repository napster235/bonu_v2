import React, { FC } from 'react';
import MUIPagination from '@material-ui/lab/Pagination';
import classNames from 'classnames';
import { useStyles__Pagination } from './styles';

interface PaginationProps {
  total: number,
  currentPage: number,
  handleChange: (event: object, page: number) => void
}
export const Pagination:FC<PaginationProps> = ({ total = 10, currentPage = 1, handleChange }) => {
  const classes = useStyles__Pagination();
  return (
    <div className={classNames(classes.root, 'content-center')}>
      <MUIPagination count={total} page={currentPage} color="primary" onChange={handleChange} />
    </div>
  );
};
