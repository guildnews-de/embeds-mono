import {
  useAppSelector,
  useAppDispatch,
  fetchMap,
  addActiveMap,
  type TimerMeta,
} from '@internal/core';
import { useMemo } from 'react';

import type { IngameMapProps } from '../shared/interfaces';

import '../package.scss';
import { MetaBar } from '@internal/timer';

export default function MapInit({ data }: IngameMapProps) {
  const { lang } = useAppSelector((state) => state.app);
  const { events } = useAppSelector((state) => state.api.response);
  const dispatch = useAppDispatch();

  const metaIds = useMemo(() => {
    const { ids } = data!;
    const metaIds: TimerMeta[] = [];
    if (ids && ids.length > 0) {
      ids.forEach((id) => {
        dispatch(fetchMap({ id: id, lang: lang }));
        dispatch(addActiveMap(id));
        const metaId = `meta_${id}`;
        events?.[metaId] && metaIds.push(events[metaId]);
      });
    }
    return metaIds;
  }, [dispatch, data, lang, events]);

  return (
    <>
      {metaIds.map((timerData, idx) => (
        <MetaBar meta={timerData} key={`${idx}${timerData.name}`} />
      ))}
    </>
  );
}
