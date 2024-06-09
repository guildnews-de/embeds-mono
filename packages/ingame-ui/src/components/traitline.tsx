import { TraitLine } from '@discretize/gw2-ui-new';
import { IngameUiProps } from '../shared/interfaces';

export default function traitlineReactor(props: IngameUiProps) {
  // console.log(props);
  const { data, hash } = props;
  const { ids, traits, traitsEdit } = data;

  const embed = () =>
    ids?.map((id, i) => (
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
    ));
  return embed();

  // const id = ids?.pop();
  // const id = ids ? ids[0] : undefined;

  // return (
  //   <TraitLine
  //     id={id ? id : 0}
  //     defaultSelected={traits}
  //     resettable={traitsEdit}
  //     selectable={traitsEdit}
  //     key={hash}
  //     {...props}
  //   />
  // );
}

export type UiTraitline = typeof traitlineReactor;
