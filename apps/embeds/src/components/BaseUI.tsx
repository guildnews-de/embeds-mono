import {
  fetchEvents,
  setNow,
  useAppDispatch,
  useAppSelector,
} from 'app-redux';
import { AppPanel /* , CssBaseline  */ } from 'core';
import { MapCont } from 'ingame-map';
import { useMemo } from 'react';

export function BaseUI() {
  const { groupNames } = useAppSelector((state) => state.marker);
  const { nowTimer } = useAppSelector((state) => state.app);
  const { events } = useAppSelector((state) => state.api.response);
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

  return (
    <>
      {/* <CssBaseline /> */}
      <AppPanel>{groupNames && groupNames.length > 0 && <MapCont />}</AppPanel>
    </>
  );
}
