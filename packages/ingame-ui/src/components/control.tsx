import { ControlEffect } from '@discretize/gw2-ui-new/ts';
import { ComponentProps } from 'react';
import { IngameUiProps } from '../shared/interfaces';

export default function controlReactor(props: IngameUiProps) {
  const { data, hash } = props;

  type ControlEffectTypes = ComponentProps<typeof ControlEffect>['name'];

  return (
    <ControlEffect
      name={data.embedName as ControlEffectTypes}
      //style={gw2Style}
      key={hash}
      {...props}
    />
  );
}

export type UiControl = typeof controlReactor;
