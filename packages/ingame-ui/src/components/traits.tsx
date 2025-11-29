import { Trait } from '@discretize/gw2-ui-new/ts';
import { IngameUiProps } from '../shared/interfaces';

export default function traitReactor(props: IngameUiProps) {
  const { data, hash } = props;
  const { ids } = data;

  return (
    <>
      {ids?.map((id, i) => (
        <span key={`${hash}${i}`}>
          <Trait id={id} {...props} />{' '}
        </span>
      ))}
    </>
  );
}

export type UiTraits = typeof traitReactor;
