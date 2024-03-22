import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
// import type { PointTuple } from 'leaflet';

type PointTuple = [number, number];

export interface mapState {
  bounds: [number, number];
  markView: [PointTuple, PointTuple];
  dragView: [PointTuple, PointTuple];
  dragged: boolean;
  recenter: boolean;
  activeMaps: number[];
  tileDate: number;
}

export interface tileApiData {
  api: number;
  date: number;
}

const mapSize: PointTuple = [81920, 114688];

const initState: mapState = {
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

export const mapSlice = createSlice({
  name: 'map',
  initialState: initState,
  reducers: {
    setBounds(state, action: PayloadAction<[number, number]>) {
      return {
        ...state,
        bounds: action.payload,
      };
    },
    setMarkView(state, action: PayloadAction<[PointTuple, PointTuple]>) {
      return {
        ...state,
        markView: action.payload,
      };
    },
    setDragView(state, action: PayloadAction<[PointTuple, PointTuple]>) {
      return {
        ...state,
        dragView: action.payload,
      };
    },
    setDragged(state, action: PayloadAction<boolean>) {
      return {
        ...state,
        dragged: action.payload,
      };
    },
    setRecenter(state, action: PayloadAction<boolean>) {
      return {
        ...state,
        recenter: action.payload,
      };
    },
    setTileDate(state, action: PayloadAction<tileApiData>) {
      const { date } = action.payload;
      return {
        ...state,
        tileDate: date,
      };
    },
    addActiveMap(state, action: PayloadAction<number>) {
      const activeMaps = state.activeMaps.slice();
      if (activeMaps.indexOf(action.payload) != -1) {
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
    },
  },
});

export const mapActions = mapSlice.actions;
export default mapSlice.reducer;
