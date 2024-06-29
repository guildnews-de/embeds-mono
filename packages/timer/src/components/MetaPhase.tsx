import { Box, Paper, styled } from '@mui/material';

import { TimerSegment } from '../data/metas2';
import getCssColor from '../shared/getCssColor';

const StyledPaper = styled(Paper)(({ theme }) => ({
  margin: theme.spacing(0.25),
  padding: theme.spacing(0.5),
  flexBasis: 'min-content',
}));

export interface MetaPhaseProps {
  phase: TimerSegment;
  duration: number;
  time: string;
  marked?: boolean;
}

export default function MetaPhase({
  phase,
  duration,
  time,
  marked,
}: MetaPhaseProps) {
  const { bg: color, name } = phase;
  return (
    <StyledPaper
      className="phase"
      sx={{
        backgroundColor: getCssColor(color),
        flexGrow: duration,
      }}
    >
      <Box
        className="phase-time"
        sx={{ minWidth: 0, fontWeight: marked ? 'bold' : undefined }}
      >
        {time}
      </Box>
      <Box
        className="phase-name"
        sx={{ minWidth: 0, fontWeight: marked ? 'bold' : undefined }}
      >
        {name}
      </Box>
    </StyledPaper>
  );
}

export type MetaPhaseComp = typeof MetaPhase;
