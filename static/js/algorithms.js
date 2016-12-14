/* t-SNE LOGIC */ // ##################################################
var algorithms = {

    runTSNE: function(eps, perp, iters, dim, data) {
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


//        function runPCA(dim, data) {
//            var opt = []
//            opt.center = true
//
//            new PCA(data,)
//        }
}
