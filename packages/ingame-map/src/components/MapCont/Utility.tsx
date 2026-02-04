import { useEffect } from 'react';
import { useMapEvents } from 'react-leaflet';

import { Bounds, Point, PointTuple } from 'leaflet';
import type { LatLngExpression, LatLng } from 'leaflet';

import {
  useAppSelector,
  useAppDispatch,
  type GW2Point,
  setClicked,
  setMarkView,
} from '@internal/core';

export function ClickedCoords() {
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
    posCopy(posString.slice(1, posString.length - 1)).catch((err) => {
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

export function MarkerBounds({ marker }: { marker: GW2Point[] }) {
  const dispatch = useAppDispatch();
  const { debug } = useAppSelector((state) => state.app);

  useEffect(() => {
    if (marker.length === 1) {
      const { x, y } = marker[0]!;
      const view: [PointTuple, PointTuple] = [
        [Math.round(x * 0.999), Math.round(y * 0.999)],
        [Math.round(x * 1.001), Math.round(y * 1.001)],
      ];
      dispatch(setMarkView(view));
      debug && console.debug('View set (1): ' + JSON.stringify(view));
    } else {
      const leafPoints = marker.map(({ x, y }) => new Point(x, y));
      const bounds = new Bounds(leafPoints);
      const min = bounds.getTopLeft();
      const max = bounds.getBottomRight();
      const view: [PointTuple, PointTuple] = [
        [min.x, min.y],
        [max.x, max.y],
      ];
      dispatch(setMarkView(view));
      debug && console.debug('View set (n): ' + JSON.stringify(view));
    }
  }, [dispatch, marker, debug]);
  return <></>;
}
