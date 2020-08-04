import { Component } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
// import FEATURES from './services/FEATURES.json';
import * as turf from '@turf/turf';
import CITY_BOUNDARIES_FILL from './services/layers/CITY_BOUNDARIES';
import CITY_BOUNDARIES_FILL_SELECTED from './services/layers/CITY_BOUNDARIES_SELECTED';
import CITY_BOUNDARIES_SOURCE from './services/sources/CITY_BOUNDARIES';
import CITY_BOUNDARIES_SELECTED_SOURCE from './services/sources/CITY_BOUNDARIES_SELECTED';
import CITY_CENTERS_SOURCE from './services/sources/CITY_CENTERS';
import CITY_CIRCLES_COUNT_LAYER from './services/layers/CITY_CIRCLES_COUNT';

import CITY_CIRCLES from './services/layers/CITY_CIRCLES';
// https://github.com/d3/d3/wiki#supported-environments
import * as d3 from 'd3';

@Component({ selector: 'app-map', template, styles })
export class MapComponent {
  ngAfterViewInit() {
    mapboxgl.accessToken =
      'pk.eyJ1Ijoicm1vcmFudGVzIiwiYSI6ImNqYTRtaWp5MzRjcXEzMXBveWViOGNjYm0ifQ.lt1qdGpfbbrT328BOUhIpQ';

    const map = new mapboxgl.Map({
      accessToken: mapboxgl.accessToken,
      // Geographic center of the contiguous United States
      center: [-71.3824, 42.4072],
      container: 'map',
      fadeDuration: 0,
      style: 'mapbox://styles/mapbox/dark-v10',
      zoom: 7,
    });

    map.addControl(new mapboxgl.NavigationControl());

    map.on('load', () => {
      map.addSource('city-boundaries', CITY_BOUNDARIES_SOURCE);
      map.addSource(
        'city-boundaries-selected',
        CITY_BOUNDARIES_SELECTED_SOURCE,
      );
      map.addSource('city-centers', CITY_CENTERS_SOURCE);
      map.addLayer(CITY_BOUNDARIES_FILL);
      map.addLayer(CITY_BOUNDARIES_FILL_SELECTED);
      map.addLayer(CITY_CIRCLES);
      map.addLayer(CITY_CIRCLES_COUNT_LAYER);

      map.on('mouseenter', 'clusters', (e) =>
        updateCitySelection(e.features[0], true),
      );

      map.on('mouseleave', 'clusters', () =>
        map.getSource('city-boundaries-selected').setData({
          type: 'FeatureCollection',
          features: [],
        }),
      );
    });

    const updateCitySelection = (feature, isSelected) => {
      if (feature.properties.cluster) {
        const clusterId = feature.id;
        const pointCount = feature.properties.point_count;
        const source = map.getSource('city-centers');

        source.getClusterLeaves(
          clusterId,
          pointCount,
          0,
          (err, clusterChildren) => {
            let polygons = [];
            clusterChildren.forEach(
              (clusterChild) =>
                (polygons = polygons.concat(
                  getPolygons(clusterChild),
                )),
            );
            console.log('polygons FINAL = ', polygons);
            setIsSelected(polygons, true);
          },
        );
      } else {
        // handle unclustered point hover
        setIsSelected(feature, isSelected);
      }
    };

    const setIsSelected = (features, isSelected) => {
      if (isSelected) {
        const collection = {
          features,
          type: 'FeatureCollection',
        };
        const boundary = turf.union(...features);
        map.getSource('city-boundaries-selected').setData(boundary);
      }
    };

    const getPolygons = (feature) => {
      const polygons = [];
      const myFeatures = map.queryRenderedFeatures(null, {
        layers: ['city-boundaries'],
        filter: ['==', ['get', 'city'], feature.properties.town],
      });

      myFeatures.forEach((feature) =>
        polygons.push({
          type: 'Feature',
          geometry: feature.geometry,
        }),
      );
      console.log('polygons = ', polygons);
      return polygons;
    };
  }
}

var template = `<div id='map' class='app-map'></div>`;

var styles = [
  `
    .app-map {
        width: 100%;
        height: 100%;
    }
`,
];

export default MapComponent;
