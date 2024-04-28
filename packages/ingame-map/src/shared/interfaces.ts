import { MapContActions, MapContHooks } from '../components/MapCont';
import { MarkerButtonActions } from '../components/MarkerButton';

export interface IngameMapDataset {
  // Common
  gw2Embed?: string;
  gw2mapIds?: string;
  gw2mapMarker?: string;
  gw2mapColor?: string;
  gw2mapMode?: string;
}

export type IngameMapType = 'MapCont' | 'MarkerButton';

export function isIngameMapType(value?: string): value is IngameMapType {
  return value === 'MapCont' || value === 'MarkerButton';
}

export interface IngameMapElement extends Omit<HTMLElement, 'dataset'> {
  dataset: IngameMapDataset;
}

export class IngameMapData {
  type: IngameMapType;
  ids?: string;
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

    this.ids = gw2mapIds;
    this.marker = gw2mapMarker?.split(';');
    this.color = gw2mapColor;
    this.mode = gw2mapMode;
  }
}

export type IngameMapActions = MapContActions & MarkerButtonActions;
export type IngameMapHooks = MapContHooks;

export interface IngameMapProps {
  data: IngameMapData;
  actions: IngameMapActions;
  hooks: IngameMapHooks;
  hash: string;
}
