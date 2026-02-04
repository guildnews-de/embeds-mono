import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useMap } from 'react-leaflet';

import { LatLngBounds, Point, type PointTuple } from 'leaflet';

import {
  useAppSelector,
  useAppDispatch,
  // setDragged,
  // setDragView,
  setRecenter,
  PointInterval,
  setOnClick,
} from '@internal/core';

export function MapCenter() {
  const viewRef = useRef<{
    click: null | PointInterval;
    drag: null | PointInterval;
  }>({ click: null, drag: null });
  const dispatch = useAppDispatch();
  const { open } = useAppSelector((state) => state.app.canvas);
  const { dragView, markView, dragged, recenter } = useAppSelector(
    (state) => state.map,
  );
  // const { debug } = useAppSelector((state) => state.app);

  const map = useMap();

  const view = useMemo(() => {
    const currentView = dragged ? dragView : markView;
    return currentView;
  }, [dragView, markView, dragged]);

  const setView = useCallback(() => {
    const bounds = map.getBounds();
    const zoom = map.getMaxZoom() - 1;
    const llMin = bounds.getNorthWest();
    const llMax = bounds.getSouthEast();

    const min = map.project(llMin, zoom);
    const max = map.project(llMax, zoom);

    const view: [PointTuple, PointTuple] = [
      [min.x, min.y],
      [max.x, max.y],
    ];
    // debug && console.debug('View set (d): ' + JSON.stringify(view));
    // dispatch(setDragView(view));
    viewRef.current.drag = view;
    // if (dragged === false) {
    //   dispatch(setDragged(true));
    // }
  }, [map]);

  useEffect(() => {
    const handleOnClick = (view: PointInterval) => {
      viewRef.current.click = view;
      viewRef.current.drag = null;
    };
    dispatch(setOnClick(handleOnClick));

    return () => {
      dispatch(setOnClick(null));
    };
  }, [dispatch]);

  useEffect(() => {
    map.on('dragend', setView);
    return () => {
      map.off('dragend', setView);
    };
  }, [map, setView]);

  useEffect(() => {
    if (recenter && open) {
      const refPoint = new Point(0, 0);
      const [topLeft, bottomRight] = view;
      if (new Point(topLeft[0], topLeft[1]).equals(refPoint)) {
        map.flyTo(map.unproject(bottomRight, map.getMaxZoom() - 1));
      } else {
        const latlngBounds = new LatLngBounds(
          map.unproject(topLeft, map.getMaxZoom() - 1),
          map.unproject(bottomRight, map.getMaxZoom() - 1),
        );
        map.flyToBounds(latlngBounds);
      }
      dispatch(setRecenter(false));
    }
  }, [map, view, recenter, dispatch, open]);

  return <>{/* <MarkerBounds marker={marker} /> */}</>;
}
