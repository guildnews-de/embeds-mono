import {
  appActions,
  mapActions,
  markerActions,
  useAppDispatch,
  useAppSelector,
} from '@repo/app-redux';
import { AppDrawer, CssBaseline } from '@repo/core';
import { MapCont } from '@repo/ingame-map';

export function BaseUI() {
  // const dispatch = useAppDispatch();
  const { mapsLoaded } = useAppSelector((state) => state.app);
  const { setDragged, setDragView, setRecenter, setMarkView } = mapActions;
  const { openCanvas, closeCanvas } = appActions;
  const { setClicked } = markerActions;

  const baseHooks = {
    useAppSelector,
    useAppDispatch,
  };

  const drawerActions = {
    openCanvas,
    closeCanvas,
  };

  const mapContActions = {
    setDragged,
    setDragView,
    setRecenter,
    setMarkView,
    setClicked,
  };

  return (
    <>
      <CssBaseline />
      <AppDrawer actions={drawerActions} hooks={baseHooks}>
        {mapsLoaded && (
          <MapCont actions={mapContActions} hooks={baseHooks} hash={'hash'} />
        )}
      </AppDrawer>
    </>
  );
}
