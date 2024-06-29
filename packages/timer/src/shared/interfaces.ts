import type { CSSProperties } from 'react';
import type { UseAppSelectorHook, UseAppDispatchFunc } from '@repo/app-redux';
import { MetaBarProps } from '../components/MetaBar';
import {
  TimerMeta,
  TimerSegment,
  TimerSequenceData,
  TimerSequence,
} from '../data/metas2';

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
  ids?: string;
  mark?: number[];
  style?: CSSProperties;
  constructor(props: TimerElement['dataset']) {
    const { gw2Embed, gw2Mark, gw2Id = '', gw2Style } = props;

    if (gw2Embed && isTimerType(gw2Embed)) {
      this.type = gw2Embed;
    } else {
      throw Error(`Invalid embed type ${gw2Embed}`);
    }

    this.ids = gw2Id.length > 0 ? gw2Id : undefined;
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

export class TimerObj {
  fullrun = 1440; // 24h
  start: number;
  now: Date;
  phases: TimerSegment[] = [];
  sequence: TimerSequence[] = [];
  timestamps: number[] = [];

  constructor(meta: TimerMeta) {
    const now = new Date();
    this.now = now;

    const year = now.getFullYear();
    const month = now.getMonth();
    const day = now.getDate();
    const start = new Date(year, month, day, 23, 0);
    now.getHours() < 23 && start.setDate(day - 1);

    this.start = start.getTime();

    const { segments, sequences } = meta;
    this.pushPhases(segments);
    this.pushSeqences(sequences);
  }

  pushPhases(phases: Record<string, TimerSegment>) {
    Object.keys(phases).forEach((key) => {
      const phase = phases[key];
      phase && this.phases?.push(phase);
    });
  }

  pushSeqences(sequences: TimerSequenceData) {
    let length = 0;
    const { partial, pattern } = sequences;

    partial.map((seq) => {
      const { d } = seq;
      length += d;
      this.sequence.push(seq);
    });

    while (length < this.fullrun) {
      pattern.map((seq) => {
        if (length < this.fullrun) {
          const { d } = seq;
          length += d;
          this.sequence.push(seq);
        }
      });
    }
  }

  getInitTimeString(): string {
    return this.now.toLocaleTimeString('de-DE', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  stdTimezoneOffset(): number {
    const fullYear = this.now.getFullYear();
    const jan = new Date(fullYear, 0, 1);
    const jul = new Date(fullYear, 6, 1);
    return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
  }

  isDst(): boolean {
    return this.now.getTimezoneOffset() < this.stdTimezoneOffset();
  }
}

export interface TimerHooks {
  useAppSelector: UseAppSelectorHook;
  useAppDispatch: UseAppDispatchFunc;
}

export interface TimerDefaultProps {
  hash: string;
  data?: TimerData;
  hooks: TimerHooks;
}

export type TimerProps = TimerDefaultProps & MetaBarProps;
