import { useAppSelector } from '@repo/app-redux';
import { AppDrawer, CssBaseline } from '@repo/core';
import { MapCont } from '@repo/ingame-map';

export function BaseUI() {
  const { groupNames } = useAppSelector((state) => state.marker);
  return (
    <>
      <CssBaseline />
      <AppDrawer>
        {groupNames && groupNames.length > 0 && <MapCont />}
      </AppDrawer>
    </>
  );
}
