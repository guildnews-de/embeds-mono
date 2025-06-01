import { Box, Paper, type PaperProps, Typography, styled } from '@mui/material';
import { clsx } from 'clsx';

import type { TimerMeta } from 'app-redux';

import { TimerObj, TimerData } from '../shared/interfaces';
import { default as MetaPhase, type MetaPhaseProps } from './MetaPhase';
import { DateTime, Interval, Settings } from 'luxon';
import { useMemo } from 'react';
import { useAppSelector } from 'app-redux';

export interface MetaBarProps {
  data?: TimerData;
  meta: TimerMeta;
  hash?: string;
}

interface ModePaperProps extends PaperProps {
  darkMode?: boolean;
}

const ModePaper = (props: ModePaperProps) => {
  return <Paper {...props} />;
};

const StyledPaper = styled(ModePaper, {
  shouldForwardProp: (prop) => prop !== 'darkMode',
})(({ theme, darkMode }) => ({
  margin: theme.spacing(0.25),
  padding: theme.spacing(0.5),
  backgroundColor: darkMode ? theme.palette.grey[700] : theme.palette.grey[300],
}));

export default function MetaBar({ meta }: MetaBarProps) {
  const { now, lang } = useAppSelector((state) => state.app);
  const eventObj = useMemo(() => {
    return new TimerObj(meta, now);
  }, [meta, now]);

  const { name, name_de, category } = meta;
  const { phases, sequence } = eventObj;

  const parsedMinutes = now.minute - (now.minute % 5);
  const viewInterval = useMemo(() => {
    const localNow = now.toLocal();
    // const luxon = now;
    const viewNow = DateTime.local(
      localNow.year,
      localNow.month,
      localNow.day,
      localNow.hour,
      parsedMinutes,
      0,
      0,
    );
    return Interval.fromDateTimes(
      viewNow.minus({ minutes: 20 }),
      viewNow.plus({ minutes: 100 }),
    );
  }, [now, parsedMinutes]);

  const renderPhases = useMemo(() => {
    const barProps: MetaPhaseProps[] = [];
    sequence.forEach((seq) => {
      Settings.throwOnInvalid = true;
      const { interval, r, d } = seq;
      const phase = phases[r - 1];

      // const startTime = interval.start!.toLocaleString(DateTime.TIME_SIMPLE);
      if (phase && viewInterval.contains(interval.start!)) {
        barProps.push({
          phase: phase,
          duration: d,
          time: interval,
        });
      }
    });
    return barProps;
  }, [sequence, phases, viewInterval]);

  return (
    <StyledPaper
      className={clsx('meta', category)}
      elevation={2}
      darkMode={
        document.querySelector('html')?.classList.contains('dark-skin') === true
      }
    >
      <Box className="meta-name" sx={{ fontWeight: 'bold' }}>
        <Typography variant="h6">{lang == 'de' ? name_de : name}</Typography>
        {/* <Typography>{now.toLocal().toString()}</Typography> */}
      </Box>
      <Box className="meta-bar" display={'flex'} flexDirection={'row'}>
        {renderPhases.map((phaseProps, idx) => (
          <MetaPhase key={`${phaseProps.phase.name}${idx}`} {...phaseProps} />
        ))}
      </Box>
    </StyledPaper>
  );
}

export type MetaBarComp = typeof MetaBar;
