import { Aura } from '@discretize/gw2-ui-new';
import React, { ComponentProps } from 'react';
import { EmbedProps } from '../shared/interfaces';

export default function auraReactor(props: EmbedProps) {
  const { embedName, hash } = props;

  type AuraType = ComponentProps<typeof Aura>['name'];

  return (
    <Aura
      name={embedName as AuraType}
      //style={style}
      key={`${hash}`}
      {...props}
    />
  );
}
