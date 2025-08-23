import { createSlice } from '@reduxjs/toolkit';
import type { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { GW2ApiLang } from './apiSlice';
import { DateTime } from 'luxon';

interface AppState {
  lang: GW2ApiLang;
  now: DateTime;
  nowTimer: boolean;
  modal: boolean;
  canvas: {
    open: boolean;
    wide: boolean;
    // delayed: boolean;
  };
  debug: boolean;
}

const initState: AppState = {
  lang: 'de',
  now: DateTime.utc(),
  nowTimer: false,
  modal: false,
  canvas: {
    open: false,
    wide: false,
    // delayed: false,
  },
  debug: false,
};

const _setLang: CaseReducer<AppState, PayloadAction<GW2ApiLang>> = (
  state,
  action,
) => ({
  ...state,
  lang: action.payload,
});

const _setNow: CaseReducer<AppState> = (state) => ({
  ...state,
  now: DateTime.utc(),
});

const _setNowTimer: CaseReducer<AppState, PayloadAction<boolean>> = (
  state,
  { payload },
) => ({
  ...state,
  nowTimer: payload,
});

const _toggleCanvas: CaseReducer<AppState> = (state) => {
  const { open } = state.canvas;
  return {
    ...state,
    canvas: {
      ...state.canvas,
      open: !open,
      // delayed: !open,
    },
  };
};

const _openCanvas: CaseReducer<AppState> = (state) => ({
  ...state,
  canvas: {
    ...state.canvas,
    open: true,
  },
});

const _closeCanvas: CaseReducer<AppState> = (state) => ({
  ...state,
  canvas: {
    ...state.canvas,
    open: false,
  },
});

const _toggleWide: CaseReducer<AppState> = (state) => {
  const { wide } = state.canvas;
  return {
    ...state,
    canvas: {
      ...state.canvas,
      wide: !wide,
    },
  };
};

const _toggleModal: CaseReducer<AppState> = (state) => {
  const { modal } = state;
  return {
    ...state,
    modal: !modal,
  };
};

const _setDebug: CaseReducer<AppState, PayloadAction<boolean>> = (
  state,
  { payload },
) => ({
  ...state,
  debug: payload,
});

const appSlice = createSlice({
  name: 'app',
  initialState: initState,
  reducers: {
    setLang: _setLang,
    setNow: _setNow,
    setNowTimer: _setNowTimer,
    toggleCanvas: _toggleCanvas,
    openCanvas: _openCanvas,
    closeCanvas: _closeCanvas,
    toggleWide: _toggleCanvas,
    toggleModal: _toggleCanvas,
    setDebug: _setDebug,
  },
});

type AppReducerType = typeof appSlice.reducer;
type AppActionsType = typeof appSlice.actions;

export const {
  setLang,
  toggleCanvas,
  openCanvas,
  closeCanvas,
  toggleWide,
  toggleModal,
  setDebug,
  setNow,
  setNowTimer,
} = appSlice.actions;

export const { reducer: appReducer } = appSlice;

export type { AppState, AppReducerType, AppActionsType };
