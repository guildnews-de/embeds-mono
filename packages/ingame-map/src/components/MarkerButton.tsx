import { useEffect } from 'react';
import { Button } from '@mui/material';

import {
  GW2Point,
  GW2PointGroup,
  useAppSelector,
  useAppDispatch,
  pushMarker,
  openCanvas,
  setMarker,
  setDragged,
  setRecenter,
} from 'app-redux';

import type { IngameMapProps } from '../shared/interfaces';

export default function MarkerButton({ data, hash }: IngameMapProps) {
  const dispatch = useAppDispatch();
  const { active, groupNames } = useAppSelector((state) => state.marker);
  const { lang } = useAppSelector((state) => state.app);

  const isActive = hash === active;

  useEffect(() => {
    if (!groupNames || groupNames?.includes(hash)) {
      const { marker, color, mode } = data!;

      const points: GW2Point[] = [];
      marker?.forEach((string) => {
        const childArray = string.split(',');

        const y = childArray.pop();
        const x = childArray.pop();

        if (x && y) {
          const name = childArray.join(',');
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
  }, [dispatch, groupNames, data, hash]);

  const offText = lang === 'de' ? 'Karte zeigen' : 'Show map';
  const onText = lang === 'de' ? 'Neu zentrieren' : 'Recenter';

  const handleClick = () => {
    dispatch(openCanvas());
    dispatch(setMarker(hash));
    dispatch(setDragged(false));
    setTimeout(() => {
      dispatch(setRecenter(true));
    }, 750);
  };

  const handleActiveClick = () => {
    dispatch(openCanvas());
    dispatch(setDragged(false));
    dispatch(setRecenter(true));
  };

  return (
    <Button
      variant={isActive ? 'outlined' : 'contained'}
      onClick={isActive ? handleActiveClick : handleClick}
      sx={{ lineHeight: 1.0, verticalAlign: 'text-bottom' }}
    >
      {isActive ? onText : offText}
    </Button>
  );
}

export type MarkerButtonComp = typeof MarkerButton;
