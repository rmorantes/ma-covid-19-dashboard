import { Component } from '@angular/core';

import buildChart from './services/buildChart';
import DATA from './services/DATA.json';

@Component({ selector: 'app-chart', template, styles })
class ChartComponent {
  ngAfterViewInit() {
    console.log('chart');
    buildChart('#chart', DATA.towns);
  }
}

var template = `<div id='chart' class='app-chart'> </div>`;

var styles = [
  `
    .app-chart {
        width: 100%;
        height: 100%;
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
