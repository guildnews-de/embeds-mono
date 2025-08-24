import loadable from '@loadable/component';
import { useMemo } from 'react';

import {
  IngameMapData,
  type IngameMapDataset,
  type IngameMapProps,
} from '../shared/interfaces';

import '../package.scss';

export interface IngameMapLoaderProps extends Omit<IngameMapProps, 'data'> {
  data: IngameMapDataset;
}

export default function IngameMapLoader(props: IngameMapLoaderProps) {
  const { data, hash } = props;

  const elementData = useMemo(() => {
    return new IngameMapData(data);
  }, [data]);

  const AsyncModule = loadable<IngameMapProps>(({ data }) => {
    switch (data!.type) {
      case 'MapCont':
        return import('./MapCont');
      case 'MapInit':
        return import('./MapInit');
      case 'MarkerButton':
        return import('./MarkerButton');
      default:
        // FixMe: Implement proper Fallback Embed
        throw Error('[ingame-map] Unkown embed type');
    }
  });

  return <AsyncModule data={elementData} hash={hash} />;
}
