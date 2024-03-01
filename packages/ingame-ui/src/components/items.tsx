import { Item } from '@discretize/gw2-ui-new';
import React, { ComponentProps } from 'react';
import { EmbedProps } from '../shared/interfaces';
import idParser from '../shared/idParser';
import upgradeParser from '../shared/helper';

export default function itemReactor(props: EmbedProps) {
  const { ids, itemStats, itemUpgrades, hash } = props;

  const idsArray = ids ? idParser(ids) : [0];
  const upgrades = itemUpgrades ? upgradeParser(itemUpgrades) : undefined;

  type ItemUpgrades = ComponentProps<typeof Item>['upgrades'];

  const embed = () =>
    idsArray.map((id, i) => (
      <span key={`${hash}${i}`}>
        <Item
          id={id as number}
          upgrades={upgrades ? (upgrades[i] as ItemUpgrades) : undefined}
          stat={itemStats}
          {...props}
        />{' '}
      </span>
    ));
  return embed();
}
