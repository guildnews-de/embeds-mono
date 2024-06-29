import loadable from '@loadable/component';
import {
  TimerDataset,
  TimerData,
  // TimerProps,
  TimerHooks,
} from '../shared/interfaces';
import { default as metasObject } from '../data/metas2';

import type { MetaBarComp, MetaBarProps } from '../components/MetaBar';
// import type { MetaCatComp, MetaCatProps } from '../components/MetaCat';

import { useMemo } from 'react';

// type TimerComponent = MetaBarComp | MetaCatComp;

export interface TimerLoaderProps {
  data: TimerDataset;
  hash: string;
  hooks: TimerHooks;
}
// export interface IngameMapLoaderProps extends Omit<TimerProps, 'data'> {
//   data: TimerDataset;
// }

export default function TimerLoader(props: TimerLoaderProps) {
  const { data, hooks, hash } = props;
  const elementData = useMemo(() => {
    return new TimerData(data);
  }, [data]);

  const { type, ids } = elementData;

  switch (type) {
    case 'MetaBar':
      {
        if (ids && metasObject[ids]) {
          const meta = metasObject[ids];
          if (meta) {
            const AsyncModule = loadable<MetaBarProps>(
              ({ data }) => import(`./${data.type}`) as Promise<MetaBarComp>,
            );
            return (
              <AsyncModule
                data={elementData}
                hooks={hooks}
                meta={meta}
                hash={hash}
              />
            );
          }
        }
      }
      break;
    // case 'MetaCat': {
    //   if
    //   const AsyncModule = loadable<MetaCatProps>(
    //     ({ data }) => import(`./${data.type}`) as Promise<MetaCatComp>,
    //   );
    //   return <AsyncModule data={elementData} hash={props.hash} />;
    // }
    default:
      break;
  }
  // const AsyncModule = loadable<TimerProps>(
  //   ({ data }) => import(`./${data.type}`) as Promise<TimerComponent>,
  // );

  // return <AsyncModule data={elementData} hash={props.hash} />;
}
