import { Middleware, isAnyOf } from '@reduxjs/toolkit';
import { DateTime } from 'luxon';
import axios from 'axios';

import { apiActions } from './slice/apiSlice';
import type { RootState } from './store';

import {
  GW2ApiMapsResponse,
  type GW2ApiRegionsResponse,
  type GW2ApiError,
} from './shared/gw2Api';

import { default as dbPromise, type CachedGW2Data } from './database';

const gw2Middleware: Middleware<Record<string, never>, RootState> =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    const { setError, setMap, fetchMap } = apiActions;
    next(action);
    const isApiAction = isAnyOf(fetchMap);
    if (!isApiAction(action)) return;

    // dispatch(setLoading());
    const { id, lang = 'en' } = action.payload;
    const cacheKey = `maps_${id}_${lang}`;
    const dateNow = DateTime.utc();

    // Check if the data is already cached in IndexedDB
    dbPromise()
      .then((db) => {
        return db
          .get('gw2_api_data', cacheKey)
          .then((cachedData: CachedGW2Data | undefined) => {
            const cacheAge = cachedData
              ? dateNow.diff(cachedData.timestamp, 'days').days
              : 4;
            if (cachedData && cacheAge < 3) {
              // If data is found in IndexedDB, dispatch it
              //console.debug('From Database');
              dispatch(
                setMap({ mapID: id, apiLang: lang, mapData: cachedData.data }),
              );
            } else {
              //console.debug('From API');
              // axios default configs
              axios.defaults.baseURL = 'https://api.guildwars2.com/v2';
              axios.defaults.timeout = 5000;
              axios.defaults.headers.common['Content-Type'] =
                'application/json';

              const special = [922];

              const apiData = {
                regId: 0,
                map: {} as GW2ApiMapsResponse,
              };
              axios({
                url: `/maps/${id}`,
                params: {
                  lang: lang,
                },
              })
                .then(({ data }: { data: GW2ApiMapsResponse }) => {
                  apiData.regId = data.region_id!;
                  apiData.map = data;

                  if (special.includes(id)) {
                    axios.defaults.baseURL =
                      'https://assets.guildnews.de/maps/v2';
                  }
                  // dispatch(setMap({ mapID: id!, mapData: data }));
                })
                .then(() => {
                  axios({
                    url: `/continents/1/floors/1/regions/${apiData.regId}/maps/${id}`,
                    params: {
                      lang: lang,
                    },
                  })
                    .then(({ data }: { data: GW2ApiRegionsResponse }) => {
                      const {
                        label_coord,
                        points_of_interest: poi,
                        sectors,
                      } = data;
                      const cropData = {
                        label_coord: label_coord,
                        poi: poi,
                        sectors: sectors,
                      };
                      apiData.map = {
                        ...apiData.map,
                        ...cropData,
                      };
                      //console.log(JSON.stringify(cropData));
                      //console.log(JSON.stringify(data));
                      dispatch(
                        setMap({
                          mapID: id,
                          apiLang: lang,
                          mapData: apiData.map,
                        }),
                      );
                      // Store the data in IndexedDB for future use
                      db.put(
                        'gw2_api_data',
                        {
                          timestamp: dateNow,
                          data: apiData.map,
                        },
                        cacheKey,
                      ).catch((err) => {
                        console.error(err);
                      });
                    })
                    .catch((error: GW2ApiError) => {
                      dispatch(setError(error));
                    });
                })
                .catch((error: GW2ApiError) => {
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

export default gw2Middleware;
