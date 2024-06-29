import type { CSSProperties } from 'react';
import { DateTime, Interval, Settings } from 'luxon';
// import type { UseAppSelectorHook, UseAppDispatchFunc } from '@repo/app-redux';
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

export interface ParsedSequence extends TimerSequence {
  interval: Interval;
}

export class TimerObj {
  fullrun = 1440; // 24h
  interval: Interval;
  phases: TimerSegment[] = [];
  sequence: ParsedSequence[] = [];

  constructor(meta: TimerMeta, appNow: Date) {
    Settings.throwOnInvalid = true;

    const eventNow = DateTime.fromJSDate(appNow);

    const day =
      eventNow.hour < 23 ? eventNow.minus({ day: 1 }).day : eventNow.day;
    const start = eventNow.set({
      day: day,
      hour: 23,
      minute: 0,
      millisecond: 0,
    });
    this.interval = Interval.after(start, { minutes: 0 });

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
    const { partial, pattern } = sequences;

    partial.map((seq) => {
      const { d } = seq;
      const last = this.interval.end!;
      const seqInterval = Interval.after(last, { minutes: d });
      this.sequence.push({ interval: seqInterval, ...seq });

      const start = this.interval.start!;
      this.interval = Interval.fromDateTimes(start, seqInterval.end!);
    });

    while (this.interval.length('minutes') < this.fullrun) {
      pattern.map((seq) => {
        if (length < this.fullrun) {
          const { d } = seq;
          const last = this.interval.end!;
          const seqInterval = Interval.after(last, { minutes: d });
          this.sequence.push({ interval: seqInterval, ...seq });

          const start = this.interval.start!;
          this.interval = Interval.fromDateTimes(start, seqInterval.end!);
        }
      });
    }
  }

  // stdTimezoneOffset(): number {
  //   const fullYear = this.now.getFullYear();
  //   const jan = new Date(fullYear, 0, 1);
  //   const jul = new Date(fullYear, 6, 1);
  //   return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
  // }

  // isDst(): boolean {
  //   return this.now.getTimezoneOffset() < this.stdTimezoneOffset();
  // }
}

export interface TimerDefaultProps {
  hash: string;
  data?: TimerData;
}

export type TimerProps = TimerDefaultProps & MetaBarProps;
