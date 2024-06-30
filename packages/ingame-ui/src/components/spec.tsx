import { Specialization } from '@discretize/gw2-ui-new';
import { IngameUiProps } from '../shared/interfaces';

export default function specializationReactor(props: IngameUiProps) {
  const { data, hash } = props;
  const { ids } = data;

  const embed = () =>
    ids?.map((id, i) => (
      <span key={`${hash}${i}`}>
        <Specialization id={id} iconProps={data.getIconStyle()} {...props} />{' '}
      </span>
    ));
  return embed();
}

export type UiSpec = typeof specializationReactor;
