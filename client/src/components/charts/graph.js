import React, { Component } from 'react';
import * as d3 from "d3";


class Graph extends Component {
    constructor(props) {
        super(props);
    }
    createGraph(data) {

        let items = data[Object.keys(data)[1]];

        let dataset = [];

        Object.keys(items).forEach(function(key){
            let dataForDay = items[key];
            dataset.push({
                "date": d3.timeParse("%Y-%m-%d")(key),
                "open" : parseFloat(dataForDay["1. open"]),
                "high" : parseFloat(dataForDay["2. high"]),
                "low" : parseFloat(dataForDay["3. low"]),
                "close" : parseFloat(dataForDay["4. close"]),
                "volume" : parseFloat(dataForDay["5. volume"])
        });
        });

        var optwidth        = 900;
        var optheight       = 500;

        /* === Focus chart === */

        var margin	= {top: 20, right: 30, bottom: 100, left: 30};
        var width	= optwidth - margin.left - margin.right;
        var height	= optheight - margin.top - margin.bottom;

        /* === Context chart === */

        var svg = d3.select("#metric-modal")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var dataXrange = d3.extent(dataset, function(d) { return d.date; });

        var yMax = d3.max(dataset, function(d) { return d.high; })
        var dataYrange = [0, yMax + yMax/2];

        // X axis
        var x = d3.scaleTime()
        .domain(dataXrange)
        .range([0,width]);

        svg.append("g")
        .attr("transform", "translate(0," +height + ")")
        .call(d3.axisBottom(x));

            // Add Y axis
        var y = d3.scaleLinear()
            .domain(dataYrange)
            .range([ height, 0 ]);

            svg.append("g")
            .call(d3.axisLeft(y));

            // Add the line
        svg.append("path")
            .datum(dataset)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr("d", d3.line()
            .x(function(d) { return x(d.date) })
            .y(function(d) { return y(d.high) })
            )
    }

    render() {
        return (
            <div className="Graph">
            <div id="metric-modal"></div>
    </div>
    );
    }
}

export default Graph;