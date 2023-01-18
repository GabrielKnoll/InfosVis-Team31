
// Use this function to set the coloring of the heatmap. Only hand over the respective state and difference like shown in the follwing example:
// setColor('Bayern', '10%');
function setColorInsolvencies(stateName, difference){

    let castedDifference = +difference.replace('%', '');

    if(castedDifference <= -40){
        d3.select("#states").select("#"+stateName).style("fill", "#84B6D5"); //hier
    }else if(castedDifference <= -30){
        d3.select("#states").select("#"+stateName).style("fill", "#93BFDA");
    }else if(castedDifference <= -20){
        d3.select("#states").select("#"+stateName).style("fill", "#B2D1E4");//hier
    }else if(castedDifference <= -10){
        d3.select("#states").select("#"+stateName).style("fill", "#D1E3EF");
    }else if(castedDifference <= 0){
        d3.select("#states").select("#"+stateName).style("fill", "#EEEDED");
    }else if(castedDifference <= 10){
        d3.select("#states").select("#"+stateName).style("fill", "#CCCBCB");
    }else if(castedDifference <= 20){
        d3.select("#states").select("#"+stateName).style("fill", "#A8A8A7");
    }else if(castedDifference <= 30){
        d3.select("#states").select("#"+stateName).style("fill", "#858686");
    }else if(castedDifference <= 40){
        d3.select("#states").select("#"+stateName).style("fill", "#616363");
    }else if(castedDifference <= 50){
        d3.select("#states").select("#"+stateName).style("fill", "#3F403F");
    }
}

function setColorRevenue(stateName, difference){

    let castedDifference = +difference.replace('%', '');

    if(castedDifference <= -40){
        d3.select("#states").select("#"+stateName).style("fill", "#84B6D5");
    }else if(castedDifference <= -30){
        d3.select("#states").select("#"+stateName).style("fill", "#93BFDA");
    }else if(castedDifference <= -20){
        d3.select("#states").select("#"+stateName).style("fill", "#B2D1E4");
    }else if(castedDifference <= -10){
        d3.select("#states").select("#"+stateName).style("fill", "#D1E3EF");
    }else if(castedDifference <= -5){
        d3.select("#states").select("#"+stateName).style("fill", "#E1EDF4");
    }else if(castedDifference <= 0){
        d3.select("#states").select("#"+stateName).style("fill", "#EEEDED");
    }else if(castedDifference <= 10){
        d3.select("#states").select("#"+stateName).style("fill", "#E4CDD1");
    }else if(castedDifference <= 20){
        d3.select("#states").select("#"+stateName).style("fill", "#D2ACB2");
    }else if(castedDifference <= 30){
        d3.select("#states").select("#"+stateName).style("fill", "#BF8993");
    }else if(castedDifference <= 40){
        d3.select("#states").select("#"+stateName).style("fill", "#AD6775");
    }else if(castedDifference <= 50){
        d3.select("#states").select("#"+stateName).style("fill", "#9B4557");
    }

}

function buildLegendRevenue(){

    d3.select(".legende").selectAll("*").remove();
    const legendIDs= ["first-r","second-r","third-r", "fourth-r", "fifth-r"];
    const legendText = ["< 10%","10-20%","20-30%", "30-40%", "40-50%"];

    for (let i=0; i<legendIDs.length; i++ ){
        var legend = d3.select(".legende")
            .append("div")
            .attr("class", "legend-position");

        legend.append("div")
            .attr("class", "legend-color")
            .attr("id", legendIDs[i]);

        legend.append("span").text(legendText[i]);
    }
}
function buildLegendEmplyees(){

    d3.select(".legende").selectAll("*").remove();
    const legendIDs= ["first-e","second-e","third-e", "fourth-e", "fifth-e"];
    const legendText = ["< 5%","5-7%","7-9%", "9-11%", "11-13%"];

    for (let i=0; i<legendIDs.length; i++ ){
        var legend = d3.select(".legende")
            .append("div")
            .attr("class", "legend-position");

        legend.append("div")
            .attr("class", "legend-color")
            .attr("id", legendIDs[i]);

        legend.append("span").text(legendText[i]);
    }
}

function buildLegendInsolvencies(){

    d3.select(".legende").selectAll("*").remove();
    const legendIDs= ["positive-i","first-i","second-i","third-i", "fourth-i", "fifth-i"];
    const legendText = ["weniger","< 5%","5-7%","7-9%", "9-11%", "11-13%"];

    for (let i=0; i<legendIDs.length; i++ ){
        var legend = d3.select(".legende")
            .append("div")
            .attr("class", "legend-position");

        legend.append("div")
            .attr("class", "legend-color")
            .attr("id", legendIDs[i]);

        legend.append("span").text(legendText[i]);
    }
}

function setColorEmployees(stateName, difference){
    let castedDifference = +difference.replace('%', '');
   if(castedDifference <= 5){
        d3.select("#states").select("#"+stateName).style("fill", "#E3E5F1");
    }else if(castedDifference <= 7){
        d3.select("#states").select("#"+stateName).style("fill", "#C9CBE3");
    }else if(castedDifference <= 9){
        d3.select("#states").select("#"+stateName).style("fill", "#ADB1D5");
    }else if(castedDifference <= 11){
        d3.select("#states").select("#"+stateName).style("fill", "#9297C7");
    }else if(castedDifference <= 13){
        d3.select("#states").select("#"+stateName).style("fill", "#757CB9");
    }
}
