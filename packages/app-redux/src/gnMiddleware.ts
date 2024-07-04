import { Middleware, isAnyOf } from '@reduxjs/toolkit';
import { differenceInDays } from 'date-fns';
import { openDB } from 'idb';
import axios from 'axios';

import { apiActions, TimerMeta } from './slice/apiSlice';
import type { RootState } from './store';

interface CachedTimerData {
  data: Record<string, TimerMeta>;
  timestamp: number;
}

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
    const dateNow = new Date();

    const dbPromise = openDB('GuildNews_GW2Embeds', 2, {
      upgrade(db) {
        db.createObjectStore('gw2_api_data');
      },
    });

    // Check if the data is already cached in IndexedDB
    dbPromise
      .then((db) => {
        return db
          .get('gw2_api_data', cacheKey)
          .then((cachedData: CachedTimerData | undefined) => {
            const cacheAge = cachedData
              ? differenceInDays(dateNow, cachedData.timestamp)
              : 4;
            if (cachedData && cacheAge < 3) {
              // If data is found in IndexedDB, dispatch it
              //console.debug('From Database');
              dispatch(setEvents(cachedData.data));
            } else {
              //console.debug('From API');
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
                    'gw2_api_data',
                    {
                      timestamp: dateNow,
                      ...data,
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
