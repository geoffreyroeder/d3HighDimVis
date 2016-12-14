Array.prototype.unique = function() {
    var o = {}, i, l = this.length, r = [];
    for(i=0; i<l;i+=1) o[this[i]] = this[i];
    for(i in o) r.push(o[i]);
    return r;
};

var utils = {

    init: function() {

    },

    generateRandomDataset: function(numDataPoints = 50, scale = 1000) {
    var dataset = [];											//Initialize empty array
    let maxRange = Math.random() * scale;						//Max range of new values
    for (let i = 0; i < numDataPoints; i++) {					//Loop numDataPoints times
        var newNumber1 = Math.floor(Math.random() * maxRange);	//New random integer
        var newNumber2 = Math.floor(Math.random() * maxRange);	//New random integer
        dataset.push([newNumber1, newNumber2]);					//Add new number to array
    }
    return dataset;
    },

    extractInt: function(divID) {
        return parseInt(d3.select('#' + divID)[0][0].innerHTML)
    }
};