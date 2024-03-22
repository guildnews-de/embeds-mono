// Classes

export class MapsInitEmbedData {
  ids: string[];
  lang: string;
  debug: boolean;
  constructor(props: MapsInitEmbed['dataset']) {
    const { gw2mapIds = '', gw2mapLang = 'de', gw2mapDebug = 'false' } = props;

    if (gw2mapIds != '') {
      this.ids = gw2mapIds.split(',');
    } else {
      this.ids = [];
    }
    this.lang = gw2mapLang;
    this.debug = gw2mapDebug === 'true' ? true : false;
  }
}

export class MarkerEmbedData {
  marker: string[];
  color: string;
  mode: string;
  constructor(props: MarkerEmbed['dataset']) {
    const {
      gw2mapMarker = '1,1',
      gw2mapColor = 'blue',
      gw2mapMode = 'points',
    } = props;

    this.marker = gw2mapMarker?.split(';');
    this.color = gw2mapColor;
    this.mode = gw2mapMode;
  }
}

// Interface

export interface MarkerEmbed extends Omit<HTMLElement, 'dataset'> {
  dataset: {
    gw2mapIds?: string;
    gw2mapMarker?: string;
    gw2mapColor?: string;
    gw2mapMode?: string;
  };
}

export interface MapsInitEmbed extends Omit<HTMLElement, 'dataset'> {
  dataset: {
    gw2mapIds?: string;
    gw2mapLang?: string;
    gw2mapDebug?: string;
  };
}
