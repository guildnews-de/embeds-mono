import { Box, Paper, Typography, styled } from '@mui/material';
import { DateTime, Interval } from 'luxon';

import { useAppSelector } from '@repo/app-redux';
import type { TimerSegment } from '@repo/app-redux';

import getCssColor from '../shared/getCssColor';

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
  const { bg: color, name, name_de } = phase;
  const { lang } = useAppSelector((state) => state.app);
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

  const background = getCssColor(color);
  const isGradient = background.startsWith('linear-gradient');

  const { now } = useAppSelector((state) => state.app);
  const nowPhase = time.contains(now.toLocal());
  const marked = nowPhase === true || propMarked === true;
  const fontWeight = marked ? 'bold' : undefined;
  return (
    <StyledPaper
      className="phase"
      sx={{
        backgroundColor: isGradient ? undefined : background,
        backgroundImage: isGradient ? background : undefined,
        flexGrow: duration,
        overflow: 'hidden',
      }}
    >
      <Box className="phase-time">
        <Typography display={'inline'} fontWeight={fontWeight}>
          {timeTextLocal}
        </Typography>
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
          fontWeight={fontWeight}
          maxHeight={'1.5em'}
          overflow={'hidden'}
          sx={{ wordBreak: 'break-all' }}
        >
          {lang == 'de' ? name_de : name}
        </Typography>
      </Box>
    </StyledPaper>
  );
}

export type MetaPhaseComp = typeof MetaPhase;
