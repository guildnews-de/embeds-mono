import {
  useAppSelector,
  useAppDispatch,
  fetchMap,
  addActiveMap,
  type TimerMeta,
} from '@internal/core';
import { useEffect, useMemo } from 'react';

import type { IngameMapProps } from '../shared/interfaces';

import '../package.scss';
import { MetaBar } from '@internal/timer';

export default function MapInit({ data }: IngameMapProps) {
  const { lang } = useAppSelector((state) => state.app);
  const { events } = useAppSelector((state) => state.api.response);
  const dispatch = useAppDispatch();

  const dataIds = useMemo(() => {
    return data?.ids ?? [];
  }, [data]);

  const metaIds = dataIds.reduce<TimerMeta[]>((result, id) => {
    const metaId = `meta_${id}`;
    events?.[metaId] && result.push(events[metaId]);

    return result;
  }, []);

  useEffect(() => {
    dataIds.forEach((id) => {
      dispatch(fetchMap({ id: id, lang: lang }));
      dispatch(addActiveMap(id));
    });
  }, [dispatch, dataIds, lang]);

  return (
    <>
      {metaIds.map((timerData, idx) => (
        <MetaBar meta={timerData} key={`${idx}${timerData.name}`} />
      ))}
    </>
  );
}
