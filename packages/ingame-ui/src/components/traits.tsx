import { Trait } from '@discretize/gw2-ui-new';
import { IngameUiProps } from '../shared/interfaces';
import { idParser } from '../shared/helper';

export default function traitReactor(props: IngameUiProps) {
  const { data, hash } = props;
  const { ids } = data;

  const idsArray = ids ? idParser(ids) : [0];

  const embed = () =>
    idsArray.map((id, i) => (
      <span key={`${hash}${i}`}>
        <Trait id={id as number} {...props} />{' '}
      </span>
    ));
  return embed();
}

export type UiTraits = typeof traitReactor;
