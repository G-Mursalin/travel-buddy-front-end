import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from '@mui/material';

const AllTripsSidebar = () => {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Filter
      </Typography>
      <FormGroup>
        <Typography variant="subtitle1" gutterBottom>
          Travel Type
        </Typography>
        {['Adventure', 'Relaxation', 'Cultural', 'Family'].map((type) => (
          <FormControlLabel
            key={type}
            control={
              <Checkbox
              // checked={filters.travelType.includes(type)}
              // onChange={() => handleFilterChange('travelType', type)}
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
        {['$0 - $500', '$500 - $1,000', '$1,000+'].map((range) => (
          <FormControlLabel
            key={range}
            control={
              <Checkbox
              // checked={filters.priceRange.includes(range)}
              // onChange={() => handleFilterChange('priceRange', range)}
              />
            }
            label={range}
          />
        ))}
      </FormGroup>
    </Box>
  );
};

export default AllTripsSidebar;
