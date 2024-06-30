import { ControlEffect } from '@discretize/gw2-ui-new';
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
      iconProps={data.getIconStyle()}
      {...props}
    />
  );
}

export type UiControl = typeof controlReactor;
