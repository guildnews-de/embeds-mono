import axios from 'axios';

import {
  setTileDate,
  // fetchEvents,
  // setNow,
  useAppDispatch,
} from '@repo/app-redux';

type DispatchAction = ReturnType<typeof useAppDispatch>;

export interface tileApiData {
  api: number;
  date: number;
}

export function getTileDate(tileDate: number, dispatch: DispatchAction) {
  const tilesURLDate = 'https://assets.guildnews.de/tiles/version';

  if (!tileDate) {
    axios
      .get(tilesURLDate)
      .then(({ data }: { data: tileApiData }) => {
        dispatch(setTileDate(data));
        return data.date;
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
