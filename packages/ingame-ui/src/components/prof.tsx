import { Profession } from '@discretize/gw2-ui-new';
import React, { ComponentProps, ReactElement } from 'react';
import { EmbedProps } from '../shared/interfaces';

export default function boonReactor(props: EmbedProps): ReactElement {
  const { embedName: embedName, hash } = props;

  type ProfessionTypes = ComponentProps<typeof Profession>['name'];

  return (
    <Profession name={embedName as ProfessionTypes} key={hash} {...props} />
  );
}
