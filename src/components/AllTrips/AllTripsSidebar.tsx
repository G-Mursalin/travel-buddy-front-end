'use client';

import { travelPriceRange } from '@/constants/travelPriceRange';
import { travelTypes } from '@/constants/travelTypes';
import { extractPriceRange } from '@/utils/extractPriceRange';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

const AllTripsSidebar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedTravelType, setSelectedTravelType] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState('');

  const handleFilterChange = (query: string, value: string) => {
    // Set To State
    if (query === 'travelType') {
      setSelectedTravelType(value);
    } else if (query === 'priceRange') {
      setSelectedPriceRange(value);
    }

    const currentParams = new URLSearchParams(searchParams.toString());

    // Remove the 'page' parameter
    currentParams.delete('page');

    if (query === 'travelType') {
      currentParams.set(query, value);
    } else if (query === 'priceRange') {
      const { min, max } = extractPriceRange(value);
      currentParams.set('minPrice', min?.toString() || '');
      currentParams.set('maxPrice', max?.toString() || '');
    }

    // Remove empty params
    const paramsToDelete: string[] = [];
    currentParams.forEach((value, key) => {
      if (!value) paramsToDelete.push(key);
    });
    paramsToDelete.forEach((key) => currentParams.delete(key));

    router.push(`/all-trip?${currentParams.toString()}`);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Filter
      </Typography>
      <FormGroup>
        <Typography variant="subtitle1" gutterBottom>
          Travel Type
        </Typography>
        {travelTypes.map((type: string) => (
          <FormControlLabel
            value={searchParams.get('travelType')}
            key={type}
            control={
              <Checkbox
                checked={type === selectedTravelType}
                onChange={() => handleFilterChange('travelType', type)}
              />
            }
            label={type}
          />
        ))}
      </FormGroup>
      <FormGroup sx={{ mt: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          Price Range
        </Typography>
        {travelPriceRange.map((range, i) => (
          <FormControlLabel
            value={searchParams.get('priceRange')}
            key={i}
            control={
              <Checkbox
                checked={range === selectedPriceRange}
                onChange={() => handleFilterChange('priceRange', range)}
              />
            }
            label={range}
          />
        ))}
      </FormGroup>
      <Button
        sx={{ fontSize: '10px', marginTop: '8px' }}
        onClick={() => {
          setSelectedTravelType('');
          setSelectedPriceRange('');
          router.push('/all-trip');
        }}
      >
        Clear Filters
      </Button>
    </Box>
  );
};

export default AllTripsSidebar;
