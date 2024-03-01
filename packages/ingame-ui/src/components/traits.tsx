import { Trait } from '@discretize/gw2-ui-new';
import React from 'react';
import { EmbedProps } from '../shared/interfaces';
import idParser from '../shared/idParser';

export default function traitReactor(props: EmbedProps) {
  const { ids, hash } = props;

  const idsArray = ids ? idParser(ids) : [0];

  const embed = () =>
    idsArray.map((id, i) => (
      <span key={`${hash}${i}`}>
        <Trait id={id as number} {...props} />{' '}
      </span>
    ));
  return embed();
}
