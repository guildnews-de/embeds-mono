import {
  AppPanel,
  fetchEvents,
  // setNow,
  useAppDispatch,
  useAppSelector,
} from '@internal/core';
import { useEffect } from 'react';

import loadable from '@loadable/component';

export function BaseUI() {
  const { groupNames } = useAppSelector((state) => state.marker);
  // const { nowTimer } = useAppSelector((state) => state.app);
  const { events } = useAppSelector((state) => state.api.response);
  const dispatch = useAppDispatch();

  useEffect(() => {
    !events && dispatch(fetchEvents({ id: 'all' }));
  }, [dispatch, events]);

  const AsyncModule = loadable<Record<string, never>>(
    () => import('@internal/ingame-map/MapCont'),
  );

  return (
    <AppPanel>
      {groupNames.length > 0 ? <AsyncModule /> : <p>--empty--</p>}
    </AppPanel>
  );
}
