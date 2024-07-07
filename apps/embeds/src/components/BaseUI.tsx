import { setNow, useAppDispatch, useAppSelector } from '@repo/app-redux';
import { AppDrawer, CssBaseline } from '@repo/core';
import { MapCont } from '@repo/ingame-map';
import { useMemo } from 'react';

export function BaseUI() {
  const { groupNames } = useAppSelector((state) => state.marker);
  const { nowTimer } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();

  useMemo(() => {
    if (nowTimer) {
      const timer = setInterval(() => dispatch(setNow()), 60000);
      return () => {
        clearInterval(timer);
      };
    }
  }, [dispatch, nowTimer]);
  return (
    <>
      <CssBaseline />
      <AppDrawer>
        {groupNames && groupNames.length > 0 && <MapCont />}
      </AppDrawer>
    </>
  );
}
