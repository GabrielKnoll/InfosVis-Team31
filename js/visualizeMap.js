const STATES = ["BADEN-WÜRTTEMBERG", "BAYERN", "BERLIN", "BRANDENBURG", "BREMEN", "HESSEN", "MECKLENBURG-VORPOMMERN", "NIEDERSACHSEN", "NORDRHEIN-WESTFALEN", "RHEINLAND-PFALZ", "SAARLAND", "SACHSEN-ANHALT", "SACHSEN", "SCHLESWIG-HOLSTEIN", "HAMBURG", "THÜRINGEN"];
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
        rotLong = -(topRight[0] + bottomLeft[0]) / 2,
        center = [(topRight[0] + bottomLeft[0]) / 2 + rotLong, (topRight[1] + bottomLeft[1]) / 2],

        projection = d3.geoAlbers()
        .parallels([bottomLeft[1], topRight[1]])
        .rotate([rotLong, 0, 0])
        .translate([width / 2, height / 2])
        .center(center),

        bottomLeftPx = projection(bottomLeft),
        topRightPx = projection(topRight),
        scaleFactor = 1.00 * Math.min(width / (topRightPx[0] - bottomLeftPx[0]), height / (-topRightPx[1] + bottomLeftPx[1])),

        projection = d3.geoAlbers()
        .parallels([bottomLeft[1], topRight[1]])
        .rotate([rotLong, 0, 0])
        .translate([width / 2, height / 2])
        .scale(scaleFactor * 0.975 * 1000)
        .center(center);

    geoPath = d3.geoPath(projection);

    var graticule = d3.geoGraticule()
        .step([1, 1]);

    var target;

    changeEuro();

    g.selectAll("path.feature")
        .data(data.features)
        .enter()
        .append("path")
        .attr("class", "feature")
        .attr("class", "bundesland")
        .attr("id", setID) // ID-Zuweisung um später Bundesländer anzusteuern
        .attr("d", geoPath)
        .on("click", clickPath)
        .on("mouseover", function(d) { // MouseoverBox Logic
            var state = d.properties.name;
            target = document.getElementById(state.toUpperCase() + '-Mouseover');
            target.style.display = 'block';
        })
        .on("mouseout", function(d) { // MouseoverBox Logic
            var state = d.properties.name;
            target = document.getElementById(state.toUpperCase() + '-Mouseover');
            target.style.display = 'none';
        });


    // Return der Bundesländer-Namen aus der JSON Datei
    function setID(d) {
        var germanStates = d.properties.name;
        return germanStates;
    }
});

for (let i = 0; i <= STATES.length; i++) {
    d3.select(".heatmap-section")
        .append('div')
        .attr('class', 'mouseoverBox')
        .attr('id', STATES[i] + "-Mouseover");
}

function configureMouseOvers(statesCollection) {
// Erstellung der Mouseover-Boxen für alle Bundesländer
    for (let i = 0; i < statesCollection.length; i++) {
        var states = statesCollection[i];
        var infoSelector = '#' + states[0] + '-Mouseover';
        console.log(infoSelector);
        var infoBox = d3.select(infoSelector);
        infoBox.html("");
        for (let j = 0; j < states.length; j++) {
            if (j == 0) {
                infoBox.append('h3').attr('class', 'revenue-reduction-state-name').text(states[j]);
            } else if (j == 1) {
                infoBox.append('h2').attr('class', 'revenue-reduction-state-signature').text(states[j]);
            } else if (j == 2) {
                infoBox.append('p').attr('class', 'revenue-reduction-description-one').text(states[j]);
            } else if (j == 3) {
                infoBox.append('p').attr('class', 'revenue-reduction-description-two').text(states[j]);
            } else {
                console.log('all states pasted');
            }
        }
    }
}



// Selektion der Bundesländer (Selektionen erhaltend die Klasse 'active')
var activeClass;

