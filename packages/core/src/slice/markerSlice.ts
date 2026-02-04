import { createSlice } from '@reduxjs/toolkit';
import type { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import type { GW2PointGroup } from '../shared/gw2Api';
import { PointInterval } from './mapSlice';

interface MarkerState {
  active?: string;
  clicked?: string;
  onClick: ((view: PointInterval) => void) | null;
  groups?: Record<string, GW2PointGroup>;
  groupNames: string[];
}

const initSate: MarkerState = {
  active: undefined,
  clicked: undefined,
  onClick: null,
  groups: undefined,
  groupNames: [],
};

const _pushMarker: CaseReducer<
  MarkerState,
  PayloadAction<[h: string, p: GW2PointGroup]>
> = (state, action) => {
  const [hash, object] = action.payload;
  if (state.groupNames.includes(hash)) {
    return state;
  }

  return {
    ...state,
    groups: {
      ...state.groups,
      [hash]: object,
    },
    groupNames: [...state.groupNames, hash],
  };
};

const _popMarker: CaseReducer<MarkerState, PayloadAction<string>> = (
  state,
  { payload: hash },
) => {
  const { groups, groupNames } = state;
  groups && delete groups[hash];
  const idx = groupNames?.indexOf(hash);
  if (idx && idx > -1) {
    groupNames?.splice(idx);
  }
  return {
    ...state,
    groups: groups,
    groupNames: groupNames,
  };
};

const _setMarker: CaseReducer<MarkerState, PayloadAction<string>> = (
  state,
  { payload: hash },
) => ({
  ...state,
  active: hash,
});

const _setClicked: CaseReducer<MarkerState, PayloadAction<string>> = (
  state,
  { payload: current },
) => ({
  ...state,
  clicked: current,
});

const _setOnClick: CaseReducer<
  MarkerState,
  PayloadAction<MarkerState['onClick']>
> = (state, { payload: current }) => ({
  ...state,
  onClick: current,
});

export const markerSlice = createSlice({
  name: 'marker',
  initialState: initSate,
  reducers: {
    pushMarker: _pushMarker,
    popMarker: _popMarker,
    setMarker: _setMarker,
    setClicked: _setClicked,
    setOnClick: _setOnClick,
  },
});

type MarkerReducerType = typeof markerSlice.actions;
type MarkerActionsType = typeof markerSlice.reducer;

export const { pushMarker, popMarker, setMarker, setClicked, setOnClick } =
  markerSlice.actions;

export const { reducer: markerReducer } = markerSlice;

export type { MarkerState, MarkerReducerType, MarkerActionsType };
