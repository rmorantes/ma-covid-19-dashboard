import { Component } from '@angular/core';
import * as d3 from 'd3';
import * as _ from 'lodash';

import CitiesStoreService from 'src/app/services/cities-store.service';

// BUG: Using selector panel inputs incorrectly repositions some graph bars.
// BUG: x scale not working for bar chart width. May have to do with translate and range interference.
@Component({ selector: 'app-bar-graph', template, styles })
class BarGraphComponent {
  constructor(public citiesStore: CitiesStoreService) {}

  // TODO: Refactor this mess.
  ngAfterViewInit() {
    const margin = 40;
    const svg = d3.select('#bar-graph-svg').attr('height', 7000);
    let data = this.citiesStore.cities;

    const x = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d[1])])
      .nice();

    const xAxis = svg.append('g');

    const y = d3.scaleBand().domain(data.map((d) => d[0]).reverse());

    const yAxis = svg
      .append('g')
      .attr('class', 'bar-chart-y-axis')
      .attr('transform', `translate(${margin}, 0)`);

    const div = d3
      .select('body')
      .append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0)
      .style('padding', '3px 6px')
      .style('background-color', 'white')
      .style('border-radius', '8px')
      .style('top', 0)
      .style('left', 0);

    let currentWidth = 100;
    let currentHeight;
    const transitionInOut = d3
      .transition()
      .duration(500)
      .ease(d3.easeLinear);

    const barHeight = 14;
    const updateBars = () => {
      svg
        .selectAll('rect')
        .data(data, (d) => `${_.kebabCase(d[0]).toLowerCase()}-rect`)
        .join((enter) =>
          enter
            .append('rect')
            .attr(
              'id',
              (d) => `${_.kebabCase(d[0]).toLowerCase()}-rect`,
            )
            .attr('x', 120)
            .attr('y', (d) => y(d[0]))
            .attr('height', barHeight)
            // TODO: Figure out why x scale isn't working for width.
            .attr('width', 200)
            .style('fill', '#69b2b3')
            .on('mouseover', function (d) {
              d3.select(this).style('fill', 'red');

              div.transition().duration(200).style('opacity', 1);
              div
                .html(d[0])
                .style('left', d3.event.pageX + 'px')
                .style('top', d3.event.pageY - 28 + 'px');
            })
            .on('mouseout', function (d) {
              d3.select(this).style('fill', '#69b2b3');
              div.transition().duration(500).style('opacity', 0);
            }),
        );
    };

    updateBars();

    function drawChart() {
      currentWidth = parseInt(
        d3.select('#bar-graph-svg').style('width'),
        10,
      );
      currentHeight = parseInt(
        d3.select('#bar-graph-svg').style('height'),
        10,
      );

      svg.attr('width', currentWidth);

      // Q: What is the best combination of range and translate?
      x.range([120, currentWidth - margin]);
      y.range([7000, margin]);
      xAxis
        .attr('transform', `translate(0, ${margin + 70})`)
        .call(d3.axisTop(x));
      yAxis
        .attr('transform', `translate(${120}, ${margin + 30})`)
        .call(d3.axisLeft(y));

      d3.selectAll('.domain').style('stroke', '#ffffff');
      svg.selectAll('rect').attr('y', (d) => 73 + y(d[0]));
    }

    drawChart();
    window.addEventListener('resize', drawChart);

    this.citiesStore.cities$.subscribe((response) => {
      data = response;
      updateBars();
    });
  }
}

// Q: Does svg need a div around it for sizing?
var template = `<div id='chart' class='app-chart'><svg id='bar-graph-svg'></svg></div>`;

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
    #bar-graph-svg {
      background-color: #292b33;
      border-radius: 10px;
      width: 100%;
      height: 100%;
    }

    ::ng-deep .bar-chart-y-axis {
        font-size: 1.25rem;
    }

    ::ng-deep .tick {
      color: white;
  }
`,
];

export default BarGraphComponent;
