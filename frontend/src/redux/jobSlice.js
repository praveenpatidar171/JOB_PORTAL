import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: 'job',
    initialState: {
        allJobs: [],
        singleJob: null,
        adminJobs: [],
        searchedQuery: '',
    },
    reducers: {
        setAllJobs: (state, action) => {
            state.allJobs = action.payload
        },
        setSingleJob: (state, action) => {
            state.singleJob = action.payload
        },
        setAdminJobs: (state, action) => {
            state.adminJobs = action.payload
        },
        setSearchedQuery: (state, action) => {
            state.searchedQuery = action.payload
        }
    }
});

export const { setAllJobs, setSingleJob, setAdminJobs, setSearchedQuery } = jobSlice.actions;

export default jobSlice.reducer;