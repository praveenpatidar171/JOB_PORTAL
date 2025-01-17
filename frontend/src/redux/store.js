import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlicer.js';
import jobReducer from './jobSlice.js';
import companyReducer from './companySlice.js';
import applicationSlice from './applicationSlice.js';
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root1',
    version: 1,
    storage,
}

const rootReducer = combineReducers({
    user: userReducer,
    job: jobReducer,
    company: companyReducer,
    application: applicationSlice,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})