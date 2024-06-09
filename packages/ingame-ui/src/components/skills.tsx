import { Skill } from '@discretize/gw2-ui-new';
import { IngameUiProps } from '../shared/interfaces';

export default function skillReactor(props: IngameUiProps) {
  const { data, hash } = props;
  const { ids } = data;

  const embed = () =>
    ids?.map((id, i) => (
      <span key={`${hash}${i}`}>
        <Skill id={id} {...props} />{' '}
      </span>
    ));
  return embed();
}

export type UiSkills = typeof skillReactor;
