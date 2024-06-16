import {
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
  const { setClicked } = markerActions;

  const mapPropActions = {
    setDragged,
    setDragView,
    setRecenter,
    setMarkView,
    setClicked,
  };

  const mapPropHooks = {
    useAppSelector,
    useAppDispatch,
  };

  return (
    <>
      <CssBaseline />
      <AppDrawer>
        {mapsLoaded && (
          <MapCont
            actions={mapPropActions}
            hooks={mapPropHooks}
            hash={'hash'}
          />
        )}
      </AppDrawer>
    </>
  );
}
