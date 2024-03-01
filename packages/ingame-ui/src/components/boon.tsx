import { Boon } from '@discretize/gw2-ui-new';
import React, { ComponentProps } from 'react';
import { EmbedProps } from '../shared/interfaces';

export default function boonReactor(props: EmbedProps) {
  const { embedName, hash } = props;

  type BoonTypes = ComponentProps<typeof Boon>['name'];

  return (
    <Boon
      name={embedName as BoonTypes}
      //style={gw2Style}
      key={hash}
      {...props}
    />
  );
}
