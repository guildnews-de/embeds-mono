import { IconWithText } from '@discretize/gw2-ui-new';
import { IngameUiProps } from '../shared/interfaces';
// import assets from '../assets';
import { various } from '@repo/core';

export default function iconReactor(props: IngameUiProps) {
  const { data, hash } = props;
  const { embedName, count, text } = data;

  // FIXME: Proper check for valid embedName
  type AssetTypes = keyof typeof various;

  const { src, color, text: defaultText } = various[embedName as AssetTypes];
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

export type UiIcon = typeof iconReactor;
