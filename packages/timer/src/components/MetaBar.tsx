import { Box, Paper, styled } from '@mui/material';
import { clsx } from 'clsx';

import { TimerMeta } from '../data/metas';
import { TimeObj, TimerProps } from '../shared/interfaces';
import { default as MetaPhase, type MetaPhaseProps } from './MetaPhase';

export interface MetaBarProps extends TimerProps {
  meta: TimerMeta;
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  margin: theme.spacing(0.25),
  padding: theme.spacing(0.5),
}));

export default function MetaBar({ meta, data }: MetaBarProps) {
  const { category, name, phases, offset = 0 } = meta;
  const lastPhase = phases.length - 1;
  const { mark } = data;

  const eventTime = new TimeObj(offset);
  const renderPhases: MetaPhaseProps[] = [];
  phases.forEach((phase, idx) => {
    const { duration } = phase;
    const marked = mark?.includes(idx);
    const phaseTime = eventTime.getCurrentTimeString();
    eventTime.addMinutes(duration);

    if (offset && idx == lastPhase) {
      renderPhases.unshift({
        phase: { ...phase, duration: offset },
        time: eventTime.getInitTimeString(),
        marked: marked,
      });

      const { duration: phaseDur } = phase;
      renderPhases.push({
        phase: { ...phase, duration: phaseDur - offset },
        time: phaseTime,
        marked: marked,
      });
    } else {
      renderPhases.push({
        phase: phase,
        time: phaseTime,
        marked: marked,
      });
    }
  });

  const PhasesRow = () =>
    renderPhases.map((phaseProps, idx) => (
      <MetaPhase key={`${phaseProps.phase.name}${idx}`} {...phaseProps} />
    ));

  console.debug('Start: ' + eventTime.start.toString());

  return (
    <StyledPaper className={clsx('meta', category)} elevation={2}>
      <Box className="meta-name" sx={{ fontWeight: 'bold' }}>
        {name}
      </Box>
      <Box className="meta-bar" display={'flex'} flexDirection={'row'}>
        <PhasesRow />
      </Box>
    </StyledPaper>
  );
}

export type MetaBarComp = typeof MetaBar;
