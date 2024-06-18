import loadable from '@loadable/component';
import { TimerDataset, TimerData, TimerProps } from '../shared/interfaces';
import { default as metasObject } from '../data/metas';

import type { MetaBarComp, MetaBarProps } from '../components/MetaBar';
import type { MetaCatComp, MetaCatProps } from '../components/MetaCat';

import '../package.scss';
import { useMemo } from 'react';

// type TimerComponent = MetaBarComp | MetaCatComp;

export interface TimerLoaderProps {
  data: TimerDataset;
  hash: string;
}

export default function TimerLoader(props: TimerLoaderProps) {
  const { data } = props;
  const elementData = useMemo(() => {
    return new TimerData(data);
  }, [data]);

  const { type, ids } = elementData;

  switch (type) {
    case 'metaBar':
      {
        if (ids && metasObject[ids]) {
          const meta = metasObject[ids];
          if (meta) {
            const AsyncModule = loadable<MetaBarProps>(
              ({ data }) => import(`./${data.type}`) as Promise<MetaBarComp>,
            );
            return (
              <AsyncModule data={elementData} meta={meta} hash={props.hash} />
            );
          }
        }
      }
      break;
    // case 'metaCat': {
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
