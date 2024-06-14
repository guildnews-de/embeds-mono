import loadable from '@loadable/component';
import {
  IngameMapDataset,
  IngameMapData,
  IngameMapProps,
} from '../shared/interfaces';

import type { MapContComp } from './MapCont';
import type { MarkerButtonComp } from './MarkerButton';

import '../package.scss';
import { useMemo } from 'react';
// import { useEffect } from 'react';

type IngameMapComponent = MapContComp | MarkerButtonComp;

export interface IngameMapLoaderProps extends Omit<IngameMapProps, 'data'> {
  data: IngameMapDataset;
}

export default function IngameMapLoader(props: IngameMapLoaderProps) {
  const { data, actions, hooks, hash } = props;
  const { addActiveMap, setMapsLoaded, fetchMap } = actions;
  const { useAppDispatch /* , useAppSelector */ } = hooks;
  const dispatch = useAppDispatch();
  // const { mapsLoaded } = useAppSelector((state) => state.app);
  // const elementData = new IngameMapData(data);
  const elementData = useMemo(() => {
    return new IngameMapData(data);
  }, [data]);

  useMemo(() => {
    const { ids } = elementData;
    if (ids && ids.length > 0 /* && !mapsLoaded */) {
      ids.forEach((id) => {
        // const numID = Number(id);
        dispatch(fetchMap({ id: id, lang: 'de' }));
        dispatch(addActiveMap(id));
      });
      dispatch(setMapsLoaded());
    }
  }, [
    dispatch,
    fetchMap,
    addActiveMap,
    setMapsLoaded,
    // mapsLoaded,
    elementData,
  ]);

  const AsyncModule = loadable<IngameMapProps>(
    ({ data }) => import(`./${data.type}`) as Promise<IngameMapComponent>,
  );

  return (
    <AsyncModule
      data={elementData}
      actions={actions}
      hooks={hooks}
      hash={hash}
    />
  );
}
