import { Box } from '@mui/material';
// import { clsx } from 'clsx';

import type { TimerMeta } from 'app-redux';

import { default as MetaBar } from './MetaBar';
import { TimerDefaultProps } from '../shared/interfaces';

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

export interface MetaCatProps extends TimerDefaultProps {
  meta: TimerMeta[];
}

export default function MetaCat({ data, hash, meta }: MetaCatProps) {
  return (
    <Box className="meta-container">
      {data &&
        meta.map((metaData, idx) => (
          <MetaBar
            meta={metaData}
            data={data}
            hash={hash}
            key={`${metaData.name}${idx}`}
          />
        ))}
    </Box>
  );
}

export type MetaCatComp = typeof MetaCat;
