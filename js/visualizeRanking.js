// Toggle the visibility of the table rows
function addTableRowsClass() {
    var table = document.getElementById('Ranking-table');
    var rows = table.getElementsByTagName('tr');

    for (var i = 0; i < rows.length; i++) {
        if (i <= 4) {
        rows[i].classList.add('table-row');   
        }
        else { // Show the first 5 rows
        rows[i].classList.add('hidden-row');
        rows[i].classList.add('table-row');
        rows[i].classList.add('content');
        }
    }
}

// Toggle the visibility of the table rows
function toggleTableRows() {
    var table = document.getElementById('Ranking-table');
    var rows = table.getElementsByTagName('tr');

    for (var i = 0; i < rows.length; i++) {
        if (i > 4) { // Show the first 5 rows
        rows[i].classList.toggle('hidden-row');
        }
    }
}

function divOriginalSize() {
    var hint = document.getElementById("hint");
    var div = document.getElementById("ranking_div");
    var button = document.getElementById("extend");
    hint.innerHTML = "Mehr anzeigen";
    div.style.height = "200px";
    div.style.transition = "height 0.2s ease";
    button.style.transform = "rotate(360deg)";
    button.style.transition = "transform 0.8s";
    isExpanded = false;
}

// Toggle the table expansion and the hint
var isExpanded = false;
function expandDiv() {
    var hint = document.getElementById("hint");
    var div = document.getElementById("ranking_div");
    var button = document.getElementById("extend");
    if (isExpanded) {
        hint.innerHTML = "Mehr anzeigen";
        div.style.height = "200px";
        div.style.transition = "height 0.2s ease";
        button.style.transform = "rotate(360deg)";
        button.style.transition = "transform 0.8s";
        isExpanded = false;
    } else {
        hint.innerHTML = "Weniger anzeigen";
        div.style.height = "395px";
        div.style.transition = "height 0.2s ease";
        button.style.transform = "rotate(180deg)";
        button.style.transition = "transform 0.8s";
        isExpanded = true;
    }
}


// Toggle the visibility of the info massage
var isVisible = true;
function toggleInfo() {
    var unterueberschrift = getElementById("unterueberschrift");
    var hr_line = getElementById("hr-line");
    var paragraph = getElementById("paragraph");
    var quelle = getElementById("quelle");
    var information = getElementById("information");
    if (isVisible) {
        unterueberschrift.style.display = "none";
        hr_line.style.display = "none";
        paragraph.style.display = "none";
        quelle.style.display = "none";
        information.style.display = "none";
        isVisible = false;
    } else {
        unterueberschrift.style.display = "block";
        hr_line.style.display = "block";
        paragraph.style.display = "block";
        quelle.style.display = "block";
        information.style.display = "block";
        isVisible = true;
    }
}

// Add all the functions to a single fuction and use this as onclick function for button-rund
function combinedFunction() {
    toggleTableRows();
    expandDiv();
    toggleInfo()
  }
  
// Open the linked card graph for each state
var table = document.getElementById('Ranking-table');
var rows = table.getElementsByTagName('tr');
for (var i = 0; i < rows.length; i++) {
    rows[i].onclick = function() {
      var ranking = document.getElementById("ranking");
      var target = document.getElementById('card-graph');
      //var rang = this.cells[0].innerHTML;
      //var bundesland = this.cells[1].innerHTML;
      //var wert = this.cells[2].innerHTML;

      ranking.style.display = "none";
      ranking.style.transition = "opacity 0.2s ease-in-out";
      target.style.display = "block";
      target.style.transition = "opacity 0.2s ease-in-out";
    };
}

// Show different tables, after selecting different categories (revenue, incolvencies, employees)
function displayRevenue() {
var table = document.getElementById("Ranking-table");
table.innerHTML = "";
/*fetch("Ranking dataset/Ranking-Umsatzrückgang.csv")
    .then(response => response.text())
    .then(data => {
    var rows = data.split("\n");
    for (var i = 1; i < rows.length; i++) {
        var cells = rows[i].split(",");
        var row = table.insertRow();
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell1.innerHTML = cells[0];
        cell2.innerHTML = cells[1];
    }
    });*/
var data = [
    { ranking: 1, bundesländer: "Berlin", vorjahresvergleich: 43.0},
    { ranking: 2, bundesländer: "Hessen", vorjahresvergleich: 36.9},
    { ranking: 3, bundesländer: "Bayern", vorjahresvergleich: 36.0},
    { ranking: 4, bundesländer: "Nordrhein-Westfalen", vorjahresvergleich: 33.6},
    { ranking: 5, bundesländer: "Hamburg", vorjahresvergleich: 32.7},
    { ranking: 6, bundesländer: "Bremen", vorjahresvergleich: 32.3},
    { ranking: 7, bundesländer: "Baden-Württemberg", vorjahresvergleich: 30.1},
    { ranking: 8, bundesländer: "Saarland", vorjahresvergleich: 29.7},
    { ranking: 9, bundesländer: "Rheinland-Pfalz", vorjahresvergleich: 29.3},
    { ranking: 10, bundesländer: "Niedersachsen", vorjahresvergleich: 28.4},
    { ranking: 11, bundesländer: "Thüringen", vorjahresvergleich: 27.0},
    { ranking: 12, bundesländer: "Sachsen-Anhalt", vorjahresvergleich: 23.9},
    { ranking: 13, bundesländer: "Schleswig-Holstein", vorjahresvergleich: 23.6},
    { ranking: 14, bundesländer: "Sachsen", vorjahresvergleich: 22.9},
    { ranking: 15, bundesländer: "Brandenburgn", vorjahresvergleich: 18.1},
    { ranking: 16, bundesländer: "Mecklenburg-Vorpommern", vorjahresvergleich: 14.6},
];
for (var i = 0; i < data.length; i++) {
    var row = table.insertRow();
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    cell1.innerHTML = data[i].ranking;
    cell2.innerHTML = data[i].bundesländer;
    cell3.innerHTML = data[i].vorjahresvergleich
}
addTableRowsClass()
}
  
