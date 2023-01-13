
// Use this function to set the coloring of the heatmap. Only hand over the respective state and difference like shown in the follwing example:
// setColor('Bayern', '10%');
function setColor(stateName, difference){

    let castedDifference = +difference.replace('%', '');

    if(castedDifference <= -35){
        d3.select("#states").select("#"+stateName).style("fill", "#84B6D5");
    }else if(castedDifference <= -30){
        d3.select("#states").select("#"+stateName).style("fill", "#93BFDA");
    }else if(castedDifference <= -25){
        d3.select("#states").select("#"+stateName).style("fill", "#A4C9E0");
    }else if(castedDifference <= -20){
        d3.select("#states").select("#"+stateName).style("fill", "#B2D1E4");
    }else if(castedDifference <= -15){
        d3.select("#states").select("#"+stateName).style("fill", "#C2DAEA");
    }else if(castedDifference <= -10){
        d3.select("#states").select("#"+stateName).style("fill", "#D1E3EF");
    }else if(castedDifference <= -5){
        d3.select("#states").select("#"+stateName).style("fill", "#E1EDF4");
    }else if(castedDifference <= 0){
        d3.select("#states").select("#"+stateName).style("fill", "#EEEDED");
    }else if(castedDifference <= 5){
        d3.select("#states").select("#"+stateName).style("fill", "#EDDDE0");
    }else if(castedDifference <= 10){
        d3.select("#states").select("#"+stateName).style("fill", "#E4CDD1");
    }else if(castedDifference <= 15){
        d3.select("#states").select("#"+stateName).style("fill", "#DCBDC2");
    }else if(castedDifference <= 20){
        d3.select("#states").select("#"+stateName).style("fill", "#D2ACB2");
    }else if(castedDifference <= 25){
        d3.select("#states").select("#"+stateName).style("fill", "#C99BA3");
    }else if(castedDifference <= 30){
        d3.select("#states").select("#"+stateName).style("fill", "#BF8993");
    }else if(castedDifference <= 35){
        d3.select("#states").select("#"+stateName).style("fill", "#B77884");
    }else if(castedDifference <= 40){
        d3.select("#states").select("#"+stateName).style("fill", "#AD6775");
    }else if(castedDifference <= 45){
        d3.select("#states").select("#"+stateName).style("fill", "#A45665");
    }else if(castedDifference <= 50){
        d3.select("#states").select("#"+stateName).style("fill", "#9B4557");
    }
}

function setColorEmployees(stateName, difference){
    let castedDifference = +difference.replace('%', '');
   if(castedDifference <= 5){
        d3.select("#states").select("#"+stateName).style("fill", "#E8D5D9");
    }else if(castedDifference <= 6){
        d3.select("#states").select("#"+stateName).style("fill", "#E4CBD0");
    }else if(castedDifference <= 7){
        d3.select("#states").select("#"+stateName).style("fill", "#DDC2C7");
    }else if(castedDifference <= 8){
        d3.select("#states").select("#"+stateName).style("fill", "#D8B8BF");
    }else if(castedDifference <= 9){
        d3.select("#states").select("#"+stateName).style("fill", "#D5B0B6");
    }else if(castedDifference <= 10){
        d3.select("#states").select("#"+stateName).style("fill", "#CFA6AE");
    }else if(castedDifference <= 11){
        d3.select("#states").select("#"+stateName).style("fill", "#C99CA5");
    }else if(castedDifference <= 12){
        d3.select("#states").select("#"+stateName).style("fill", "#C4929C");
    }else if(castedDifference <= 13){
        d3.select("#states").select("#"+stateName).style("fill", "#BF8993");
    }
}
