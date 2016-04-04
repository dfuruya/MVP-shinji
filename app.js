var width = window.innerWidth;
var height = window.innerHeight;
var middle = 0;

var svg = d3.select("body").append("svg")
            .attr("width", width)
            .attr("height", height);

svg.append("circle")
  .attr("r", 20)
  .attr("cx", 500)
  .attr("cy", 500);

