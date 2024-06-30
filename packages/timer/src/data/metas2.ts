import { TimerColor } from '../shared/getCssColor';

export interface TimerMeta {
  category: string;
  name: string;
  link?: string;
  segments: Record<string, TimerSegment>;
  sequences: TimerSequenceData;
}

export interface TimerSequenceData {
  partial: TimerSequence[];
  pattern: TimerSequence[];
}

export interface TimerSegment {
  name: string;
  link?: string;
  chatlink?: string;
  bg: TimerColor;
}

export interface TimerSequence {
  r: number;
  d: number;
}

const metas2: Record<string, TimerMeta> = {
  // ** Core Tyria **
  dn: {
    category: 'Core Tyria',
    name: 'Day and night',
    segments: {
      1: { name: 'Day', link: 'Day and night', bg: [255, 255, 255] },
      2: {
        name: 'Dusk',
        link: 'Day and night',
        bg: [
          [255, 255, 255],
          [122, 134, 171],
        ],
      },
      3: { name: 'Night', link: 'Day and night', bg: [122, 134, 171] },
      4: {
        name: 'Dawn',
        link: 'Day and night',
        bg: [
          [122, 134, 171],
          [255, 255, 255],
        ],
      },
    },
    sequences: {
      partial: [
        { r: 3, d: 25 },
        { r: 4, d: 5 },
      ],
      pattern: [
        { r: 1, d: 70 },
        { r: 2, d: 5 },
        { r: 3, d: 40 },
        { r: 4, d: 5 },
      ],
    },
  },

  wb: {
    category: 'Core Tyria',
    name: 'World bosses',
    link: 'World boss',
    segments: {
      1: {
        name: 'Taidha Covington',
        link: 'Kill Admiral Taidha Covington',
        chatlink: '[&BKgBAAA=]',
        bg: [234, 98, 121],
      },
      2: {
        name: 'Claw of Jormag',
        link: 'Defeat the Claw of Jormag',
        chatlink: '[&BHoCAAA=]',
        bg: [234, 98, 121],
      },
      3: {
        name: 'Fire Elemental',
        link: "Destroy the fire elemental created from chaotic energy fusing with the C.L.E.A.N. 5000's energy core",
        chatlink: '[&BEcAAAA=]',
        bg: [251, 132, 152],
      },
      4: {
        name: 'Golem Mark II',
        link: "Defeat the Inquest's golem Mark II",
        chatlink: '[&BNQCAAA=]',
        bg: [234, 98, 121],
      },
      5: {
        name: 'Great Jungle Wurm',
        link: 'Defeat the great jungle wurm',
        chatlink: '[&BEEFAAA=]',
        bg: [251, 132, 152],
      },
      6: {
        name: 'Megadestroyer',
        link: 'Kill the megadestroyer before it blows everyone up',
        chatlink: '[&BM0CAAA=]',
        bg: [234, 98, 121],
      },
      7: {
        name: 'Modniir Ulgoth',
        link: 'Defeat Ulgoth the Modniir and his minions',
        chatlink: '[&BLAAAAA=]',
        bg: [234, 98, 121],
      },
      8: {
        name: 'Shadow Behemoth',
        link: 'Defeat the shadow behemoth',
        chatlink: '[&BPcAAAA=]',
        bg: [251, 132, 152],
      },
      9: {
        name: 'Svanir Shaman Chief',
        link: 'Kill the Svanir shaman chief to break his control over the ice elemental',
        chatlink: '[&BMIDAAA=]',
        bg: [251, 132, 152],
      },
      10: {
        name: 'The Shatterer',
        link: 'Slay the Shatterer',
        chatlink: '[&BE4DAAA=]',
        bg: [234, 98, 121],
      },
    },
    sequences: {
      partial: [],
      pattern: [
        { r: 1, d: 15 },
        { r: 9, d: 15 },
        { r: 6, d: 15 },
        { r: 3, d: 15 },
        { r: 10, d: 15 },
        { r: 5, d: 15 },
        { r: 7, d: 15 },
        { r: 8, d: 15 },
        { r: 4, d: 15 },
        { r: 9, d: 15 },
        { r: 2, d: 15 },
        { r: 3, d: 15 },
        { r: 1, d: 15 },
        { r: 5, d: 15 },
        { r: 6, d: 15 },
        { r: 8, d: 15 },
        { r: 10, d: 15 },
        { r: 9, d: 15 },
        { r: 7, d: 15 },
        { r: 3, d: 15 },
        { r: 4, d: 15 },
        { r: 5, d: 15 },
        { r: 2, d: 15 },
        { r: 8, d: 15 },
      ],
    },
  },

  hwb: {
    category: 'Core Tyria',
    name: 'Hard world bosses',
    link: 'World boss',
    segments: {
      0: { name: '', bg: [251, 132, 152] },
      1: {
        name: 'Triple Trouble',
        link: 'Triple Trouble',
        chatlink: '[&BKoBAAA=]',
        bg: [234, 98, 121],
      },
      2: {
        name: 'Karka Queen',
        link: 'Defeat the Karka Queen threatening the settlements',
        chatlink: '[&BNUGAAA=]',
        bg: [234, 98, 121],
      },
      3: {
        name: 'Tequatl the Sunless',
        link: 'Defeat Tequatl the Sunless',
        chatlink: '[&BNABAAA=]',
        bg: [234, 98, 121],
      },
    },
    sequences: {
      partial: [
        { r: 3, d: 30 },
        { r: 0, d: 30 },
        { r: 1, d: 30 },
        { r: 0, d: 30 },
        { r: 2, d: 30 },
        { r: 0, d: 30 },
        { r: 3, d: 30 },
        { r: 0, d: 30 },
        { r: 1, d: 30 },
        { r: 0, d: 90 },
        { r: 2, d: 30 },
        { r: 0, d: 30 },
        { r: 3, d: 30 },
        { r: 0, d: 30 },
        { r: 1, d: 30 },
        { r: 0, d: 120 },
        { r: 2, d: 30 },
        { r: 0, d: 30 },
        { r: 3, d: 30 },
        { r: 0, d: 30 },
        { r: 1, d: 30 },
        { r: 0, d: 120 },
        { r: 2, d: 30 },
        { r: 0, d: 30 },
        { r: 3, d: 30 },
        { r: 0, d: 30 },
        { r: 1, d: 30 },
        { r: 0, d: 30 },
        { r: 2, d: 30 },
        { r: 0, d: 30 },
        { r: 3, d: 30 },
        { r: 0, d: 30 },
        { r: 1, d: 30 },
        { r: 0, d: 150 },
        { r: 2, d: 30 },
        { r: 0, d: 30 },
        { r: 3, d: 30 },
        { r: 0, d: 30 },
        { r: 1, d: 30 },
      ],
      pattern: [],
    },
  },

  la: {
    category: 'Core Tyria',
    name: 'Ley-Line Anomaly',
    link: 'Legendary Ley-Line Anomaly',
    segments: {
      0: { name: '', bg: [251, 132, 152] },
      1: {
        name: 'Timberline Falls',
        link: 'Defeat the Ley-Line Anomaly to disperse its destructive energy before it overloads',
        chatlink: '[&BEwCAAA=]',
        bg: [234, 98, 121],
      },
      2: {
        name: 'Iron Marches',
        link: 'Defeat the Ley-Line Anomaly to disperse its destructive energy before it overloads',
        chatlink: '[&BOcBAAA=]',
        bg: [234, 98, 121],
      },
      3: {
        name: 'Gendarran Fields',
        link: 'Defeat the Ley-Line Anomaly to disperse its destructive energy before it overloads',
        chatlink: '[&BOQAAAA=]',
        bg: [234, 98, 121],
      },
    },
    sequences: {
      partial: [
        { r: 0, d: 20 },
        { r: 1, d: 20 },
        { r: 0, d: 100 },
        { r: 2, d: 20 },
        { r: 0, d: 100 },
        { r: 3, d: 20 },
      ],
      pattern: [
        { r: 0, d: 100 },
        { r: 1, d: 20 },
        { r: 0, d: 100 },
        { r: 2, d: 20 },
        { r: 0, d: 100 },
        { r: 3, d: 20 },
      ],
    },
  },

  pvpat: {
    category: 'Core Tyria',
    name: 'PvP Tournaments',
    link: 'Automated Tournaments',
    segments: {
      0: { name: '', bg: [251, 132, 152] },
      1: {
        name: "Automated Tournament: Balthazar's Brawl",
        link: 'Automated Tournaments#Daily_tournaments',
        bg: [234, 98, 121],
      },
      2: {
        name: "Automated Tournament: Grenth's Game",
        link: 'Automated Tournaments#Daily_tournaments',
        bg: [234, 98, 121],
      },
      3: {
        name: "Automated Tournament: Melandru's Matchup",
        link: 'Automated Tournaments#Daily_tournaments',
        bg: [234, 98, 121],
      },
      4: {
        name: "Automated Tournament: Lyssa's Legions",
        link: 'Automated Tournaments#Daily_tournaments',
        bg: [234, 98, 121],
      },
    },
    sequences: {
      partial: [],
      pattern: [
        { r: 1, d: 60 },
        { r: 0, d: 120 },
        { r: 2, d: 60 },
        { r: 0, d: 120 },
        { r: 3, d: 60 },
        { r: 0, d: 120 },
        { r: 4, d: 60 },
        { r: 0, d: 120 },
      ],
    },
  },

  // ** Living World Season 1 **
  eotn: {
    category: 'Living World Season 1',
    name: 'Eye of the North',
    link: 'Eye of the North',
    segments: {
      0: { name: '', bg: [251, 132, 152] },
      1: {
        name: 'Twisted Marionette (Public)',
        link: 'The Twisted Marionette',
        chatlink: '[&BAkMAAA=]',
        bg: [234, 98, 121],
      },
      2: {
        name: 'Tower of Nightmares (Public)',
        link: 'The Tower of Nightmares (meta event)',
        chatlink: '[&BAkMAAA=]',
        bg: [234, 98, 121],
      },
      3: {
        name: "Battle For Lion's Arch (Public)",
        link: "The Battle For Lion's Arch",
        chatlink: '[&BAkMAAA=]',
        bg: [234, 98, 121],
      },
    },
    sequences: {
      partial: [],
      pattern: [
        { r: 1, d: 20 },
        { r: 0, d: 10 },
        { r: 3, d: 15 },
        { r: 0, d: 45 },
        { r: 2, d: 15 },
        { r: 0, d: 15 },
      ],
    },
  },

  si: {
    category: 'Living World Season 1',
    name: "Scarlet's Invasion",
    link: 'Defeat the invading minions of Scarlet Briar',
    segments: {
      0: { name: '', bg: [251, 132, 152] },
      1: {
        name: "Defeat Scarlet's minions",
        link: 'Defeat the invading minions of Scarlet Briar',
        chatlink: '[&BOQAAAA=]',
        bg: [234, 98, 121],
      },
    },
    sequences: {
      partial: [
        { r: 0, d: 60 },
        { r: 1, d: 15 },
      ],
      pattern: [
        { r: 0, d: 105 },
        { r: 1, d: 15 },
      ],
    },
  },

  // ** Living World Season 2 **
  dt: {
    category: 'Living World Season 2',
    name: 'Dry Top',
    segments: {
      1: {
        name: 'Crash Site',
        link: 'Crash Site (meta event)',
        bg: [251, 227, 132],
      },
      2: {
        name: 'Sandstorm',
        link: 'Sandstorm!',
        chatlink: '[&BIAHAAA=]',
        bg: [215, 185, 66],
      },
    },
    sequences: {
      partial: [],
      pattern: [
        { r: 1, d: 40 },
        { r: 2, d: 20 },
      ],
    },
  },

  // ** Heart of Thorns **
  vb: {
    category: 'Heart of Thorns',
    name: 'Verdant Brink',
    segments: {
      1: {
        name: 'Day: Securing Verdant Brink',
        link: 'Securing Verdant Brink',
        bg: [231, 251, 132],
      },
      2: {
        name: 'Night: Night and the Enemy',
        link: 'Night and the Enemy',
        bg: [211, 234, 98],
      },
      3: {
        name: 'Night Bosses',
        link: 'Night and the Enemy',
        chatlink: '[&BAgIAAA=]',
        bg: [190, 215, 66],
      },
    },
    sequences: {
      partial: [
        { r: 2, d: 10 },
        { r: 3, d: 20 },
      ],
      pattern: [
        { r: 1, d: 75 },
        { r: 2, d: 25 },
        { r: 3, d: 20 },
      ],
    },
  },

  ab: {
    category: 'Heart of Thorns',
    name: 'Auric Basin',
    segments: {
      1: {
        name: 'Pylons',
        link: 'Defending Tarir',
        chatlink: '[&BN0HAAA=]',
        bg: [231, 251, 132],
      },
      2: {
        name: 'Challenges',
        link: 'Battle in Tarir',
        chatlink: '[&BGwIAAA=]',
        bg: [211, 234, 98],
      },
      3: {
        name: 'Octovine',
        link: 'Battle in Tarir',
        chatlink: '[&BAIIAAA=]',
        bg: [190, 215, 66],
      },
      4: { name: 'Reset', link: "A Moment's Rest", bg: [211, 234, 98] },
    },
    sequences: {
      partial: [
        { r: 1, d: 45 },
        { r: 2, d: 15 },
        { r: 3, d: 20 },
        { r: 4, d: 10 },
      ],
      pattern: [
        { r: 1, d: 75 },
        { r: 2, d: 15 },
        { r: 3, d: 20 },
        { r: 4, d: 10 },
      ],
    },
  },

  td: {
    category: 'Heart of Thorns',
    name: 'Tangled Depths',
    segments: {
      1: {
        name: 'Help the Outposts',
        link: 'Advancing Across Tangled Roots',
        bg: [231, 251, 132],
      },
      2: { name: 'Prep', link: 'King of the Jungle', bg: [211, 234, 98] },
      3: {
        name: 'Chak Gerent',
        link: 'King of the Jungle',
        chatlink: '[&BPUHAAA=]',
        bg: [190, 215, 66],
      },
    },
    sequences: {
      partial: [
        { r: 1, d: 25 },
        { r: 2, d: 5 },
        { r: 3, d: 20 },
      ],
      pattern: [
        { r: 1, d: 95 },
        { r: 2, d: 5 },
        { r: 3, d: 20 },
      ],
    },
  },

  ds: {
    category: 'Heart of Thorns',
    name: "Dragon's Stand",
    segments: {
      1: {
        name: 'Start advancing on the Blighting Towers',
        link: 'Advancing on the Blighting Towers',
        chatlink: '[&BBAIAAA=]',
        bg: [190, 215, 66],
      },
      2: {
        name: '(continued)',
        link: 'Advancing on the Blighting Towers',
        bg: [190, 215, 66],
      },
    },
    sequences: {
      partial: [{ r: 2, d: 90 }],
      pattern: [{ r: 1, d: 120 }],
    },
  },

  // ** Living World Season 3 **
  ld: {
    category: 'Living World Season 3',
    name: 'Lake Doric',
    segments: {
      1: {
        name: "Saidra's Haven",
        link: "White Mantle Control: Saidra's Haven",
        chatlink: '[&BK0JAAA=]',
        bg: [159, 217, 147],
      },
      2: {
        name: 'New Loamhurst',
        link: 'White Mantle Control: New Loamhurst',
        chatlink: '[&BLQJAAA=]',
        bg: [94, 159, 80],
      },
      3: {
        name: "Noran's Homestead",
        link: "White Mantle Control: Noran's Homestead",
        chatlink: '[&BK8JAAA=]',
        bg: [121, 181, 108],
      },
    },
    sequences: {
      partial: [{ r: 2, d: 30 }],
      pattern: [
        { r: 3, d: 30 },
        { r: 1, d: 45 },
        { r: 2, d: 45 },
      ],
    },
  },

  // ** Path of Fire **
  co: {
    category: 'Path of Fire',
    name: 'Crystal Oasis',
    segments: {
      0: { name: '', bg: [251, 199, 132] },
      1: {
        name: 'Rounds 1 to 3',
        link: 'Casino Blitz',
        chatlink: '[&BLsKAAA=]',
        bg: [234, 175, 98],
      },
      2: {
        name: 'Pinata/Reset',
        link: 'Casino Blitz',
        chatlink: '[&BLsKAAA=]',
        bg: [215, 150, 66],
      },
    },
    sequences: {
      partial: [
        { r: 0, d: 5 },
        { r: 1, d: 16 },
        { r: 2, d: 9 },
      ],
      pattern: [
        { r: 0, d: 95 },
        { r: 1, d: 16 },
        { r: 2, d: 9 },
      ],
    },
  },

  dh: {
    category: 'Path of Fire',
    name: 'Desert Highlands',
    segments: {
      0: { name: '', bg: [251, 199, 132] },
      1: {
        name: 'Buried Treasure',
        link: 'The Search for Buried Treasure',
        chatlink: '[&BGsKAAA=]',
        bg: [234, 175, 98],
      },
    },
    sequences: {
      partial: [
        { r: 0, d: 60 },
        { r: 1, d: 20 },
      ],
      pattern: [
        { r: 0, d: 100 },
        { r: 1, d: 20 },
      ],
    },
  },

  er: {
    category: 'Path of Fire',
    name: 'Elon Riverlands',
    segments: {
      0: { name: '', bg: [251, 199, 132] },
      1: {
        name: 'The Path to Ascension: Augury Rock',
        link: 'The Path to Ascension',
        chatlink: '[&BFMKAAA=]',
        bg: [234, 175, 98],
      },
      2: {
        name: 'Doppelganger',
        link: 'The Path to Ascension',
        chatlink: '[&BFMKAAA=]',
        bg: [215, 150, 66],
      },
    },
    sequences: {
      partial: [{ r: 2, d: 15 }],
      pattern: [
        { r: 0, d: 75 },
        { r: 1, d: 25 },
        { r: 2, d: 20 },
      ],
    },
  },

  de: {
    category: 'Path of Fire',
    name: 'The Desolation',
    segments: {
      0: { name: '', bg: [251, 199, 132] },
      1: {
        name: 'Maws of Torment',
        chatlink: '[&BKMKAAA=]',
        bg: [215, 150, 66],
      },
      2: {
        name: 'Junundu Rising',
        chatlink: '[&BMEKAAA=]',
        bg: [234, 175, 98],
      },
    },
    sequences: {
      partial: [
        { r: 0, d: 30 },
        { r: 2, d: 20 },
        { r: 0, d: 10 },
      ],
      pattern: [
        { r: 1, d: 20 },
        { r: 0, d: 10 },
        { r: 2, d: 20 },
        { r: 0, d: 40 },
        { r: 2, d: 20 },
        { r: 0, d: 10 },
      ],
    },
  },

  dv: {
    category: 'Path of Fire',
    name: 'Domain of Vabbi',
    segments: {
      0: { name: '', bg: [251, 199, 132] },
      1: { name: "Serpents' Ire", chatlink: '[&BHQKAAA=]', bg: [234, 175, 98] },
      2: {
        name: 'Forged with Fire',
        chatlink: '[&BO0KAAA=]',
        bg: [215, 150, 66],
      },
    },
    sequences: {
      partial: [{ r: 2, d: 30 }],
      pattern: [
        { r: 1, d: 30 },
        { r: 2, d: 30 },
        { r: 0, d: 30 },
        { r: 2, d: 30 },
      ],
    },
  },

  // ** Living World Season 4 **
  ai: {
    category: 'Living World Season 4',
    name: 'Awakened Invasion',
    segments: {
      0: { name: '', bg: [187, 119, 207] },
      1: {
        name: 'Awakened Invasion',
        link: 'Defeat the invading Awakened',
        bg: [157, 65, 185],
      },
    },
    sequences: {
      partial: [{ r: 0, d: 30 }],
      pattern: [
        { r: 1, d: 15 },
        { r: 0, d: 45 },
      ],
    },
  },

  di: {
    category: 'Living World Season 4',
    name: 'Domain of Istan',
    segments: {
      0: { name: '', bg: [187, 119, 207] },
      1: {
        name: 'Palawadan',
        link: 'Palawadan, Jewel of Istan (meta event)',
        chatlink: '[&BAkLAAA=]',
        bg: [157, 65, 185],
      },
    },
    sequences: {
      partial: [{ r: 1, d: 15 }],
      pattern: [
        { r: 0, d: 90 },
        { r: 1, d: 30 },
      ],
    },
  },

  jb: {
    category: 'Living World Season 4',
    name: 'Jahai Bluffs',
    segments: {
      0: { name: '', bg: [187, 119, 207] },
      1: {
        name: 'Escorts',
        link: 'Dangerous Prey',
        chatlink: '[&BIMLAAA=]',
        bg: [175, 96, 199],
      },
      2: {
        name: 'Death-Branded Shatterer',
        link: 'Destroy the Death-Branded Shatterer',
        chatlink: '[&BJMLAAA=]',
        bg: [157, 65, 185],
      },
    },
    sequences: {
      partial: [
        { r: 0, d: 60 },
        { r: 1, d: 15 },
        { r: 2, d: 15 },
      ],
      pattern: [
        { r: 0, d: 90 },
        { r: 1, d: 15 },
        { r: 2, d: 15 },
      ],
    },
  },

  tp: {
    category: 'Living World Season 4',
    name: 'Thunderhead Peaks',
    segments: {
      0: { name: '', bg: [187, 119, 207] },
      1: {
        name: 'Thunderhead Keep',
        link: 'Thunderhead Keep (meta event)',
        chatlink: '[&BLsLAAA=]',
        bg: [157, 65, 185],
      },
      2: { name: 'The Oil Floes', chatlink: '[&BKYLAAA=]', bg: [157, 65, 185] },
    },
    sequences: {
      partial: [
        { r: 1, d: 5 },
        { r: 0, d: 40 },
        { r: 2, d: 15 },
      ],
      pattern: [
        { r: 0, d: 45 },
        { r: 1, d: 20 },
        { r: 0, d: 40 },
        { r: 2, d: 15 },
      ],
    },
  },

  // ** The Icebrood Saga **
  gv: {
    category: 'The Icebrood Saga',
    name: 'Grothmar Valley',
    segments: {
      0: { name: '', bg: [132, 201, 251] },
      1: {
        name: 'Effigy',
        link: 'Ceremony of the Sacred Flame',
        chatlink: '[&BA4MAAA=]',
        bg: [98, 177, 234],
      },
      2: {
        name: 'Doomlore Shrine',
        link: 'The Haunting of Doomlore Shrine',
        chatlink: '[&BA4MAAA=]',
        bg: [66, 153, 215],
      },
      3: {
        name: 'Ooze Pits',
        link: 'The Ooze Pit Trials',
        chatlink: '[&BPgLAAA=]',
        bg: [98, 177, 234],
      },
      4: {
        name: 'Metal Concert',
        link: 'A Concert for the Ages',
        chatlink: '[&BPgLAAA=]',
        bg: [66, 153, 215],
      },
    },
    sequences: {
      partial: [{ r: 0, d: 10 }],
      pattern: [
        { r: 1, d: 15 },
        { r: 0, d: 13 },
        { r: 2, d: 22 },
        { r: 0, d: 5 },
        { r: 3, d: 20 },
        { r: 0, d: 15 },
        { r: 4, d: 15 },
        { r: 0, d: 15 },
      ],
    },
  },

  bm: {
    category: 'The Icebrood Saga',
    name: 'Bjora Marches',
    segments: {
      0: { name: '', bg: [132, 201, 251] },
      1: {
        name: 'Drakkar and Spirits of the Wild',
        link: 'Champion of the Ice Dragon',
        chatlink: '[&BDkMAAA=]',
        bg: [66, 153, 215],
      },
      2: {
        name: "Defend Jora's Keep",
        link: 'Storms of Winter',
        chatlink: '[&BCcMAAA=]',
        bg: [98, 177, 234],
      },
      3: {
        name: 'Shards and Construct',
        link: 'Storms of Winter',
        chatlink: '[&BCcMAAA=]',
        bg: [66, 153, 215],
      },
      4: {
        name: 'Icebrood Champions',
        link: 'Storms of Winter',
        chatlink: '[&BCcMAAA=]',
        bg: [98, 177, 234],
      },
    },
    sequences: {
      partial: [
        { r: 3, d: 5 },
        { r: 4, d: 15 },
      ],
      pattern: [
        { r: 0, d: 45 },
        { r: 1, d: 35 },
        { r: 0, d: 5 },
        { r: 2, d: 15 },
        { r: 3, d: 5 },
        { r: 4, d: 15 },
      ],
    },
  },

  dsp: {
    category: 'The Icebrood Saga',
    name: 'Dragonstorm',
    segments: {
      0: { name: '', bg: [132, 201, 251] },
      1: {
        name: 'Dragonstorm (Public)',
        link: 'Dragonstorm',
        chatlink: '[&BAkMAAA=]',
        bg: [66, 153, 215],
      },
    },
    sequences: {
      partial: [{ r: 0, d: 60 }],
      pattern: [
        { r: 1, d: 20 },
        { r: 0, d: 100 },
      ],
    },
  },

  // ** End of Dragons **
  cdn: {
    category: 'End of Dragons',
    name: 'Cantha: Day and night',
    link: 'Day and night',
    segments: {
      1: { name: 'Day', link: 'Day and night', bg: [255, 255, 255] },
      2: {
        name: 'Dusk',
        link: 'Day and night',
        bg: [
          [255, 255, 255],
          [122, 134, 171],
        ],
      },
      3: { name: 'Night', link: 'Day and night', bg: [122, 134, 171] },
      4: {
        name: 'Dawn',
        link: 'Day and night',
        bg: [
          [122, 134, 171],
          [255, 255, 255],
        ],
      },
    },
    sequences: {
      partial: [
        { r: 3, d: 35 },
        { r: 4, d: 5 },
      ],
      pattern: [
        { r: 1, d: 55 },
        { r: 2, d: 5 },
        { r: 3, d: 55 },
        { r: 4, d: 5 },
      ],
    },
  },

  sp: {
    category: 'End of Dragons',
    name: 'Seitung Province',
    segments: {
      0: { name: '', bg: [138, 234, 244] },
      1: {
        name: 'Aetherblade Assault',
        chatlink: '[&BGUNAAA=]',
        bg: [66, 200, 215],
      },
    },
    sequences: {
      partial: [{ r: 0, d: 90 }],
      pattern: [
        { r: 1, d: 30 },
        { r: 0, d: 90 },
      ],
    },
  },

  nkc: {
    category: 'End of Dragons',
    name: 'New Kaineng City',
    segments: {
      0: { name: '', bg: [138, 234, 244] },
      1: {
        name: 'Kaineng Blackout',
        chatlink: '[&BBkNAAA=]',
        bg: [66, 200, 215],
      },
    },
    sequences: {
      partial: [],
      pattern: [
        { r: 1, d: 40 },
        { r: 0, d: 80 },
      ],
    },
  },

  tew: {
    category: 'End of Dragons',
    name: 'The Echovald Wilds',
    segments: {
      0: { name: '', bg: [138, 234, 244] },
      1: {
        name: 'Gang War',
        link: 'The Gang War of Echovald',
        chatlink: '[&BMwMAAA=]',
        bg: [66, 200, 215],
      },
      2: {
        name: 'Aspenwood',
        link: 'Use the siege turtles to destroy the shield generators as you fight through the fort',
        chatlink: '[&BPkMAAA=]',
        bg: [96, 220, 235],
      },
    },
    sequences: {
      partial: [],
      pattern: [
        { r: 0, d: 30 },
        { r: 1, d: 35 },
        { r: 0, d: 35 },
        { r: 2, d: 20 },
      ],
    },
  },

  dre: {
    category: 'End of Dragons',
    name: "Dragon's End",
    segments: {
      1: { name: 'Preparations', chatlink: '[&BKIMAAA=]', bg: [138, 234, 244] },
      2: {
        name: 'Jade Maw',
        link: 'Defeat the Void-corrupted Jade Maw',
        chatlink: '[&BKIMAAA=]',
        bg: [66, 200, 215],
      },
      3: {
        name: 'The Battle for the Jade Sea',
        chatlink: '[&BKIMAAA=]',
        bg: [66, 200, 215],
      },
    },
    sequences: {
      partial: [],
      pattern: [
        { r: 1, d: 5 },
        { r: 2, d: 8 },
        { r: 1, d: 32 },
        { r: 2, d: 8 },
        { r: 1, d: 7 },
        { r: 3, d: 60 },
      ],
    },
  },

  // ** Secrets of the Obscure **
  sa: {
    category: 'Secrets of the Obscure',
    name: 'Skywatch Archipelago',
    segments: {
      0: { name: '', bg: [250, 206, 133] },
      1: {
        name: "Unlocking the Wizard's Tower",
        link: "Unlocking the Wizard's Tower",
        chatlink: '[&BL4NAAA=]',
        bg: [226, 171, 73],
      },
    },
    sequences: {
      partial: [{ r: 0, d: 60 }],
      pattern: [
        { r: 1, d: 25 },
        { r: 0, d: 95 },
      ],
    },
  },

  wt: {
    category: 'Secrets of the Obscure',
    name: "Wizard's Tower",
    link: "The Wizard's Tower",
    segments: {
      0: { name: '', bg: [250, 206, 133] },
      1: {
        name: 'Target Practice',
        link: "Skyscale Target Practice in the Wizard's Tower",
        chatlink: '[&BB8OAAA=]',
        bg: [226, 171, 73],
      },
      2: {
        name: 'Fly by Night',
        link: "Wizard's Tower: Fly by Night",
        chatlink: '[&BB8OAAA=]',
        bg: [226, 171, 73],
      },
      3: {
        name: 'Target Practice & Fly by Night',
        link: 'Adventure#Secrets of the Obscure',
        chatlink: '[&BB8OAAA=]',
        bg: [200, 136, 54],
      },
    },
    sequences: {
      partial: [
        { r: 2, d: 20 },
        { r: 0, d: 40 },
      ],
      pattern: [
        { r: 1, d: 40 },
        { r: 3, d: 15 },
        { r: 2, d: 25 },
        { r: 0, d: 40 },
      ],
    },
  },

  am: {
    category: 'Secrets of the Obscure',
    name: 'Amnytas',
    segments: {
      0: { name: '', bg: [250, 206, 133] },
      1: {
        name: 'Defense of Amnytas',
        link: 'The Defense of Amnytas',
        chatlink: '[&BDQOAAA=]',
        bg: [226, 171, 73],
      },
    },
    sequences: {
      partial: [],
      pattern: [
        { r: 1, d: 25 },
        { r: 0, d: 95 },
      ],
    },
  },

  con: {
    category: 'Secrets of the Obscure',
    name: 'Convergences',
    segments: {
      0: { name: '', bg: [250, 206, 133] },
      1: {
        name: 'Convergences (Public)',
        link: 'Convergences',
        chatlink: '[&BB8OAAA=]',
        bg: [226, 171, 73],
      },
    },
    sequences: {
      partial: [{ r: 0, d: 90 }],
      pattern: [
        { r: 1, d: 10 },
        { r: 0, d: 170 },
      ],
    },
  },

  // ** Special Events **
  lc: {
    category: 'Special Events',
    name: 'Labyrinthine Cliffs',
    segments: {
      0: { name: '', bg: [138, 234, 244] },
      1: {
        name: 'Skiff Race',
        link: 'Labyrinthine Skiffs: A race is starting soon!',
        chatlink: '[&BBwHAAA=]',
        bg: [66, 200, 215],
      },
      2: {
        name: 'Treasure Hunt',
        link: 'Participate in the treasure hunt!',
        chatlink: '[&BBwHAAA=]',
        bg: [66, 200, 215],
      },
      3: {
        name: 'Skimmer Race',
        link: 'Skimmer Slalom: Reach the finish line!',
        chatlink: '[&BBwHAAA=]',
        bg: [66, 200, 215],
      },
      4: {
        name: 'Fishing',
        link: 'Fishing Tournament Sign-Up',
        chatlink: '[&BBwHAAA=]',
        bg: [66, 200, 215],
      },
      5: {
        name: 'Dolyak Race',
        link: 'Flying Dolyak: Reach the finish line!',
        chatlink: '[&BBwHAAA=]',
        bg: [66, 200, 215],
      },
    },
    sequences: {
      partial: [],
      pattern: [
        { r: 1, d: 10 },
        { r: 0, d: 20 },
        { r: 2, d: 30 },
        { r: 0, d: 15 },
        { r: 3, d: 10 },
        { r: 0, d: 5 },
        { r: 4, d: 10 },
        { r: 0, d: 5 },
        { r: 5, d: 10 },
        { r: 0, d: 5 },
      ],
    },
  },

  db: {
    category: 'Special Events',
    name: 'Dragon Bash',
    segments: {
      0: { name: '', bg: [138, 234, 244] },
      1: {
        name: 'Wayfarer Foothills',
        link: 'Dragon Bash Hologram Stampede!',
        chatlink: '[&BH0BAAA=]',
        bg: [66, 200, 215],
      },
      2: {
        name: 'Dredgehaunt Cliffs',
        link: 'Dragon Bash Hologram Stampede!',
        chatlink: '[&BGMCAAA=]',
        bg: [66, 200, 215],
      },
      3: {
        name: "Lornar's Pass",
        link: 'Dragon Bash Hologram Stampede!',
        chatlink: '[&BJkBAAA=]',
        bg: [66, 200, 215],
      },
      4: {
        name: 'Snowden Drifts',
        link: 'Dragon Bash Hologram Stampede!',
        chatlink: '[&BL4AAAA=]',
        bg: [66, 200, 215],
      },
    },
    sequences: {
      partial: [],
      pattern: [
        { r: 1, d: 5 },
        { r: 0, d: 10 },
        { r: 2, d: 5 },
        { r: 0, d: 10 },
        { r: 3, d: 5 },
        { r: 0, d: 10 },
        { r: 4, d: 5 },
        { r: 0, d: 10 },
      ],
    },
  },

  ha: {
    category: 'Special Events',
    name: 'Halloween',
    segments: {
      0: { name: '', bg: [242, 215, 162] },
      1: {
        name: 'Mad King Says',
        link: 'Your Mad King says...',
        chatlink: '[&BBAEAAA=]',
        bg: [232, 163, 31],
      },
    },
    sequences: {
      partial: [],
      pattern: [
        { r: 1, d: 10 },
        { r: 0, d: 110 },
      ],
    },
  },
};

export default metas2;
