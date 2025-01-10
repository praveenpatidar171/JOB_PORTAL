import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlicer.js';

export const store = configureStore({
    reducer: {
        user: userReducer,
    }
})