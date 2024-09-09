import { useAppDispatch, useAppSelector } from './hooks';
export type UseAppSelectorHook = typeof useAppSelector;
export type UseAppDispatchFunc = typeof useAppDispatch;
export { useAppSelector, useAppDispatch };

export type { RootState, AppDispatch } from './store';
export { default as store } from './store';

import { default as apiReducer, apiActions } from './slice/apiSlice';
export type {
  TimerMeta,
  TimerSegment,
  TimerSequence,
  TimerSequenceData,
  TimerColor,
} from './slice/apiSlice';
export type ApiReducerType = typeof apiReducer;
export type ApiActionsType = typeof apiActions;
export { apiReducer };
export const { setError, fetchMap, setMap, fetchEvents, setEvents } =
  apiActions;

import { default as appReducer, appActions } from './slice/appSlice';
export type AppReducerType = typeof appReducer;
export type AppActionsType = typeof appActions;
export { appReducer };
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
} = appActions;

import { default as mapReducer, mapActions } from './slice/mapSlice';
export type MapReducerType = typeof mapReducer;
export type MapActionsType = typeof mapActions;
export { mapReducer };
export const {
  setBounds,
  setMarkView,
  setDragView,
  setDragged,
  setRecenter,
  setTileDate,
  addActiveMap,
} = mapActions;

export { getTileDate } from './getTileDate';

import { default as markerReducer, markerActions } from './slice/markerSlice';
export type MarkerReducerType = typeof markerReducer;
export type MarkerActionsType = typeof markerActions;
export { markerReducer };
export const { pushMarker, popMarker, setMarker, setClicked } = markerActions;

export * from './shared/gw2Api';
