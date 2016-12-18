var kMeansButtonBuilder = {
    button: null,
    divName: null,
    tsneChartObject: null,

    build: function(divName, dim, algoObject) {
        this.button = $('#'+ 'kMeans' + divName + 'Run');
        this.divName = divName;

        this.button.click(function() {
            algoReducedDataset = algoObject.reducedDatasets[divName];

            labels = datasetManager.getLabels(); // TODO: extend to text labels
            if (algoReducedDataset == null) {
                //TODO: add alert
                console.log(divName + ' button found no reduced dimensionality dataset');
            } else {
                console.log(divName + 'SliderKText')
                var k = utils.extractInt(divName + 'SliderKText');
                console.log('saw k='+k);
                clusterAssignments = algorithms.runKMeans(algoReducedDataset, k);

                if (dim < 3) {
                    plotManager.updatePlot(algoReducedDataset, labels, divName, dim, clusterAssignments);
                } else {
                    // get chart, destroy chart, make new chart
                    if (algoObject.chart != null) {
                        console.log("ys. trying to estory chart");
                        algoObject.chart.destroy();
                        console.log("chart is now" + algoObject.chart);
                        algoObject.chart = null;
                        console.log("chart is now" + algoObject.chart);
                    }
                    options = plotManager.config3DPlot(algoReducedDataset, clusterAssignments, divName);
                    algoObject.chart = new Highcharts.Chart(options);
                    console.log("new chart is" + algoObject.chart)
                    plotManager.configMouseControl(algoObject.chart);
                }
                console.log(divName + ' plotted a dataset');
            }
        });
    },
};


var tsneButtonBuilder = {
    button: null,
    divName: null,

    build: function(divName, dim) {
        this.button = $('#'+ divName + 'Run');
        this.divName = divName;

        this.button.click(function() {
            tsnedataset = datasetManager.getDataset().slice();
            labels = datasetManager.getLabels(); // TODO: extend to text labels
            if (tsnedataset == null) {
                //TODO: add alert
                console.log(divName + ' button found no dataset');
            } else {
                console.log(divName + ' button found a dataset');
                var perp = utils.extractInt(divName + 'Slider1Text');
                var eps =  utils.extractInt(divName + 'Slider2Text');
                var iters =  utils.extractInt(divName + 'Slider3Text');
                algoReducedDataset = tsne.runTSNE(eps, perp, iters, dim, tsnedataset);
                tsne.reducedDatasets[divName] = algoReducedDataset;
                if (dim < 3) {
                    plotManager.updatePlot(algoReducedDataset, labels, divName, dim);
                } else {
                    console.log("can i destory chart y/n?" + tsne.chart)
                    if (tsne.chart != null) {
                        console.log("ys. trying to estory chart");
                        tsne.chart.destroy();
                        console.log("chart is now" + tsne.chart);
                        tsne.chart = null;
                        console.log("chart is now" + tsne.chart);
                    }
                    console.log("make new chart pls:")
                    options = plotManager.config3DPlot(algoReducedDataset, labels, divName);
                    tsne.chart = new Highcharts.Chart(options);
                    console.log("new chart is" + tsne.chart)
                    plotManager.configMouseControl(tsne.chart);
                }
                console.log(divName + ' plotted a dataset');
            }
        });
    },
};

