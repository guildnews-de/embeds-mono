import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
type DispatchFunc = () => AppDispatch;
const useAppDispatch: DispatchFunc = useDispatch;
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

type UseAppDispatchFunc = typeof useAppDispatch;
type UseAppSelectorHook = typeof useAppSelector;

export { useAppDispatch, useAppSelector };

export type { UseAppDispatchFunc, UseAppSelectorHook };