function clickPath(d) {
    document.getElementById("resetbutton").disabled = false;

    if ((focused === null) || !(focused === d)) {
        focused = d;

        //Checke Radio button
        var selectedInfo, selectedCategory;
        if (document.getElementById("radio1").checked) {
            selectedInfo = "Umsatzentwicklung";
            selectedCategory = Category.Revenue.name;
        } else if (document.getElementById("radio2").checked) {
            selectedInfo = "Arbeitnehmerentwicklung";
            selectedCategory = Category.Employee.name;
        } else if (document.getElementById("radio3").checked) {
            selectedInfo = "Insolvenzenentwicklung";
            selectedCategory = Category.Insolvency.name;
        }

        //Einblenden des Graphs je nach Bundesland, Bsp: Schleswig-Holstein
        document.getElementById("ranking").style.display = 'none';
        target = document.getElementById('card-graph');
        target.style.display = 'block';
        target.style.transition = "background-image 0.2s ease-in-out";
        
        // change title
        var state = d.properties.name;
        document.getElementById("unterueberschrift-text").innerHTML = `${selectedInfo} in ${state}`
        
        // change diagram
        //TODO pass correct data based on selectedInfo
        updateChart(selectedCategory, state);
        

    } else {
        focused = null;
        document.getElementById("resetbutton").disabled = true;

        //Wenn Umsätze ausgewählt sind, blende das Ranking ein, wenn kein Bundesland gewählt wurde
        if (document.getElementById("radio1").checked) {
            document.getElementById('ranking').style.display = 'block';
            //Blende andere Bundesländer aus
            document.getElementById("card-graph").style.display = 'none';
        }

        // //Wenn Arbeitnehmer ausgewählt sind, blende das Ranking ein, wenn kein Bundesland gewählt wurde
        else if (document.getElementById("radio2").checked) {
            document.getElementById('ranking').style.display = 'block';
            document.getElementById("card-graph").style.display = 'none';
        }

        //Wenn Insolvenzen ausgewählt sind, blende das Ranking ein, wenn kein Bundesland gewählt wurde
        else if (document.getElementById("radio3").checked) {
            document.getElementById('ranking').style.display = 'block';
            document.getElementById("card-graph").style.display = 'none';
        }

    };

    g.selectAll("path")
        .classed("active", focused && function(d) {
            return d === focused;
        });
}



//onButtonClick-Funktionen => Wechsel der Kategorie bei ButtonClick
function changeEuro() {
    //changing Icons
    document.getElementById("wert").innerHTML = "<div id='wert2'>Umsatzrückgang&nbsp;<span class='material-symbols-rounded' id='down'>trending_down</span></div>";

    //changing Heatmap Header
    document.getElementById("heatmapheader").innerHTML = "Umsatzeinbußen in % (pro Bundesland)";
   
    //color Heatmap and update Hover
    colorHeatmap(Category.Revenue.name);
    updateMouseOvers(Category.Revenue.name);

    //color Heatmap and update Hover
   /* document.getElementById("bg-euros").style.display = "block";
    document.getElementById("bg-insolvencies").style.display = "none";
    document.getElementById("bg-employees").style.display = "none";*/
    //document.body.style.backgroundImage = "url(img/bg-euros2.png)";
    // document.body.style.animation = "fadeIn 1s"; 
    //document.body.style.animation = "fadeBackground 6s";

    var image1 = new Image();
    image1.src="img/bg-euros2.png";
    setTimeout(function(){
        background.style.backgroundImage = "none";
        background.style.backgroundImage = "url('img/bg-euros2.png')";
        background.classList.add("fade-in");
        setTimeout(function(){
            ackground.classList.remove("remove-bg");
          background.classList.remove("fade-in");
        },1000);
        image1.src = "";
      },100);
    
    
    //Umsatz-Ranking einblenden, Rest ausblenden
    document.getElementById("ranking_header_text").innerHTML = '<span class="material-symbols-rounded" style="color: darkgrey; font-size:19px; position: relative; top: 3px;">euro</span>&nbsp;Umsatzentwicklung nach Bundesländer (in %)';
    document.getElementById("legend-unit").innerHTML = "Umsätze in Euro";

    // TBD: Heatmap Datensätze, Graphen Datensätze, Ranking Datensätze auf style.display='none' setzen
    document.getElementById("ranking").style.display = 'block';
    document.getElementById("card-graph").style.display = 'none';
    disableButton();

}

