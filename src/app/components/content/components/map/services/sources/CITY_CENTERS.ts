import CITY_CENTERS_FEATURES from './features/CITY_CENTERS.json';

// 74,589 for Abington according to wiki
// Gay head => now Aquinnah
const CITY_CENTERS = {
  cluster: true,
  clusterMaxZoom: 14, // Max zoom to cluster points on
  clusterRadius: 70, // Radius of each cluster when clustering points (defaults to 50)

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
