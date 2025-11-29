import { Profession } from '@discretize/gw2-ui-new';
import { ComponentProps } from 'react';
import { IngameUiProps } from '../shared/interfaces';

export default function profReactor(props: IngameUiProps) {
  const { data, hash } = props;

  type ProfessionTypes = ComponentProps<typeof Profession>['name'];

  return (
    <Profession
      name={data.embedName as ProfessionTypes}
      key={hash}
      {...props}
    />
  );
}

export type UiProf = typeof profReactor;
