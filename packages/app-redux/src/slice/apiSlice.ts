import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
  GW2ApiMapsResponse,
  GW2ApiError,
  GW2ApiRegionsResponse,
  type GW2ApiPoi,
} from '../shared/gw2Api';

export type GW2ApiLang = 'de' | 'en' | 'es' | 'fr';

// GW2 APi

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

// Event API

export type RGB = [number, number, number];

export type TimerColor = string | RGB | [RGB, RGB];

export interface TimerMeta {
  category: string;
  category_de: string;
  name: string;
  name_de: string;
  link?: string;
  segments: Record<string, TimerSegment>;
  sequences: TimerSequenceData;
}

export interface TimerSequenceData {
  partial: TimerSequence[];
  pattern: TimerSequence[];
}

export interface TimerSegment {
  name: string;
  name_de: string;
  link?: string;
  chatlink?: string;
  bg: TimerColor;
}

export interface TimerSequence {
  r: number;
  d: number;
}

export interface TimerMetaRequest {
  id: string;
}

// Init State

export interface ApiState {
  error?: GW2ApiError | null;
  request_gw2: {
    url?: string;
    method?: string;
    params?: Record<string, string>;
  };
  request_gn: {
    url?: string;
    method?: string;
    params?: Record<string, string>;
  };
  response: {
    maps?: Record<string, GW2MapsApiData>;
    events?: Record<string, TimerMeta>;
  };
}

export const initState: ApiState = {
  error: null,
  request_gw2: {
    url: undefined,
    method: 'GET',
  },
  request_gn: {
    url: undefined,
    method: 'GET',
  },
  response: {
    maps: undefined,
    events: undefined,
  },
};

export const apiSlice = createSlice({
  name: 'api',
  initialState: initState,
  reducers: {
    setError(state, action: PayloadAction<GW2ApiError>) {
      return {
        ...state,
        error: action.payload,
      };
    },
    fetchMap(state, action: PayloadAction<GW2ApiRequestParams>) {
      const { id, lang = 'en' } = action.payload;

      return {
        ...state,
        request_gw2: {
          ...state.request_gw2,
          url: `/maps/${id}`,
          params: {
            lang: lang,
          },
        },
      };
    },
    setMap(
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
    fetchEvents(state, action: PayloadAction<TimerMetaRequest>) {
      const { id } = action.payload;

      return {
        ...state,
        request_gn: {
          ...state.request_gn,
          url: id,
        },
      };
    },
    setEvents(state, action: PayloadAction<Record<string, TimerMeta>>) {
      const metaData = action.payload;

      return {
        ...state,
        error: null,
        response: {
          ...state.response,
          events: metaData,
        },
      };
    },
  },
});

export const apiActions = apiSlice.actions;
export default apiSlice.reducer;
