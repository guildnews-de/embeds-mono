import loadable from '@loadable/component';
import {
  IngameUiDataset,
  IngameUiData,
  IngameUiProps,
} from '../shared/interfaces';

import '../package.scss';
import { useMemo } from 'react';
import { useAppSelector } from '@internal/core';

export interface IngameUiLoaderProps {
  data: IngameUiDataset;
  hash: string;
}

export default function IngameUiLoader(props: IngameUiLoaderProps) {
  const { data } = props;
  const { lang } = useAppSelector((state) => state.app);

  const elementData = useMemo(() => {
    return new IngameUiData(data);
  }, [data]);

  const AsyncModule = loadable<IngameUiProps>(({ data }) => {
    switch (data.type) {
      case 'aura':
        return import('./aura');
      case 'boon':
        return import('./boon');
      case 'coins':
        return import('./coins');
      case 'condi':
        return import('./condi');
      case 'control':
        return import('./control');
      case 'icon':
        return import('./icon');
      case 'items':
        return import('./items');
      case 'prof':
        return import('./prof');
      case 'skills':
        return import('./skills');
      case 'spec':
        return import('./spec');
      case 'traitline':
        return import('./traitline');
      case 'traits':
        return import('./traits');
      default:
        // FixMe: Implement proper Fallback Embed
        throw Error('[ingame-ui] Unkown embed type');
    }
  });

  return (
    // <StyledBox>
    <AsyncModule
      hash={props.hash}
      data={elementData}
      customLang={lang}
      wikiLinkProps={{ lang: lang }}
      iconProps={elementData.getIconStyle()}
    />
    // </StyledBox>
  );
}
