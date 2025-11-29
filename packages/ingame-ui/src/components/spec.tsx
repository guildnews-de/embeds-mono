import { Specialization } from '@discretize/gw2-ui-new/ts';
import { IngameUiProps } from '../shared/interfaces';

export default function specializationReactor(props: IngameUiProps) {
  const { data, hash } = props;
  const { ids } = data;

  return (
    <>
      {ids?.map((id, i) => (
        <span key={`${hash}${i}`}>
          <Specialization id={id} {...props} />{' '}
        </span>
      ))}
    </>
  );
}

export type UiSpec = typeof specializationReactor;
