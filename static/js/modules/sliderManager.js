
var sliderManager = {

    init: function () {
// tsne sliders
        d3.select('#tsneOneDSlider1').call(d3.slider().value(5).on("slide", function (evt, value) {
            d3.select('#tsneOneDSlider1Text').text(Math.floor(value));
        }));

        d3.select('#tsneOneDSlider2').call(d3.slider().value(5).on("slide", function (evt, value) {
            d3.select('#tsneOneDSlider2Text').text(Math.floor(value));
        }));

        d3.select('#tsneOneDSlider3').call(d3.slider().value(25).min(1).max(500).on("slide", function (evt, value) {
            d3.select('#tsneOneDSlider3Text').text(Math.floor(value));
        }));

        d3.select('#tsneOneDSlider4').call(d3.slider().value(3).min(1).max(10).on("slide", function (evt, value) {
            d3.select('#tsneOneDSlider4Text').text(Math.floor(value));
        }));

        d3.select('#tsneTwoDSlider1').call(d3.slider().value(5).on("slide", function (evt, value) {
            d3.select('#tsneTwoDSlider1Text').text(Math.floor(value));
        }));

        d3.select('#tsneTwoDSlider2').call(d3.slider().value(5).on("slide", function (evt, value) {
            d3.select('#tsneTwoDSlider2Text').text(Math.floor(value));
        }));

        d3.select('#tsneTwoDSlider3').call(d3.slider().value(25).min(1).max(500).on("slide", function (evt, value) {
            d3.select('#tsneTwoDSlider3Text').text(Math.floor(value));
        }));

        d3.select('#tsneTwoDSlider4').call(d3.slider().value(3).min(1).max(10).on("slide", function (evt, value) {
            d3.select('#tsneTwoDSlider4Text').text(Math.floor(value));
        }));

        d3.select('#tsneThreeDSlider1').call(d3.slider().value(5).on("slide", function (evt, value) {
            d3.select('#tsneThreeDSlider1Text').text(Math.floor(value));
        }));

        d3.select('#tsneThreeDSlider2').call(d3.slider().value(5).on("slide", function (evt, value) {
            d3.select('#tsneThreeDSlider2Text').text(Math.floor(value));
        }));

        d3.select('#tsneThreeDSlider3').call(d3.slider().value(25).min(1).max(500).on("slide", function (evt, value) {
            d3.select('#tsneThreeDSlider3Text').text(Math.floor(value));
        }));

        d3.select('#tsneThreeDSlider4').call(d3.slider().value(3).min(1).max(10).on("slide", function (evt, value) {
            d3.select('#tsneThreeDSlider4Text').text(Math.floor(value));
        }));

    }
}