import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
  GW2ApiMapsResponse,
  GW2ApiError,
  GW2ApiRegionsResponse,
  type GW2ApiPoi,
} from '../shared/gw2Api';

export type GW2ApiLang = 'de' | 'en' | 'es' | 'fr';

export interface GW2MapsApiData
  extends Omit<
    GW2ApiMapsResponse & GW2ApiRegionsResponse,
    'points_of_interest'
  > {
  poi?: Record<number, GW2ApiPoi>;
}

export interface GW2ApiRequestParams {
  id: number;
  lang?: GW2ApiLang;
  access_token?: string;
}

export interface GW2ApiRequest {
  loading: boolean | undefined;
  error?: GW2ApiError | null;
  request: {
    url?: string;
    method?: string;
    params?: Record<string, string>;
  };
  response: {
    maps?: Record<string, GW2MapsApiData>;
  };
}

export const initState: GW2ApiRequest = {
  loading: undefined,
  error: null,
  request: {
    url: undefined,
    method: 'GET',
  },
  response: {
    maps: undefined,
  },
};

export const apiSlice = createSlice({
  name: 'api',
  initialState: initState,
  reducers: {
    setLoading(state) {
      return {
        ...state,
        loading: true,
        error: null,
      };
    },
    setError(state, action: PayloadAction<GW2ApiError>) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    fetchMap(state, action: PayloadAction<GW2ApiRequestParams>) {
      const { id, lang = 'en' } = action.payload;

      return {
        ...state,
        request: {
          ...state.request,
          url: `/maps/${id}`,
          params: {
            lang: lang,
          },
        },
      };
    },
    setData(
      state,
      action: PayloadAction<{
        mapID: number;
        apiLang: GW2ApiLang;
        mapData: GW2ApiMapsResponse | GW2ApiRegionsResponse;
      }>,
    ) {
      const { mapID, apiLang, mapData } = action.payload;

      const mapKey = `${mapID}_${apiLang}`;
      const { maps } = state.response;
      const oldData = maps ? maps[mapKey] : undefined;

      return {
        ...state,
        error: null,
        response: {
          ...state.response,
          maps: {
            ...maps,
            [mapKey]: {
              ...oldData,
              ...mapData,
            },
          },
        },
      };
    },
    setDone(state) {
      return {
        ...state,
        loading: false,
      };
    },
  },
});

export const apiActions = apiSlice.actions;
export default apiSlice.reducer;
