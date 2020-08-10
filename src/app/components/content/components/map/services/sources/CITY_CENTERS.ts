import CITY_CENTERS_FEATURES from './features/CITY_CENTERS.json';

// NOTE: 74,589 population for Abington according to wikipedia (was missing from data set).
// NOTE: Gay Head is now Aquinnah.
const CITY_CENTERS = {
  cluster: true,
  clusterMaxZoom: 14,
  clusterRadius: 70,

  clusterProperties: {
    sum: ['+', ['get', 'covidCases22July2020']],
  },
  data: {
    features: CITY_CENTERS_FEATURES,
    type: 'FeatureCollection',
  },
  generateId: true,
  type: 'geojson',
};

export default CITY_CENTERS;
