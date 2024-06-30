import { Item } from '@discretize/gw2-ui-new';
import { IngameUiProps } from '../shared/interfaces';

export default function itemReactor(props: IngameUiProps) {
  const { data, hash } = props;
  const { ids, itemStats, itemUpgrades } = data;

  const embed = () =>
    ids?.map((id, i) => (
      <span key={`${hash}${i}`}>
        <Item
          id={id}
          upgrades={itemUpgrades ? itemUpgrades[i] : undefined}
          stat={itemStats}
          iconProps={data.getIconStyle()}
          {...props}
        />{' '}
      </span>
    ));
  return embed();
}

export type UiItems = typeof itemReactor;
