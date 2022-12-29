
// Use this function to set the coloring of the heatmap. Only hand over the respective state and difference like shown in the follwing example:
// setColor('Bayern', '10%');
function setColor(stateName, difference){

    let castedDifference = +difference.replace('%', '');

    if(castedDifference <= -35){
        d3.select("#states").select("#"+stateName).style("fill", "#6E91BD");
    }else if(castedDifference <= -30){
        d3.select("#states").select("#"+stateName).style("fill", "#819EC4");
    }else if(castedDifference <= -25){
        d3.select("#states").select("#"+stateName).style("fill", "#93ADCC");
    }else if(castedDifference <= -20){
        d3.select("#states").select("#"+stateName).style("fill", "#A5BBD6");
    }else if(castedDifference <= -15){
        d3.select("#states").select("#"+stateName).style("fill", "#B7C7DD");
    }else if(castedDifference <= -10){
        d3.select("#states").select("#"+stateName).style("fill", "#C9D7E7");
    }else if(castedDifference <= -5){
        d3.select("#states").select("#"+stateName).style("fill", "#DCE3EE");
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