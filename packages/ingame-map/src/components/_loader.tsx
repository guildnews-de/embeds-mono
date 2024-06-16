import loadable from '@loadable/component';
import { useMemo } from 'react';

import {
  IngameMapData,
  type IngameMapDataset,
  type IngameMapProps,
} from '../shared/interfaces';
import type { MapContComp } from './MapCont';
import type { MarkerButtonComp } from './MarkerButton';

import '../package.scss';

type IngameMapComponent = MapContComp | MarkerButtonComp;

export interface IngameMapLoaderProps extends Omit<IngameMapProps, 'data'> {
  data: IngameMapDataset;
}

export default function IngameMapLoader(props: IngameMapLoaderProps) {
  const { data, actions, hooks, hash } = props;

  const elementData = useMemo(() => {
    return new IngameMapData(data);
  }, [data]);

  const AsyncModule = loadable<IngameMapProps>(
    ({ data }) => import(`./${data!.type}`) as Promise<IngameMapComponent>,
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
