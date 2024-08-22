'use client';

import { Pagination } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent } from 'react';

type TAllTripsPaginationProps = {
  metaData: { page: string; limit: string; total: string; totalPage: string };
};

const AllTripsPagination = ({ metaData }: TAllTripsPaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  //   Handle Pagination
  const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
    const currentParams = new URLSearchParams(searchParams.toString());

    // Update page parameter
    currentParams.set('page', value.toString());

    // Ensure limit parameter is set // Default limit 8
    // if (!currentParams.has('limit')) {
    //   currentParams.set('limit', '8');
    // }

    // Construct new URL with updated parameters
    const newUrl = `/all-trip?${currentParams.toString()}`;

    // Navigate to new URL
    router.push(newUrl);
  };

  return (
    <Pagination
      count={Number(metaData.totalPage)}
      page={Number(metaData.page)}
      onChange={handlePageChange}
      color="primary"
    />
  );
};

export default AllTripsPagination;
