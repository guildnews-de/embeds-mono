import { useCallback, useEffect } from 'react';
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
} from '@internal/core';

import type { IngameMapProps } from '../shared/interfaces';

export default function MarkerButton({ data, hash }: IngameMapProps) {
  const dispatch = useAppDispatch();
  const { active, groupNames, onClick } = useAppSelector((state) => state.marker);
  const {
    lang,
    canvas: { open },
  } = useAppSelector((state) => state.app);
  // const { dragged } = useAppSelector((state) => state.map);

  const isActive = hash === active;

  useEffect(() => {
    if (groupNames.length == 0 || !groupNames.includes(hash)) {
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

  const handleClick = useCallback(() => {
    !open && dispatch(openCanvas());
    // dragged && dispatch(setDragged(false));
    if (hash == active) {
      dispatch(setRecenter(true));
    } else {
      dispatch(setMarker(hash));
      setTimeout(() => {
        dispatch(setRecenter(true));
      }, 750);
    }
  }, [dispatch, open, hash, active, onClick]);

  return (
    <Button
      variant={isActive ? 'outlined' : 'contained'}
      onClick={handleClick}
      sx={{ lineHeight: 1.0, verticalAlign: 'text-bottom' }}
    >
      {isActive ? onText : offText}
    </Button>
  );
}

export type MarkerButtonComp = typeof MarkerButton;
