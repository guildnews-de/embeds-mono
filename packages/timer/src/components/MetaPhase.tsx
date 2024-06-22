import { Box, Paper, styled } from '@mui/material';

import { TimerSegment } from '../data/metas';

const StyledPaper = styled(Paper)(({ theme }) => ({
  margin: theme.spacing(0.25),
  padding: theme.spacing(0.5),
  flexBasis: 'min-content',
  overflow: '',
}));

export default function MetaPhase({ phase }: { phase: TimerSegment }) {
  const { color, duration, name } = phase;
  const maxWidth = 1.2 * duration;
  return (
    <StyledPaper
      className="phase"
      sx={{
        backgroundColor: color,
        flexGrow: duration,
        maxWidth: `${maxWidth}%`,
      }}
      // flexGrow={duration}
      // style$="background: [[ phase.color ]]; color: [[ _textColor(phase.text) ]]; width:calc([[ _calcPhaseWidth(phase.duration) ]]% - .25rem);"
    >
      <Box className="phase-time" sx={{ minWidth: 0 }}>
        {/* [[ phase.hour ]]:[[ phase.minute ]] */}
        {`${duration} Hour:Minute (work-inprogress)`}
      </Box>
      <Box className="phase-name" sx={{ minWidth: 0 }}>
        {name}
      </Box>
    </StyledPaper>
  );
}

export type MetaPhaseComp = typeof MetaPhase;
