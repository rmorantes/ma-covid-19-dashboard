import { Component } from '@angular/core';

import buildChart from './services/buildChart';
import DATA from 'src/app/services/DATA.json';

@Component({ selector: 'app-chart', template, styles })
class ChartComponent {
  ngAfterViewInit() {
    // console.log('chart');
    buildChart('#chart', DATA.towns);
  }
}

console.log(
  'TODO: Add regions: https://docs.digital.mass.gov/dataset/massgis-data-ma-executive-office-health-human-services-regions',
);

// Q: Does svg need a div around it for sizing?
var template = `<div id='chart' class='app-chart'> </div>`;

var styles = [
  `
    .app-chart {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        svg {
          background: red;
        }
    }
    .chart-svg {
      background-color: #292b33;
      border-radius: 10px
    }
    ::ng-deep .tick {
      color: white;
      // background-color: white;
      // stroke: #ffab00;
      // stroke-width: 3;
      // line {
      //   stroke: white;
      // }
  }
`,
];

export default ChartComponent;
