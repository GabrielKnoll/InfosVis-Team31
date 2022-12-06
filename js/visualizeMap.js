// Hier können wir die Größe der Heatmap einstellen
var width = 500,
    height = 460,
    focused = null,
    geoPath;

// Unsere Wunschgröße wird hinzugefügt
var svg = d3.select(".heatmap-container")
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

  var target;

  g.selectAll("path.feature")
      .data(data.features)
      .enter()
    .append("path")
      .attr("class", "feature")
      .attr("class", "bundesland")
      .attr("id", setID) // ID-Zuweisung um später Bundesländer anzusteuern
      .attr("d", geoPath)
      .on("click", clickPath)
      .on("mouseover", function(d){ // MouseoverBox Logic
        var state = d.properties.name;
        if(state==='Bayern'){
          target = document.getElementById('BAYERN-Mouseover');
          target.style.display = 'block';

        }else if(state==='Baden-Württemberg'){
          target = document.getElementById('BADEN-WÜTTEMBERG-Mouseover');
          target.style.display = 'block';

        }else if(state==='Thüringen'){
          target = document.getElementById('THÜRINGEN-Mouseover');
          target.style.display = 'block';

        }else if(state==='Hessen'){
          target = document.getElementById('HESSEN-Mouseover');
          target.style.display = 'block';

        }else if(state==='Sachsen'){
          target = document.getElementById('SACHSEN-Mouseover');
          target.style.display = 'block';

        }else if(state==='Rheinland-Pfalz'){
          target = document.getElementById('RHEINLAND-PFALZ-Mouseover');
          target.style.display = 'block';

        }else if(state==='Saarland'){
          target = document.getElementById('SAARLAND-Mouseover');
          target.style.display = 'block';

        }else if(state==='Brandenburg'){
          target = document.getElementById('BRANDENBURG-Mouseover');
          target.style.display = 'block';

        }else if(state==='Berlin'){
          target = document.getElementById('BERLIN-Mouseover');
          target.style.display = 'block';

        }else if(state==='Sachsen-Anhalt'){
          target = document.getElementById('SACHSEN-ANHALT-Mouseover');
          target.style.display = 'block';

        }else if(state==='Niedersachsen'){
          target = document.getElementById('NIEDERSACHSEN-Mouseover');
          target.style.display = 'block';

        }else if(state==='Nordrhein-Westfalen'){
          target = document.getElementById('NORDRHEIN-WESTFALEN-Mouseover');
          target.style.display = 'block';

        }else if(state==='Bremen'){
          target = document.getElementById('BREMEN-Mouseover');
          target.style.display = 'block';

        }else if(state==='Mecklenburg-Vorpommern'){
          target = document.getElementById('MECKLENBURG-VORPOMMERN-Mouseover');
          target.style.display = 'block';

        }else if(state==='Hamburg'){
          target = document.getElementById('HAMBURG-Mouseover');
          target.style.display = 'block';

        }else if(state==='Schleswig-Holstein'){
          target = document.getElementById('SCHLESWIG-HOLSTEIN-Mouseover');
          target.style.display = 'block';
        }


      })
      .on("mouseout", function(d){ // MouseoverBox Logic
        var state = d.properties.name;
        if(state==='Bayern'){
          target = document.getElementById('BAYERN-Mouseover');
          target.style.display = 'none';

        }else if(state==='Baden-Württemberg'){
          target = document.getElementById('BADEN-WÜTTEMBERG-Mouseover');
          target.style.display = 'none';

        }else if(state==='Thüringen'){
          target = document.getElementById('THÜRINGEN-Mouseover');
          target.style.display = 'none';

        }else if(state==='Hessen'){
          target = document.getElementById('HESSEN-Mouseover');
          target.style.display = 'none';

        }else if(state==='Sachsen'){
          target = document.getElementById('SACHSEN-Mouseover');
          target.style.display = 'none';

        }else if(state==='Rheinland-Pfalz'){
          target = document.getElementById('RHEINLAND-PFALZ-Mouseover');
          target.style.display = 'none';

        }else if(state==='Saarland'){
          target = document.getElementById('SAARLAND-Mouseover');
          target.style.display = 'none';

        }else if(state==='Brandenburg'){
          target = document.getElementById('BRANDENBURG-Mouseover');
          target.style.display = 'none';

        }else if(state==='Berlin'){
          target = document.getElementById('BERLIN-Mouseover');
          target.style.display = 'none';

        }else if(state==='Sachsen-Anhalt'){
          target = document.getElementById('SACHSEN-ANHALT-Mouseover');
          target.style.display = 'none';

        }else if(state==='Niedersachsen'){
          target = document.getElementById('NIEDERSACHSEN-Mouseover');
          target.style.display = 'none';

        }else if(state==='Nordrhein-Westfalen'){
          target = document.getElementById('NORDRHEIN-WESTFALEN-Mouseover');
          target.style.display = 'none';

        }else if(state==='Bremen'){
          target = document.getElementById('BREMEN-Mouseover');
          target.style.display = 'none';

        }else if(state==='Mecklenburg-Vorpommern'){
          target = document.getElementById('MECKLENBURG-VORPOMMERN-Mouseover');
          target.style.display = 'none';

        }else if(state==='Hamburg'){
          target = document.getElementById('HAMBURG-Mouseover');
          target.style.display = 'none';

        }else if(state==='Schleswig-Holstein'){
          target = document.getElementById('SCHLESWIG-HOLSTEIN-Mouseover');
          target.style.display = 'none';
        }



      });

  // Return der Bundesländer-Namen aus der JSON Datei
  function setID(d){
      var germanStates = d.properties.name;
      return germanStates;
  }


});

