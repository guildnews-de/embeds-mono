import { createSlice } from '@reduxjs/toolkit';
import type { CaseReducer, PayloadAction } from '@reduxjs/toolkit';

type PointTuple = [x: number, y: number];
type PointInterval = [a: PointTuple, b: PointTuple];

interface MapState {
  bounds: PointTuple;
  markView: PointInterval;
  dragView: PointInterval;
  dragged: boolean;
  recenter: boolean;
  activeMaps: number[];
  tileDate: number;
}

interface TileApiData {
  api: number;
  date: number;
}

const mapSize: PointTuple = [81920, 114688];

const initState: MapState = {
  bounds: [mapSize[0], mapSize[1]],
  markView: [
    // Area of activer marker group
    [(mapSize[0] / 2) * 0.75, (mapSize[1] / 2) * 0.75],
    [(mapSize[0] / 2) * 1.25, (mapSize[1] / 2) * 1.25],
  ],
  dragView: [
    // Area of last drag action
    [1, 1],
    [1, 1],
  ],
  dragged: false,
  recenter: true,
  // wait: false,
  activeMaps: [],
  tileDate: 0,
};

const _setBounds: CaseReducer<MapState, PayloadAction<PointTuple>> = (
  state,
  { payload },
) => ({
  ...state,
  bounds: payload,
});

const _setMarkView: CaseReducer<MapState, PayloadAction<PointInterval>> = (
  state,
  { payload },
) => ({
  ...state,
  markView: payload,
});

const _setDragView: CaseReducer<MapState, PayloadAction<PointInterval>> = (
  state,
  { payload },
) => ({
  ...state,
  dragView: payload,
});

const _setDragged: CaseReducer<MapState, PayloadAction<boolean>> = (
  state,
  action,
) => ({
  ...state,
  dragged: action.payload,
});

const _setRecenter: CaseReducer<MapState, PayloadAction<boolean>> = (
  state,
  action,
) => ({
  ...state,
  recenter: action.payload,
});

const _setTileDate: CaseReducer<MapState, PayloadAction<TileApiData>> = (
  state,
  { payload: { date } },
) => ({
  ...state,
  tileDate: date,
});

const _addActiveMap: CaseReducer<MapState, PayloadAction<number>> = (
  state,
  action,
) => {
  const activeMaps = state.activeMaps.slice();
  if (activeMaps.includes(action.payload)) {
    return state;
  }
  if (activeMaps.length === 1 && activeMaps[0] === 0) {
    return {
      ...state,
      activeMaps: [action.payload],
    };
  } else {
    activeMaps.push(action.payload);
  }
  return {
    ...state,
    activeMaps: activeMaps,
  };
};

export const mapSlice = createSlice({
  name: 'map',
  initialState: initState,
  reducers: {
    setBounds: _setBounds,
    setMarkView: _setMarkView,
    setDragView: _setDragView,
    setDragged: _setDragged,
    setRecenter: _setRecenter,
    setTileDate: _setTileDate,
    addActiveMap: _addActiveMap,
  },
});

type MapReducerType = typeof mapSlice.actions;
type MapActionsType = typeof mapSlice.reducer;

export const {
  setBounds,
  setMarkView,
  setDragView,
  setDragged,
  setRecenter,
  setTileDate,
  addActiveMap,
} = mapSlice.actions;

export const { reducer: mapReducer } = mapSlice;

export type {
  MapReducerType,
  MapActionsType,
  PointTuple,
  PointInterval,
  MapState,
  TileApiData,
};
