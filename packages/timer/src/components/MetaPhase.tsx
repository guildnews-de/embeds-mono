import { Box, Paper, styled } from '@mui/material';
import { DateTime, Interval } from 'luxon';

import { TimerSegment } from '../data/metas2';
import getCssColor from '../shared/getCssColor';
import { useAppSelector } from '@repo/app-redux';

const StyledPaper = styled(Paper)(({ theme }) => ({
  margin: theme.spacing(0.25),
  padding: theme.spacing(0.5),
  flexBasis: 'min-content',
}));

export interface MetaPhaseProps {
  phase: TimerSegment;
  duration: number;
  time: Interval;
  marked?: boolean;
}

export default function MetaPhase({
  phase,
  duration,
  time,
  marked: propMarked,
}: MetaPhaseProps) {
  const { bg: color, name } = phase;
  const timeText = time.start
    ? time.start.toLocaleString(DateTime.TIME_SIMPLE)
    : 'invalid timestamp';

  const { now } = useAppSelector((state) => state.app);
  const nowPhase = time.contains(DateTime.fromJSDate(now));
  const marked = nowPhase === true || propMarked === true;
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
        {timeText}
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
