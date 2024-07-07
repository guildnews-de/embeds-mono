export interface IngameMapDataset {
  // Common
  gw2Embed?: string;
  gw2Ids?: string;
  gw2Marker?: string;
  gw2Color?: string;
  gw2Mode?: string;
}

export type IngameMapType = 'MapCont' | 'MapInit' | 'MarkerButton';

export function isIngameMapType(value?: string): value is IngameMapType {
  return value === 'MapCont' || value === 'MapInit' || value === 'MarkerButton';
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
      gw2Ids,
      gw2Marker,
      gw2Color = 'blue',
      gw2Mode = 'points',
    } = props;

    if (gw2Embed && isIngameMapType(gw2Embed)) {
      this.type = gw2Embed;
    } else {
      throw Error(`Invalid embed type ${gw2Embed}`);
    }

    this.ids = gw2Ids ? this.splitIds(gw2Ids) : undefined;
    this.marker = gw2Marker?.split(';');
    this.color = gw2Color;
    this.mode = gw2Mode;
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