function displayIncolvencies() {
var table = document.getElementById("Ranking-table");
table.innerHTML = "";
/*fetch("Ranking dataset/Ranking-Insolvenzentwicklung.csv")
    .then(response => response.text())
    .then(data => {
    var rows = data.split("\n");
    for (var i = 1; i < rows.length; i++) {
        var cells = rows[i].split(",");
        var row = table.insertRow();
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell1.innerHTML = cells[0];
        cell2.innerHTML = cells[1];
    }
    });*/
var data = [
    { ranking: 1, bundesländer: "Sachsen", vorjahresvergleich: 45.7},
    { ranking: 2, bundesländer: "Mecklenburg-Vorpommern", vorjahresvergleich: 44.8},
    { ranking: 3, bundesländer: "Thüringen", vorjahresvergleich: 43.8},
    { ranking: 4, bundesländer: "Saarland", vorjahresvergleich: 41.7},
    { ranking: 5, bundesländer: "Bayern", vorjahresvergleich: 32.2},
    { ranking: 6, bundesländer: "Schleswig-Holstein", vorjahresvergleich: 27.7},
    { ranking: 7, bundesländer: "Nordrhein-Westfalen", vorjahresvergleich: 25.1},
    { ranking: 8, bundesländer: "Sachsen-Anhalt", vorjahresvergleich: 21.6},
    { ranking: 9, bundesländer: "Rheinland-Pfalz", vorjahresvergleich: 20.3},
    { ranking: 10, bundesländer: "Berlin", vorjahresvergleich: 17.6},
    { ranking: 11, bundesländer: "Hessenn", vorjahresvergleich: 16.7},
    { ranking: 12, bundesländer: "Baden-Württemberg", vorjahresvergleich: 13.7},
    { ranking: 13, bundesländer: "Bremen", vorjahresvergleich: 7.1},
    { ranking: 14, bundesländer: "Niedersachsen", vorjahresvergleich: 3.8},
    { ranking: 15, bundesländer: "Hamburg", vorjahresvergleich: -17.4},
    { ranking: 16, bundesländer: "Brandenburg", vorjahresvergleich: -33.3},
];
for (var i = 0; i < data.length; i++) {
    var row = table.insertRow();
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    cell1.innerHTML = data[i].ranking;
    cell2.innerHTML = data[i].bundesländer;
    cell3.innerHTML = data[i].vorjahresvergleich
}
addTableRowsClass()
}

function displayEmployees() {
    var table = document.getElementById("Ranking-table");
    table.innerHTML = "";
    var data = [
    { ranking: 1, bundesländer: "Berlin", vorjahresvergleich: -12.17},
    { ranking: 2, bundesländer: "Saarland", vorjahresvergleich: -10.50},
    { ranking: 3, bundesländer: "Bremen", vorjahresvergleich: -10.37},
    { ranking: 4, bundesländer: "Niedersachsen", vorjahresvergleich: -9.38},
    { ranking: 5, bundesländer: "Rheinland-Pfalz", vorjahresvergleich: -9.19},
    { ranking: 6, bundesländer: "Nordrhein-Westfalen", vorjahresvergleich: -9.10},
    { ranking: 7, bundesländer: "Hessen", vorjahresvergleich: -8.71},
    { ranking: 8, bundesländer: "Bayern", vorjahresvergleich: -7.89},
    { ranking: 9, bundesländer: "Baden-Württemberg", vorjahresvergleich: -7.51},
    { ranking: 10, bundesländer: "Brandenburg", vorjahresvergleich: -7.41},
    { ranking: 11, bundesländer: "Schleswig-Holstein", vorjahresvergleich: -7.30},
    { ranking: 12, bundesländer: "Hamburg", vorjahresvergleich: -7.12},
    { ranking: 13, bundesländer: "Sachsen-Anhalt", vorjahresvergleich: -6.98},
    { ranking: 14, bundesländer: "Thüringen", vorjahresvergleich: -6.65},
    { ranking: 15, bundesländer: "Mecklenburg-Vorpommern", vorjahresvergleich: -5.33},
    { ranking: 16, bundesländer: "Sachsen", vorjahresvergleich: -5.26},
];
for (var i = 0; i < data.length; i++) {
    var row = table.insertRow();
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    cell1.innerHTML = data[i].ranking;
    cell2.innerHTML = data[i].bundesländer;
    cell3.innerHTML = data[i].vorjahresvergleich
}
addTableRowsClass()
}

