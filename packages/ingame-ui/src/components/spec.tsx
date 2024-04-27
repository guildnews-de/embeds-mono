import { Specialization } from '@discretize/gw2-ui-new';
import { IngameUiProps } from '../shared/interfaces';
import { idParser } from '../shared/helper';

export default function specializationReactor(props: IngameUiProps) {
  const { data, hash } = props;
  const { ids } = data;

  // FixMe: Rethink id Parsing
  const idsArray = ids ? idParser(ids) : [0];

  const embed = () =>
    idsArray.map((id, i) => (
      <span key={`${hash}${i}`}>
        <Specialization id={id as number} {...props} />{' '}
      </span>
    ));
  return embed();
}

export type UiSpec = typeof specializationReactor;
