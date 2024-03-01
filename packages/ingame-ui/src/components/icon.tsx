import { IconWithText } from '@discretize/gw2-ui-new';
import React from 'react';
import { EmbedProps } from '../shared/interfaces';
import assets from '../assets';

export default function iconReactor(props: EmbedProps) {
  const { embedName, count, text, hash } = props;

  type AssetTypes = keyof typeof assets;

  const { src, color, text: defaultText } = assets[embedName as AssetTypes];
  let descr = text ? text : defaultText;
  if (count > 1) {
    descr = `${count} ${descr}`;
  }

  const iconStyle = {
    color: color,
  };

  return (
    <IconWithText
      icon={src}
      text={descr}
      style={iconStyle}
      key={hash}
      {...props}
    />
  );
}
