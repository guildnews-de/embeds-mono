import { Box } from '@mui/material';

import { TimerSegment } from '../data/metas';

export default function MetaPhase({ phase }: { phase: TimerSegment }) {
  const { color, duration, name } = phase;
  return (
    <Box
      className="phase"
      sx={{ backgroundColor: color }}
      flexGrow={duration}
      // style$="background: [[ phase.color ]]; color: [[ _textColor(phase.text) ]]; width:calc([[ _calcPhaseWidth(phase.duration) ]]% - .25rem);"
    >
      <Box className="phase-time" /* hidden$="[[ _isCompact(size) ]]" */>
        {/* [[ phase.hour ]]:[[ phase.minute ]] */}
        {`${duration} Hour:Minute (work-in-progress)`}
      </Box>
      <Box className="phase-name">{name}</Box>
    </Box>
  );
}

export type MetaPhaseComp = typeof MetaPhase;
