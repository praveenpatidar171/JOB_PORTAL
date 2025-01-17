import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
    name: 'application',
    initialState: {
        allAppliedJobs: [],
    },
    reducers: {
        setAllAppliedJobs: (state, action) => {
            state.allAppliedJobs = action.payload
        }
    }
});

export const { setAllAppliedJobs } = applicationSlice.actions;
export default applicationSlice.reducer;