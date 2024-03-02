import { Aura } from '@discretize/gw2-ui-new';
import { ComponentProps } from 'react';
import { IngameUiProps } from '../shared/interfaces';

export default function auraReactor(props: IngameUiProps) {
  const { embedName, hash } = props;

  type AuraType = ComponentProps<typeof Aura>['name'];

  return (
    <Aura
      name={embedName as AuraType}
      //style={style}
      key={hash}
      {...props}
    />
  );
}
