var kMeansButtonBuilder = {
    button: null,
    divName: null,
    tsneChartObject: null,

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

                var perp = utils.extractInt(divName + 'Slider1Text');
                var eps =  utils.extractInt(divName + 'Slider2Text');
                var iters =  utils.extractInt(divName + 'Slider3Text');
                tsneReducedDataset = tsne.runTSNE(eps, perp, iters, dim, tsnedataset);

                if (dim < 3) {
                    plotManager.updatePlot(tsneReducedDataset, labels, divName, dim);
                } else {

                    if (this.tsneChartObject != null) {

                        this.tsneChartObject.destroy();

                        this.tsneChartObject = null;

                    }
                                        options = plotManager.config3DPlot(tsnedataset, labels, divName);
                    this.tsneChartObject = new Highcharts.Chart(options);
                    console.log("new chart is" + this.tsneChartObject)
                    plotManager.configMouseControl(this.tsneChartObject);
                }
                console.log(divName + ' plotted a dataset');
            }
        });
    },
};


var tsneButtonBuilder = {
    button: null,
    divName: null,
    tsneChartObject: null,

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
                tsneReducedDataset = tsne.runTSNE(eps, perp, iters, dim, tsnedataset);
                tsne.reducedDatasets[divName] = tsneReducedDataset;
                if (dim < 3) {
                    plotManager.updatePlot(tsneReducedDataset, labels, divName, dim);
                } else {
                    console.log("can i destory chart y/n?" + this.tsneChartObject)
                    if (this.tsneChartObject != null) {
                        console.log("ys. trying to estory chart");
                        this.tsneChartObject.destroy();
                        console.log("char is now" + this.tsneChartObject);
                        this.tsneChartObject = null;
                        console.log("char is now" + this.tsneChartObject);
                    }
                    console.log("make new chart pls:")
                    options = plotManager.config3DPlot(tsnedataset, labels, divName);
                    this.tsneChartObject = new Highcharts.Chart(options);
                    console.log("new chart is" + this.tsneChartObject)
                    plotManager.configMouseControl(this.tsneChartObject);
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
                pca.reducedDatasets[divName] = pcaReducedDataset;
                if (dim < 3) {
                    plotManager.updatePlot(pcaReducedDataset, labels, divName, dim);
                } else {
                    if (this.pcaChartObject != null) {
                        console.log("ys. trying to estory chart");
                        this.pcaChartObject.destroy();
                        console.log("char is now" + this.pcaChartObject);
                        this.pcaChartObject = null;
                        console.log("char is now" + this.pcaChartObject);
                    }
                    // TODO: set options better for PCA
                    console.log(typeof(pcaReducedDataset[0][0][0]))
                    options = plotManager.config3DPlot(pcaReducedDataset, labels, divName);
                    this.pcaChartObject = new Highcharts.Chart(options);
                    plotManager.configMouseControl(this.pcaChartObject);
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
                    thisRow.push(row[0]);
                    thisRow.push(row[1]);
                    thisRow.push(row[2]);
                    reducedDists.push(thisRow);
                });

                mds.reducedDatasets[divName] = reducedDists;
                if (dim < 3) {
                    plotManager.updatePlot(reducedDists, labels, divName, dim);
                } else {

                if (this.mdsChartObject != null) {
                    console.log("ys. trying to estory chart");
                    this.mdsChartObject.destroy();
                    console.log("char is now" + this.mdsChartObject);
                    this.mdsChartObject = null;
                    console.log("char is now" + this.mdsChartObject);
                }
                // TODO: set options better for mds
                mdsoptions = plotManager.config3DPlot(reducedDists, labels, divName);
                console.log(mdsoptions)
                this.mdsChartObject = new Highcharts.Chart(mdsoptions);
                plotManager.configMouseControl(this.mdsChartObject);
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
        //
    }

}