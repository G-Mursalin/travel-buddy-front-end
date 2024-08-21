'use client';

import { TextField } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

const AllTripsSearchBox = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get('searchTerm') || ''
  );

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      updateSearchParam(searchTerm);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const updateSearchParam = (value: string) => {
    const currentParams = new URLSearchParams(searchParams.toString());

    if (value) {
      currentParams.set('searchTerm', value);
    } else {
      currentParams.delete('searchTerm');
    }

    // Preserve other existing parameters
    const travelType = currentParams.get('travelType');
    const minPrice = currentParams.get('minPrice');
    const maxPrice = currentParams.get('maxPrice');

    if (travelType) currentParams.set('travelType', travelType);
    if (minPrice) currentParams.set('minPrice', minPrice);
    if (maxPrice) currentParams.set('maxPrice', maxPrice);

    router.push(`/all-trip?${currentParams.toString()}`);
  };

  return (
    <TextField
      variant="outlined"
      placeholder="Search trips..."
      value={searchTerm}
      onChange={handleSearchChange}
      sx={{ flexGrow: 1 }}
    />
  );
};

export default AllTripsSearchBox;
