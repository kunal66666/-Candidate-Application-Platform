// JobsList.jsx
import React, { useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs } from '../store/features/jobsSlice';
import JobCard from './JobCard';
import Filters from './Filters';
import { Box, Grid } from '@mui/material';

const JobsList = () => {
  const dispatch = useDispatch();
  const { jobs, totalCount, filters, loading, error } = useSelector((state) => state.jobs);
  const observer = useRef();
  const lastJobElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && jobs.length < totalCount) {
          dispatch(fetchJobs({ limit: 10, offset: jobs.length }));
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, jobs.length, totalCount, dispatch]
  );

  useEffect(() => {
    dispatch(fetchJobs({ limit: 10, offset: 0 }));
  }, [dispatch]);

  const filteredJobs = jobs.filter((job) => {
    const {
      minExperience,
      companyName,
      location,
      remoteOnsite,
      techStack,
      role,
      minBasePay,
    } = filters;
  
    const matchesMinExperience = !minExperience || job.minExp >= parseInt(minExperience);
    const matchesCompanyName = !companyName || job.jobDetailsFromCompany.toLowerCase().includes(companyName.toLowerCase());
    const matchesLocation =
      !location ||
      (location.toLowerCase() === 'remote'
        ? job.location.toLowerCase() === 'remote'
        : job.location.toLowerCase().includes(location.toLowerCase()));
    const matchesRemoteOnsite =
      !remoteOnsite ||
      (remoteOnsite.toLowerCase() === 'remote'
        ? job.location.toLowerCase() === 'remote'
        : job.location.toLowerCase() !== 'remote');
    const matchesTechStack = !techStack || job.jobDetailsFromCompany.toLowerCase().includes(techStack.toLowerCase());
    const matchesRole = !role || job.jobRole.toLowerCase().includes(role.toLowerCase());
    const matchesMinBasePay = !minBasePay || (job.minJdSalary && job.minJdSalary >= parseFloat(minBasePay));
  
    return (
      matchesMinExperience &&
      matchesCompanyName &&
      matchesLocation &&
      matchesRemoteOnsite &&
      matchesTechStack &&
      matchesRole &&
      matchesMinBasePay
    );
  });
  return (
    <Box>
      <Filters />
      {error && <div>{error}</div>}
      <Grid container spacing={2}>
  {filteredJobs.map((job, index) => {
    const key = `${job.jdUid}-${index}`;
    if (jobs.length === index + 1) {
      return (
        <div ref={lastJobElementRef} key={key}>
          <JobCard job={job} />
        </div>
      );
    } else {
      return <JobCard key={key} job={job} />;
    }
  })}
</Grid>
      {loading && <div>Loading...</div>}
    </Box>
  );
};

export default JobsList;