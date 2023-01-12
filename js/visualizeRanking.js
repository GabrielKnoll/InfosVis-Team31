// Toggle the visibility of the table rows
function toggleTableRows() {
    var table = document.getElementById('Ranking-table');
    var rows = table.getElementsByTagName('tr');

    for (var i = 0; i < rows.length; i++) {
        if (i > 5 ) { // Show the first 5 rows
        rows[i].classList.toggle('hidden-row');
        }
    }
}

// Toggle the table expansion and the hint
var isExpanded = false;
function expandDiv() {
    var hint = document.getElementById("hint");
    var div = document.getElementById("ranking_div");
    var button = document.getElementById("extend");
    if (isExpanded) {
        hint.innerHTML = "Mehr anzeigen";
        div.style.height = "233px";
        div.style.transition = "height 0.2s ease";
        button.style.transform = "rotate(360deg)";
        button.style.transition = "transform 0.8s";
        isExpanded = false;
    } else {
        hint.innerHTML = "Weniger anzeigen";
        div.style.height = "380px";
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

/* function toggleText() {
    var text = document.getElementById("paragraph");
    if (text.style.display == "block") {
      text.style.display = "none";
    } else {
      text.style.display = "block";
    }
}*/

// Add all the functions to a single fuction and use this as onclick function
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