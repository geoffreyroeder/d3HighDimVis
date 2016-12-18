/* t-SNE LOGIC */ // ##################################################
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
        console.log('found these assignments: ' + clusterAssignments);
        return clusterAssignments;
    },



}

var tsne = {

    chart: null,

    // untyped containers for reduced dimensionality datasets
    reducedDatasets: {
        'tsneOneD': null,
        'tsneTwoD': null,
        'tsneThreeD': null
    },

    runTSNE: function (eps, perp, iters, dim, data) {
        // Wrapper for mljs function
        var opt = {}
        opt.epsilon = eps; // epsilon is learning rate (10 = default)
        opt.perplexity = perp; // roughly how many neighbors each point influences (30 = default)
        opt.dim = dim; // dimensionality of the embedding (2 = default)
        var tsne = new tsnejs.tSNE(opt); // create a tSNE instance
        tsne.initDataRaw(data);

        for (var k = 0; k < iters; k++) {
            tsne.step(); // every time you call this, solution gets better
        }

        return tsne.getSolution(); // Y is an array of dim-D points that you can plot
    }
}

var pca = {
    chart: null,

    // untyped containers for reduced dimensionality datasets
    reducedDatasets: {
        'pcaOneD': null,
        'pcaTwoD': null,
        'pcaThreeD': null
    },
}

var mds = {
    chart: null,

    // untyped containers for reduced dimensionality datasets
    reducedDatasets: {
        'mdsOneD': null,
        'mdsTwoD': null,
        'mdsThreeD': null
    }
}
