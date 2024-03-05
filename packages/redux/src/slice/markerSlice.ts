import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { GW2PointGroup } from '../common/guildwars2Api';

export interface MarkerState {
  active?: string;
  clicked?: string;
  groups?: Record<string, GW2PointGroup>;
  groupNames?: string[];
}

const initSate: MarkerState = {
  active: undefined,
  clicked: undefined,
  groups: undefined,
  groupNames: [],
};

export const markerSlice = createSlice({
  name: 'marker',
  initialState: initSate,
  reducers: {
    pushMarker(state, action: PayloadAction<[string, GW2PointGroup]>) {
      const [hash, object] = action.payload;
      const groupNames = state.groupNames?.slice();
      if (groupNames && groupNames.indexOf(hash) != -1) {
        return state;
      } else {
        groupNames?.push(hash);
      }
      return {
        ...state,
        groups: {
          ...state.groups,
          [hash]: object,
        },
        groupNames: groupNames,
      };
    },
    popMarker(state, action: PayloadAction<string>) {
      const { payload: hash } = action;
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
    },
    setMarker(state, action: PayloadAction<string>) {
      const { payload: hash } = action;
      return {
        ...state,
        active: hash,
      };
    },
    setClicked(state, action: PayloadAction<string>) {
      const { payload: current } = action;
      return {
        ...state,
        clicked: current,
      };
    },
  },
});

export const markerActions = markerSlice.actions;
export default markerSlice.reducer;
