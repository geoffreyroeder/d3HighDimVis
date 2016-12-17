$(document).ready(function () {
    utils.init();
    datasetManager.init();
    sliderManager.init();
    buttonManager.init();
    plotManager.setHighchartTheme(); // makes dark 3D plot
    console.log("Initialized everything")
});