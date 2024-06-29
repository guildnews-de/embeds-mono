import { Box, Paper, styled } from '@mui/material';
import { clsx } from 'clsx';

import { TimerMeta } from '../data/metas2';
import {
  TimerObj,
  TimerData,
  TimerHooks,
  // TimerProps,
} from '../shared/interfaces';
import { default as MetaPhase, type MetaPhaseProps } from './MetaPhase';

export interface MetaBarProps {
  data: TimerData;
  meta: TimerMeta;
  hooks: TimerHooks;
  hash: string;
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  margin: theme.spacing(0.25),
  padding: theme.spacing(0.5),
}));

export default function MetaBar({ meta, data, hooks }: MetaBarProps) {
  const eventObj = new TimerObj(meta);
  const { name, category } = meta;
  const { phases } = eventObj;
  // console.log(phases);
  const renderPhases: MetaPhaseProps[] = [];
  let timePassed = 0;
  eventObj.sequence.forEach((seq, idx) => {
    if (timePassed > 120) {
      return;
    }
    const { r, d } = seq;
    const phase = phases[r - 1];

    if (phase) {
      timePassed += d;
      renderPhases.push({
        phase: phase,
        duration: d,
        time: `${d}`,
      });
    } /* else {
      console.log(`undefined: ${r}`);
    } */
  });

  console.log(renderPhases);

  return (
    <StyledPaper className={clsx('meta', category)} elevation={2}>
      <Box className="meta-name" sx={{ fontWeight: 'bold' }}>
        {name}
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
