/* FILE LOADING AND PARSING*/ // ##################################################

// modified from http://html5demos.com/file-api

function buildDropZone(divId, labels=false) {
    var holder = document.getElementById(divId),
        state = document.getElementById(divId + 'Status');
    if (typeof window.FileReader === 'undefined') {
        state.className = 'fail';
    } else {
        state.className = 'success';
        if (labels) {
            state.innerHTML = 'LABEL DATA (optional)<br>Drop .csv file here';
        } else {
            state.innerHTML = 'FEATURE DATA<br>Drop .csv file here';
        }
    }

    holder.ondragover = function () {
        this.className = 'hover';
        console.log(this.className)
        return false;
    };

    holder.ondragleave = function () {
        this.className = 'hoveroff';
        console.log(this.className)
        return false;
    };

    holder.ondragend = function () {
        this.className = 'hoveroff';
        console.log(this.className)
        return false;
    };


    holder.ondrop = function (e) {
        this.className = '';
        e.preventDefault();

        var file = e.dataTransfer.files[0],
            reader = new FileReader();
        reader.onload = function (event) {
            console.log(event.target);
            holder.innerText = event.target.result;
        };

        console.log(file);

        // define callback
        Papa.parse(file, {
            dynamicTyping: true,
            skipEmptyLines: true,
            complete: function (results, file) {
                console.log("Parsing complete:", results, file);
                // GOTCHA: some files have trailing junk
                // TODO: make this principled / automatic
                if (labels) {
                    console.log("label data");
                    $_labels = results.data.slice(0, -1);
                    state = document.getElementById(divId + 'Status');
                    state.innerHTML = 'Currently loaded: ' + file.name;
                } else {
                    console.log("feature data");

                        plotManager.removeAllPlots();

                    $_dataset = results.data.slice(0, -1);
                    state = document.getElementById(divId + 'Status');
                    state.innerHTML = 'Currently loaded: ' + file.name;
                    tableManager.makeTable($_dataset, "tableTarget")
                }
            }
        });
        return false;
    };
}

var datasetManager = {

    $_dataset: null,
    $_reducedDataset: null,
    $_labels: null,

    getDataset : function () {
        return $_dataset;
    },

    setReducedDataset : function(reduced) {
        this.$_reducedDataset = reduced;
    },

    getReducedDataset : function(reduced) {
        return this.$_reducedDataset;
    },

    getLabels : function () {
        if (this.$_labels == null) {
            this.$_labels = ML.Matrix.ones(datasetManager.getDataset().length, 1)
        }
        return this.$_labels;
    },


    init: function() {
        buildDropZone('featuresLoader');
        buildDropZone('labelsLoader', labels=true);
    }
}