
var sliderManager = {

    init: function () {
// tsne sliders
        d3.select('#tsneOneDSlider1').call(d3.slider().value(5).on("slide", function (evt, value) {
            d3.select('#tsneOneDSlider1Text').text(Math.floor(value));
        }));

        d3.select('#tsneOneDSlider2').call(d3.slider().value(5).on("slide", function (evt, value) {
            d3.select('#tsneOneDSlider2Text').text(Math.floor(value));
        }));

        d3.select('#tsneOneDSlider3').call(d3.slider().value(100).min(1).max(500).on("slide", function (evt, value) {
            d3.select('#tsneOneDSlider3Text').text(Math.floor(value));
        }));

        d3.select('#tsneOneDSliderK').call(d3.slider().value(3).min(1).max(10).on("slide", function (evt, value) {
            d3.select('#tsneOneDSliderKText').text(Math.floor(value));
        }));

        d3.select('#tsneTwoDSlider1').call(d3.slider().value(5).on("slide", function (evt, value) {
            d3.select('#tsneTwoDSlider1Text').text(Math.floor(value));
        }));

        d3.select('#tsneTwoDSlider2').call(d3.slider().value(5).on("slide", function (evt, value) {
            d3.select('#tsneTwoDSlider2Text').text(Math.floor(value));
        }));

        d3.select('#tsneTwoDSlider3').call(d3.slider().value(100).min(1).max(500).on("slide", function (evt, value) {
            d3.select('#tsneTwoDSlider3Text').text(Math.floor(value));
        }));

        d3.select('#tsneTwoDSliderK').call(d3.slider().value(3).min(1).max(10).on("slide", function (evt, value) {
            d3.select('#tsneTwoDSliderKText').text(Math.floor(value));
        }));

        d3.select('#tsneThreeDSlider1').call(d3.slider().value(5).on("slide", function (evt, value) {
            d3.select('#tsneThreeDSlider1Text').text(Math.floor(value));
        }));

        d3.select('#tsneThreeDSlider2').call(d3.slider().value(5).on("slide", function (evt, value) {
            d3.select('#tsneThreeDSlider2Text').text(Math.floor(value));
        }));

        d3.select('#tsneThreeDSlider3').call(d3.slider().value(100).min(1).max(500).on("slide", function (evt, value) {
            d3.select('#tsneThreeDSlider3Text').text(Math.floor(value));
        }));

        d3.select('#tsneThreeDSliderK').call(d3.slider().value(3).min(1).max(10).on("slide", function (evt, value) {
            d3.select('#tsneThreeDSliderKText').text(Math.floor(value));
        }));

        d3.select('#pcaOneDSlider1').call(d3.slider().value(3).min(1).max(10).on("slide", function (evt, value) {
            d3.select('#pcaOneDSliderKText').text(Math.floor(value));
        }));

        d3.select('#pcaTwoDSlider1').call(d3.slider().value(3).min(1).max(10).on("slide", function (evt, value) {
            d3.select('#pcaTwoDSliderKText').text(Math.floor(value));
        }));

        d3.select('#pcaThreeDSlider1').call(d3.slider().value(3).min(1).max(10).on("slide", function (evt, value) {
            d3.select('#pcaThreeDSliderKText').text(Math.floor(value));
        }));

        d3.select('#mdsOneDSlider1').call(d3.slider().value(3).min(1).max(10).on("slide", function (evt, value) {
            d3.select('#mdsOneDSliderKText').text(Math.floor(value));
        }));

        d3.select('#mdsTwoDSlider1').call(d3.slider().value(3).min(1).max(10).on("slide", function (evt, value) {
            d3.select('#mdsTwoDSliderKText').text(Math.floor(value));
        }));

        d3.select('#mdsThreeDSlider1').call(d3.slider().value(3).min(1).max(10).on("slide", function (evt, value) {
            d3.select('#mdsThreeDSliderKText').text(Math.floor(value));
        }));



    }
}