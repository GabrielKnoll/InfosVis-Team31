var currentData = [{date: new Date("2020-01-01"), value: 99}];
typeTick = "Error";
// Set the dimensions and margins of the graph
var margin_line = {top: 30, right: 30, bottom: 30, left: 30},
    width_line = window.innerWidth / 2 - 160 - margin_line.left - margin_line.right,
    height_line = 400 - margin_line.top - margin_line.bottom;

// Append the SVG object to the div with id dataviz_areaplot
var svg_line = d3.select("#dataviz_areaplot")
    .append("svg")
    .attr("width", width_line + margin_line.left + margin_line.right)
    .attr("height", height_line + margin_line.top + margin_line.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin_line.left + "," + margin_line.top + ")");

// Set the width of the diagram whenever the window is resized
window.addEventListener('resize', setDiagramWidth);

function setDiagramWidth() {
  width_line = window.innerWidth / 2 - 160 - margin_line.left - margin_line.right;   
  svg_line.selectAll('svg').remove();
  svg_line.append("svg")
    .attr("width", width_line + margin_line.left + margin_line.right)
    .attr("height", height_line + margin_line.top + margin_line.bottom)     
  createAreaGraph(currentData);
}

function createAreaGraph(data, category) {
  currentData = data;
  switch (category) {
    case "revenue":
      typeTick = "Mrd €";
      break;
    case "employees":
      typeTick = "Tsd €";
      break;
    case "insolvency":
      typeTick = "Insolvenzen";
      break;
  }
  svg_line.selectAll('g').remove();
  svg_line.selectAll('.area').remove();
  svg_line.selectAll('.covid-line').remove();
  svg_line.selectAll('.covid-area').remove();
  svg_line.selectAll('.line-path').remove();
  svg_line.selectAll('.circle').remove();
  d3.select("body").selectAll('.tooltip').remove();

  // Append the SVG object to the div with id dataviz_areaplot
  svg_line.append("g")
      .attr("transform",
          "translate(" + margin_line.left + "," + margin_line.top + ")");

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
  .domain([0, d3.max(data, d => +d.value) * 1.2])
  .range([ height_line, 0 ]);

  const yAxis = d3.axisRight(y)
  .tickSize(width_line);

  svg_line.append("g")
  .attr("transform", `translate(0, 0)`)
  .call(yAxis)
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line")
          .attr("stroke-opacity", 0.5)
          .attr("stroke-dasharray", "2,2"))
      .call(g => g.selectAll(".tick text")
          .attr("x", -30)
          .attr("dy", 4))
      .attr('class', 'y-axis')
      .style("z-index", "3")
      .raise();

  svg_line.selectAll('.y-axis .tick').filter(d => !Number.isInteger(d)).remove();
  svg_line.selectAll('.y-axis .tick:last-of-type line').remove();
  svg_line.select('.y-axis .tick:last-of-type text')
  .text(typeTick);

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

  // Red covid line
  svg_line.append("line")
  .attr("x1",x(new Date("2020-02-01")))  //<<== change your code here
  .attr("y1", 0)
  .attr("x2", x(new Date("2020-02-01")))  //<<== and here
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
  .style("z-index", "3")
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
  .attr('x', x(new Date("2020-02-01")))
  .attr('y', 0)
  .attr('width', width_line - x(new Date("2020-02-01")))
  .attr('height', height_line)
  .attr('fill', 'url(#covid-area-gradient)')
  .attr('fill-opacity', .15)
  .attr('class', 'covid-area');

// Filter out NaN values from the data
var filteredData = data.filter(d => !isNaN(d.value));

// Add the area
svg_line.append("path")
  .datum(filteredData)
  .attr('class', 'area')
  .attr("fill", "url(#area-gradient)")
  .attr("fill-opacity", .1)
  .attr("stroke", "none")
  .attr("d", d3.area()
    .x(d => x(d.date))
    .y0(height_line)
    .y1(d => y(d.value))
    .defined(d => !isNaN(d.value))
  );

// Add the line
svg_line.append("path")
  .datum(filteredData)
  .attr('class', 'line-path')
  .attr("fill", "none")
  .attr("stroke", "#d4d4d4")
  .attr("stroke-width", 2.5)
  .attr("d", d3.line()
    .x(d => x(d.date))
    .y(d => y(d.value))
    .defined(d => !isNaN(d.value))
  );

  // Create a div for the tooltip
  var tooltip = d3.select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0)
    .style("position", "absolute")
    .style("background-color", "white")
    .style("border-radius", "15px")
    .style("padding", "10px");
  
  svg_line.selectAll(".circle")
    .data(filteredData)
    .enter().append("circle")
    .attr("class", "circle")
    .attr("fill", "darkgray")
    .attr("stroke", "none")
    .attr("r", 3)
    .attr("cx", d => x(d.date))
    .attr("cy", d => y(d.value))
    .style("z-index", "2")
    .on("mouseover", function(d) {
      tooltip.transition()
      .duration(200)
      .style("opacity", .9);
      tooltip.html("<b>Datum:</b> "+d.date.toLocaleDateString('de-DE') + "<br>"+ "<b>Wert:</b> " + d.value)
      .style("left", (d3.event.pageX + 5) + "px")
      .style("top", (d3.event.pageY - 28) + "px");
      d3.select(this).style("fill", "#bd4b57").attr("r", 5);
    })
    .on("mouseout", function(d) {
        tooltip.transition()
        .duration(500)
        .style("opacity", 0);
        d3.select(this).style("fill", "darkgray").attr("r", 3);
    });

}