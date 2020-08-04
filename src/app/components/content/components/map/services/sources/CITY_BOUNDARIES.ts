import CITY_BOUNDARIES_FEATURES from './features/CITY_BOUNDARIES.json';

const CITY_BOUNDARIES = {
  data: {
    features: CITY_BOUNDARIES_FEATURES,
    type: 'FeatureCollection',
  },
  generateId: true,
  type: 'geojson',
};

export default CITY_BOUNDARIES;
