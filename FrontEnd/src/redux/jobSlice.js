import { createSlice } from "@reduxjs/toolkit"

const jobSlice = createSlice({
    name: "job",
    initialState: {
        allJobs: [],  // for nany user 
        allAdminJobs: [], //for many users
        singleJob: null,
        searchJobByText: "",
        allAppliedJobs: [],
        searchedQuery: "",
    },
    reducers: {
        //actions
        setAllJobs: (state, action) => {
            state.allJobs = action.payload;
        },
        setSingleJob: (state, action) => {
            state.singleJob = action.payload
        },
        setallAdminJobs: (state, action) => {
            state.allAdminJobs = action.payload
        },
        setsearchJobByText: (state, action) => {
            state.searchJobByText = action.payload
        },
        setAllAppliedJobs: (state, action) => {
            state.allAppliedJobs = action.payload
        },
        setSearchedQuery: (state, action) => {
            state.searchedQuery = action.payload
        },
    }
});
export const {
    setAllJobs,
    setSingleJob,
    setallAdminJobs,
    setsearchJobByText,
    setAllAppliedJobs,
    setSearchedQuery} = jobSlice.actions;
export default jobSlice.reducer;