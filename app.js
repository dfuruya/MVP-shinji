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

var initData = [1, 1, 1, 1, 1, 1, 1, 1, 
                1, 1, 1, 1, 1, 1, 1, 1, 
                1, 1, 1, 1, 1, 1, 1, 1];

var inner = height / 7;
// change this
var outer = inner + 150;

var color = d3.scale.category20b();

// create an arc object
var arc = d3.svg.arc()
  .innerRadius(inner)
  .outerRadius(outer)
  .padRadius(200)
  .cornerRadius(2);

var pie = d3.layout.pie()
  .sort(null)
  .padAngle(0.03);

// pie.sort([comparator])

var tempPie = function(data) {
  // 'temperatures': an array of world temps
  var temperatures = _.map(data, function(obj) {
    return obj.main.temp;
  });

  console.log(temperatures);

  svg.selectAll("path")
    .data(pie(temperatures))
    .enter()
    .append("path")
    // .each(function(d) {
    //   d.outerRadius = temperatures[d];
    // })
    .style("fill", function(d) {
      return color(d.data);
    })
    .attr("d", arc)
    .attr("transform", "translate(" + center.x + ", " + center.y + ")");
};

var groupFunc = function(array) {
  return _.map(array, function(city) {
    return city[0];
  });
};

var groupIds = groupFunc(groupCities).join().toString();

var weatherURL = "http://api.openweathermap.org/data/2.5/group?id=" + groupIds + "&units=imperial&appid=" + apiKey;

d3.json(weatherURL, function(err, json) {
  if (err) {
    return console.warn(err);
  } else {
    var data = json.list;
    tempPie(data);
  }
});

