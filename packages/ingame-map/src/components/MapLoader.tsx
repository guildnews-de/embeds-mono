import {
  useAppSelector,
  useAppDispatch,
  fetchMap,
  addActiveMap,
} from '@repo/app-redux';
import { useMemo } from 'react';

import type { IngameMapProps } from '../shared/interfaces';

import '../package.scss';

export default function MapLoader({ data }: IngameMapProps) {
  const { lang } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();

  useMemo(() => {
    const { ids } = data!;
    if (ids && ids.length > 0 /* && !mapsLoaded */) {
      ids.forEach((id) => {
        dispatch(fetchMap({ id: id, lang: lang }));
        dispatch(addActiveMap(id));
      });
    }
  }, [dispatch, data, lang]);

  return <></>;
}
