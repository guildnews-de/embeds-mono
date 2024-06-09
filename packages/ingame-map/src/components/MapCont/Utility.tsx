import { useCallback, useEffect, useMemo } from 'react';
import { useMap, useMapEvents } from 'react-leaflet';

import { Bounds, LatLngBounds, Point, PointTuple } from 'leaflet';
import type { LatLngExpression, LatLng } from 'leaflet';

import type { GW2Point } from '@repo/app-redux';
import type { MapContHooks, MapContActions } from '../MapCont';

export function ClickedCoords({
  hooks,
  actions,
}: {
  hooks: MapContHooks;
  actions: { setClicked: MapContActions['setClicked'] };
}) {
  const { useAppDispatch, useAppSelector } = hooks;
  const { setClicked } = actions;
  const dispatch = useAppDispatch();
  const map = useMapEvents({
    click(e) {
      if (e.latlng) {
        dispatch(setClicked(JSON.stringify(e.latlng)));
      }
    },
  });

  const project = (LatLng: LatLngExpression) => {
    return map.project(LatLng, map.getMaxZoom() - 1);
  };

  const posCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
  };

  const clicked = useAppSelector((state) => state.marker.clicked);
  const pos = clicked ? (JSON.parse(clicked) as LatLng) : undefined;
  const posProject = pos ? project(pos) : undefined;
  const posString = posProject
    ? `[${Math.round(posProject.x)},${Math.round(posProject.y)}]`
    : '';

  if (clicked) {
    posCopy(posString).catch((err) => {
      console.error(err);
    });
  }

  return pos === null ? null : (
    // <Tooltip direction='top' offset={[12, 0]} permanent>{project(pos).toString()}</Tooltip>
    <div className="leaflet-bottom leaflet-left">
      <div className="leaflet-control-attribution leaflet-control">
        {posString && (
          <>
            <div>Position copied:</div>
            <div>{posString}</div>
          </>
        )}
      </div>
    </div>
  );
}

export function MapCenter({
  hooks,
  actions,
}: {
  hooks: MapContHooks;
  actions: {
    setDragged: MapContActions['setDragged'];
    setDragView: MapContActions['setDragView'];
    setRecenter: MapContActions['setRecenter'];
  };
}) {
  const { useAppDispatch, useAppSelector } = hooks;
  const dispatch = useAppDispatch();
  const { open } = useAppSelector((state) => state.app.canvas);
  const { dragView, markView, dragged, recenter } = useAppSelector(
    (state) => state.map,
  );
  const { debug } = useAppSelector((state) => state.app);

  const { setDragged, setDragView, setRecenter } = actions;
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

    // const min = bounds.getTopLeft();
    // const max = bounds.getBottomRight();

    const view: [PointTuple, PointTuple] = [
      [min.x, min.y],
      [max.x, max.y],
    ];
    debug && console.debug('View set (d): ' + JSON.stringify(view));
    dispatch(setDragView(view));
    if (dragged === false) {
      dispatch(setDragged(true));
    }
  }, [dispatch, map, dragged, setDragged, setDragView, debug]);

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
      debug && console.debug('Flying to: ' + JSON.stringify(view));
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
  }, [map, view, recenter, dispatch, setRecenter, open, debug]);

  return <>{/* <MarkerBounds marker={marker} /> */}</>;
}

export function MarkerBounds({
  hooks,
  actions,
  marker,
}: {
  hooks: MapContHooks;
  actions: { setMarkView: MapContActions['setMarkView'] };
  marker: GW2Point[];
}) {
  const { useAppDispatch, useAppSelector } = hooks;
  const dispatch = useAppDispatch();
  const { debug } = useAppSelector((state) => state.app);

  const { setMarkView } = actions;

  useMemo(() => {
    if (marker.length === 1) {
      const { x, y } = marker[0]!;
      const view: [PointTuple, PointTuple] = [
        [Math.round(x * 0.999), Math.round(y * 0.999)],
        [Math.round(x * 1.001), Math.round(y * 1.001)],
      ];
      dispatch(setMarkView(view));
      debug && console.debug('View set (1): ' + JSON.stringify(view));
    } else {
      const bounds = new Bounds(marker);
      const min = bounds.getTopLeft();
      const max = bounds.getBottomRight();
      const view: [PointTuple, PointTuple] = [
        [min.x, min.y],
        [max.x, max.y],
      ];
      dispatch(setMarkView(view));
      debug && console.debug('View set (n): ' + JSON.stringify(view));
    }
  }, [dispatch, setMarkView, marker, debug]);
  return <></>;
}
