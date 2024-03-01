import { Condition } from '@discretize/gw2-ui-new';
import React, { ComponentProps } from 'react';
import { EmbedProps } from '../shared/interfaces';

export default function condiReactor(props: EmbedProps) {
  const { embedName, hash } = props;

  type ConditionTypes = ComponentProps<typeof Condition>['name'];

  return (
    <Condition name={embedName as ConditionTypes} key={hash} {...props} />
  );
}
