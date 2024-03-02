import { Coin } from '@discretize/gw2-ui-new';
import { IngameUiProps } from '../shared/interfaces';

export default function coinReactor(props: IngameUiProps) {
  const { goldValue, hash } = props;

  return (
    <Coin
      value={goldValue}
      //style={gw2Style}
      key={hash}
      {...props}
    />
  );
}
