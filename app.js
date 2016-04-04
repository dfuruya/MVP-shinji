var width = window.innerWidth;
var height = window.innerHeight;
var center = {
  x: width / 2,
  y: height / 2
};

var svg = d3.select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

var initData = [0, 0, 0, 0, 0, 0, 0, 0, 
                0, 0, 0, 0, 0, 0, 0, 0, 
                0, 0, 0, 0, 0, 0, 0, 0];

var circles = svg.selectAll("circle")
  .data(initData)
  .enter()
  .append("circle")
  .attr("class", "dots")
  .attr("r", 20)
  .attr("cx", center.x)
  .attr("cy", center.y);


var moveDots = function() {
  
  var weatherData = initData.slice().forEach(function(pos) {
    return pos + 200 * Math.random();
  });
  console.log(weatherData);

  svg.selectAll(".dots")
    // .data(weatherData)
    // .enter()
    .transition()
    .duration(500)
    .attr("cx", function(d) {
      return d + 500 * Math.random();
    })
    .attr("cy", function(d) {
      return d + 500 * Math.random();
    });
};

setTimeout(function() {
  moveDots();
}, 500);
