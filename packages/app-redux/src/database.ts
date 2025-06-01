import { openDB, deleteDB, type DBSchema } from 'idb';
import type {
  GW2ApiMapsResponse,
  GW2ApiRegionsResponse,
} from './shared/gw2Api';
import type { TimerMeta } from './slice/apiSlice';
import type { DateTime } from 'luxon';

export interface CachedGW2Data {
  timestamp: DateTime;
  data: GW2ApiMapsResponse & GW2ApiRegionsResponse;
}

export interface CachedTimerData {
  timestamp: DateTime;
  data: Record<string, TimerMeta>;
}

export interface GN_GW2EmbDBv1 extends DBSchema {
  gw2_api_data: {
    key: string;
    value: CachedGW2Data;
  };
  gn_api_data: {
    key: string;
    value: CachedTimerData;
  };
}

export async function openGNDB() {
  await deleteDB('GuildNews_GW2Embeds');
  return await openDB<GN_GW2EmbDBv1>('GN_GW2EmbDB', 1, {
    upgrade(db) {
      db.createObjectStore('gn_api_data');
      db.createObjectStore('gw2_api_data');
    },
    // upgrade(db, oldVer) {
    //   const v2Db = db as unknown as IDBPDatabase<GW2EmbedsDBv2>;

    //   oldVer < 2 && v2Db.createObjectStore('gw2_api_data');
    //   oldVer < 3 && db.createObjectStore('gn_api_data');
    // },
  });
}

export default openGNDB;
