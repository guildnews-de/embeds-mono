import loadable from '@loadable/component';
import {
  IngameUiDataset,
  IngameUiData,
  IngameUiProps,
} from '../shared/interfaces';

import type { UiAura } from '../components/aura';
import type { UiBoon } from '../components/boon';
import type { UiCoin } from '../components/coins';
import type { UiCondi } from '../components/condi';
import type { UiControl } from '../components/control';
import type { UiIcon } from '../components/icon';
import type { UiItems } from '../components/items';
import type { UiProf } from '../components/prof';
import type { UiSkills } from '../components/skills';
import type { UiSpec } from '../components/spec';
import type { UiTraitline } from '../components/traitline';
import type { UiTraits } from '../components/traits';

import '../package.scss';
import { useMemo } from 'react';
import { useAppSelector } from '@repo/app-redux';

type IngameUiComponent =
  | UiAura
  | UiBoon
  | UiCoin
  | UiCondi
  | UiControl
  | UiIcon
  | UiItems
  | UiProf
  | UiSkills
  | UiSpec
  | UiTraitline
  | UiTraits;

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

  const AsyncModule = loadable<IngameUiProps>(
    ({ data }) => import(`./${data.type}`) as Promise<IngameUiComponent>,
  );

  return (
    <AsyncModule
      hash={props.hash}
      data={elementData}
      customLang={lang}
      wikiLinkProps={{ lang: lang }}
      iconProps={elementData.getIconStyle()}
    />
  );
}
