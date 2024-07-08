import { Middleware, isAnyOf } from '@reduxjs/toolkit';
import axios from 'axios';

import { apiActions, TimerMeta } from './slice/apiSlice';
import type { RootState } from './store';

import { default as dbPromise, type CachedTimerData } from './database';
import { DateTime } from 'luxon';

interface GNAssetsError {
  text: string;
  request: string;
  allowed?: string[];
}

const gnMiddleware: Middleware<Record<string, never>, RootState> =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    const { setError, setEvents, fetchEvents } = apiActions;
    next(action);
    const isApiAction = isAnyOf(fetchEvents);
    if (!isApiAction(action)) return;

    // dispatch(setLoading());
    const { id } = action.payload;
    const cacheKey = `eventTimerData`;
    const dateNow = DateTime.utc();

    // Check if the data is already cached in IndexedDB
    dbPromise()
      .then((db) => {
        return db
          .get('gn_api_data', cacheKey)
          .then((cachedData: CachedTimerData | undefined) => {
            const cacheAge = cachedData
              ? dateNow.diff(cachedData.timestamp, 'days').days
              : 4;
            if (cachedData && cacheAge < 3) {
              // If data is found in IndexedDB, dispatch it

              dispatch(setEvents(cachedData.data));
            } else {
              // axios default configs
              axios.defaults.baseURL = 'https://assets.guildnews.de/events/v1';
              axios.defaults.timeout = 5000;
              axios.defaults.headers.common['Content-Type'] =
                'application/json';

              axios({
                url: `/${id}`,
              })
                .then(({ data }: { data: Record<string, TimerMeta> }) => {
                  dispatch(setEvents(data));
                  // Store the data in IndexedDB for future use
                  db.put(
                    'gn_api_data',
                    {
                      timestamp: dateNow,
                      data: data,
                    },
                    cacheKey,
                  ).catch((err) => {
                    console.error(err);
                  });
                })
                .catch((error: GNAssetsError) => {
                  dispatch(setError(error));
                })
                .catch((error: GNAssetsError) => {
                  dispatch(setError(error));
                });
              // .finally(() => {
              //   dispatch(setDone());
              // });
            }
          });
      })
      .catch((err) => {
        console.error(err);
      });
  };

export default gnMiddleware;
