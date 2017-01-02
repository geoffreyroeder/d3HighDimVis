var algorithms = {

    runKMeans: function(dataset, k) {
        rng = new ML.RNG.XSadd();

        // initialize random cluster centers
        centers = [];
        for (let j = 0; j < k; j++) {
            randIdx = rng.getUint32() % dataset.length;
            console.log(dataset[randIdx])
            centers.push(dataset[randIdx]);
        }

        kmeansResult = ML.Clust.kmeans(dataset, centers);
        clusterAssignments = kmeansResult.clusters;
        return clusterAssignments;
    },
};

var tsne = {
    chart: null,

    // untyped containers for reduced dimensionality datasets
    reducedDatasets: {
        'tsneOneD': null,
        'tsneTwoD': null,
        'tsneThreeD': null
    },

    extractOptionsFromDOM: function(divName, dim) {
        var opts = {};
        opts['perp'] = utils.extractInt(divName + 'Slider1Text');
        opts['eps'] =  utils.extractInt(divName + 'Slider2Text');
        opts['iters'] =  utils.extractInt(divName + 'Slider3Text');
        opts['dim'] = dim;
        return opts;
    },

    run: function (data, divName, dim) {
        // grab the variables necessary for updating the plot
        var opts = this.extractOptionsFromDOM(divName, dim);
        var tsne = new tsnejs.tSNE(opts);
        tsne.initDataRaw(data);
        for (var k = 0; k < opts.iters; k++) {
            tsne.step();
        }

        reducedDataset = tsne.getSolution();

        // save this reducedDataset for further processing
        this.reducedDatasets[divName] = reducedDataset;
        return reducedDataset;
    },
};

var pca = {
    chart: null,
    self: this,
    opts: { isCovarianceMatrix: false,
            center: true,
            scale: true },

    // untyped containers for reduced dimensionality datasets
    reducedDatasets: {
        'pcaOneD': null,
        'pcaTwoD': null,
        'pcaThreeD': null
    },

    updateDOM: function(pca, divName, dim) {
        varExplained = pca.getCumulativeVariance()[dim-1];
        d3.select('#' + divName + 'VarText').text(String(100*Math.round(100*varExplained)/100));
    },

    run: function(data, divName, dim) {
        var pca = new ML.Stat.PCA(dataset, this.opts);
        reducedDataset = pca.predict(datasetManager.getDataset(), dim);
        this.updateDOM(pca, divName, dim);
        this.reducedDatasets[divName] = reducedDataset;
        return reducedDataset;
    },
};

var mds = {
    chart: null,
    self: this,

    // untyped containers for reduced dimensionality datasets
    reducedDatasets: {
        'mdsOneD': null,
        'mdsTwoD': null,
        'mdsThreeD': null
    },

    convertMDSMatrixToArray: function(mdsMat, dim) {
        reducedDists = [];

        // Load mdsjs data type into 2D array building row by row
        mdsMat.rowsIter(function (row) {
            thisRow = [];
            for (let j = 0; j < dim; j++) {
                thisRow.push(row[j]);
            }
            reducedDists.push(thisRow);
        });

        return reducedDists;
    },

    run: function(data, divName, dim) {
        dists = utils.distances(data);
        mdsOut = mdsjs.landmarkMDS(mdsjs.convertToMatrix(dists.to2DArray()), dim);
        reducedDists = this.convertMDSMatrixToArray(mdsOut, dim);
        this.reducedDatasets[divName] = reducedDists;
        return reducedDists;
    }
};
