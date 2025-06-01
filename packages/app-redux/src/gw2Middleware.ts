import { Middleware, isAnyOf } from '@reduxjs/toolkit';
import { DateTime } from 'luxon';

import { apiActions } from './slice/apiSlice';
import type { RootState } from './store';

import type {
  GW2ApiMapsResponse,
  GW2ApiRegionsResponse,
} from './shared/gw2Api';
import type { GW2MapsApiData } from './slice/apiSlice';

import { default as openGNDB } from './database';

const gw2Middleware: Middleware<Record<string, never>, RootState> =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    const { setError, setMap, fetchMap } = apiActions;

    if (!setError || !setMap || !fetchMap) {
      throw new Error('api-methods undefined');
    }

    next(action);
    const isApiAction = isAnyOf(fetchMap);
    if (!isApiAction(action)) return;

    // eslint-disable-next-line
    const id = Number(action.payload.id);
    // eslint-disable-next-line
    const lang = action.payload.lang ? String(action.payload.lang) : 'en';
    const cacheKey = `maps_${id}_${lang}`;
    const dateNow = DateTime.utc();

    try {
      const gnDb = await openGNDB();

      const cacheData = await gnDb.get('gn_api_data', cacheKey);
      const cacheAge = cacheData
        ? dateNow.diff(cacheData.timestamp, 'days').days
        : 4;
      if (cacheData && cacheAge < 3) {
        // If data is found in IndexedDB, dispatch it
        //console.debug('From Database');
        dispatch(setMap({ mapID: id, apiLang: lang, mapData: cacheData.data }));
      } else {
        const baseUrl = 'https://api.guildwars2.com/v2';
        const fetchMapUrl = new URL(`/maps/${id}`, baseUrl);
        fetchMapUrl.searchParams.append('lang', lang);

        const fetchResponse = await fetch(fetchMapUrl, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        if (!fetchResponse.ok) {
          throw new Error(`HTTP error! status: ${fetchResponse.status}`);
        }
        const fetchMapData = (await fetchResponse.json()) as GW2ApiMapsResponse;

        const fetchRegionUrl = new URL(
          `/continents/1/floors/1/regions/${fetchMapData.region_id}/maps/${id}`,
          baseUrl,
        );
        fetchRegionUrl.searchParams.append('lang', lang);
        const fetchRegionsResponse = await fetch(fetchMapUrl, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        if (!fetchRegionsResponse.ok) {
          throw new Error(`HTTP error! status: ${fetchRegionsResponse.status}`);
        }
        const fetchRegionsData =
          (await fetchRegionsResponse.json()) as GW2ApiRegionsResponse;
        const {
          label_coord,
          points_of_interest: poi,
          sectors,
        } = fetchRegionsData;

        const combinedData: GW2MapsApiData = {
          ...fetchMapData,
          label_coord,
          poi,
          sectors,
        };

        dispatch(
          setMap({
            mapID: id,
            apiLang: lang,
            mapData: combinedData,
          }),
        );

        await gnDb.put(
          'gw2_api_data',
          {
            timestamp: dateNow,
            data: combinedData,
          },
          cacheKey,
        );
      }
    } catch (error) {
      // FixMe: Fehlerverarbeitung umbauen (GNAssetsError)
      dispatch(setError(error));
    }
  };

export default gw2Middleware;
