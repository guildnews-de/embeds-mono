import { Box, Paper, Typography, styled } from '@mui/material';
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
  const timeTextLocal = time.start
    ? time.start.toLocal().toLocaleString(DateTime.TIME_SIMPLE)
    : 'invalid timestamp';
  const timeTextUTC = time.start
    ? time.start.toLocaleString({
        hour: 'numeric',
        minute: '2-digit',
        timeZoneName: 'short',
      })
    : '';

  const { now } = useAppSelector((state) => state.app);
  const nowPhase = time.contains(now);
  const marked = nowPhase === true || propMarked === true;
  return (
    <StyledPaper
      className="phase"
      sx={{
        backgroundColor: getCssColor(color),
        flexGrow: duration,
        overflow: 'hidden',
      }}
    >
      <Box
        className="phase-time"
        sx={{ minWidth: 0, fontWeight: marked ? 'bold' : undefined }}
      >
        <Typography display={'inline'}>{timeTextLocal}</Typography>
        <Typography display={'inline'} fontSize="0.6rem">
          {timeTextUTC}
        </Typography>
      </Box>
      <Box
        className="phase-name"
        sx={{ minWidth: 0, fontWeight: marked ? 'bold' : undefined }}
      >
        <Typography
          fontSize="0.8rem"
          maxHeight={'1.5em'}
          overflow={'hidden'}
          sx={{ wordBreak: 'break-all' }}
        >
          {name}
        </Typography>
      </Box>
    </StyledPaper>
  );
}

export type MetaPhaseComp = typeof MetaPhase;
