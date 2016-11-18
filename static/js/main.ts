/**
 * Created by geoffreyroeder on 2016-11-09.
 */
//<!-- Reads in csv interpreting first line as attribute names-->
    ///<reference path="../../../DefinitelyTyped/d3/d3" />


var dataset : number[];
//<!-- also try d3.tsv, d3.json if tab-separated values -->
d3.csv("food.csv", function(error, data) { //<!-- error is what web server sends -->
    if (error) {
        console.log(error);
    } else {
        console.log(data);
        //<!-- this is the callback function, only reference data here -->
        dataset = data;
    }
});
// d3.select("body").append("p").text("New paragraph!");
// d3.select("p").append("p").text("again");
var dataset_simple = [ 5, 10, 15, 20, 25 ];
// d3.select("body").selectAll("p") // Simple text display colored by value
//     .data(dataset_simple) // counts and parses data values
//     .enter() // remainder expands to data length
//     .append("p")
//     // .text("I can count up to " + d); this doesn't work, must call function. arg
//     // d is passed the datum, otherwise unevaluated
//     .text( function(d) { return d + " works?"; } )
//     .style("color","red")
//     .style("color", function(d) {
//             if (d > 15) {   //Threshold of 15
//                 return "red";
//             } else {
//                 return "black";
//             }
//         });
d3.select("body").selectAll("div")
    .data(dataset_simple)
    .enter()
    .append("div")
    .attr("class", "bar")
    .style("height", function(d) {
        var barHeight = d * 5;
        return barHeight + "px";
    });

// ############# BARCHART EXAMPLE ###########################
var random_data = [];
for (var i = 0; i < 25; i++) {           //Loop 25 times
    var newNumber = Math.random() * 30;  //New random number (0-30)
    random_data.push(newNumber);             //Add new number to array
}

d3.select("body").selectAll("div")
    .data(random_data)
    .enter()
    .append("div")
    .attr("class", "bar")
    .style("height", function(d) {
        var barHeight = d * 5;
        return barHeight + "px";
    })
    .style("background-color", "red");

var svg = d3.select("body").append("svg");
var w = 700;
var h = 100;
svg.attr("width", w)
    .attr("height", h);
var circles = svg.selectAll("circle")
    .data (dataset_simple)
    .enter() // returns placeholder reference to the new element
    .append("circle");

circles.attr("cx", function(d, i) { // i is index of current element from d3
    return (i * 50) + 25;
})
    .attr("cy", h/2)
    .attr("r", function(d) {
        return d;
    });
var dataset_2d = [
    [5, 20], [480, 90], [250, 50], [100, 33], [330, 95],
    [410, 12], [475, 44], [25, 67], [85, 21], [220, 88]
];
//Create SVG element
var svg = d3.select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

svg.selectAll("circle")  // <-- No longer "rect"
    .data(dataset_2d)
    .enter()
    .append("circle")     // <-- No longer "rect"
    .attr("cx", function(d) {
        return d[0];
    })
    .attr("cy", function(d) {
        return d[1];
    })
    .attr("r", function(d) {
        return Math.sqrt(h - d[1]);
    })


svg.selectAll("text")  // <-- Note "text", not "circle" or "rect"
    .data(dataset_2d)
    .enter()
    .append("text")     // <-- Same here!
    .text(function(d) {
        return d[0] + "," + d[1];
    })
    .attr("x", function(d) {
        return d[0];
    })
    .attr("y", function(d) {
        return d[1];
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", "11px")
    .attr("fill", "red");

var dataset_apples = [ 100, 200, 300, 400, 500 ];
d3.max(dataset, function(d) { // the second argument here is an accessor function
    // this indicates how to access each element in an array of arrays
    return d[0];  //References first value in each subarray
});
