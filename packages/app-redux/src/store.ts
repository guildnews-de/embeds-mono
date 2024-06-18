import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { default as apiReducer } from './slice/apiSlice';
import { default as appReducer } from './slice/appSlice';
import { default as mapReducer } from './slice/mapSlice';
import { default as markerReducer } from './slice/markerSlice';

import gw2Middleware from './gw2Middleware';

const rootReducer = combineReducers({
  api: apiReducer,
  app: appReducer,
  map: mapReducer,
  marker: markerReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(gw2Middleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export default store;