// Multidimensionaler Array zum verwalten und aufbauen der Mouseover-Boxen
const STATES = ["BADEN-WÜTTEMBERG", "BAYERN", "BERLIN", "BRANDENBURG", "BREMEN", "HESSEN", "MECKLENBURG-VORPOMMERN", "NIEDERSACHSEN", "NORDRHEIN-WESTFALEN", "RHEINLAND-PFALZ", "SAARLAND", "SACHSEN-ANHALT", "SACHSEN", "SCHLESWIG-HOLSTEIN", "HAMBURG", "THÜRINGEN"];

for(let i = 0; i<= STATES.length; i++ ){
  d3.select(".heatmap-section")
      .append('div')
      .attr('class', 'mouseoverBox')
      .attr('id', STATES[i]+"-Mouseover");
}
var bayernInfo = ["BAYERN","#3 der größten Umsatzeinbusen","Umsatzeinbußen: 7.319.757.000€", "Vorjahresvergleich: -36,0%" ];
var badenWüttembergInfo = ["BADEN-WÜTTEMBERG","#7 der größten Umsatzeinbusen","Umsatzeinbußen: 3.879.236.000€", "Vorjahresvergleich: -30,1%" ];
var berlinInfo = ["BERLIN","#1 der größten Umsatzeinbusen","Umsatzeinbußen: 3.128.301.000€", "Vorjahresvergleich: -43,0%" ];
var brandenburgInfo = ["BRANDENBURG","#15 der größten Umsatzeinbusen","Umsatzeinbußen: 327.182.000€", "Vorjahresvergleich: -18,1%" ];
var bremenInfo = ["BREMEN","#6 der größten Umsatzeinbusen","Umsatzeinbußen: 200.665.000€", "Vorjahresvergleich: -32,2%" ];
var hessenInfo = ["HESSEN","#2 der größten Umsatzeinbusen","Umsatzeinbußen: 3.450.120.000€", "Vorjahresvergleich: -36,9%" ];
var mecklenburgVorpommernInfo = ["MECKLENBURG-VORPOMMERN","#16 der größten Umsatzeinbusen","Umsatzeinbußen: 346.678.000€", "Vorjahresvergleich: -14,6%" ];
var niedersachenInfo = ["NIEDERSACHSEN","#10 der größten Umsatzeinbusen","Umsatzeinbußen: 2.088.312.000€", "Vorjahresvergleich: -28,4%" ];
var nordrheinWestfalenInfo = ["NORDRHEIN-WESTFALEN","#4 der größten Umsatzeinbusen","Umsatzeinbußen: 5.709.367.000€", "Vorjahresvergleich: -33,6%" ];
var rheinlandPfalzInfo = ["RHEINLAND-PFALZ","#9 der größten Umsatzeinbusen","Umsatzeinbußen: 1.167.276.000€", "Vorjahresvergleich: -29,3%" ];
var saarlandInfo = ["SAARLAND","#8 der größten Umsatzeinbusen","Umsatzeinbußen: 227.142.000€", "Vorjahresvergleich: -29,7%" ];
var sachsenAnhaltInfo = ["SACHSEN-ANHALT","#12 der größten Umsatzeinbusen","Umsatzeinbußen: 306.882.000€", "Vorjahresvergleich: -23,9%" ];
var sachsenInfo = ["SACHSEN","#14 der größten Umsatzeinbusen","Umsatzeinbußen: 661.685.000€", "Vorjahresvergleich: -22,9%" ];
var schleswigHolsteinInfo = ["SCHLESWIG-HOLSTEIN","#13 der größten Umsatzeinbusen","Umsatzeinbußen: 743.857.000€", "Vorjahresvergleich: -23,6%" ];
var hamburgInfo = ["HAMBURG","#5 der größten Umsatzeinbusen","Umsatzeinbußen: 1.021.549.000€", "Vorjahresvergleich: -32,7%" ];
var thüringenInfo = ["THÜRINGEN","#11 der größten Umsatzeinbusen","Umsatzeinbußen: 337.028.000€", "Vorjahresvergleich: -27,0%" ];

var statesCollection = [bayernInfo, badenWüttembergInfo, berlinInfo, brandenburgInfo, bremenInfo, hessenInfo, mecklenburgVorpommernInfo, niedersachenInfo, nordrheinWestfalenInfo, rheinlandPfalzInfo, saarlandInfo, sachsenAnhaltInfo, sachsenInfo, schleswigHolsteinInfo, hamburgInfo, thüringenInfo];
var statesCollectionLen = statesCollection.length;

// Erstelleung der Mouseover-Boxen für alle Bundesländer
for(let i = 0; i < statesCollection.length; i++) {
    var states = statesCollection[i];
    var infoSelector ='#' + states[0] + '-Mouseover';
    console.log(infoSelector);
    var infoBox = d3.select(infoSelector);
    for(let j = 0; j < states.length; j++) {
      if(j==0){
        infoBox.append('h3').attr('class', 'revenue-reduction-state-name').text(states[j]);
      }else if(j==1){
          infoBox.append('h2').attr('class', 'revenue-reduction-state-signature').text(states[j]);
      }else if(j==2){
        infoBox.append('p').attr('class', 'revenue-reduction-description-one').text(states[j]);
      }else if(j==3){
          infoBox.append('p').attr('class', 'revenue-reduction-description-two').text(states[j]);
      }else{
        console.log('all states pasted');
      }
    }
}

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


//onButtonClick-Funktionen()

  function changeEuro()
  {
  document.body.style.backgroundImage = "url(img/bg-euros.png)";
  }
  
  function changeEmployee()
  {
  document.body.style.backgroundImage = "url(img/bg-employees.png)";
  }
  
  function changeInsolvency()
  {
  document.body.style.backgroundImage = "url(img/bg-insolvencies.png)";
  }