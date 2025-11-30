import type { CSSProperties, ComponentProps, JSX } from 'react';
import type { Icon, WikiLink } from '@discretize/gw2-ui-new/ts';

export type IconProps = ComponentProps<typeof Icon>;
export type WikiLinkProps = ComponentProps<typeof WikiLink>;

export interface IngameUiDataset {
  // Common
  gw2Embed?: string;
  gw2Id?: string;
  gw2Text?: string;
  gw2Notooltip?: string;
  gw2Notext?: string;
  gw2Nolink?: string;
  gw2Noicon?: string;
  gw2Inline?: string;
  gw2Class?: string;
  gw2Style?: CSSProperties;
  gw2Size?: string;
  // Boon, Condition, Effect
  gw2Name?: string;
  gw2Count?: number;
  // Gold
  gw2Value?: number;
  // Item
  gw2Stats?: string;
  gw2Upgrades?: string;
  // Traitline
  gw2Inactive?: string;
  gw2Traits?: string;
  gw2Edit?: string;
}

export type IngameUiType =
  | 'aura'
  | 'boon'
  | 'coins'
  | 'condi'
  | 'control'
  | 'icon'
  | 'items'
  | 'prof'
  | 'skills'
  | 'spec'
  | 'traitline'
  | 'traits';

export function isIngameUiType(value?: string): value is IngameUiType {
  return (
    value === 'aura' ||
    value === 'boon' ||
    value === 'coins' ||
    value === 'condi' ||
    value === 'control' ||
    value === 'icon' ||
    value === 'items' ||
    value === 'prof' ||
    value === 'skills' ||
    value === 'spec' ||
    value === 'traitline' ||
    value === 'traits'
  );
}

export interface IngameUiElement extends Omit<HTMLElement, 'dataset'> {
  dataset: IngameUiDataset;
}

type SelectionId = number | [number, number];

export class IngameUiData {
  type: IngameUiType;
  ids?: number[];
  text?: string;
  style?: CSSProperties;
  count: number;
  size: number;
  embedName?: string;
  goldValue: number;
  itemStats?: string;
  itemUpgrades?: SelectionId[][];
  inline: boolean;
  traitsInactive: boolean;
  traitsEdit: boolean;
  traits?: SelectionId[][];
  disableTooltip: boolean;
  disableText: boolean;
  disableLink: boolean;
  disableIcon: boolean;
  constructor(props: IngameUiDataset) {
    const {
      gw2Embed,
      gw2Id = '',
      gw2Text = '',
      gw2Size = '',
      gw2Count = '',
      gw2Value = '',
      gw2Name,
      gw2Stats,
      gw2Upgrades,
      gw2Traits,
      gw2Style,
      gw2Notooltip = 'false',
      gw2Notext = 'false',
      gw2Nolink = 'false',
      gw2Noicon = 'false',
      gw2Inline = 'false',
      gw2Inactive = 'false',
      gw2Edit = 'false',
    } = props;

    if (gw2Embed && isIngameUiType(gw2Embed)) {
      this.type = gw2Embed;
    } else {
      throw Error(`Invalid embed type ${gw2Embed}`);
    }

    this.ids = this.splitIds(gw2Id);
    this.text = gw2Text;
    this.style = gw2Style;
    this.size = Number(gw2Size);
    this.count = Number(gw2Count);
    this.goldValue = Number(gw2Value);
    this.embedName = gw2Name;
    this.itemStats = gw2Stats;
    this.itemUpgrades = gw2Upgrades
      ? this.splitSelection(gw2Upgrades)
      : undefined;
    this.traits = gw2Traits ? this.splitSelection(gw2Traits) : undefined;
    this.traitsInactive = gw2Inactive === 'false' ? false : true;
    this.traitsEdit = gw2Edit === 'false' ? false : true;
    this.inline = gw2Inline === 'false' ? false : true;
    this.disableTooltip = gw2Notooltip === 'false' ? false : true;
    this.disableText = gw2Notext === 'false' ? false : true;
    this.disableLink = gw2Nolink === 'false' ? false : true;
    this.disableIcon = gw2Noicon === 'false' ? false : true;
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

  splitSelection(rawUpgrs: string) {
    const rawArray = rawUpgrs.split(';');
    const parseArray: SelectionId[][] = [];

    rawArray.forEach((upgrStr) => {
      const upgrIds = this.getSelectionId(upgrStr);
      parseArray.push(upgrIds);
    });

    return parseArray;
  }

  getSelectionId(rawUpgr: string) {
    const rawArray = rawUpgr.split(',');
    const parseArray: SelectionId[] = [];

    rawArray.forEach((upgrStr) => {
      if (upgrStr.includes('+')) {
        const idStrings = upgrStr.split('+');
        const id: SelectionId = [Number(idStrings[0]), Number(idStrings[1])];
        parseArray.push(id);
      } else {
        const id: SelectionId = Number(upgrStr);
        parseArray.push(id);
      }
    });

    return parseArray;
  }

  getIconStyle(): IconProps | undefined {
    const iconProps = this.size
      ? ({
          style: {
            fontSize: `${this.size}px`,
            verticalAlign: 'middle',
          } as CSSProperties,
        } as IconProps)
      : undefined;

    return iconProps;
  }
}

export interface IngameUiProps {
  data: IngameUiData;
  hash: string;
  customLang?: string;
  wikiLinkProps?: Partial<WikiLinkProps>;
  iconProps?: Partial<IconProps>;
}

export type IngameUiConstructor = (props: IngameUiProps) => JSX.Element;
