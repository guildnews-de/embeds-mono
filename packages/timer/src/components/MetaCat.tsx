import { Box } from '@mui/material';
// import { clsx } from 'clsx';

import type { TimerMeta } from '../data/metas';
import { default as MetaBar } from './MetaBar';
import { TimerProps } from '../shared/interfaces';

// function ClockIndicator() {
//   return (
//     <div>
//       <div className="pointer">
//         <span className="server">
//           <strong>Server time</strong>
//           <span>[[ pointerTime ]]</span>
//         </span>
//         <span className="local">
//           <strong>Your time</strong>
//           <span>[[ pointerLocalTime ]]</span>
//         </span>
//       </div>
//       <div className="pointer">
//         <span className="server">
//           <strong>Server time</strong>
//           <span>[[ pointerTime ]]</span>
//         </span>
//         <span className="local">
//           <strong>Your time</strong>
//           <span>[[ pointerLocalTime ]]</span>
//         </span>
//       </div>
//     </div>
//   );
// }

export interface MetaCatProps extends TimerProps {
  meta: TimerMeta[];
}

export default function MetaCat({ data, hash, meta }: MetaCatProps) {
  const MetaBars = () =>
    meta.map((metaData, idx) => (
      <MetaBar
        meta={metaData}
        data={data}
        hash={hash}
        key={`${metaData.name}${idx}`}
      />
    ));

  return (
    <Box className="meta-container">
      <MetaBars />
    </Box>
  );
}

export type MetaCatComp = typeof MetaCat;
