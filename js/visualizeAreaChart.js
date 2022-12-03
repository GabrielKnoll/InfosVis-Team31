// Set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 60},
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
    .attr("height", height + margin.top + margin.bottom);

var g = svg.append("g")
    .append("g")
    .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")")
    ;


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

    // Add X axis --> it is a date format
    var x = d3.scaleTime()
      .domain(d3.extent(data, function(d) { return d.date; }))
      .range([ 0, width ]);
    svg.append("g")
      .attr("transform", "translate(0," + (height+5) + ")")
      .call(d3.axisBottom(x).ticks(5).tickSizeOuter(0));

    // Add Y axis
    var y = d3.scaleLinear()
      .domain( d3.extent(data, function(d) { return +d.value; }) )
      .range([ height, 0 ]);
    svg.append("g")
      .attr("transform", "translate(-5,0)")
      .call(d3.axisLeft(y).tickSizeOuter(0));


    // Red covid line
    svg.append("line")
    .attr("x1",x(new Date("2017-01-01")))  //<<== change your code here
    .attr("y1", 0)
    .attr("x2", x(new Date("2017-01-01")))  //<<== and here
    .attr("y2", height)
    .style("stroke-width", 2)
    .style("stroke", "red")
    .style("stroke-dasharray", 7)
    .style("fill", "none");

    // Red covid area
    svg.append('rect')
    .attr('x', x(new Date("2017-01-01")))
    .attr('y', 0)
    .attr('width', x(new Date("2017-01-01")))
    .attr('height', height)
    .attr('fill', 'red')
    .attr("fill-opacity", .05);

    // Add the area
    svg.append("path")
      .datum(data)
      .attr("fill", "#2798e9")
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
        .attr("r", 4)

})


//TODO show value when hovering over point