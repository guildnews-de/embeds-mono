import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { apiReducer } from './slice/apiSlice';
import { appReducer } from './slice/appSlice';
import { mapReducer } from './slice/mapSlice';
import { markerReducer } from './slice/markerSlice';

import gw2Middleware from './gw2Middleware';
import gnMiddleware from './gnMiddleware';

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
    })
      .concat(gw2Middleware)
      .concat(gnMiddleware),
});

type RootState = ReturnType<typeof rootReducer>;
type AppDispatch = typeof store.dispatch;

export { store };
export type { RootState, AppDispatch };
