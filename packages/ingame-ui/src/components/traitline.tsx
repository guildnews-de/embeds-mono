import { TraitLine } from '@discretize/gw2-ui-new';
import { IngameUiProps } from '../shared/interfaces';

export default function traitlineReactor(props: IngameUiProps) {
  // console.log(props);
  const { data, hash } = props;
  const { ids, traits, traitsEdit } = data;

  return (
    <>
      {ids?.map((id, i) => (
        <span key={`${hash}${i}`}>
          <TraitLine
            id={id ? id : 0}
            defaultSelected={traits ? (traits[i] as number[]) : undefined}
            resettable={traitsEdit}
            selectable={traitsEdit}
            key={hash}
            {...props}
          />
        </span>
      ))}
    </>
  );
}

export type UiTraitline = typeof traitlineReactor;
