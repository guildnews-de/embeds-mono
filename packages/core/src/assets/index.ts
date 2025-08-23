// export { default as AppPanel } from '../../app-redux/src/components/AppPanel';
// export { CssBaseline } from '@mui/material';
import * as mapIcons from './map';
import * as variousPngs from './various';

// export { mapIcons as map };

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
  jwIcon,
} = variousPngs;

interface Gw2Icon {
  src: string;
  color: string;
  text: string;
  text_de: string;
}

const ap: Gw2Icon = {
  src: apIcon,
  color: '#c60',
  text: 'Achievement points',
  text_de: 'Erfolgspunkte',
};

const gems: Gw2Icon = {
  src: gemsIcon,
  color: '#369',
  text: 'Gems',
  text_de: 'Edelsteine',
};

const karma: Gw2Icon = {
  src: karmaIcon,
  color: '#90f',
  text: 'Karma',
  text_de: 'Karma',
};

const laurel: Gw2Icon = {
  src: laurelIcon,
  color: '#060',
  text: 'Laurels',
  text_de: 'Lorbeeren',
};

const title: Gw2Icon = {
  src: titleIcon,
  color: '#c60',
  text: 'Title',
  text_de: 'Titel',
};

const masteryCentral: Gw2Icon = {
  src: centralIcon,
  color: '#c00',
  text: 'Central-Tyria-Mastery-Point',
  text_de: 'Zentraltyria-Beherrschungspunkt',
};

const masteryHot: Gw2Icon = {
  src: hotIcon,
  color: '#360',
  text: 'HoT-Mastery-Point',
  text_de: 'HoT-Beherrschungspunkt',
};

const masteryPof: Gw2Icon = {
  src: pofIcon,
  color: '#c09',
  text: 'PoF-Mastery-Point',
  text_de: 'PoF-Beherrschungspunkt',
};

const masteryIce: Gw2Icon = {
  src: iceIcon,
  color: '#09c',
  text: 'Icebrood-Mastery-Point',
  text_de: 'Eisbrut-Beherrschungspunkt',
};

const masteryEod: Gw2Icon = {
  src: eodIcon,
  color: '#06c',
  text: 'EoD-Mastery-Point',
  text_de: 'Eod-Beherrschungspunkt',
};

const masterySoto: Gw2Icon = {
  src: sotoIcon,
  color: '#c90',
  text: 'SotO-Mastery-Point',
  text_de: 'SotO-Beherrschungspunkt',
};

const masteryJw: Gw2Icon = {
  src: jwIcon,
  color: '#03c',
  text: 'Janthir-Mastery-Point',
  text_de: 'Janthir-Beherrschungspunkt',
};

const variousIcons: Record<string, Gw2Icon> = {
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
  jw: masteryJw,
  masteryJw: masteryJw,
};

// export default {
//   ...mapIcons,
//   ...various,
// };

export { mapIcons, variousIcons };

export type { Gw2Icon };
