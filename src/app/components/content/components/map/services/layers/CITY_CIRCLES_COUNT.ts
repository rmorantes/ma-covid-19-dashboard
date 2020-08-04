const CITY_COVID_COUNTS = {
  id: 'cluster-count',
  type: 'symbol',
  source: 'city-centers',
  paint: {
    'text-color': '#ffffff',
    'text-halo-color': 'black',
    'text-halo-width': 0.25,
    'text-halo-blur': 1,
  },
  layout: {
    'text-field': [
      'let',
      'num',
      ['coalesce', ['get', 'covidCases22July2020'], ['get', 'sum']],
      [
        'step',
        ['var', 'num'],
        ['var', 'num'],
        1000,
        [
          'concat',
          ['/', ['round', ['/', ['var', 'num'], 100]], 10],
          'K',
        ],
        10000,
        ['concat', ['round', ['/', ['var', 'num'], 1000]], 'K'],
        1000000,
        [
          'concat',
          ['/', ['round', ['/', ['var', 'num'], 100000]], 10],
          'M',
        ],
        10000000,
        ['concat', ['round', ['/', ['var', 'num'], 1000000]], 'M'],
        1000000000,
        '☠',
      ],
    ],
    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
    'text-size': 16,
  },
};

export default CITY_COVID_COUNTS;
