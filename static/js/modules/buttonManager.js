var kMeansButtonBuilder = {
    button: null,
    divName: null,
    tsneChartObject: null,

    build: function(divName, dim, algoObject) {
        this.button = $('#'+ 'kMeans' + divName + 'Run');
        this.divName = divName;

        this.button.click(function() {
            reducedDataset = algoObject.reducedDatasets[divName];

            labels = datasetManager.getLabels(); // TODO: extend to text labels
            if (reducedDataset == null) {
                //TODO: add alert
                //console.log(divName + ' button found no reduced dimensionality dataset');
            } else {
                //console.log(divName + 'SliderKText')
                var k = utils.extractInt(divName + 'SliderKText');
                //console.log('saw k='+k);
                clusterAssignments = algorithms.runKMeans(reducedDataset, k);

                if (dim < 3) {
                    plotManager.updatePlot(reducedDataset, labels, divName, dim, clusterAssignments);
                } else {
                    // get chart, destroy chart, make new chart
                    if (algoObject.chart != null) {
                        //console.log("ys. trying to estory chart");
                        algoObject.chart.destroy();
                        //console.log("chart is now" + algoObject.chart);
                        algoObject.chart = null;
                        //console.log("chart is now" + algoObject.chart);
                    }
                    options = plotManager.config3DPlot(reducedDataset, clusterAssignments, divName);
                    algoObject.chart = new Highcharts.Chart(options);
                    //console.log("new chart is" + algoObject.chart)
                    plotManager.configMouseControl(algoObject.chart);
                }
                //console.log(divName + ' plotted a dataset');
            }
        });
    },
};

var runButtonBuilder = {
    button: null,
    divName: null,

    build: function(divName, dim, algorithm) {
        this.button = $('#'+ divName + 'Run');
        this.divName = divName;

        this.button.click(function() {
            dataset = datasetManager.getDataset().slice();
            labels = datasetManager.getLabels(); // TODO: extend to text labels
            if (dataset == null) {
                //TODO: add alert
            } else {
                // run the algorithm with the settings
                reducedDataset = algorithm.run(dataset, divName, dim);

                if (dim < 3) {
                    // rebuild 1D or 2D plot
                    plotManager.updatePlot(reducedDataset, labels, divName, dim);
                } else {
                    // destroy and rebuild 3D plot if necessary
                    if (algorithm.chart != null) {
                        algorithm.chart.destroy();
                        algorithm.chart = null;
                    }
                    options = plotManager.config3DPlot(reducedDataset, labels, divName);
                    algorithm.chart = new Highcharts.Chart(options);
                    plotManager.configMouseControl(algorithm.chart);
                }
            }
        });
    },
};



var buttonManager = {
    algoNames: ['tsne', 'pca', 'mds'],
    dims: ['One', 'Two', 'Three'],
    algos: [tsne, pca, mds],

    init: function () {
        // Hook buttons to actions
        for(let i = 1; i < 4; i++) {
            for(let j = 1; j < 4; j++) {
                //console.log(this.algoNames[i-1]+this.dims[j-1]+'D')
                runButtonBuilder.build(this.algoNames[i-1]+this.dims[j-1]+'D', j, this.algos[i-1]);
                kMeansButtonBuilder.build(this.algoNames[i-1]+this.dims[j-1]+'D', j, this.algos[i-1]);

            }
        }

    }
}