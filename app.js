var width = window.innerWidth;
var height = window.innerHeight;

var svg = d3.select("body").append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g");