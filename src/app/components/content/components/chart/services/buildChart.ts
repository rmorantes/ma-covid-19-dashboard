// https://github.com/d3/d3/wiki#supported-environments
import * as d3 from 'd3';

const buildChart = (containerSelector, data) => {
  // Initialize dimensions.
  const height = 400;
  const width = 500;
  const margin = 40;

  // Add containers.
  // Initialize a SVG area. Note that the width is not specified yet, since unknown
  const svg = d3
    .select(containerSelector)
    .append('svg')
    .attr('class', 'chart-svg')
    .style('background-color', '#292b33')
    .style('border-radius', '10px');

  // Add X axis. Note that we don't know the range yet, so we cannot draw it.
  const x = d3
    .scaleLinear()
    .domain(d3.extent(data, (d) => d[3]))
    //    .range([0, innerWidth])
    .nice();

  const xAxis = svg.append('g');

  // TODO: assess rate of infection cases / population

  const y = d3
    .scaleLinear()
    .domain(d3.extent(data, (d) => d[1]))
    //    .range([innerHeight, 0])
    .nice();

  console.log('x, y = ', x.domain(), y.domain());
  const yAxis = svg
    .append('g')
    .attr('transform', `translate(${margin}, 0)`);

  // Initialize circles. Note that the X scale is not available yet, so we cannot draw them
  var myCircles = svg
    .selectAll('circles')
    .data(data)
    .enter()
    .append('circle')
    .style('fill', '#69b2b3')
    .attr('r', 20);
  // .attr('cy', 100);

  let currentWidth;
  let currentHeight;

  //   https://www.d3-graph-gallery.com/graph/custom_responsive.html
  // A function that finishes to draw the chart for a specific device size.
  function drawChart() {
    // get the current width of the div where the chart appear, and attribute it to Svg
    currentWidth = parseInt(
      d3.select(containerSelector).style('width'),
      10,
    );
    currentHeight = parseInt(
      d3.select(containerSelector).style('height'),
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
    myCircles.attr('cx', (d) => {
      return x(d[3]);
    });
  }

  // Initialize the chart
  drawChart();

  // re uire ments
  // https://github.com/mathematica-mpr/design-d3-training/blob/development/resources/Final%20Project.md

  // Add an event listener that run the function when dimension change
  window.addEventListener('resize', drawChart);

  //  const buildChart = (containerSelector, data) => {
  //    // Remove entries with a population of `null`.
  //    data = data.filter((d) => d.pop);

  //    // Format data.
  //    data.forEach((d) => {
  //      // Format year to be compatible with scaleTime().
  //      d.pop = Number(d.pop);
  //      d.year = new Date(d.year.slice(-4), 00, 01).getTime();
  //    });

  //    console.log("data = ", data);

  //    // Add x-axis.
  //    const x = d3
  //      .scaleTime()
  //      .domain(d3.extent(data, (d) => d.year))
  //      .range([0, innerWidth])
  //      .nice();

  //    const xAxis = d3.axisBottom(x);

  //    containerInner
  //      .append("g")
  //      .attr("class", "x-axis")
  //      .attr("transform", `translate(0, ${innerHeight})`)
  //      .call(xAxis);

  //    containerInner
  //      .append("text")
  //      .attr("class", "x-axis-label")
  //      .attr("x", innerWidth / 2)
  //      .attr("y", innerHeight + 60)
  //      .text("Year");

  //    // Add y-axis.
  //    const y = d3
  //      .scaleLinear()
  //      .domain(d3.extent(data, (d) => d.pop))
  //      .range([innerHeight, 0])
  //      .nice();

  //    const yAxis = d3
  //      .axisLeft(y)
  //      .tickFormat((num) => num / 1000000000 + "B");

  //    containerInner.append("g").attr("class", "y-axis").call(yAxis);
};

export default buildChart;
