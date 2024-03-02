import { Condition } from '@discretize/gw2-ui-new';
import { ComponentProps } from 'react';
import { IngameUiProps } from '../shared/interfaces';

export default function condiReactor(props: IngameUiProps) {
  const { embedName, hash } = props;

  type ConditionTypes = ComponentProps<typeof Condition>['name'];

  return <Condition name={embedName as ConditionTypes} key={hash} {...props} />;
}
