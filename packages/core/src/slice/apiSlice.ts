import { createSlice } from '@reduxjs/toolkit';
import type { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import {
  GW2ApiMapsResponse,
  GW2ApiError,
  GW2ApiRegionsResponse,
  type GW2ApiPoi,
} from '../shared/gw2Api';

type GW2ApiLang = 'de' | 'en' | 'es' | 'fr';

// GW2 APi

interface GW2MapsApiData
  extends Omit<
    GW2ApiMapsResponse & GW2ApiRegionsResponse,
    'points_of_interest'
  > {
  poi?: Record<number, GW2ApiPoi>;
}

interface GW2ApiRequestParams {
  id: number;
  lang?: GW2ApiLang;
  access_token?: string;
}

// Event API

type RGB = [r: number, g: number, b: number];

type TimerColor = string | RGB | [a: RGB, b: RGB];

interface TimerMeta {
  category: string;
  category_de: string;
  name: string;
  name_de: string;
  link?: string;
  segments: Record<string, TimerSegment>;
  sequences: TimerSequenceData;
}

interface TimerSequenceData {
  partial: TimerSequence[];
  pattern: TimerSequence[];
}

interface TimerSegment {
  name: string;
  name_de: string;
  link?: string;
  chatlink?: string;
  bg: TimerColor;
}

interface TimerSequence {
  r: number;
  d: number;
}

interface TimerMetaRequest {
  id: string;
}

// Init State

interface ApiState {
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

const initState: ApiState = {
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

const _setError: CaseReducer<ApiState, PayloadAction<GW2ApiError>> = (
  state,
  action,
) => ({
  ...state,
  error: action.payload,
});

const _fetchMap: CaseReducer<ApiState, PayloadAction<GW2ApiRequestParams>> = (
  state,
  { payload: { id, lang = 'en' } },
) => ({
  ...state,
  request_gw2: {
    ...state.request_gw2,
    url: `/maps/${id}`,
    params: {
      lang: lang,
    },
  },
});

const _setMap: CaseReducer<
  ApiState,
  PayloadAction<{
    mapID: number;
    apiLang: GW2ApiLang;
    mapData: GW2ApiMapsResponse | GW2ApiRegionsResponse;
  }>
> = (state, action) => {
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
};

const _fetchEvents: CaseReducer<ApiState, PayloadAction<TimerMetaRequest>> = (
  state,
  { payload: { id } },
) => ({
  ...state,
  request_gn: {
    ...state.request_gn,
    url: id,
  },
});

const _setEvents: CaseReducer<
  ApiState,
  PayloadAction<Record<string, TimerMeta>>
> = (state, { payload }) => ({
  ...state,
  error: null,
  response: {
    ...state.response,
    events: payload,
  },
});

const apiSlice = createSlice({
  name: 'api',
  initialState: initState,
  reducers: {
    setError: _setError,
    fetchMap: _fetchMap,
    setMap: _setMap,
    fetchEvents: _fetchEvents,
    setEvents: _setEvents,
  },
});

type ApiReducerType = typeof apiSlice.reducer;
type ApiActionsType = typeof apiSlice.actions;

export const { setError, fetchMap, setMap, fetchEvents, setEvents } =
  apiSlice.actions;

export const { reducer: apiReducer } = apiSlice;

export type {
  GW2ApiLang,
  GW2MapsApiData,
  GW2ApiRequestParams,
  RGB,
  TimerColor,
  TimerMeta,
  TimerSequenceData,
  TimerSegment,
  TimerSequence,
  TimerMetaRequest,
  ApiState,
  ApiReducerType,
  ApiActionsType,
};
