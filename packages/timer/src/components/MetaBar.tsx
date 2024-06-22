import { Box, Paper, styled } from '@mui/material';
import { clsx } from 'clsx';

import { TimerMeta } from '../data/metas';
import { TimeObj, TimerProps } from '../shared/interfaces';
import MetaPhase from './MetaPhase';

export interface MetaBarProps extends TimerProps {
  meta: TimerMeta;
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  margin: theme.spacing(0.25),
  padding: theme.spacing(0.5),
}));

export default function MetaBar({ meta, data }: MetaBarProps) {
  const { category, name, phases } = meta;
  const { mark } = data;

  const eventTime = new TimeObj();

  const PhasesRow = () =>
    phases.map((phase, idx) => {
      const marked = mark?.includes(idx);
      const phaseTime = eventTime.getCurrentTimeString();
      eventTime.addMinutes(phase.duration);
      return (
        <MetaPhase
          phase={phase}
          time={phaseTime}
          marked={marked}
          key={`${phase.name}${idx}`}
        />
      );
    });

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
