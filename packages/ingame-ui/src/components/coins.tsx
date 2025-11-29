import { Coin } from '@discretize/gw2-ui-new/ts';
import { IngameUiProps } from '../shared/interfaces';

export default function coinReactor(props: IngameUiProps) {
  const { data, hash } = props;

  return (
    <Coin
      value={data.goldValue}
      //style={gw2Style}
      key={hash}
      {...props}
    />
  );
}

export type UiCoin = typeof coinReactor;
