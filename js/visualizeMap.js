// Hier können wir die Größe der Heatmap einstellen
var width = 960,
    height = 800,
    focused = null,
    geoPath;

// Unsere Wunschgröße wird hinzugefügt
var svg = d3.select("body")
  .append("svg")
    .attr("width", width)
    .attr("height", height);

// Unser Heatmap-Hintergrund wird hinzugefügt und mit der Klasse "background" zugänglich gemacht
svg.append("rect")
    .attr("class", "background")
    .attr("width", width)
    .attr("height", height);

// Gruppe für States --> Hier landen dann unsere Bundesländer
var g = svg.append("g")
  .append("g")
    .attr("id", "states");


// Hier laden wir Deutschland + Bundesländer aus der lokalen JSON und verarbeiten diese
d3.json("./json/optimizedGermanStates.json", function(data) {

  // Einstellen der Bounding Box
  var bounds = d3.geoBounds(data),
      bottomLeft = bounds[0],
      topRight = bounds[1],
      rotLong = -(topRight[0]+bottomLeft[0])/2,
      center = [(topRight[0]+bottomLeft[0])/2+rotLong, (topRight[1]+bottomLeft[1])/2],

      projection = d3.geoAlbers()
        .parallels([bottomLeft[1],topRight[1]])
        .rotate([rotLong,0,0])
        .translate([width/2,height/2])
        .center(center),

      bottomLeftPx = projection(bottomLeft),
      topRightPx = projection(topRight),
      scaleFactor = 1.00*Math.min(width/(topRightPx[0]-bottomLeftPx[0]), height/(-topRightPx[1]+bottomLeftPx[1])),

      projection = d3.geoAlbers()
        .parallels([bottomLeft[1],topRight[1]])
        .rotate([rotLong,0,0])
        .translate([width/2,height/2])
        .scale(scaleFactor*0.975*1000)
        .center(center);

  geoPath = d3.geoPath(projection);

  var graticule = d3.geoGraticule()
      .step([1, 1]);

  g.selectAll("path.feature")
      .data(data.features)
      .enter()
    .append("path")
      .attr("class", "feature")
      .attr("class", "bundesland")
      .attr("id", setID) // ID-Zuweisung um später Bundesländer anzusteuern
      .attr("d", geoPath)
      .on("click", clickPath);

//Idee
  g.selectAll("path.feature")
        .data(data.features)
        .enter()
      .append('div')
      .attr('class', 'mouseoverBox')
      .attr('id', function setMouseOverID(d){
        return d.properties.name+'-Mouseover';
      });
//



  // Return der Bundesländer-Namen aus der JSON Datei
  function setID(d){
      var germanStates = d.properties.name;
      return germanStates;
  }

});

// Selektion der Bundesländer (Selektionen erhaltend die Klasse 'active')
function clickPath(d) {

  if ((focused === null) || !(focused === d)) {
    focused = d;
  } else {
    focused = null;
  };

  g.selectAll("path")
      .classed("active", focused && function(d) { return d === focused; });
}
