import { useEffect } from 'react';
import { Button } from '@mui/material';

import { GW2Point, GW2PointGroup } from '@repo/app-redux';
import type {
  AppActionsType,
  MarkerActionsType,
  MapActionsType,
} from '@repo/app-redux';
import { IngameMapProps } from '../shared/interfaces';

export interface MarkerButtonActions {
  openCanvas: AppActionsType['openCanvas'];
  setDragged: MapActionsType['setDragged'];
  setRecenter: MapActionsType['setRecenter'];
  pushMarker: MarkerActionsType['pushMarker'];
  setMarker: MarkerActionsType['setMarker'];
}

export default function MarkerButton(props: IngameMapProps) {
  const { hooks, actions, data, hash } = props;
  const { useAppSelector, useAppDispatch } = hooks;
  const dispatch = useAppDispatch();
  const { active, groupNames } = useAppSelector((state) => state.marker);
  const { pushMarker, setMarker, openCanvas, setDragged, setRecenter } =
    actions;

  useEffect(() => {
    if (!groupNames || groupNames?.indexOf(hash) === -1) {
      const { marker, color, mode } = data;

      const points: GW2Point[] = [];
      marker?.forEach((string) => {
        const childArray = string.split(',');
        if (childArray.length >= 3) {
          const [name = '', x = '2', y = '2'] = childArray;

          points.push(
            new GW2Point({
              tupel: [Number(x), Number(y)],
              name: name,
              type: color,
            }),
          );
        }
      });
      const group = new GW2PointGroup({
        points: points,
        mode: mode,
      });
      dispatch(pushMarker([hash, group]));
    }
  }, [dispatch, pushMarker, groupNames, data, hash]);

  const onText = 'Karte zeigen';
  const offText = 'jetzt sichtbar';

  return (
    <Button
      variant="contained"
      disabled={hash === active}
      onClick={() => {
        dispatch(setMarker(hash));
        dispatch(openCanvas());
        dispatch(setDragged(false));
        dispatch(setRecenter(true));
      }}
    >
      {!(active === hash) ? onText : offText}
    </Button>
  );
}

export type MarkerButtonComp = typeof MarkerButton;