var pcaButtonBuilder = {
    button: null,
    divName: null,
    pcaChartObject: null,

    build: function(divName, dim) {
        this.button = $('#'+ divName + 'Run');
        this.divName = divName;

        this.button.click(function() {
            dataset = datasetManager.getDataset();
            labels = datasetManager.getLabels(); // TODO: extend to text labels
            if (dataset == null) {
                console.log(divName + ' button found no dataset');
            } else {
                console.log(divName + ' button found a dataset');

                 pca_data = new ML.Stat.PCA(dataset, options = {isCovarianceMatrix: false,
                                                                center: true,
                                                                scale: true });
                pcaReducedDataset = pca_data.predict(datasetManager.getDataset(), dim);
                varExplained = pca_data.getCumulativeVariance()[dim-1];
                d3.select('#' + divName + 'VarText').text(String(100*Math.round(100*varExplained)/100));
                pca.reducedDatasets[divName] = pcaReducedDataset;
                if (dim < 3) {
                    plotManager.updatePlot(pcaReducedDataset, labels, divName, dim);
                } else {
                    if (this.chart != null) {
                        console.log("ys. trying to estory chart");
                        this.chart.destroy();
                        console.log("chart is now" + this.chart);
                        this.chart = null;
                        console.log("chart is now" + this.chart);
                    }
                    // TODO: set options better for PCA
                    console.log(typeof(pcaReducedDataset[0][0][0]))
                    options = plotManager.config3DPlot(pcaReducedDataset, labels, divName);
                    this.chart = new Highcharts.Chart(options);
                    plotManager.configMouseControl(this.chart);
                }
                console.log(divName + ' plotted a dataset');
            }
        });
    },
};

var mdsButtonBuilder = {
    button: null,
    divName: null,
    mdsChartObject: null,

    build: function(divName, dim) {
        this.button = $('#'+ divName + 'Run');
        this.divName = divName;

        this.button.click(function() {
            dataset = datasetManager.getDataset();
            labels = datasetManager.getLabels(); // TODO: extend to text labels
            if (dataset == null) {
                console.log(divName + ' button found no dataset');
            } else {
                console.log(divName + ' button found a dataset');
                dists = utils.distances(dataset);
                console.log(dists.row);
                console.log(dists.columns);
                mdsOut = mdsjs.landmarkMDS(mdsjs.convertToMatrix(dists.to2DArray()), dim);
                reducedDists = [];

                // Load mdsjs data type into 2D array
                mdsOut.rowsIter(function (row) {
                    // Kludge to make sure the result is Array of Number, not Float64Array
                    thisRow = [];
                    for (let j = 0; j < dim; j++) {
                        thisRow.push(row[j]);
                    }
                    reducedDists.push(thisRow);
                });

                mds.reducedDatasets[divName] = reducedDists;
                if (dim < 3) {
                    plotManager.updatePlot(reducedDists, labels, divName, dim);
                } else {

                if (this.chart != null) {
                    console.log("ys. trying to estory chart");
                    this.chart.destroy();
                    console.log("chart is now" + this.chart);
                    this.chart = null;
                    console.log("chart is now" + this.chart);
                }
                // TODO: set options better for mds
                mdsoptions = plotManager.config3DPlot(reducedDists, labels, divName);
                console.log(mdsoptions)
                this.chart = new Highcharts.Chart(mdsoptions);
                plotManager.configMouseControl(this.chart);
            }
                console.log(divName + ' plotted a dataset');
            }
        });
    },
};

var buttonManager = {
    $tsne1D: $('#tsneDo1D'),

    init: function () {
        // Hook buttons to actions
        tsneButtonBuilder.build('tsneOneD', 1);
        tsneButtonBuilder.build('tsneTwoD', 2);
        tsneButtonBuilder.build('tsneThreeD', 3);
        pcaButtonBuilder.build('pcaOneD', 1);
        pcaButtonBuilder.build('pcaTwoD', 2);
        pcaButtonBuilder.build('pcaThreeD', 3);
        mdsButtonBuilder.build('mdsOneD', 1);
        mdsButtonBuilder.build('mdsTwoD', 2);
        mdsButtonBuilder.build('mdsThreeD', 3);


        kMeansButtonBuilder.build('tsneOneD', 1, tsne)
        kMeansButtonBuilder.build('tsneTwoD', 2, tsne)
        kMeansButtonBuilder.build('tsneThreeD', 3, tsne)
        kMeansButtonBuilder.build('pcaOneD', 1, pca)
        kMeansButtonBuilder.build('pcaTwoD', 2, pca)
        kMeansButtonBuilder.build('pcaThreeD', 3, pca)
        kMeansButtonBuilder.build('mdsOneD', 1, mds)
        kMeansButtonBuilder.build('mdsTwoD', 2, mds)
        kMeansButtonBuilder.build('mdsThreeD', 3, mds)
    }

}