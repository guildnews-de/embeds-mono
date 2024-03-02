import { Trait } from '@discretize/gw2-ui-new';
import { IngameUiProps } from '../shared/interfaces';
import { idParser } from '../shared/helper';

export default function traitReactor(props: IngameUiProps) {
  const { ids, hash } = props;

  const idsArray = ids ? idParser(ids) : [0];

  const embed = () =>
    idsArray.map((id, i) => (
      <span key={`${hash}${i}`}>
        <Trait id={id as number} {...props} />{' '}
      </span>
    ));
  return embed();
}
