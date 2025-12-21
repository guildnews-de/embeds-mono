import {
  createElementObject,
  createTileLayerComponent,
  updateGridLayer,
  withPane,
} from '@react-leaflet/core';
import { TileEvent, tileLayer, type Coords, type TileLayer } from 'leaflet';
import { getBlobByKey, downloadTile, saveTile } from 'leaflet.offline';
import type { TileLayerProps } from 'react-leaflet';

import fallbackTile from './fallbackTile.jpg';

type TileLayerOptions = ReturnType<typeof withPane>;
interface TileTarget {
  _url: string;
}

interface TileEventWithTarget extends TileEvent {
  target: TileTarget;
}

function leafletOfflineLayer(urlTemplate: string, options: TileLayerOptions) {
  const loLayer = tileLayer(urlTemplate, options);

  loLayer.on(
    'tileloadstart',
    ({ tile, coords, target }: TileEventWithTarget) => {
      // tile.src = '';

      fetchTile(tile, coords, target)
        .then((objUrl) => (tile.src = objUrl))
        .catch(console.error);
    },
  );

  return loLayer;
}

async function fetchTile(
  tile: HTMLImageElement,
  coords: Coords,
  target: TileTarget,
): Promise<string> {
  try {
    const { src } = tile;
    tile.src = '';
    const { _url } = target;
    const { z, x, y } = coords;

    const keyPrefix = src.includes('guildnews') ? 'gn' : 'an';
    const blobKey = [keyPrefix, z, x, y].join('-');
    let blob = await getBlobByKey(blobKey);

    if (!blob) {
      // console.log('from src', blobKey);
      blob = await downloadTile(src);

      if (!blob) {
        throw new Error(`Blob download was empty! [${blobKey}]`);
      }

      saveTile(
        {
          key: blobKey,
          url: src,
          z,
          x,
          y,
          urlTemplate: _url,
          createdAt: Date.now() / 1000,
        },
        blob,
      );
    }
    // else {
    //   console.log('from db', blobKey);
    // }

    return URL.createObjectURL(blob);
  } catch (_err) {
    // const finalErr =
    //   err instanceof Error
    //     ? err
    //     : new Error('Unknown error while loading tile image', { cause: err });

    // finalErr.message = '[fetchTile] ' + finalErr.message;
    // throw finalErr;

    return fallbackTile;
  }
}

const CachedTileLayer = createTileLayerComponent<TileLayer, TileLayerProps>(
  function createTileLayer({ url, ...options }, context) {
    const layer = leafletOfflineLayer(url, withPane(options, context));
    return createElementObject(layer, context);
  },
  function updateTileLayer(layer, props, prevProps) {
    updateGridLayer(layer, props, prevProps);

    const { url } = props;
    if (url != null && url !== prevProps.url) {
      layer.setUrl(url);
    }
  },
);

export { CachedTileLayer };
