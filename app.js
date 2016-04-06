// data set for a list of cities, ordered by time zone (left to right)
var groupCities = [
  [4032283, "Kingdom of Tonga"], 
  [5856195, "Honolulu"], 
  [5554072, "Juneau"], 
  [4282497, "Anchorage"], 
  [5391959, "San Francisco"], 
  [5419384, "Denver"], 
  [3582383, "Chicago"], 
  [5128638, "New York"], 
  [3797895, "Buenos Aires"], 
  [3421319, "Nuuk"], 
  [3374333, "Praia"], 
  [3413829, "Reykjavik"], 
  [2643743, "London"], 
  [2968815, "Paris"], 
  [524901, "Moscow"], 
  [292968, "Abu Dhabi"], 
  [1176615, "Islamabad"], 
  [1269517, "Jaipur"], 
  [1609350, "Bangkok"], 
  [1668341, "Taipei"], 
  [1850147, "Tokyo"], 
  [2172517, "Canberra"], 
  [2103350, "Solomon Islands"], 
  [2193734, "Auckland"]
];

// setting variables for svg boundaries
var width = window.innerWidth;
var height = window.innerHeight;
var center = {
  x: width / 2,
  y: height / 2
};

var inner = height / 6;
// change this
var outer = height / 3;
// sets the color categories for the pie sections
var color = d3.scale.category20b();

// pie.sort([comparator])

// returns city IDs from 'groupCities' dataset
var groupFunc = function(array) {
  return _.map(array, function(city) {
    return city[0];
  });
};
// joins the city IDs to a string for API call
var groupIds = groupFunc(groupCities).join().toString();
// setting URL string for a request to OpenWeatherMap's API
var weatherURL = "http://api.openweathermap.org/data/2.5/group?id=" + groupIds + "&units=imperial&appid=" + apiKey;

// D3's API call
d3.json(weatherURL, function(err, json) {
  if (err) {
    return console.warn(err);
  } else {
    var data = json.list;
    tempPie([data]);
  }
});

// after API response received, render the pie graph
var tempPie = function(data) {
  // setting the vector graph area
  var svg = d3.select("body")
    .append("svg")
    .data(data)
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + center.x + ", " + center.y + ")");

  // a D3 arc generator
  var arc = d3.svg.arc()
    .innerRadius(inner)
    .outerRadius(outer)
    .padRadius(200)
    .cornerRadius(5);

  // converts our dataset to an array of pie objects 
  // using the temperature data from our response data
  var pie = d3.layout.pie()
    .value(function(d) {
      return d.main.temp;
    })
    .sort(null)
    .padAngle(0.03);

  // create graphic elements for each section of the pie
  var arcs = svg.selectAll("g.section")
    // associate the data from our pie object to each section
    .data(pie)
    .enter()
    .append("g")
    .attr("class", "section");

  // add text to svg to show temperature on mouseover of section
  svg.append("text")
    .attr("text-anchor", "middle")
    .attr("class", "temp")
    .attr("transform", "translate(" + 0 + ", " + 25 + ")")
    .style("font-size", "4em")
    .text("");

  // render the sections to the path with a color fill in each section
  arcs.append("path")
    .style("fill", function(d) {
      return color(d.value);
    })
    // actual rendering occurs here:
    .attr("d", arc)
    // on mouseover, show temperature of corresponding section
    .on("mouseover", function(d) {
      d3.select(".temp")
        .text(d.data.main.temp + " F")
        .transition()
        .duration(1000)
        .style("opacity", 20);
      // make selected section brigher when mouseover
      d3.select(this)
        .transition()
        .duration(500)
        .style("fill", function(d){
          return d3.rgb(d3.select(this).style("fill")).brighter();
        });
      // rotate moused over selection to be at 0 degrees
      arcs.transition()
        .duration(500)
        .attr("transform", "rotate(" + (-1*((((d.startAngle + d.endAngle) * 90) / Math.PI) - 90)) + ")");
    })
    // on mouse exit, return back to neutral state
    .on("mouseout", function(d) {
      d3.select(".temp")
        .text("")
        .style("opacity", 0);
      // make selected section darker when mouse leaves
      d3.select(this)
        .transition()
        .duration(500)
        .style("fill", function(d){
          return d3.rgb(d3.select(this).style("fill")).darker();
        });
    });

  // add city name to each section of the pie chart
  arcs.append("text")
    .attr("transform", function(d) {
      // getting the x/y coordinates of the center of the pie section
      var pos = arc.centroid(d);
      // translating the text to outside of the sections
      return "translate(" + pos[0]*1.4 + ", " + pos[1]*1.4 + ")rotate("
        // rotating the text so they are radially oriented to the section angles
        + ((((d.startAngle + d.endAngle) * 90) / Math.PI) - 90) + ")";
    })
    .text(function(d) {
      return d.data.name;
    });

};


