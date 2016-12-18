/**
 * Created by geoffreyroeder on 2016-12-17.
 */

var tableManager = {

    makeTable: function (data, targetDiv) {


        var table = d3.select("#" + targetDiv).append("table");
        thead = table.append("thead").append("tr");
        tbody = table.append("tbody");

// first create the table rows (3 needed)

        var tr = tbody.selectAll("tr")
            .data(data)
            .enter()
            .append("tr");

// Now create the table cells

        var td = tr.selectAll("td")
            .data(function (d) {
                return d;
            })
            .enter()
            .append("td")
            .text(function (d) {
                return d;
            })

    }
}