var plotManager = {

        setHighchartTheme : function() {
            /**
             * (c) 2010-2016 Torstein Honsi
             *
             * License: www.highcharts.com/license
             *
             * Dark theme for Highcharts JS
             * @author Torstein Honsi
             */
            Highcharts.theme = {
                credits: {
                    enabled: false
                },
                colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066', '#eeaaee',
                    '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
                chart: {
                    backgroundColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
                        stops: [
                            [0, '#2a2a2b'],
                            [1, '#3e3e40']
                        ]
                    },
                    style: {
                        fontFamily: '\'Unica One\', sans-serif'
                    },
                    plotBorderColor: '#606063'
                },
                title: {
                    style: {
                        color: '#E0E0E3',
                        textTransform: 'uppercase',
                        fontSize: '20px'
                    }
                },
                subtitle: {
                    style: {
                        color: '#E0E0E3',
                        textTransform: 'uppercase'
                    }
                },
                xAxis: {
                    gridLineColor: '#707073',
                    labels: {
                        style: {
                            color: '#E0E0E3'
                        }
                    },
                    lineColor: '#707073',
                    minorGridLineColor: '#505053',
                    tickColor: '#707073',
                    title: {
                        style: {
                            color: '#A0A0A3'

                        }
                    }
                },
                yAxis: {
                    gridLineColor: '#707073',
                    labels: {
                        style: {
                            color: '#E0E0E3'
                        }
                    },
                    lineColor: '#707073',
                    minorGridLineColor: '#505053',
                    tickColor: '#707073',
                    tickWidth: 1,
                    title: {
                        style: {
                            color: '#A0A0A3'
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.85)',
                    style: {
                        color: '#F0F0F0'
                    }
                },
                plotOptions: {
                    series: {
                        dataLabels: {
                            color: '#B0B0B3'
                        },
                        marker: {
                            lineColor: '#333'
                        }
                    },
                    boxplot: {
                        fillColor: '#505053'
                    },
                    candlestick: {
                        lineColor: 'white'
                    },
                    errorbar: {
                        color: 'white'
                    }
                },

                legend: {
                    itemStyle: {
                        color: '#E0E0E3'
                    },
                    itemHoverStyle: {
                        color: '#FFF'
                    },
                    itemHiddenStyle: {
                        color: '#606063'
                    }
                },

                labels: {
                    style: {
                        color: '#707073'
                    }
                },

                drilldown: {
                    activeAxisLabelStyle: {
                        color: '#F0F0F3'
                    },
                    activeDataLabelStyle: {
                        color: '#F0F0F3'
                    }
                },

                navigation: {
                    buttonOptions: {
                        symbolStroke: '#DDDDDD',
                        theme: {
                            fill: '#505053'
                        }
                    }
                },

                // scroll charts
                rangeSelector: {
                    buttonTheme: {
                        fill: '#505053',
                        stroke: '#000000',
                        style: {
                            color: '#CCC'
                        },
                        states: {
                            hover: {
                                fill: '#707073',
                                stroke: '#000000',
                                style: {
                                    color: 'white'
                                }
                            },
                            select: {
                                fill: '#000003',
                                stroke: '#000000',
                                style: {
                                    color: 'white'
                                }
                            }
                        }
                    },
                    inputBoxBorderColor: '#505053',
                    inputStyle: {
                        backgroundColor: '#333',
                        color: 'silver'
                    },
                    labelStyle: {
                        color: 'silver'
                    }
                },

                navigator: {
                    handles: {
                        backgroundColor: '#666',
                        borderColor: '#AAA'
                    },
                    outlineColor: '#CCC',
                    maskFill: 'rgba(255,255,255,0.1)',
                    series: {
                        color: '#7798BF',
                        lineColor: '#A6C7ED'
                    },
                    xAxis: {
                        gridLineColor: '#505053'
                    }
                },

                scrollbar: {
                    barBackgroundColor: '#808083',
                    barBorderColor: '#808083',
                    buttonArrowColor: '#CCC',
                    buttonBackgroundColor: '#606063',
                    buttonBorderColor: '#606063',
                    rifleColor: '#FFF',
                    trackBackgroundColor: '#404043',
                    trackBorderColor: '#404043'
                },

                // special colors for some of the
                legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
                background2: '#505053',
                dataLabelsColor: '#B0B0B3',
                textColor: '#C0C0C0',
                contrastTextColor: '#F0F0F3',
                maskColor: 'rgba(255,255,255,0.3)'
            };

        // Apply the theme
            Highcharts.setOptions(Highcharts.theme);

            // Give the points a 3D feel by adding a radial gradient
            Highcharts.getOptions().colors = $.map(Highcharts.getOptions().colors, function (color) {
                return {
                    radialGradient: {
                        cx: 0.4,
                        cy: 0.3,
                        r: 0.5
                    },
                    stops: [
                        [0, color],
                        [1, Highcharts.Color(color).brighten(-0.2).get('rgb')]
                    ]
                };
            });
        },


        // Set up the chart
        // creates a new object

        // do3DPlot expects newData to be a 2D array
        config3DPlot: function(newData, newLabels, divName) {
                   return {
                    chart: {
                        renderTo: divName,
                        // margin: 20,
                        type: 'scatter',
                        options3d: {
                            enabled: true,
                            // alpha: 10,
                            // beta: 30,
                            // depth: 1000,
                            // viewDistance: 5,
                            // fitToPlot: true,
                            // frame: {
                            //     bottom: { size: 1, color: 'rgba(0,0,0,0.02)' },
                            //     back: { size: 0, color: 'rgba(0,0,0,0.04)' },
                            //     side: { size: 0, color: 'rgba(0,0,0,0.06)' }
                            // }
                        }
                    },
                    title: {
                        text: false
                    },
                    subtitle: {
                        text: false
                    },
                    // plotOptions: {
                    //     scatter: {
                    //         width: 200,
                    //         height: 200,
                    //         depth: 200
                    //     }
                    // },
                    // yAxis: {
                    //     min: -1000,
                    //     max: 1000,
                    //     title: null
                    // },
                    // xAxis: {
                    //     min: -1000,
                    //     max: 1000,
                    //     title: null
                    // },
                    // zAxis: {
                    //     min: -1000,
                    //     max: 1000,
                    //     title: null
                    // },
                    legend: {
                        enabled: false
                    },
                    series: [{
                        name: false,
                        colorByPoint: true,
                        data: newData
                    }]
                }},

                configMouseControl: function(chartObject) {
                // Add mouse events for rotation
                $(chartObject.container).on('mousedown.hc touchstart.hc', function (eStart) {
                    eStart = chartObject.pointer.normalize(eStart);

                    var posX = eStart.pageX,
                        posY = eStart.pageY,
                        alpha = chartObject.options.chart.options3d.alpha,
                        beta = chartObject.options.chart.options3d.beta,
                        newAlpha,
                        newBeta,
                        sensitivity = 5; // lower is more sensitive

                    $(document).on({
                        'mousemove.hc touchdrag.hc': function (e) {
                            // Run beta
                            newBeta = beta + (posX - e.pageX) / sensitivity;
                            chartObject.options.chart.options3d.beta = newBeta;

                            // Run alpha
                            newAlpha = alpha + (e.pageY - posY) / sensitivity;
                            chartObject.options.chart.options3d.alpha = newAlpha;

                            chartObject.redraw(false);
                        },
                        'mouseup touchend': function () {
                            $(document).off('.hc');
                        }
                    });
                });
        },

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

        updatePlot: function(newData, newLabels, divName, dim, clusterAssignments = null) {
            var selectedPlotDiv = d3.select("#" + divName);
            var divWidth = selectedPlotDiv.style("width").match(/\d/g).join("");
            var divHeight = selectedPlotDiv.style("height").match(/\d/g).join("");
            this.addPlot(selectedPlotDiv, divWidth, divHeight, newData, newLabels, dim, clusterAssignments);
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

        addPlot: function(selectedPlotDiv, divWidth, divHeight, dataset, labels, dim, clusterAssignments = null) {
            var padding = 30;
            console.log(divWidth);
            console.log(divHeight);
            console.log(dataset[0][0]);

            // https://stackoverflow.com/questions/17671252/d3-create-a-continous-color-scale-with-many-strings-inputs-for-the-range-and-dy/17672702#17672702
            minlab = d3.min(labels, function(d) { return d[0]; })
            maxlab = d3.max(labels, function(d) { return d[0]; })

            if (clusterAssignments == null) {

                // https://www.strangeplanet.fr/work/gradient-generator/index.php
                // 100 step gradient blue to red
                var colours = ["#FF0000", "#FD0001", "#FC0002", "#FB0003", "#FA0004", "#F90005", "#F80006", "#F70007",
                    "#F60008", "#F50009", "#F4000A", "#F3000B", "#F2000C", "#F1000D", "#F0000E", "#EF000F", "#EE0010",
                    "#ED0011", "#EC0012", "#EB0013", "#EA0014", "#E90015", "#E80016", "#E70017", "#E60018", "#E50019",
                    "#E4001A", "#E3001B", "#E2001C", "#E1001D", "#E0001E", "#DF001F", "#DE0020", "#DD0021", "#DC0022",
                    "#DB0023", "#DA0024", "#D90025", "#D80026", "#D70027", "#D60028", "#D50029", "#D4002A", "#D3002B",
                    "#D2002C", "#D1002D", "#D0002E", "#CF002F", "#CE0030", "#CD0031", "#CC0032", "#CB0033", "#CA0034",
                    "#C90035", "#C80036", "#C70037", "#C60038", "#C50039", "#C4003A", "#C3003B", "#C2003C", "#C1003D",
                    "#C0003E", "#BF003F", "#BE0040", "#BD0041", "#BC0042", "#BB0043", "#BA0044", "#B90045", "#B80046",
                    "#B70047", "#B60048", "#B50049", "#B4004A", "#B3004B", "#B2004C", "#B1004D", "#B0004E", "#AF004F",
                    "#AE0050", "#AD0051", "#AC0052", "#AB0053", "#AA0054", "#A90055", "#A80056", "#A70057", "#A60058",
                    "#A50059", "#A4005A", "#A3005B", "#A2005C", "#A1005D", "#A0005E", "#9F005F", "#9E0060", "#9D0061",
                    "#9C0062", "#9B0063", "#9A0064", "#990065", "#980066", "#970067", "#960068", "#950069", "#94006A",
                    "#93006B", "#92006C", "#91006D", "#90006E", "#8F006F", "#8E0070", "#8D0071", "#8C0072", "#8B0073",
                    "#8A0074", "#890075", "#880076", "#870077", "#860078", "#850079", "#84007A", "#83007B", "#82007C",
                    "#81007D", "#80007E", "#7F007F", "#7E0080", "#7D0081", "#7C0082", "#7B0083", "#7A0084", "#790085",
                    "#780086", "#770087", "#760088", "#750089", "#74008A", "#73008B", "#72008C", "#71008D", "#70008E",
                    "#6F008F", "#6E0090", "#6D0091", "#6C0092", "#6B0093", "#6A0094", "#690095", "#680096", "#670097",
                    "#660098", "#650099", "#64009A", "#63009B", "#62009C", "#61009D", "#60009E", "#5F009F", "#5E00A0",
                    "#5D00A1", "#5C00A2", "#5B00A3", "#5A00A4", "#5900A5", "#5800A6", "#5700A7", "#5600A8", "#5500A9",
                    "#5400AA", "#5300AB", "#5200AC", "#5100AD", "#5000AE", "#4F00AF", "#4E00B0", "#4D00B1", "#4C00B2",
                    "#4B00B3", "#4A00B4", "#4900B5", "#4800B6", "#4700B7", "#4600B8", "#4500B9", "#4400BA", "#4300BB",
                    "#4200BC", "#4100BD", "#4000BE", "#3F00BF", "#3E00C0", "#3D00C1", "#3C00C2", "#3B00C3", "#3A00C4",
                    "#3900C5", "#3800C6", "#3700C7", "#3600C8", "#3500C9", "#3400CA", "#3300CB", "#3200CC", "#3100CD",
                    "#3000CE", "#2F00CF", "#2E00D0", "#2D00D1", "#2C00D2", "#2B00D3", "#2A00D4", "#2900D5", "#2800D6",
                    "#2700D7", "#2600D8", "#2500D9", "#2400DA", "#2300DB", "#2200DC", "#2100DD", "#2000DE", "#1F00DF",
                    "#1E00E0", "#1D00E1", "#1C00E2", "#1B00E3", "#1A00E4", "#1900E5", "#1800E6", "#1700E7", "#1600E8",
                    "#1500E9", "#1400EA", "#1300EB", "#1200EC", "#1100ED", "#1000EE", "#0F00EF", "#0E00F0", "#0D00F1",
                    "#0C00F2", "#0B00F3", "#0A00F4", "#0900F5", "#0800F6", "#0700F7", "#0600F8", "#0500F9", "#0400FA",
                    "#0300FB", "#0200FC", "#0100FD", "#0000FF"];

                // heatmap
                var colourMap = d3.scale.linear()
                    .domain(d3.range(0, 1, 1.0 / (colours.length - 1)))
                    .range(colours);

                var rescale = d3.scale.linear().domain([minlab, maxlab]).range([0, 1])
            } else {
                labels = clusterAssignments;
                console.log('after clustering labels are' + labels)
                var colourMap = d3.scale.category10();
                var rescale = function(x) { return x; };
            }

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
                        //console.log(i)
                        // enforce at most 100 colours by rounding
                        return colourMap(Math.round(100*rescale(labels[i]))/100);
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
                    .attr("fill", function(d, i) {
                        console.log('update index is:' + i);
                        return colourMap(Math.round(100*rescale(labels[i]))/100);
                    })
                    .each("start", function () {
                        d3.select(this)

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
                            // .attr("fill", function(d,i) {
                            //     console.log(d);
                            //     return colourMap(Math.round(100*rescale(i))/100);
                            // })
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
