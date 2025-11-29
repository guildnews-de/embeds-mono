import { Boon } from '@discretize/gw2-ui-new/ts';
import { ComponentProps } from 'react';
import { IngameUiProps } from '../shared/interfaces';

export default function boonReactor(props: IngameUiProps) {
  const { data, hash } = props;

  type BoonTypes = ComponentProps<typeof Boon>['name'];

  return <Boon name={data.embedName as BoonTypes} key={hash} {...props} />;
}

export type UiBoon = typeof boonReactor;
