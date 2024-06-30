import { IconWithText } from '@discretize/gw2-ui-new';
import { IngameUiProps } from '../shared/interfaces';
import { various } from '@repo/core';

type AssetTypes = keyof typeof various;
export function isIconType(name: string): name is AssetTypes {
  const assetKeys = Object.keys(various);
  if (assetKeys.includes(name)) {
    return true;
  }
  return false;
}

export default function iconReactor(props: IngameUiProps) {
  const { data, hash, customLang } = props;
  const { embedName, count, text } = data;

  if (embedName && isIconType(embedName)) {
    const assetIcon = various[embedName];

    const { src, color } = assetIcon;

    let descr: string;
    if (text && text.length > 0) {
      descr = text;
    } else {
      descr = customLang === 'de' ? assetIcon.text_de : assetIcon.text;
    }

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
        iconProps={data.getIconStyle()}
        {...props}
      />
    );
  }
}

export type UiIcon = typeof iconReactor;
