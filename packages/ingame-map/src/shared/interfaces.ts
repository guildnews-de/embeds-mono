import type { MapContActions, MapContProps } from '../components/MapCont';
import type { MapLoaderActions, MapLoaderProps } from '../components/MapLoader';
import type {
  MarkerButtonActions,
  MarkerButtonProps,
} from '../components/MarkerButton';
import type { UseAppSelectorHook, UseAppDispatchFunc } from '@repo/app-redux';

export interface IngameMapDataset {
  // Common
  gw2Embed?: string;
  gw2mapIds?: string;
  gw2mapMarker?: string;
  gw2mapColor?: string;
  gw2mapMode?: string;
}

export type IngameMapType = 'MapCont' | 'MapLoader' | 'MarkerButton';

export function isIngameMapType(value?: string): value is IngameMapType {
  return (
    value === 'MapCont' || value === 'MapLoader' || value === 'MarkerButton'
  );
}

export interface IngameMapElement extends Omit<HTMLElement, 'dataset'> {
  dataset: IngameMapDataset;
}

export class IngameMapData {
  type: IngameMapType;
  ids?: number[];
  marker?: string[];
  color: string;
  mode: string;
  constructor(props: IngameMapElement['dataset']) {
    const {
      gw2Embed,
      gw2mapIds,
      gw2mapMarker,
      gw2mapColor = 'blue',
      gw2mapMode = 'points',
    } = props;

    if (gw2Embed && isIngameMapType(gw2Embed)) {
      this.type = gw2Embed;
    } else {
      throw Error(`Invalid embed type ${gw2Embed}`);
    }

    this.ids = gw2mapIds ? this.splitIds(gw2mapIds) : undefined;
    this.marker = gw2mapMarker?.split(';');
    this.color = gw2mapColor;
    this.mode = gw2mapMode;
  }

  splitIds(rawIds: string) {
    const separator = rawIds.includes(';') ? ';' : ',';
    const rawArray = rawIds.split(separator);

    const parseArray: number[] = [];
    rawArray.forEach((idStr) => {
      const idNum = Number(idStr);
      if (!isNaN(idNum)) {
        parseArray.push(idNum);
      }
    });

    return parseArray;
  }
}

export type IngameMapActions = MapContActions &
  MapLoaderActions &
  MarkerButtonActions;

export interface IngameMapHooks {
  useAppSelector: UseAppSelectorHook;
  useAppDispatch: UseAppDispatchFunc;
}

// export interface IngameMapProps {
//   data: IngameMapData;
//   actions: IngameMapActions;
//   hooks: IngameMapHooks;
//   hash: string;
// }

export interface IngameMapDefaultProps {
  hash: string;
  data?: IngameMapData;
  hooks: IngameMapHooks;
}

export type IngameMapProps = IngameMapDefaultProps &
  MapContProps &
  MapLoaderProps &
  MarkerButtonProps;
