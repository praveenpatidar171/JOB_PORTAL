import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        loading: false,
        authUser: null
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setAuthUser: (state, action) => {
            state.authUser = action.payload;
        },
    }
});

export const { setLoading, setAuthUser } = userSlice.actions;
export default userSlice.reducer;
