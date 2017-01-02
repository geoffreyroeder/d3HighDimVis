//From: http://www.shamasis.net/2009/09/fast-algorithm-to-find-unique-items-in-javascript-array/
Array.prototype.unique = function() {
    var o = {}, i, l = this.length, r = [];
    for(i=0; i<l;i+=1) o[this[i]] = this[i];
    for(i in o) r.push(o[i]);
    return r;
};

var utils = {

    self : this,

    init: function() {
        //TODO
    },

    buildColouredDataset: function(dataset, labels, colourFun = d3.scale.category10()) {
        console.log('buildcolor::');
        console.log(labels);
        console.log(dataset);
        highchartDataset = [];
        for (let i = 0; i < dataset.length; i++) {
            highchartDataset.push({
                x: dataset[i][0],
                y: dataset[i][1],
                z: dataset[i][2], color: colourFun(labels[i]), lineColor: '#ffffff', lineWidth: 1
            });
        }
        return highchartDataset;
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
    },

    hadamard : function(mat1, mat2) {
        // TODO: check the operation is defined
        mat1 = ML.Matrix.checkMatrix(mat1);
        mat2 = ML.Matrix.checkMatrix(mat2);

        let rows = mat1.rows;
        let cols = mat1.columns;
        var D = new ML.Matrix(rows, cols);
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                D[i][j] = mat1[i][j]*mat2[i][j];
            }
        }
        return ML.Matrix.checkMatrix(D)
    },

    distances: function(X) {
        // Fast distance mat: X.^2 * ones(d,n) + ones(n, d) * (X').^2 - 2 * (X * X');
        X = ML.Matrix.checkMatrix(X);
        XT = X.transpose();
        N = X.rows;
        D = X.columns;
        A = utils.hadamard(X,X).mmul(ML.Matrix.ones(D,N));
        B = ML.Matrix.ones(N,D).mmul(utils.hadamard(XT,XT));
        C = X.mmul(XT).mul(2);
        Ds = new ML.Matrix(N,N);
        for(let i = 0; i < N; i++) {
            for (let j = 0; j < N; j++) {
                Ds[i][j] = A[i][j] + B[i][j] - C[i][j];
            }
        }
        return Ds;
    }
};