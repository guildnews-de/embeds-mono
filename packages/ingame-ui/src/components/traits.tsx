import { Trait } from '@discretize/gw2-ui-new';
import { IngameUiProps } from '../shared/interfaces';

export default function traitReactor(props: IngameUiProps) {
  const { data, hash } = props;
  const { ids } = data;

  const embed = () =>
    ids?.map((id, i) => (
      <span key={`${hash}${i}`}>
        <Trait id={id} {...props} />{' '}
      </span>
    ));
  return embed();
}

export type UiTraits = typeof traitReactor;
