import { Profession } from '@discretize/gw2-ui-new';
import { ComponentProps } from 'react';
import { IngameUiProps } from '../shared/interfaces';

export default function boonReactor(props: IngameUiProps) {
  const { embedName: embedName, hash } = props;

  type ProfessionTypes = ComponentProps<typeof Profession>['name'];

  return (
    <Profession name={embedName as ProfessionTypes} key={hash} {...props} />
  );
}
