import { TraitLine } from '@discretize/gw2-ui-new';
import { IngameUiProps } from '../shared/interfaces';
import { idParser } from '../shared/helper';

export default function traitlineReactor(props: IngameUiProps) {
  const { ids, traits, traitsEdit, hash } = props;

  const id = Number(ids);
  const selection = traits ? (idParser(traits) as number[]) : undefined;

  return (
    <TraitLine
      id={id}
      defaultSelected={selection}
      resettable={traitsEdit}
      selectable={traitsEdit}
      key={hash}
      {...props}
    />
  );
}
