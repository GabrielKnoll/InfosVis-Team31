var currentData;
// Set the dimensions and margins of the graph
var margin_line = {top: 30, right: 30, bottom: 30, left: 30},
    width_line = window.innerWidth / 2 - 160 - margin_line.left - margin_line.right,
    height_line = 400 - margin_line.top - margin_line.bottom;

// Set the width of the diagram whenever the window is resized
window.addEventListener('resize', setDiagramWidth);

function setDiagramWidth() {
  width_line = window.innerWidth / 2 - 160 - margin_line.left - margin_line.right;
  d3.select("#dataviz_areaplot svg")
    .attr("width", width_line + margin_line.left + margin_line.right)
    .attr("height", height_line + margin_line.top + margin_line.bottom);
  d3.select("#dataviz_areaplot svg g")
    .attr("transform",
        "translate(" + margin_line.left + "," + margin_line.top + ")");
        
  updateAreaGraph(currentData);
}

// Append the SVG object to the div with id dataviz_areaplot
var svg_line = d3.select("#dataviz_areaplot")
    .append("svg")
    .attr("width", width_line + margin_line.left + margin_line.right)
    .attr("height", height_line + margin_line.top + margin_line.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin_line.left + "," + margin_line.top + ")");

//Read the data
d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv",

  // When reading the csv, I must format variables:
  function(d){
    return { date : d3.timeParse("%Y-%m-%d")(d.date), value : d.value }
  },
  function(data) {
    // Now I can use this dataset:
    createAreaGraph(data);
  }
)


function createAreaGraph(data) {
  currentData = data
  // Keep only the 90 first row
  //TODO remove, unnecessary for our data
  /*data = data.filter(function(d,i){ return i>90}).filter(function(value, index, Arr) {
    return index % 100 == 0;
  });*/

  // Add X axis --> it is a date format
  var x = d3.scaleTime()
  .domain(d3.extent(data, d => d.date))
  .range([ 0, width_line ]);

  const xAxis = d3.axisBottom(x)
  .ticks(d3.timeMonth.every(3))
  .tickFormat(d => d <= d3.timeYear(d) ? d.getFullYear() : null);

  svg_line.append("g")
  .attr("transform", `translate(0, ${height_line})`)
  .call(xAxis)
  .attr('class', 'x-axis');


  // Add Y axis
  var y = d3.scaleLinear()
  .domain( d3.extent(data, d => +d.value ))
  .range([ height_line, 0 ]);

  const yAxis = d3.axisRight(y)
  .tickSize(width_line)
  .tickFormat(formatTick);  

  svg_line.append("g")
  .attr("transform", `translate(0, 0)`)
  .call(yAxis)
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line")
          .attr("stroke-opacity", 0.5)
          .attr("stroke-dasharray", "2,2"))
      .call(g => g.selectAll(".tick text")
          .attr("x", 4)
          .attr("dy", -4))
      .attr('class', 'y-axis');

      
  // Set the gradient
  svg_line.append("linearGradient")
  .attr("id", "area-gradient")
  .attr("gradientUnits", "userSpaceOnUse")
  .attr("x1", x(0))
  .attr("y1", "50%")
  .attr("x2", x(0))
  .attr("y2", "00%")
  .selectAll("stop")
  .data([
    {offset: "0%", color: "transparent"},
    {offset: "50%", color: "#2798e9"}
  ])
  .enter().append("stop")
  .attr("offset", function(d) { return d.offset; })
  .attr("stop-color", function(d) { return d.color; });

  // Add the area
  svg_line.append("path")
  .datum(data)
  .attr('class', 'area')
  .attr("fill", "url(#area-gradient)")
  .attr("fill-opacity", .1)
  .attr("stroke", "none")
  .attr("d", d3.area()
    .x(d => x(d.date))
    .y0( height_line )
    .y1(d => y(d.value))
    )

  // Add the line
  svg_line.append("path")
  .datum(data)
  .attr('class', 'line-path')
  .attr("fill", "none")
  .attr("stroke", "#d4d4d4")
  .attr("stroke-width", 2.5)
  .attr("d", d3.line()
    .x(d => x(d.date))
    .y(d => y(d.value))
  )

  // Add the circles
  const circles = svg_line.selectAll('.circle')
    .data(data);

  circles.enter()
    .append('circle')
    .attr("class", "circle")
    .attr("fill", "#2798e9")
    .attr("stroke", "none")
    .attr("r", 5);

  circles.exit().remove();

  circles.attr("cx", d => x(d.date))
  .attr("cy", d => y(d.value));

  // Red covid line
  svg_line.append("line")
  .attr("x1",x(new Date("2020-01-01")))  //<<== change your code here
  .attr("y1", 0)
  .attr("x2", x(new Date("2020-01-01")))  //<<== and here
  .attr("y2", height_line)
  .attr("class", "covid-line")
  .style("stroke-width", 2)
  .style("stroke", "#bd4b57")
  .style("stroke-dasharray", 7)
  .style("fill", "none");

  // Set the Covid gradient
  svg_line.append("linearGradient")
  .attr("gradientUnits", "userSpaceOnUse")
  .attr("x1", "0%")
  .attr("y1", "110%")
  .attr("x2", "0%")
  .attr("y2", "0%")
  .attr("id", "covid-area-gradient")
  .selectAll("stop")
  .data([
    {offset: "0%", color: "#bd4b57"},
    {offset: "100%", color: "transparent"}
  ])
  .enter().append("stop")
  .attr("offset", function(d) { return d.offset; })
  .attr("stop-color", function(d) { return d.color; });

  // Red covid area
  svg_line.append('rect')
  .attr('x', x(new Date("2020-01-01")))
  .attr('y', 0)
  .attr('width', width_line - x(new Date("2020-01-01")))
  .attr('height', height_line)
  .attr('fill', 'url(#covid-area-gradient)')
  .attr('fill-opacity', .15)
  .attr('class', 'covid-area');

}

