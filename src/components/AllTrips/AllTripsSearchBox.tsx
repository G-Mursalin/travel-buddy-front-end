import { TextField } from '@mui/material';

const AllTripsSearchBox = () => {
  return (
    <TextField
      variant="outlined"
      placeholder="Search trips..."
      //   value={searchTerm}
      //   onChange={handleSearchChange}
      sx={{ flexGrow: 1 }}
    />
  );
};

export default AllTripsSearchBox;
