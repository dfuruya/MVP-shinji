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

/** 
mapRadial: returns an array of x/y positions 
based on the array of data points passed in.

The purpose of this is to calculate the angular position 
of a data point so that it can be distributed in a circular
display (separated evenly in radians)
**/
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


var moveDots = function(dataArr) {
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

var data;
var groupIDs = "524901,703448,2643743";
console.log(apiKey);
var weatherURL = "http://api.openweathermap.org/data/2.5/group?id=" + groupIDs + "&units=imperial&appid=" + apiKey;

d3.json(weatherURL, function(err, json) {
  if (err) {
    return console.warn(err);
  } else {
    data = json.list;
    console.log(data);
    // moveDots(data);
  }
});

// moveDots();
