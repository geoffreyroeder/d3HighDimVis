var tsneButtonBuilder = {
    button: null,
    divName: null,

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
                var perp = utils.extractInt(divName + 'Slider1Text');
                var eps =  utils.extractInt(divName + 'Slider2Text');
                var iters =  utils.extractInt(divName + 'Slider3Text');
                reducedDataset = algorithms.runTSNE(eps, perp, iters, dim, dataset);
                plotManager.updatePlot(reducedDataset, labels, divName, dim);
                console.log(divName + ' plotted a dataset');
            }
        });
    },
};

var buttonManager = {
    $tsne1D: $('#tsneDo1D'),

    init: function () {
        tsneButtonBuilder.build('tsneOneD', 1);
        tsneButtonBuilder.build('tsneTwoD', 2);
    }

}