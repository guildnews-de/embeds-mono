import { useEffect } from 'react';
import { Button } from '@mui/material';

import { GW2Point, GW2PointGroup, type MarkerEmbedData } from '@repo/redux';

import { IngameMapHooks } from './IngameMap';
import type {
  AppActionsType,
  MarkerActionsType,
  MapActionsType,
} from '@repo/redux';

interface MarkerButtonActions {
  openCanvas: AppActionsType['openCanvas'];
  setDragged: MapActionsType['setDragged'];
  pushMarker: MarkerActionsType['pushMarker'];
  setMarker: MarkerActionsType['setMarker'];
}

interface MarkerButtonProps {
  hooks: IngameMapHooks;
  actions: MarkerButtonActions;
  elementData: MarkerEmbedData;
  className: string;
  hash: string;
}

export default function MarkerButton({
  hooks,
  actions,
  ...props
}: MarkerButtonProps) {
  const { useAppSelector, useAppDispatch } = hooks;
  const dispatch = useAppDispatch();
  const { active, groupNames } = useAppSelector((state) => state.marker);
  const { hash, elementData } = props;
  const { pushMarker, setMarker, openCanvas, setDragged } = actions;

  useEffect(() => {
    if (!groupNames || groupNames?.indexOf(hash) === -1) {
      const { marker, color, mode } = elementData;

      const points: GW2Point[] = [];
      marker.forEach((string) => {
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
  }, [dispatch, pushMarker, groupNames, elementData, hash]);

  const onText = 'Karte zeigen';
  const offText = 'jetzt sichtbar';

  return (
    <Button
      variant="contained"
      disabled={!(hash === active)}
      onClick={() => {
        dispatch(setMarker(hash));
        dispatch(openCanvas());
        dispatch(setDragged(false));
      }}
    >
      {!(active === hash) ? onText : offText}
    </Button>
  );
}
