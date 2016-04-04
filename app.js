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
  
  var weatherData = _.map(initData, function(pos) {
    var loc = (pos + 200) * Math.random();
    return loc;
  });

  circles
    .data(weatherData)
    .transition()
    .delay(250)
    .duration(1000)
    .attr("cx", function(d) {
      return d;
    })
    .attr("cy", function(d) {
      return d;
    });
};

moveDots();