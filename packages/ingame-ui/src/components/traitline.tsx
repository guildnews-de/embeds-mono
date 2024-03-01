import { TraitLine } from '@discretize/gw2-ui-new';
import React from 'react';
import { EmbedProps } from '../shared/interfaces';
import idParser from '../shared/idParser';

export default function traitlineReactor(props: EmbedProps) {
  const { ids, traits, traitsEdit, hash } = props;

  const id = Number(ids);
  const selection = traits
    ? (idParser(traits as string) as number[])
    : undefined;

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
