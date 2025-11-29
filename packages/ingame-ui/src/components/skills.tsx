import { Skill } from '@discretize/gw2-ui-new/ts';
import { IngameUiProps } from '../shared/interfaces';

export default function skillReactor(props: IngameUiProps) {
  const { data, hash } = props;
  const { ids } = data;

  return (
    <>
      {ids?.map((id, i) => (
        <span key={`${hash}${i}`}>
          <Skill id={id} iconProps={data.getIconStyle()} {...props} />{' '}
        </span>
      ))}
    </>
  );
}

export type UiSkills = typeof skillReactor;
