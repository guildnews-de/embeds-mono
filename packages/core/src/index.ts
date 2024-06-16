export { default as AppDrawer } from './components/appPanel';
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
}

export const ap: Gw2Icon = {
  src: apIcon,
  color: '#c60',
  text: 'Erfolgspunkte',
};

export const gems: Gw2Icon = {
  src: gemsIcon,
  color: '#369',
  text: 'Edelsteine',
};

export const karma: Gw2Icon = {
  src: karmaIcon,
  color: '#90f',
  text: 'Karma',
};

export const laurel: Gw2Icon = {
  src: laurelIcon,
  color: '#060',
  text: 'Lorbeeren',
};

export const title: Gw2Icon = {
  src: titleIcon,
  color: '#c60',
  text: 'Titel',
};

export const masteryCentral: Gw2Icon = {
  src: centralIcon,
  color: '#c00',
  text: 'Zentraltyria-Beherrschungspunkt',
};

export const masteryHot: Gw2Icon = {
  src: hotIcon,
  color: '#360',
  text: 'HoT-Beherrschungspunkt',
};

export const masteryPof: Gw2Icon = {
  src: pofIcon,
  color: '#c09',
  text: 'PoF-Beherrschungspunkt',
};

export const masteryIce: Gw2Icon = {
  src: iceIcon,
  color: '#09c',
  text: 'Eisbrut-Beherrschungspunkt',
};

export const masteryEod: Gw2Icon = {
  src: eodIcon,
  color: '#06c',
  text: 'Eod-Beherrschungspunkt',
};

export const masterySoto: Gw2Icon = {
  src: sotoIcon,
  color: '#c90',
  text: 'SotO-Beherrschungspunkt',
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
