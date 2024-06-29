import { AppDrawer, CssBaseline } from '@repo/core';
import { MapCont } from '@repo/ingame-map';

export function BaseUI() {
  return (
    <>
      <CssBaseline />
      <AppDrawer>
        {
          /* mapsLoaded && ( */
          <MapCont hash={'hash'} />
          /* ) */
        }
      </AppDrawer>
    </>
  );
}
