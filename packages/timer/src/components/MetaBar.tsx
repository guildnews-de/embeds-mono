import { Box, Paper, styled } from '@mui/material';
import { clsx } from 'clsx';

import { TimerMeta } from '../data/metas';
import { TimerProps } from '../shared/interfaces';
import MetaPhase from './MetaPhase';

export interface MetaBarProps extends TimerProps {
  meta: TimerMeta;
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  margin: theme.spacing(0.25),
  padding: theme.spacing(0.5),
}));

export default function MetaBar({ meta }: MetaBarProps) {
  const { category, name, phases } = meta;

  const PhasesRow = () =>
    phases.map((phase, idx) => (
      <MetaPhase phase={phase} key={`${phase.name}${idx}`} />
    ));

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
