import { Component } from '@angular/core';
import * as d3 from 'd3';
import * as _ from 'lodash';

// import buildChart from './services/buildChart';
import CitiesStoreService from 'src/app/services/cities-store.service';

@Component({ selector: 'app-chart', template, styles })
class ChartComponent {
  constructor(public citiesStore: CitiesStoreService) {}

  ngAfterViewInit() {
    const margin = 40;
    let data = this.citiesStore.cities;
    const svg = d3.select('#chart-svg');

    const x = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d[3]))
      .nice();

    const xAxis = svg.append('g');

    const popMax = d3.max(data, (d) => d[2]);

    const y = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d[1] / d[2]))
      .nice();

    const yAxis = svg
      .append('g')
      .attr('transform', `translate(${margin}, 0)`);

    const populationToRadius = d3
      .scaleSqrt()
      .domain([0, popMax])
      .range([2, 30]);

    // const myCircles = svg.selectAll('circles');

    // TODO: add bar chart
    // TODO: get regional data
    // TODO: filter by region

    // join(
    //   (enter) =>
    //     enter
    //       .append('circle')
    //       .attr('id', (d) => d.id)
    //       .attr('class', 'station-point')
    //       .attr('cx', (d) => d.longitude)
    //       .attr('cy', (d) => d.latitude - travelDistance)
    //       .attr('r', 2)
    //       .attr('fill', (d) => stationsClasses[d.class].fill)
    //       .attr('stroke', (d) => stationsClasses[d.class].stroke)
    //       .call((enter) =>
    //         enter
    //           .transition(transitionFallIn)
    //           .attr('cy', (d) => d.latitude)
    //           .transition(transitionSpread)
    //           .attr('r', (d) => d.radius),
    //       ),
    //   (update) => update.attr('r', (d) => d.radius),
    //   (exit) =>
    //     exit
    //       .transition(transitionContract)
    //       .attr('r', 2)
    //       .transition(transitionFallOut)
    //       // TODO: This SHOULD be done by transitionFallOut's duration, but that isn't working for some reason.
    //       .duration(durationFall)
    //       .attr('cy', (d) => d.latitude + travelDistance)
    //       .transition(transitionRemove)
    //       .remove(),
    // );

    const transitionDuration = 500;

    // Define the div for the tooltip
    var div = d3
      .select('body')
      .append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0)
      .style('padding', '3px 6px')
      .style('background-color', 'white')
      .style('border-radius', '8px')
      .style('top', 0)
      .style('left', 0);

    const transitionInOut = d3
      .transition()
      .duration(500)
      .ease(d3.easeLinear);

    const updateCircles = () => {
      svg
        .selectAll('circle')
        .data(
          data,
          (d) => `${_.kebabCase(d[0]).toLowerCase()}-circle`,
        )
        .join(
          (enter) =>
            enter
              .append('circle')
              .attr(
                'id',
                (d) => `${_.kebabCase(d[0]).toLowerCase()}-circle`,
              )
              .attr('cx', (d) => {
                // console.log('d = ', d, ' x(d[3]) = ', x(d[3]));
                return x(d[3]);
              })
              .attr('cy', (d) => y(d[1] / d[2]))
              .style('fill', '#69b2b3')
              // .attr('r', (d) => populationToRadius(d[2]))
              .attr('r', 0)
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
              })
              .call(
                (enter) =>
                  enter
                    .transition(transitionInOut)
                    .attr('r', (d) => populationToRadius(d[2])),
                // .attr('r', (d) => d.radius),
              ),
          (update) => update,
          (exit) =>
            exit
              .transition(transitionInOut)
              .attr('r', 0)
              .transition()
              .delay(500)
              .remove(),
        );
    };

    updateCircles();

    let currentWidth;
    let currentHeight;

    function drawChart() {
      // get the current width of the div where the chart appear, and attribute it to Svg
      currentWidth = parseInt(
        d3.select('#chart-svg').style('width'),
        10,
      );
      currentHeight = parseInt(
        d3.select('#chart-svg').style('height'),
        10,
      );

      svg.attr('height', currentHeight);
      svg.attr('width', currentWidth);

      // Update the X scale and Axis (here the 20 is just to have a bit of margin)
      x.range([margin, currentWidth - margin]);
      y.range([currentHeight - margin, margin]);
      xAxis
        .attr('transform', `translate(0, ${currentHeight - margin})`)
        .call(d3.axisBottom(x));
      yAxis.call(d3.axisLeft(y));

      d3.selectAll('.domain').style('stroke', '#ffffff');
      // Add the last information needed for the circles: their X position

      svg
        .selectAll('circle')
        .attr('cx', (d) => {
          // console.log('d = ', d, ' x(d[3]) = ', x(d[3]));
          return x(d[3]);
        })
        .attr('cy', (d) => y(d[1] / d[2]));
    }

    drawChart();
    window.addEventListener('resize', drawChart);

    this.citiesStore.cities$.subscribe((response) => {
      console.log('subscription update = ', response);
      data = response;
      // NOTE: Currently just keeps appending circles axes
      updateCircles();
      // I just need to change the data
    });
  }

  // ngAfterViewInit() {
  //   console.log('test1');

  //   // tableObs = new BehaviorSubject<Table>(null);
  //   // this.tableService.tableObs.subscribe(reponse => {
  //   //   this.table = reponse;
  //   // });
  //   this.citiesStore.cities$.subscribe((response) => {
  //     console.log('response2 = ', response);
  //     // NOTE: Currently just keeps appending circles axes
  //     buildChart('#chart-svg', response);

  //     // I just need to change the data
  //   });
  // }

  // ngDoCheck() {
  //   console.log('doing check1');
  // }

  // ngOnChanges() {
  //   console.log('doing check3');
  // }
  // ngAfterContentChecked() {
  //   console.log('doing check2');
  // }
}

console.log(
  'TODO: Add regions: https://docs.digital.mass.gov/dataset/massgis-data-ma-executive-office-health-human-services-regions',
);

// Q: Does svg need a div around it for sizing?
var template = `<div id='chart' class='app-chart'><svg id='chart-svg'></svg></div>`;

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
    #chart-svg {
      background-color: #292b33;
      border-radius: 10px;
      width: 100%;
      height: 100%;
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
