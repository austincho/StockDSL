import React, { Component } from 'react';
import * as d3 from "d3";


class Graph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.graphData,
            type : props.graphType,
            currency : "USD",
            exchangeRate: 1
        }
        let dataset = this.organizeData(this.state.data, this.state.type);
        if (this.state.type === "line") {
            this.createLineGraph(dataset);
        } else if (this.state.type === "bar") {
            this.createBarGraph(dataset);
        }
    }

    init(){
        let dataset = this.organizeData(this.state.data, this.state.type);
        if (this.state.type === "line") {
            this.createLineGraph(dataset);
        } else if (this.state.type === "bar") {
            this.createBarGraph(dataset);
        }
    }

    // }
    organizeData(data, type) {
        let items = data[Object.keys(data)[1]];

        let dataset = [];
        
        if (type === "line") {
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
    } else if (type === "bar") {
        var i = 0;
        Object.keys(items).forEach(function(key){
            if (i < 30) {
            let dataForDay = items[key];
            dataset.push({
                "date": key.substring(5),
                "open" : parseFloat(dataForDay["1. open"]),
                "high" : parseFloat(dataForDay["2. high"])
            });
            }
            i+=1;
        });
    } 
        return dataset.reverse();
    }

    createLineGraph(dataset) {        

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

         // text label for the x axis
        svg.append("text")             
        .attr("transform",
                "translate(" + (width/2) + " ," + 
                            (height + margin.top + 20) + ")")
        .style("text-anchor", "middle")
        .text("Date");

            // Add Y axis
        var y = d3.scaleLinear()
            .domain(dataYrange)
            .range([ height, 0 ]);

            svg.append("g")
            .call(d3.axisLeft(y));

            svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left)
            .attr("x",0 - (height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Price in USD");      

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

    
    createBarGraph(dataset){

        var optwidth        = 1200;
        var optheight       = 500;

        var margin	= {top: 20, right: 20, bottom: 30, left: 40};
        var width	= optwidth - margin.left - margin.right;
        var height	= optheight - margin.top - margin.bottom;
        var yMax = d3.max(dataset, function(d) { return d.high; })

        var x = d3.scaleBand()
            .rangeRound([0, width])
            .padding(0.5);

        var y = d3.scaleLinear()
            .rangeRound([height, 0]);

        var svg = d3.select("body").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      // Scale the range of the data in the domains
        x.domain(dataset.map(function(d) { return d.date; }));
        y.domain([0, yMax + yMax/2]);

  // append the rectangles for the bar chart
        svg.selectAll(".bar")
            .data(dataset)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return x(d.date); })
            .attr("width", x.bandwidth())
            .attr("y", function(d) { return y(d.high); })
            .attr("height", function(d) { return height - y(d.high); });


        // add the x Axis
        svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

        // add the y Axis
        svg.append("g")
        .call(d3.axisLeft(y));
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