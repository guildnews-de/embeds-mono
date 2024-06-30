import { Condition } from '@discretize/gw2-ui-new';
import { ComponentProps } from 'react';
import { IngameUiProps } from '../shared/interfaces';

export default function condiReactor(props: IngameUiProps) {
  const { data, hash } = props;

  type ConditionTypes = ComponentProps<typeof Condition>['name'];

  return (
    <Condition
      name={data.embedName as ConditionTypes}
      key={hash}
      iconProps={data.getIconStyle()}
      {...props}
    />
  );
}

export type UiCondi = typeof condiReactor;
