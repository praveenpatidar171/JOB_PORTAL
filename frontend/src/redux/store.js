import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlicer.js';
import jobReducer from './jobSlice.js';
export const store = configureStore({
    reducer: {
        user: userReducer,
        job: jobReducer,
    }
})