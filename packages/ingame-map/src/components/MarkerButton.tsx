import { useEffect } from 'react';
import { Button } from '@mui/material';

import { GW2Point, GW2PointGroup } from '@repo/app-redux';
import type {
  AppActionsType,
  MarkerActionsType,
  MapActionsType,
} from '@repo/app-redux';

import type { IngameMapDefaultProps } from '../shared/interfaces';

export interface MarkerButtonActions {
  openCanvas: AppActionsType['openCanvas'];
  setDragged: MapActionsType['setDragged'];
  setRecenter: MapActionsType['setRecenter'];
  pushMarker: MarkerActionsType['pushMarker'];
  setMarker: MarkerActionsType['setMarker'];
}

export type MarkerButtonProps = {
  actions: MarkerButtonActions;
} & IngameMapDefaultProps;

export default function MarkerButton(props: MarkerButtonProps) {
  const { hooks, actions, data, hash } = props;
  const { useAppSelector, useAppDispatch } = hooks;
  const dispatch = useAppDispatch();
  const { active, groupNames } = useAppSelector((state) => state.marker);
  const { pushMarker, setMarker, openCanvas, setDragged, setRecenter } =
    actions;

  const isActive = hash === active;

  useEffect(() => {
    if (!groupNames || groupNames?.indexOf(hash) === -1) {
      const { marker, color, mode } = data!;

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

  const offText = 'Karte zeigen';
  const onText = 'jetzt sichtbar';

  const handleClick = () => {
    dispatch(openCanvas());
    dispatch(setMarker(hash));
    dispatch(setDragged(false));
    setTimeout(() => {
      // map.invalidateSize();
      dispatch(setRecenter(true));
    }, 600);
  };

  const handleActiveClick = () => {
    dispatch(openCanvas());
    // dispatch(setMarker(hash));
    dispatch(setDragged(false));
    // setTimeout(() => {
    // map.invalidateSize();
    dispatch(setRecenter(true));
    // }, 600);
  };

  return (
    <Button
      variant={isActive ? 'outlined' : 'contained'}
      // disabled={isActive}
      // onClick={() => {
      //   dispatch(openCanvas());
      //   dispatch(setMarker(hash));
      //   dispatch(setDragged(false));
      //   dispatch(setRecenter(true));
      // }}
      onClick={isActive ? handleActiveClick : handleClick}
    >
      {isActive ? onText : offText}
    </Button>
  );
}

export type MarkerButtonComp = typeof MarkerButton;
