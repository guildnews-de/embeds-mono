import { Boon } from '@discretize/gw2-ui-new';
import { ComponentProps } from 'react';
import { IngameUiProps } from '../shared/interfaces';

export default function boonReactor(props: IngameUiProps) {
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
