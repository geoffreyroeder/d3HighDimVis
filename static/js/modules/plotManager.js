var plotManager = {

         updatePlots : function(newData) {
            // generate plots
            var divIDs = ["oneD", "twoD", "threeD"]
            var buttonIDs = ["leftmost", "middle", "rightmost"] // parallels divIDs
            var num_plots = divIDs.length

            for (var i = 0; i < num_plots; i++) {
                console.log("i")
                // Check whether the element is already created
                var selectedPlotDiv = d3.select("#" + divIDs[i]);
                // http://stackoverflow.com/questions/10003683/javascript-get-number-from-string
                var divWidth = selectedPlotDiv.style("width").match(/\d/g).join("");
                var divHeight = selectedPlotDiv.style("height").match(/\d/g).join("");
                var dataset = utils.generateRandomDataset();
                this.addPlot(selectedPlotDiv, divWidth, divHeight, newData, i + 1);
            }
        },

        updatePlot: function(newData, newLabels, divName, dim) {
            var selectedPlotDiv = d3.select("#" + divName);
            var divWidth = selectedPlotDiv.style("width").match(/\d/g).join("");
            var divHeight = selectedPlotDiv.style("height").match(/\d/g).join("");
            this.addPlot(selectedPlotDiv, divWidth, divHeight, newData, newLabels, dim);
        },

         createXYScales: function(dataset, padding, divWidth, divHeight) {
            var xScale = d3.scale.linear()
                .domain([d3.min(dataset, function (d) {
                    return d[0];
                }), d3.max(dataset, function (d) {
                    return d[0];
                })])
                .range([padding, divWidth - padding]);

            var yScale = d3.scale.linear()
                .domain([d3.min(dataset, function (d) {
                    return d[1];
                }), d3.max(dataset, function (d) {
                    return d[1];
                })])
                .range([divHeight - padding, padding]);

            return [xScale, yScale]
        },

        updateScales: function(xScale, yScale, dataset, dim) {
            xScale.domain([d3.min(dataset, function (d) {
                return d[0];
            }), d3.max(dataset, function (d) {
                return d[0];
            })]);
            if (dim > 1) {
                yScale.domain([d3.min(dataset, function (d) {
                    return d[1];
                }), d3.max(dataset, function (d) {

                    return d[1];
                })]);
            }
        },

        addPlot: function(selectedPlotDiv, divWidth, divHeight, dataset, labels, dim) {
            var padding = 30;
            console.log(divWidth);
            console.log(divHeight);
            console.log(dataset[0][0]);

            // http://www.shamasis.net/2009/09/fast-algorithm-to-find-unique-items-in-javascript-array/
            color_fun = d3.scale.category20c(d3.range(labels.unique().length))

            xyScales = this.createXYScales(dataset, padding, divWidth, divHeight);
            var xScale, yScale = null;
            xScale = xyScales[0];
            if (dim > 1) {
                yScale = xyScales[1]
            }

            //Define X axis
            var xAxis = d3.svg.axis()
                .scale(xScale)
                .orient("bottom")
                .ticks(5);

            if (dim > 1) {
                //Define Y axis
                var yAxis = d3.svg.axis()
                    .scale(yScale)
                    .orient("left")
                    .ticks(5);
            }

            //Create SVG element
            // Have we created this SVG before?
            svg = selectedPlotDiv.select('svg');
            svgExists = svg[0][0] == null;

            if (svgExists) {
                console.log("SVG did not exist, making new one");
                var svg = selectedPlotDiv
                    .append("svg")
                    .attr("width", divWidth)
                    .attr("height", divHeight);

                //Create circles
                svg.selectAll("circle")
                    .data(dataset)
                    .enter()
                    .append("circle")
                    .attr("cx", function (d) {
                        return xScale(d[0]);
                    })
                    .attr("cy", function (d) {
                        var ret
                        if (dim > 1) {
                            ret = yScale(d[1])
                        } else {
                            ret = divHeight / 2
                        }
                        return ret;
                    })
                    .attr("r", 2)
                    .attr("fill", function(d,i) {
                        return color_fun(i % 20);
                    });

                //Create X axis
                svg.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + (divHeight - padding) + ")")
                    .call(xAxis);

                //Create Y axis
                if (dim > 1) {
                    svg.append("g")
                        .attr("class", "y axis")
                        .attr("transform", "translate(" + padding + ",0)")
                        .call(yAxis);
                }
            } else {
                console.log("svg exists, updating with new data")
                // update svg with new data
                //Update scale domains
                this.updateScales(xScale, yScale, dataset, dim)

                //Update all circles

                svg.selectAll("circle")
                    .data(dataset)
                    .transition()
                    .duration(1000)
                    .each("start", function () {
                        d3.select(this)
                            //.attr("fill", "magenta")
                            .attr("r", 7);
                    })
                    .attr("cx", function (d) {
                        return xScale(d[0]);
                    })
                    .attr("cy", function (d) {
                        var ret
                        if (dim > 1) {
                            ret = yScale(d[1])
                        } else {
                            ret = divHeight / 2
                        }
                        return ret;
                    })
                    .each("end", function () {
                        d3.select(this)
                            .transition()
                            .duration(1000)
                            //.attr("fill", function(d, i) { return color_fun(i % 20); })
                            .attr("r", 2);

                    });

                //Update X axis
                svg.select(".x.axis")
                    .transition()
                    .duration(1250)
                    .call(xAxis);

                if (dim > 1) {
                    //Update Y axis
                    svg.select(".y.axis")
                        .transition()
                        .duration(1250)
                        .call(yAxis);
                }

            }


            // TODO: currently inactive
            //On click, update with new data
//            d3.select(controlButtonID)
//                .on("click", function () {
//
//
//                    //New values for _dataset
//                    var numValues = _dataset.length;						 		//Count original length of _dataset
//                    var maxRange = Math.random() * 1000;						//Max range of new values
//                    _dataset = [];  						 				 		//Initialize empty array
//                    for (var i = 0; i < numValues; i++) {				 		//Loop numValues times
//                        var newNumber1 = Math.floor(Math.random() * maxRange);	//New random integer
//                        var newNumber2 = Math.floor(Math.random() * maxRange);	//New random integer
//                        _dataset.push([newNumber1, newNumber2]);					//Add new number to array
//                    }
//
//                    //Update scale domains
//                    xScale.domain([0, d3.max(_dataset, function (d) {
//                        return d[0];
//                    })]);
//                    yScale.domain([0, d3.max(_dataset, function (d) {
//                        return d[1];
//                    })]);
//
//                    //Update all circles
//                    svg.selectAll("circle")
//                        .data(_dataset)
//                        .transition()
//                        .duration(1000)
//                        .each("start", function () {
//                            d3.select(this)
//                                .attr("fill", "magenta")
//                                .attr("r", 7);
//                        })
//                        .attr("cx", function (d) {
//                            return xScale(d[0]);
//                        })
//                        .attr("cy", function (d) {
//                            var ret
//                            if (dim > 1) {
//                                ret = yScale(d[1])
//                            } else {
//                                ret = divHeight / 2
//                            }
//                            return ret;
//                        })
//                        .each("end", function () {
//                            d3.select(this)
//                                .transition()
//                                .duration(1000)
//                                .attr("fill", "black")
//                                .attr("r", 2);
//                        });
//
//                    //Update X axis
//                    svg.select(".x.axis")
//                        .transition()
//                        .duration(1000)
//                        .call(xAxis);
//
//                    if(dim > 1) {
//                        //Update Y axis
//                        svg.select(".y.axis")
//                            .transition()
//                            .duration(1000)
//                            .call(yAxis);
//                    }
//
//                });

        }
}
