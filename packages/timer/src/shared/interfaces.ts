import type { CSSProperties } from 'react';

export interface TimerDataset {
  gw2Embed?: string;
  gw2Id?: string;
  gw2Mark?: string;
  gw2Style?: CSSProperties;
}

export type TimerType = 'metaBar' | 'metaCat';

export function isTimerType(value?: string): value is TimerType {
  return value === 'metaBar' || value === 'metaCat';
}

export interface TimerElement extends Omit<HTMLElement, 'dataset'> {
  dataset: TimerDataset;
}

export class TimerData {
  type: TimerType;
  ids?: number;
  mark?: number[];
  style?: CSSProperties;
  constructor(props: TimerElement['dataset']) {
    const { gw2Embed, gw2Mark, gw2Id = '', gw2Style } = props;

    if (gw2Embed && isTimerType(gw2Embed)) {
      this.type = gw2Embed;
    } else {
      throw Error(`Invalid embed type ${gw2Embed}`);
    }

    this.ids = Number(gw2Id);
    this.mark = gw2Mark ? this.splitIds(gw2Mark) : undefined;
    this.style = gw2Style;
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

export interface TimerProps {
  data: TimerData;
  hash: string;
}
