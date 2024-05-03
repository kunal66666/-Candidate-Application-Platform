import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  jobs: [],
  totalCount: 0,
  filters: {
    minExperience: '',
    companyName: '',
    location: '',
    remoteOnsite: '',
    techStack: '',
    role: '',
    minBasePay: '',
  },
  loading: false,
  error: null,
};

// jobsSlice.js
export const fetchJobs = createAsyncThunk('jobs/fetchJobs', async (payload) => {
  const { limit, offset } = payload;
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  const raw = JSON.stringify({ limit, offset });
  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
  };

  const response = await fetch('https://api.weekday.technology/adhoc/getSampleJdJSON', requestOptions);
  const data = await response.json();
  console.log(data);
  return data;
});

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    updateFilters: (state, action) => {
      state.filters = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        console.log('Fetching jobs (pending)');
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        console.log('Fetching jobs (fulfilled)');
        state.loading = false;
        state.jobs = [...state.jobs, ...action.payload.jdList];
        state.totalCount = action.payload.totalCount;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        console.log('Fetching jobs (rejected)');
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { updateFilters } = jobsSlice.actions;
export default jobsSlice.reducer;
