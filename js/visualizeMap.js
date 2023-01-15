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

// Multidimensionaler Array zum verwalten und aufbauen der Mouseover-Boxen
const STATES = ["BADEN-WÜRTTEMBERG", "BAYERN", "BERLIN", "BRANDENBURG", "BREMEN", "HESSEN", "MECKLENBURG-VORPOMMERN", "NIEDERSACHSEN", "NORDRHEIN-WESTFALEN", "RHEINLAND-PFALZ", "SAARLAND", "SACHSEN-ANHALT", "SACHSEN", "SCHLESWIG-HOLSTEIN", "HAMBURG", "THÜRINGEN"];

for (let i = 0; i <= STATES.length; i++) {
    d3.select(".heatmap-section")
        .append('div')
        .attr('class', 'mouseoverBox')
        .attr('id', STATES[i] + "-Mouseover");
}
var bayernInfo = ["BAYERN", "#3 der größten Umsatzeinbußen", "Umsatzeinbußen: 7.319.757.000€", "Vorjahresvergleich: -36,0%"];
var badenWürttembergInfo = ["BADEN-WÜRTTEMBERG", "#7 der größten Umsatzeinbußen", "Umsatzeinbußen: 3.879.236.000€", "Vorjahresvergleich: -30,1%"];
var berlinInfo = ["BERLIN", "#1 der größten Umsatzeinbußen", "Umsatzeinbußen: 3.128.301.000€", "Vorjahresvergleich: -43,0%"];
var brandenburgInfo = ["BRANDENBURG", "#15 der größten Umsatzeinbußen", "Umsatzeinbußen: 327.182.000€", "Vorjahresvergleich: -18,1%"];
var bremenInfo = ["BREMEN", "#6 der größten Umsatzeinbußen", "Umsatzeinbußen: 200.665.000€", "Vorjahresvergleich: -32,2%"];
var hessenInfo = ["HESSEN", "#2 der größten Umsatzeinbußen", "Umsatzeinbußen: 3.450.120.000€", "Vorjahresvergleich: -36,9%"];
var mecklenburgVorpommernInfo = ["MECKLENBURG-VORPOMMERN", "#16 der größten Umsatzeinbußen", "Umsatzeinbußen: 346.678.000€", "Vorjahresvergleich: -14,6%"];
var niedersachenInfo = ["NIEDERSACHSEN", "#10 der größten Umsatzeinbußen", "Umsatzeinbußen: 2.088.312.000€", "Vorjahresvergleich: -28,4%"];
var nordrheinWestfalenInfo = ["NORDRHEIN-WESTFALEN", "#4 der größten Umsatzeinbußen", "Umsatzeinbußen: 5.709.367.000€", "Vorjahresvergleich: -33,6%"];
var rheinlandPfalzInfo = ["RHEINLAND-PFALZ", "#9 der größten Umsatzeinbußen", "Umsatzeinbußen: 1.167.276.000€", "Vorjahresvergleich: -29,3%"];
var saarlandInfo = ["SAARLAND", "#8 der größten Umsatzeinbußen", "Umsatzeinbußen: 227.142.000€", "Vorjahresvergleich: -29,7%"];
var sachsenAnhaltInfo = ["SACHSEN-ANHALT", "#12 der größten Umsatzeinbußen", "Umsatzeinbußen: 306.882.000€", "Vorjahresvergleich: -23,9%"];
var sachsenInfo = ["SACHSEN", "#14 der größten Umsatzeinbußen", "Umsatzeinbußen: 661.685.000€", "Vorjahresvergleich: -22,9%"];
var schleswigHolsteinInfo = ["SCHLESWIG-HOLSTEIN", "#13 der größten Umsatzeinbußen", "Umsatzeinbußen: 743.857.000€", "Vorjahresvergleich: -23,6%"];
var hamburgInfo = ["HAMBURG", "#5 der größten Umsatzeinbußen", "Umsatzeinbußen: 1.021.549.000€", "Vorjahresvergleich: -32,7%"];
var thüringenInfo = ["THÜRINGEN", "#11 der größten Umsatzeinbußen", "Umsatzeinbußen: 337.028.000€", "Vorjahresvergleich: -27,0%"];

var statesCollection = [bayernInfo, badenWürttembergInfo, berlinInfo, brandenburgInfo, bremenInfo, hessenInfo, mecklenburgVorpommernInfo, niedersachenInfo, nordrheinWestfalenInfo, rheinlandPfalzInfo, saarlandInfo, sachsenAnhaltInfo, sachsenInfo, schleswigHolsteinInfo, hamburgInfo, thüringenInfo];
var statesCollectionLen = statesCollection.length;