function formatTick(d) {
  const s = (d / 1e3).toFixed(1);
  return this.parentNode.nextSibling ? `\xa0${s}` : `${s} Mrd €`;
}

// =================================================================================

function updateAreaGraph(data) {
  currentData = data
  // Add X axis --> it is a date format
  var x = d3.scaleTime()
    .domain(d3.extent(data, d => d.date))
    .range([ 0, width_line ]);

  // Add Y axis
  var y = d3.scaleLinear()
    .domain( d3.extent(data, d => +d.value ))
    .range([ height_line, 0 ]);

  // Update the x-axis
  const xAxis = d3.axisBottom(x)
    .ticks(d3.timeMonth.every(3))
    .tickFormat(d => d <= d3.timeYear(d) ? d.getFullYear() : null);

  svg_line.select('.x-axis')
    .attr("transform", `translate(0, ${height_line})`)
    .call(xAxis);

  // Update the y-axis
  const yAxis = d3.axisRight(y)
    .tickSize(width_line)
    .tickFormat(formatTick);

  svg_line.select('.y-axis')
    .attr("transform", `translate(0, 0)`)
    .call(yAxis)
        .call(g => g.select(".domain").remove())
        .call(g => g.selectAll(".tick line")
            .attr("stroke-opacity", 0.5)
            .attr("stroke-dasharray", "2,2"))
        .call(g => g.selectAll(".tick text")
            .attr("x", 4)
            .attr("dy", -4));

  // Update the gradient
  svg_line.select('#area-gradient')
    .attr("x1", x(0))
    .attr("y1", "50%")
    .attr("x2", x(0))
    .attr("y2", "00%")
    .selectAll("stop")
    .data([
      {offset: "0%", color: "transparent"},
      {offset: "50%", color: "#2798e9"}
    ])
    .attr("offset", function(d) { return d.offset; })
    .attr("stop-color", function(d) { return d.color; });

  // Update the area
  svg_line.select('.area')
    .datum(data)
    .attr("d", d3.area()
      .x(d => x(d.date))
      .y0(height_line)
      .y1(d => y(d.value))
    );

  // Update the line
  svg_line.select('.line-path')
    .datum(data)
    .attr("d", d3.line()
      .x(d => x(d.date))
      .y(d => y(d.value))
    );

  // Update the circles
  const circles = svg_line.selectAll('.circle')
    .data(data);

  circles.enter()
    .append('circle')
    .attr("class", "circle")
    .attr("fill", "#2798e9")
    .attr("stroke", "none")
    .attr("r", 5);

  circles.exit().remove();

  circles.attr("cx", d => x(d.date))
  .attr("cy", d => y(d.value));

  // Update the red covid line
  svg_line.select('.covid-line')
  .attr("x1", x(new Date("2020-01-01")))
  .attr("y1", 0)
  .attr("x2", x(new Date("2020-01-01")))
  .attr("y2", height_line);
  
    // Update the gradient
    svg_line.select('#covid-area-gradient')
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", "0%")
      .attr("y1", "110%")
      .attr("x2", "0%")
      .attr("y2", "0%")
      .selectAll("stop")
      .data([
        {offset: "0%", color: "#bd4b57"},
        {offset: "100%", color: "transparent"}
      ])
      .enter().append("stop")
      .attr("offset", function(d) { return d.offset; })
      .attr("stop-color", function(d) { return d.color; });

  // Update the covid area
  svg_line.select('.covid-area')
    .attr('x', x(new Date("2020-01-01")))
    .attr('y', 0)
    .attr('width', width_line - x(new Date("2020-01-01")))
    .attr('height', height_line)
    .attr('fill', 'url(#covid-area-gradient)')
    .attr('fill-opacity', .15);
}