function changeEmployee() {
    document.getElementById("wert").innerHTML = "<div id='wert2'>Arbeitnehmerrückgang&nbsp;<span class='material-symbols-rounded' id='down'>trending_down</span></div>";
    document.getElementById("heatmapheader").innerHTML = "Arbeitnehmerrückgang in % (pro Bundesland)";
   
    colorHeatmap(Category.Employee.name);
    updateMouseOvers(Category.Employee.name);

    /*document.getElementById("bg-euros").style.display = "none";
    document.getElementById("bg-insolvencies").style.display = "none";
    document.getElementById("bg-employees").style.display = "block";*/
   //  document.body.style.backgroundImage = "url(img/bg-employees2.png)";
    //document.body.style.transition = "background-image 0.2s ease-in-out";
   // document.body.style.animation = "fadeBackground 6s";
    //Korrektes Ranking einblenden, Rest ausblenden
    document.getElementById("ranking_header_text").innerHTML = '<span class="material-symbols-rounded" style="color:darkgrey;"id="arbeitnehmer">groups</span>&nbsp;Arbeitnehmerentwicklung nach Bundesländer (in %)';
    document.getElementById("legend-unit").innerHTML = "Anzahl Arbeitnehmende";
   
   /*document.body.style.transition = "background-image 0.2s ease-in-out";
    document.body.style.animation = "slide 10s";
    document.querySelector("body").style.backgroundImage = "url(img/bg-employees2.png)";
    background.classList.add("fade-in");*/
/*
    var image2 = new Image();
    image2.onload = function() {
    background.style.backgroundImage ="url(img/bg-employees2.png)";
    background.classList.add("fade-in");
    }
    image2.src = "";
*/
    var image2 = new Image();
    image2.src="img/bg-employees2.png";
    setTimeout(function(){
        background.style.backgroundImage = "none";
        background.style.backgroundImage = "url('img/bg-employees2.png')";
        background.classList.add("fade-in");
        setTimeout(function(){
            ackground.classList.remove("remove-bg");
          background.classList.remove("fade-in");
        },1000);
        image2.src = "";
      },100);

  /*  background.style.backgroundImage ="url(img/bg-employees2.png)";
    background.classList.add("fade-in");*/


    //Blende alles andere aus
    document.getElementById("ranking").style.display = 'block';
    document.getElementById("card-graph").style.display = 'none';
    disableButton();
}


function changeInsolvency() {
    document.getElementById("wert").innerHTML = "<div id='wert2'>Insolvenzzunahme&nbsp;<span class='material-symbols-rounded' id='down'>trending_up</span></div>";
    document.getElementById("heatmapheader").innerHTML = "Insolvenzentwicklung in % (pro Bundesland)";

    colorHeatmap(Category.Insolvency.name);
    updateMouseOvers(Category.Insolvency.name);

   /* document.getElementById("bg-insolvencies").style.display = "block";
    document.getElementById("bg-euros").style.display = "none";
    document.getElementById("bg-employees").style.display = "none";*/
   // document.body.style.backgroundImage = "url(img/bg-insolvencies.png)";
   /* document.body.style.transition = "background-image 0.2s ease-in-out";
    document.body.style.animation = "slide 10s";
    document.querySelector("body").style.backgroundImage = "url(img/bg-insolvencies2.png)";*/
    var image3 = new Image();
    image3.src="img/bg-insolvencies2.png";
    setTimeout(function(){
        background.style.backgroundImage = "none";
        background.style.backgroundImage = "url('img/bg-insolvencies2.png')";
        background.classList.add("fade-in");
        setTimeout(function(){
            ackground.classList.remove("remove-bg");
          background.classList.remove("fade-in");
        },1000);
        image3.src = "";
      },100);

  /*  var image3 = new Image();
    image3.setTimeout = function() {
    image3.src = "img/bg-insolvencies2.png";
    background.style.backgroundImage ="url(img/bg-insolvencies2.png)";
    background.classList.add("fade-in");
    }
    image3.src = "";*/

    //Korrektes Ranking einblenden, Rest ausblenden
    document.getElementById("ranking_header_text").innerHTML = '<span class="material-symbols-rounded" id="insolvenzen" style="color: darkgrey;">apartment</span>&nbsp;Insolvenzenentwicklung nach Bundesländer (in %)';
    document.getElementById("legend-unit").innerHTML = "Anzahl Insolvenzen";

    //Graph Umsätze ausblenden
    document.getElementById("ranking").style.display = 'block';
    document.getElementById("card-graph").style.display = 'none';
    disableButton();
}


//Resetbutton-Funktionen
function toggleButton() {
    var buttonEnabled = true;

    if (document.getElementById("resetbutton").disabled = true) {
        document.getElementById("resetbutton").disabled = false;
        buttonEnabled = false;
    }
    var states = document.getElementById("g");
    if (g.classList.contains("bundesland active")) {
        disableButton();
    }

    document.getElementById("resetbutton").disabled = false;
}

function disableButton() {
    document.getElementById("resetbutton").disabled = true;
    focused = null;
}

function reset() {
    var states = document.getElementById("g");
    g.selectAll("path").classed("active", false);
    disableButton();

    //GRAPH UMSÄTZE AUSBLENDEN
    document.getElementById("ranking").style.display = 'block';
    document.getElementById("card-graph").style.display = 'none';

    if (document.getElementById("radio1").checked) {
        changeEuro();
    } else if (document.getElementById("radio2").checked) {
        changeEmployee();
    } else if (document.getElementById("radio3").checked) {
        changeInsolvency();
    }
  }