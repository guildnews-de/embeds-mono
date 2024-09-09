import {
  fetchEvents,
  getTileDate,
  setNow,
  useAppDispatch,
  useAppSelector,
} from '@repo/app-redux';
import { AppPanel /* , CssBaseline  */ } from '@repo/core';
import { MapCont } from '@repo/ingame-map';
import { useMemo } from 'react';

export function BaseUI() {
  const { groupNames } = useAppSelector((state) => state.marker);
  const { nowTimer } = useAppSelector((state) => state.app);
  const { events } = useAppSelector((state) => state.api.response);
  const { tileDate } = useAppSelector((state) => state.map);
  const dispatch = useAppDispatch();

  useMemo(() => {
    if (nowTimer) {
      const timer = setInterval(() => dispatch(setNow()), 60000);
      return () => {
        clearInterval(timer);
      };
    }
  }, [dispatch, nowTimer]);

  useMemo(() => {
    !events && dispatch(fetchEvents({ id: 'all' }));
  }, [dispatch, events]);

  useMemo(() => {
    getTileDate(tileDate, dispatch);
  }, [dispatch, tileDate]);

  return (
    <>
      {/* <CssBaseline /> */}
      <AppPanel>{groupNames && groupNames.length > 0 && <MapCont />}</AppPanel>
    </>
  );
}
