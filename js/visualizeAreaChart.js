// Set the dimensions and margins of the graph
var margin = {top: 10, right: 10, bottom: 30, left: 30},
    width = 640 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

//const zoom = d3.zoom()
//    .scaleExtent([.5, 1.5])
//    .extent([[margin.left, 0], [width - margin.right, height]])
//    .translateExtent([[margin.left, -Infinity], [width - margin.right, Infinity]])
//    .on("zoom", zoomed);

// Append the SVG object to the div with id dataviz_areaplot
var svg = d3.select("#dataviz_areaplot")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");


// Read the data
//d3.json("./json/Umsatz im Gastgewerbe.json", function(data) {
//
//
//
//});

//Read the data
d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv",

  // When reading the csv, I must format variables:
  function(d){
    return { date : d3.timeParse("%Y-%m-%d")(d.date), value : d.value }
  },

  // Now I can use this dataset:
  function(data) {

        // Keep only the 90 first rows
      data = data.filter(function(d,i){ return i>90}).filter(function(value, index, Arr) {
        return index % 100 == 0;
    });

    // Add X axis --> it is a date format
    var x = d3.scaleTime()
      .domain(d3.extent(data, d => d.date))
      .range([ 0, width ]);
    svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x)      
        .ticks(d3.timeMonth.every(3))
        .tickFormat(d => d <= d3.timeYear(d) ? d.getFullYear() : null))
 ; 

    // Add Y axis
    var y = d3.scaleLinear()
      .domain( d3.extent(data, d => +d.value ))
      .range([ height, 0 ]);
    svg.append("g")
      .attr("transform", `translate(0, 0)`)
    .call(d3.axisRight(y)
        .tickSize(width)
        .tickFormat(formatTick))
          .call(g => g.select(".domain").remove())
          .call(g => g.selectAll(".tick line")
              .attr("stroke-opacity", 0.5)
              .attr("stroke-dasharray", "2,2"))
          .call(g => g.selectAll(".tick text")
              .attr("x", 4)
              .attr("dy", -4));
    
    // Set the gradient
    svg.append("linearGradient")
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
    svg.append("path")
      .datum(data)
      .attr("fill", "url(#area-gradient)")
      .attr("fill-opacity", .1)
      .attr("stroke", "none")
      .attr("d", d3.area()
        .x(d => x(d.date))
        .y0( height )
        .y1(d => y(d.value))
        )

    // Add the line
    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#d4d4d4")
      .attr("stroke-width", 2.5)
      .attr("d", d3.line()
        .x(d => x(d.date))
        .y(d => y(d.value))
      )

    // Add the line
    svg.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
        .attr("fill", "#2798e9")
        .attr("stroke", "none")
        .attr("cx", d => x(d.date))
        .attr("cy", d => y(d.value))
        .attr("r", 5)

    // Red covid line
    svg.append("line")
    .attr("x1",x(new Date("2017-01-01")))  //<<== change your code here
    .attr("y1", 0)
    .attr("x2", x(new Date("2017-01-01")))  //<<== and here
    .attr("y2", height)
    .style("stroke-width", 2)
    .style("stroke", "#bd4b57")
    .style("stroke-dasharray", 7)
    .style("fill", "none");

    // Set the gradient
    svg.append("linearGradient")
    .attr("id", "red-gradient")
    .attr("gradientUnits", "userSpaceOnUse")
    .attr("x1", 0)
    .attr("y1", "90%")
    .attr("x2", 0)
    .attr("y2", 0)
    .selectAll("stop")
      .data([
        {offset: "0%", color: "#bd4b57"},
        {offset: "50%", color: "transparent"}
      ])
    .enter().append("stop")
      .attr("offset", function(d) { return d.offset; })
      .attr("stop-color", function(d) { return d.color; });

    // Red covid area
    svg.append('rect')
    .attr('x', x(new Date("2017-01-01")))
    .attr('y', 0)
    .attr('width', width - x(new Date("2017-01-01")))
    .attr('height', height)
    .attr('fill', 'url(#red-gradient)')
    .attr('fill-opacity', .3);

})


//TODO show value when hovering over point

function formatTick(d) {
  const s = (d / 1e3).toFixed(1);
  return this.parentNode.nextSibling ? `\xa0${s}` : `${s} Mrd €`;
}