import { Specialization } from '@discretize/gw2-ui-new';
import React from 'react';
import { EmbedProps } from '../shared/interfaces';
import idParser from '../shared/idParser';

export default function specializationReactor(props: EmbedProps) {
  const { ids, hash } = props;

  const idsArray = ids ? idParser(ids) : [0];

  const embed = () =>
    idsArray.map((id, i) => (
      // eslint-disable-next-line react/no-array-index-key
      <span key={`${hash}${i}`}>
        <Specialization id={id as number} {...props} />{' '}
      </span>
    ));
  return embed();
}
