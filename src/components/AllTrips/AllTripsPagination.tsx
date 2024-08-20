import { Pagination } from '@mui/material';
import React from 'react';

const AllTripsPagination = () => {
  return (
    <Pagination
      count={10}
      page={1}
      //   onChange={handlePageChange}
      color="primary"
    />
  );
};

export default AllTripsPagination;
