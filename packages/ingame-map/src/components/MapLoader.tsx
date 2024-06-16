import type { ApiActionsType, MapActionsType } from '@repo/app-redux';
import { useMemo } from 'react';

import type { IngameMapDefaultProps } from '../shared/interfaces';

import '../package.scss';

export interface MapLoaderActions {
  addActiveMap: MapActionsType['addActiveMap'];
  fetchMap: ApiActionsType['fetchMap'];
}

export type MapLoaderProps = {
  actions: MapLoaderActions;
} & IngameMapDefaultProps;

export default function MapLoader(props: MapLoaderProps) {
  const { data, actions, hooks } = props;
  const { addActiveMap, fetchMap } = actions;
  const { useAppDispatch } = hooks;
  const dispatch = useAppDispatch();

  useMemo(() => {
    const { ids } = data!;
    if (ids && ids.length > 0 /* && !mapsLoaded */) {
      ids.forEach((id) => {
        dispatch(fetchMap({ id: id, lang: 'de' }));
        dispatch(addActiveMap(id));
      });
    }
  }, [dispatch, fetchMap, addActiveMap, data]);

  return <></>;
}
