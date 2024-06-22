export interface TimerMeta {
  category: string;
  name: string;
  phases: TimerSegment[];
}

export interface TimerSegment {
  name: string;
  duration: number;
  color: string;
}

// Default export
const metas: Record<number, TimerMeta> = {
  0: {
    category: 'other',
    name: 'Day and night',
    phases: [
      {
        name: 'Night',
        duration: 25,
        color: '#263238',
      },
      {
        name: 'Dawn',
        duration: 5,
        color: 'linear-gradient(to right, #263238, #78909C)',
      },
      {
        name: 'Day',
        duration: 70,
        color: '#78909C',
      },
      {
        name: 'Dusk',
        duration: 5,
        color: 'linear-gradient(to right, #78909C, #263238)',
      },
      {
        name: 'Night',
        duration: 15,
        color: '#263238',
      },
    ],
  },
  1: {
    category: 'other',
    name: 'Ley-Line Anomaly',
    phases: [
      {
        name: 'Accumulating',
        duration: 20,
        color: '#D32F2F',
      },
      {
        name: 'Spawn',
        duration: 20,
        color: '#B71C1C',
      },
      {
        name: 'Accumulating',
        duration: 80,
        color: '#D32F2F',
      },
    ],
  },
  988: {
    category: 'core',
    name: 'Dry Top',
    phases: [
      {
        name: 'Crash Site',
        duration: 40,
        color: '#FCFADC',
      },
      {
        name: 'Sandstorm',
        duration: 20,
        color: '#DED98A',
      },
      {
        name: 'Crash Site',
        duration: 40,
        color: '#FCFADC',
      },
      {
        name: 'Sandstorm',
        duration: 20,
        color: '#DED98A',
      },
    ],
  },
  1052: {
    category: 'heart-of-thorns',
    name: 'Verdant Brink',
    phases: [
      {
        name: 'Night and the Enemy',
        duration: 10,
        color: '#84C147',
      },
      {
        name: 'Night Bosses',
        duration: 20,
        color: '#6DAC2F',
      },
      {
        name: 'Daytime: Securing Verdant Brink',
        duration: 75,
        color: '#C4E2A5',
      },
      {
        name: 'Night and the Enemy',
        duration: 15,
        color: '#84C147',
      },
    ],
  },
  1043: {
    category: 'heart-of-thorns',
    name: 'Auric Basin',
    phases: [
      {
        name: 'Pillars',
        duration: 45,
        color: '#FFE37F',
      },
      {
        name: 'Challenges',
        duration: 15,
        color: '#FFD53D',
      },
      {
        name: 'Octovine',
        duration: 20,
        color: '#EAB700',
      },
      {
        name: 'Reset',
        duration: 10,
        color: '#FFF1C1',
      },
      {
        name: 'Pillars',
        duration: 30,
        color: '#FFE37F',
      },
    ],
  },
  1045: {
    category: 'heart-of-thorns',
    name: 'Tangled Depths',
    phases: [
      {
        name: '',
        duration: 25,
        color: '#FFD7D7',
      },
      {
        name: 'Prep',
        duration: 5,
        color: '#ffbdbd',
      },
      {
        name: 'Chak Gerent',
        duration: 20,
        color: '#f99',
      },
      {
        name: 'Help the Outposts',
        duration: 70,
        color: '#FFD7D7',
      },
    ],
  },
  1041: {
    category: 'heart-of-thorns',
    name: "Dragon's Stand",
    phases: [
      {
        name: '',
        duration: 90,
        color: 'linear-gradient( 90deg, #c8c5e5, #DFDDF7 )',
      },
      {
        name: 'Start',
        duration: 30,
        color: 'linear-gradient( 90deg, #9f99cc, #c8c5e5 )',
      },
    ],
  },
  1185: {
    category: 'heart-of-thorns',
    name: 'Lake Doric',
    phases: [
      {
        name: 'New Loamhurst',
        duration: 30,
        color: '#FF8A65',
      },
      {
        name: "Noran's Homestead",
        duration: 30,
        color: '#FF7043',
      },
      {
        name: "Saidra's Haven",
        duration: 45,
        color: '#FF5722',
      },
      {
        name: 'New Loamhurst',
        duration: 15,
        color: '#FF8A65',
      },
    ],
  },
  1210: {
    category: 'path-of-fire',
    name: 'Crystal Oasis',
    phases: [
      {
        name: '',
        duration: 5,
        color: '#FFCC80',
      },
      {
        name: 'Rounds 1 to 3',
        duration: 16,
        color: '#FFA726',
      },
      {
        name: 'Pinata / Reset',
        duration: 9,
        color: '#FB8C00',
      },
      {
        name: '',
        duration: 90,
        color: '#FFCC80',
      },
    ],
  },
  1211: {
    category: 'path-of-fire',
    name: 'Desert Highlands',
    phases: [
      {
        name: '',
        duration: 60,
        color: '#4FC3F7',
      },
      {
        name: 'Buried Treasure',
        duration: 20,
        color: '#039BE5',
      },
      {
        name: '',
        duration: 40,
        color: '#4FC3F7',
      },
    ],
  },
  1228: {
    category: 'path-of-fire',
    name: 'Elon Riverlands',
    phases: [
      {
        name: 'Doppelganger',
        duration: 5,
        color: '#FFCA28',
      },
      {
        name: '',
        duration: 85,
        color: '#FFE082',
      },
      {
        name: 'The Path to Ascension: Augury Rock',
        duration: 30,
        color: '#FFCA28',
      },
    ],
  },
  1226: {
    category: 'path-of-fire',
    name: 'The Desolation',
    phases: [
      {
        name: '',
        duration: 30,
        color: '#A1887F',
      },
      {
        name: 'Junundu Rising',
        duration: 20,
        color: '#795548',
      },
      {
        name: '',
        duration: 10,
        color: '#A1887F',
      },
      {
        name: 'Maws of Torment',
        duration: 20,
        color: '#3E2723',
      },
      {
        name: '',
        duration: 10,
        color: '#A1887F',
      },
      {
        name: 'Junundu Rising',
        duration: 20,
        color: '#795548',
      },
      {
        name: '',
        duration: 10,
        color: '#A1887F',
      },
    ],
  },
  1248: {
    category: 'path-of-fire',
    name: 'Domain of Vabbi',
    phases: [
      {
        name: 'Forged with Fire',
        duration: 30,
        color: '#8E24AA',
      },
      {
        name: "Serpents' Ire",
        duration: 30,
        color: '#4A148C',
      },
      {
        name: 'Forged with Fire',
        duration: 30,
        color: '#8E24AA',
      },
      {
        name: '',
        duration: 30,
        color: '#AB47BC',
      },
    ],
  },
  1263: {
    category: 'path-of-fire',
    name: 'Domain of Istan',
    phases: [
      {
        name: 'Palawadan',
        duration: 15,
        color: '#FFB74D',
      },
      {
        name: '',
        duration: 90,
        color: '#FB8C00',
      },
      {
        name: 'Palawadan',
        duration: 15,
        color: '#EF6C00',
      },
    ],
  },
  1301: {
    category: 'path-of-fire',
    name: 'Jahai Bluffs',
    phases: [
      {
        name: '',
        duration: 60,
        color: '#FFB74D',
      },
      {
        name: 'Escorts',
        duration: 15,
        color: '#FB8C00',
      },
      {
        name: 'Death-Branded Shatterer',
        duration: 15,
        color: '#EF6C00',
      },
      {
        name: '',
        duration: 30,
        color: '#FFB74D',
      },
    ],
  },
};

export default metas;