// Erstelleung der Mouseover-Boxen für alle Bundesländer
for (let i = 0; i < statesCollection.length; i++) {
    var states = statesCollection[i];
    var infoSelector = '#' + states[0] + '-Mouseover';
    console.log(infoSelector);
    var infoBox = d3.select(infoSelector);
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
    document.getElementById("heatmapheader").innerHTML = "Umsatzeinbußen in % (pro Bundesland)";
    document.getElementById("umsaetze").src="img/euro-icon.svg";
    document.getElementById("arbeitnehmer").src="img/employee-icon-blue.svg";
    document.getElementById("insolvenzen").src="img/insolvency-icon-blue.svg";
    colorHeatmap(Category.Revenue.name);
    document.getElementById("bg-euros").style.display = "block";
    document.getElementById("bg-insolvencies").style.display = "none";
    document.getElementById("bg-employees").style.display = "none";
    document.body.style.backgroundImage = "url(img/bg-euros.png)";
    // document.body.style.animation = "fadeIn 1s"; 
    document.body.style.animation = "fadeBackground 6s";

    //Umsatz-Ranking einblenden, Rest ausblenden
    document.getElementById("ranking_header_text").innerHTML = 'Umsatzentwicklung nach Bundesländer (in %)';
    document.getElementById("legend-unit").innerHTML = "Umsätze in Euro";

    // TBD: Heatmap Umsätze einblenden, Heatmap Arbeitnehmer+Insolvenzen ausblenden
    // TBD: Ranking Umsätze einblenden, Ranking Arbeitnehmer+Insolvenzen ausblenden

    // TBD: Heatmap Datensätze, Graphen Datensätze, Ranking Datensätze auf style.display='none' setzen
    document.getElementById("ranking").style.display = 'block';
    document.getElementById("card-graph").style.display = 'none';
    disableButton();

}

function changeEmployee() {
    
    document.getElementById("heatmapheader").innerHTML = "Arbeitnehmerrückgang in % (pro Bundesland)";
    document.getElementById("umsaetze").src="img/euro-icon-blue.svg";
    document.getElementById("arbeitnehmer").src="img/employee-icon.svg";
    document.getElementById("insolvenzen").src="img/insolvency-icon-blue.svg";
    colorHeatmap(Category.Employee.name);
    document.getElementById("bg-euros").style.display = "none";
    document.getElementById("bg-insolvencies").style.display = "none";
    document.getElementById("bg-employees").style.display = "block";
    document.body.style.backgroundImage = "url(img/bg-employees.png)";
    //document.body.style.transition = "background-image 0.2s ease-in-out";
    document.body.style.animation = "fadeBackground 6s";
    //Korrektes Ranking einblenden, Rest ausblenden
    document.getElementById("ranking_header_text").innerHTML = 'Arbeitnehmerentwicklung nach Bundesländer (in %)';
    document.getElementById("legend-unit").innerHTML = "Anzahl Arbeitnehmende";
    //Beispielcode: Zeige Arbeitnehmergraph für SW an, wenn SW ausgewählt bei Umsätze ODER bei Insolvenzen
    /* if (document.getElementById("card-graph-schleswigholstein" || "card-graph-schleswigholstein3").style.display='block') {
       document.getElementById("card-graph-schleswigholstein2").style.display='block';
       document.getElementById("card-graph-schleswigholstein").style.display='none';
       document.getElementById("arbeitnehmer-ranking").style.display='none';
     }*/
    //Blende alles andere aus
    document.getElementById("ranking").style.display = 'block';
    document.getElementById("card-graph").style.display = 'none';
    disableButton();
    // TBD: Heatmap Arbeitnehmer einblenden, Heatmap Umsätze+Insolvenzen ausblenden
    // TBD: Ranking Arbeitnehmer einblenden, Ranking Umsätze+Insolvenzen ausblenden
}


function changeInsolvency() {
    document.getElementById("heatmapheader").innerHTML = "Insolvenzentwicklung in % (pro Bundesland)";
    document.getElementById("umsaetze").src="img/euro-icon-blue.svg";
    document.getElementById("arbeitnehmer").src="img/employee-icon-blue.svg";
    document.getElementById("insolvenzen").src="img/insolvency-icon.svg";

    colorHeatmap(Category.Insolvency.name);
    document.getElementById("bg-insolvencies").style.display = "block";
    document.getElementById("bg-euros").style.display = "none";
    document.getElementById("bg-employees").style.display = "none";
    document.body.style.backgroundImage = "url(img/bg-insolvencies.png)";
    document.body.style.transition = "background-image 0.2s ease-in-out";
    document.body.style.animation = "slide 10s";
    document.querySelector("body").style.backgroundImage = "url(img/bg-insolvencies.png)";

    //Korrektes Ranking einblenden, Rest ausblenden
    document.getElementById("ranking_header_text").innerHTML = 'Insolvenzenentwicklung nach Bundesländer (in %)';
    document.getElementById("legend-unit").innerHTML = "Anzahl Insolvenzen";
    // TBD: Heatmap Insolvenzen einblenden, Heatmap Umsätze+Arbeitnehmer ausblenden

    //GRAPH UMSÄTZE AUSBLENDEN
    document.getElementById("ranking").style.display = 'block';
    document.getElementById("card-graph").style.display = 'none';
    disableButton();
    // TBD: Ranking Insolvenzen einblenden, Ranking Umsätze+Arbeitnehmer ausblenden


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
  
