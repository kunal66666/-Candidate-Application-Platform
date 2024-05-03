import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateFilters } from '../store/features/jobsSlice';
import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Typography,
} from '@mui/material';

const Filters = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.jobs.filters);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    dispatch(updateFilters({ ...filters, [name]: value }));
  };

  return (
    <Box sx={{ m:2 }}>
      <Typography variant="h6" gutterBottom>
        Filters
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={4} sm={4} md={2}>
          <TextField
            fullWidth
            name="minExperience"
            label="Min Experience"
            value={filters.minExperience}
            onChange={handleFilterChange}
          />
        </Grid>
        <Grid item xs={4} sm={4} md={2}>
          <TextField
            fullWidth
            name="companyName"
            label="Company Name"
            value={filters.companyName}
            onChange={handleFilterChange}
          />
        </Grid>
        <Grid item xs={4} sm={4} md={2}>
          <TextField
            fullWidth
            name="location"
            label="Location"
            value={filters.location}
            onChange={handleFilterChange}
          />
        </Grid>
        <Grid item xs={4} sm={4} md={2}>
          <TextField
            fullWidth
            name="techStack"
            label="Tech Stack"
            value={filters.techStack}
            onChange={handleFilterChange}
          />
        </Grid>
        <Grid item xs={4} sm={4} md={2}>
          <TextField
            fullWidth
            name="role"
            label="Role"
            value={filters.role}
            onChange={handleFilterChange}
          />
        </Grid>
        <Grid item xs={4} sm={4} md={2}>
  <FormControl fullWidth>
    <InputLabel id="remote-onsite-label">Remote/On-site</InputLabel>
    <Select
      name="remoteOnsite"
      value={filters.remoteOnsite}
      onChange={handleFilterChange}
      label="Remote/On-site"
      labelId="remote-onsite-label"
    >
      <MenuItem value="">All</MenuItem>
      <MenuItem value="remote">Remote</MenuItem>
      <MenuItem value="onsite">On-site</MenuItem>
    </Select>
  </FormControl>
</Grid>
        <Grid item xs={4} sm={4} md={2}>
          <TextField
            fullWidth
            name="minBasePay"
            label="Min Base Pay"
            value={filters.minBasePay}
            onChange={handleFilterChange}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Filters;