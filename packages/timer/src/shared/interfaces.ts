import type { CSSProperties } from 'react';

export interface TimerDataset {
  gw2Embed?: string;
  gw2Id?: string;
  gw2Mark?: string;
  gw2Style?: CSSProperties;
}

export type TimerType = 'MetaBar' | 'MetaCat';

export function isTimerType(value?: string): value is TimerType {
  return value === 'MetaBar' || value === 'MetaCat';
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

export class TimeObj {
  start: Date;
  startHour: number;
  event: Date;
  addHour: number;
  addMin: number;

  constructor(offset: number) {
    const now = new Date();
    now.setMinutes(0);
    now.setSeconds(0);
    now.setHours(Math.floor(now.getHours() / 2) * 2);
    this.start = now;

    // if (this.isDst()) {
    //   this.start.setHours(this.start.getHours() - 1);
    // }

    // this.start = startDate;
    console.debug('Start: ' + this.start.toString());

    this.event = new Date(now.valueOf());

    this.startHour = this.event.getHours();
    this.addHour = 0;
    this.addMin = 0;

    if (offset != 0) {
      this.addMinutes(offset);
    }
  }

  addMinutes(duration: number): void {
    console.group(`Add: ${duration}`);

    this.addMin += duration;

    while (this.addMin >= 60) {
      this.addMin -= 60;
      this.addHour += 1;
    }

    if (this.addHour >= 2) {
      this.addHour -= 2;
    }

    console.log(`Add HUR: ${this.addHour}`);
    console.log(`Add MIN: ${this.addMin}`);
    this.event.setHours(this.startHour + this.addHour);
    this.event.setMinutes(this.addMin);

    console.debug(this.start.toString());
    console.groupEnd();
  }

  getCurrentTimeString(): string {
    return this.event.toLocaleTimeString('de-DE', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  getInitTimeString(): string {
    return this.start.toLocaleTimeString('de-DE', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  stdTimezoneOffset(): number {
    const fullYear = this.start.getFullYear();
    const jan = new Date(fullYear, 0, 1);
    const jul = new Date(fullYear, 6, 1);
    return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
  }

  isDst(): boolean {
    return this.start.getTimezoneOffset() < this.stdTimezoneOffset();
  }
}

export interface TimerProps {
  data: TimerData;
  hash: string;
}
