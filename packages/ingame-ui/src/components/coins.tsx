import { Coin } from '@discretize/gw2-ui-new';
import React from 'react';
import { EmbedProps } from '../shared/interfaces';

export default function coinReactor(props: EmbedProps) {
  const { goldValue, hash } = props;

  return (
    <Coin
      value={goldValue}
      //style={gw2Style}
      key={hash}
      {...props}
    />
  );
}
