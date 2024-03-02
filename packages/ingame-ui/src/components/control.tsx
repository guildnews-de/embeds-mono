import { ControlEffect } from '@discretize/gw2-ui-new';
import { ComponentProps } from 'react';
import { IngameUiProps } from '../shared/interfaces';

export default function controlReactor(props: IngameUiProps) {
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
