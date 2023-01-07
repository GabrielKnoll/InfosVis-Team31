function toggleTableRows() {
    // Get the table and the rows
    var table = document.getElementById('my-table');
    var rows = table.getElementsByTagName('tr');

    // Loop through the rows and toggle the visibility of the rows
    for (var i = 0; i < rows.length; i++) {
        if (i > 5 ) { // Show the first 3 rows
        rows[i].classList.toggle('hidden-row');
        }
    }
}

// Add an event listener to the toggle button to trigger the function when clicked
document.getElementById('mehr anzeigen').addEventListener('click', toggleTableRows);


function changeButtonName() {
    var change = document.getElementById("mehr anzeigen");
    if (change.innerHTML == "mehr anzeigen") {
        change.innerHTML = "weniger anzeigen";
    } else {
        change.innerHTML = "mehr anzeigen";
    }
}