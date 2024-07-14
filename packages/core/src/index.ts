export { default as AppPanel } from './components/AppPanel';
export { CssBaseline } from '@mui/material';
import * as mapIcons from './assets/map';
import * as variousIcons from './assets/various';

export { mapIcons as map };

const {
  apIcon,
  gemsIcon,
  karmaIcon,
  laurelIcon,
  titleIcon,
  centralIcon,
  hotIcon,
  pofIcon,
  iceIcon,
  eodIcon,
  sotoIcon,
} = variousIcons;

export interface Gw2Icon {
  src: string;
  color: string;
  text: string;
  text_de: string;
}

export const ap: Gw2Icon = {
  src: apIcon,
  color: '#c60',
  text: 'Achievement points',
  text_de: 'Erfolgspunkte',
};

export const gems: Gw2Icon = {
  src: gemsIcon,
  color: '#369',
  text: 'Gems',
  text_de: 'Edelsteine',
};

export const karma: Gw2Icon = {
  src: karmaIcon,
  color: '#90f',
  text: 'Karma',
  text_de: 'Karma',
};

export const laurel: Gw2Icon = {
  src: laurelIcon,
  color: '#060',
  text: 'Laurels',
  text_de: 'Lorbeeren',
};

export const title: Gw2Icon = {
  src: titleIcon,
  color: '#c60',
  text: 'Title',
  text_de: 'Titel',
};

export const masteryCentral: Gw2Icon = {
  src: centralIcon,
  color: '#c00',
  text: 'Central-Tyria-Mastery-Point',
  text_de: 'Zentraltyria-Beherrschungspunkt',
};

export const masteryHot: Gw2Icon = {
  src: hotIcon,
  color: '#360',
  text: 'HoT-Mastery-Point',
  text_de: 'HoT-Beherrschungspunkt',
};

export const masteryPof: Gw2Icon = {
  src: pofIcon,
  color: '#c09',
  text: 'PoF-Mastery-Point',
  text_de: 'PoF-Beherrschungspunkt',
};

export const masteryIce: Gw2Icon = {
  src: iceIcon,
  color: '#09c',
  text: 'Icebrood-Mastery-Point',
  text_de: 'Eisbrut-Beherrschungspunkt',
};

export const masteryEod: Gw2Icon = {
  src: eodIcon,
  color: '#06c',
  text: 'EoD-Mastery-Point',
  text_de: 'Eod-Beherrschungspunkt',
};

export const masterySoto: Gw2Icon = {
  src: sotoIcon,
  color: '#c90',
  text: 'SotO-Mastery-Point',
  text_de: 'SotO-Beherrschungspunkt',
};

export const various = {
  ap: ap,
  gems: gems,
  karma: karma,
  laurel: laurel,
  title: title,
  central: masteryCentral,
  masteryCentral: masteryCentral,
  hot: masteryHot,
  masteryHot: masteryHot,
  pof: masteryPof,
  masteryPof: masteryPof,
  ice: masteryIce,
  masteryIce: masteryIce,
  eod: masteryEod,
  masteryEod: masteryEod,
  soto: masterySoto,
  masterySoto: masterySoto,
};

export default {
  ...mapIcons,
  ...various,
};
