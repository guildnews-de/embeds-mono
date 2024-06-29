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

export interface IngameMapProps {
  hash: string;
  data?: IngameMapData;
}
