import { ControlEffect } from '@discretize/gw2-ui-new';
import React, { ComponentProps } from 'react';
import { EmbedProps } from '../shared/interfaces';

export default function controlReactor(props: EmbedProps) {
  const { embedName, hash } = props;

  type ControlEffectTypes = ComponentProps<typeof ControlEffect>['name'];

  return (
    <ControlEffect
      name={embedName as ControlEffectTypes}
      //style={gw2Style}
      key={hash}
      {...props}
    />
  );
}
