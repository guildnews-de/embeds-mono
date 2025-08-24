import { Middleware, isAnyOf } from '@reduxjs/toolkit';

import { setError, setEvents, fetchEvents, TimerMeta } from './slice/apiSlice';
import type { RootState } from './store';

import { default as openGNDB } from './database';
import { DateTime } from 'luxon';
import { GW2ApiError } from './shared/gw2Api';

// interface GNAssetsError {
//   text: string;
//   request: string;
//   allowed?: string[];
// }

const gnMiddleware: Middleware<Record<string, never>, RootState> =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (!setError || !setEvents || !fetchEvents) {
      throw new Error('api-methods undefined');
    }

    next(action);
    const isApiAction = isAnyOf(fetchEvents);
    if (!isApiAction(action)) return;

    const id = action.payload.id;
    const cacheKey = `eventTimerData`;
    const dateNow = DateTime.utc();

    try {
      const gnDb = await openGNDB();

      const cacheData = await gnDb.get('gn_api_data', cacheKey);
      const cacheAge = cacheData
        ? dateNow.diff(cacheData.timestamp, 'days').days
        : 4;
      if (cacheData && cacheAge < 3) {
        dispatch(setEvents(cacheData.data));
      } else {
        const baseUrl = 'https://assets.guildnews.de/events/v1';
        const fetchResponse = await fetch(`${baseUrl}/${id}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        if (!fetchResponse.ok) {
          throw new Error(`HTTP error! status: ${fetchResponse.status}`);
        }
        const fetchData = (await fetchResponse.json()) as Record<
          string,
          TimerMeta
        >;
        dispatch(setEvents(fetchData));

        await gnDb.put(
          'gn_api_data',
          {
            timestamp: dateNow,
            data: fetchData,
          },
          cacheKey,
        );
      }
    } catch (error) {
      // FixMe: Fehlerverarbeitung umbauen (GNAssetsError)
      dispatch(setError(error as GW2ApiError));
    }
  };

export default gnMiddleware;
