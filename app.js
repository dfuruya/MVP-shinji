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

var mapRadial = function(array) {
  var divisions = 360 / array.length;
  var arr = [];
  for (var i = 0; i < array.length; i++) {
    var angle = divisions * i * Math.PI / 180;
    var x = Math.cos(angle);
    var y = Math.sin(angle);
    arr.push([x, y]);
  }
  return arr;
};

var moveDots = function() {

  var radialMap = mapRadial(initData);
  
  var weatherData = _.map(radialMap, function(radialPos) {
    var x = radialPos[0] * (200 * Math.random());
    var y = radialPos[1] * (200 * Math.random());
    var loc = [x, y];
    console.log(loc);
    return loc;
  });


  circles
    .data(weatherData)
    .transition()
    .delay(250)
    .duration(1000)
    .attr("cx", function(d) {
      return center.x + d[0];
    })
    .attr("cy", function(d) {
      return center.y + d[1];
    });
};

moveDots();