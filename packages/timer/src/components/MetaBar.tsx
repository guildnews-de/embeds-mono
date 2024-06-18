import { Box } from '@mui/material';
import { clsx } from 'clsx';

import { TimerMeta } from '../data/metas';
import { TimerProps } from '../shared/interfaces';
import MetaPhase from './MetaPhase';

export interface MetaBarProps extends TimerProps {
  meta: TimerMeta;
}

export default function MetaBar({ meta }: MetaBarProps) {
  const { category, name, phases } = meta;

  const PhasesRow = () =>
    phases.map((phase, idx) => (
      <MetaPhase phase={phase} key={`${phase.name}${idx}`} />
    ));

  return (
    <Box className={clsx('meta', category)}>
      <p className="meta-name">{name}</p>
      <Box className="meta-bar" display={'flex'} flexDirection={'row'}>
        <PhasesRow />
      </Box>
    </Box>
  );
}

export type MetaBarComp = typeof MetaBar;
