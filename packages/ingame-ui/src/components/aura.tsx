import { Aura } from '@discretize/gw2-ui-new/ts';
import { ComponentProps } from 'react';
import { IngameUiProps } from '../shared/interfaces';

export default function auraReactor(props: IngameUiProps) {
  const { data, hash } = props;

  type AuraType = ComponentProps<typeof Aura>['name'];

  return (
    <Aura
      name={data.embedName as AuraType}
      //style={style}
      key={hash}
      {...props}
    />
  );
}

export type UiAura = typeof auraReactor;
