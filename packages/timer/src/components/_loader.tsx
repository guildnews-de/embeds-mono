import { useMemo } from 'react';
import loadable from '@loadable/component';
import {
  TimerDataset,
  TimerData,
  // TimerProps,
  // TimerHooks,
} from '../shared/interfaces';

import type { MetaBarComp, MetaBarProps } from '../components/MetaBar';
// import type { MetaCatComp, MetaCatProps } from '../components/MetaCat';

import {
  useAppSelector,
  useAppDispatch,
  setNowTimer,
  fetchEvents,
} from 'app-redux';

// type TimerComponent = MetaBarComp | MetaCatComp;

export interface TimerLoaderProps {
  data: TimerDataset;
  hash: string;
}

export default function TimerLoader(props: TimerLoaderProps) {
  const { data, hash } = props;
  const elementData = useMemo(() => {
    return new TimerData(data);
  }, [data]);

  const { type, ids } = elementData;

  const { nowTimer } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();

  const { events } = useAppSelector((state) => state.api.response);

  useMemo(() => {
    events && !nowTimer && dispatch(setNowTimer(true));
  }, [nowTimer, dispatch, events]);

  useMemo(() => {
    !events && dispatch(fetchEvents({ id: 'all' }));
  }, [dispatch, events]);

  switch (type) {
    case 'MetaBar':
      {
        if (ids && events?.[ids]) {
          const meta = events[ids];
          if (meta) {
            const AsyncModule = loadable<MetaBarProps>(
              ({ data }) => import(`./${data?.type}`) as Promise<MetaBarComp>,
            );
            return (
              <AsyncModule
                data={elementData}
                // hooks={hooks}
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
