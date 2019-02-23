<script>
import * as d3 from "d3";
export default {
    name: 'BarChart',
    props: ["chartData", "attrClass"],
    template: "<div></div",
    methods: {
        drawBarChart() {
            let dataset = [];
            let dataFromParent = this.chartData;
            let maxValue = 0;
            let colors = ["#b3b300", "#006666"];
            let categories = [];
            let index = 0;
            let dataSum = 0;
            Object.keys(dataFromParent).forEach(function(key) {
                if (key === "priority" || key === "severity") {
                    return;
                }
                categories.push(key);
                Object.keys(dataFromParent[key]).forEach(function (keyInner) {
                    let entry = {};
                    entry.value = dataFromParent[key][keyInner];
                    entry.label = keyInner.split("-").pop().trim();
                    entry.color = colors[index];
                    dataset.push(entry);
                    if (entry.value > maxValue) {
                        maxValue = entry.value;
                    }
                    dataSum += entry.value;
                });
                dataset.push( { label: "", value: 0 } );
                index++;
            });
            dataset.pop();

            const WIDTH = 400;
            const INNER_WIDTH = WIDTH - 100;
            const HEIGHT = 250;
            const INNER_HEIGHT = HEIGHT - 80;
            const BAR_WIDTH = 24;
            const BAR_GAP = 2;

            const xScale = d3.scaleIdentity()
                .domain([0, INNER_WIDTH]);

            const yScale = d3.scaleLinear()
                .domain([0, maxValue])
                .range([0, INNER_HEIGHT]);

            let xAxis = d3.axisBottom(xScale)
                .ticks(0);

            let yAxisScale = d3.scaleLinear()
                .domain([0, maxValue])
                .range([INNER_HEIGHT, 0])

            let yAxis = d3.axisLeft(yAxisScale)
                .tickValues( [Math.floor(maxValue / 3), Math.floor(maxValue / 2), maxValue] );

            function y(d) {
                return HEIGHT - yScale(d.value);
            }

            function height(d) {
                return yScale(d.value);
            }

            d3.select("." + this.attrClass).selectAll("*").remove();

            d3.select("." + this.attrClass)
                .append("svg")
                .attr("width", WIDTH)
                .attr("height", HEIGHT)
                .append("text")
                .attr("x", 15)             
                .attr("y", 10)
                .attr("text-anchor", "start")  
                .style("font-size", "12px")
                .style("text-decoration", "underline")
                .text("Bar chart for Seniority and Satisfaction");

            let chartElement = d3.select("." + this.attrClass)
                .select("svg")
                .append("g");

            if (dataSum === 0) {
                // No data to display
                chartElement
                    .attr("transform", "translate(50," + HEIGHT / 2 + ")")
                    .append("text")
                    .style("font-size", "10px")
                    .attr("text-anchor", "start")
                    .text("The filter returned zero tickets");
                return;
            }

            (function update(data) {
                const t = d3.transition()
                    .duration(1000);
  
                const bar = chartElement.selectAll("g")
                    .data(data, d => d.id);
  
                // EXIT section
                bar
                    .exit()
                    .remove();
  
                // UPDATE section
                bar
                    .transition(t)
                    .attr("transform", (d, i) => `translate(${i * (BAR_WIDTH + BAR_GAP) + 45},${y(d)})`);
  
                bar.select("rect")
                    .transition(t)
                    .attr("height", height);
  
                bar.select("text")
                    .transition(t)
                    .tween("text", function(d) {
                        const v0 = this.textContent || "0";
                        const v1 = d.value;
                        const i = d3.interpolateRound(v0, v1);
                        return t => this.textContent = i(t);
                    });
  
                // ENTER section
                const barEnter = bar
                    .enter().append("g")
                    .attr("transform", (d, i) => `translate(${i * (BAR_WIDTH + BAR_GAP) + 45},${INNER_HEIGHT})`);

                barEnter
                    .transition(t)
                    .attr("transform", (d, i) => `translate(${i * (BAR_WIDTH + BAR_GAP) + 45},${y(d)})`);
  
                const rect = barEnter.append("rect")
                    .attr("x", 0)
                    .attr("y", 0)
                    .attr("fill", function(d){
                        return d.color;
                    })
                    .attr("width", BAR_WIDTH)
                    .attr("height", 0);
  
                rect
                    .transition(t)
                    .attr("height", height);
                
                const text = barEnter.append("text")
                    .text(d => d.label)
                    .attr("text-anchor", "start")
                    .attr("fill", function(d) {
                        if (d.value === 0) {
                            return "#d9d9d9";
                        }
                        return "#000000";
                    })
                    .attr("dx", BAR_WIDTH / 2)
                    .attr("dy", -2)
                    .attr("transform", "translate(20,5)rotate(270)");

                chartElement.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0, " + (HEIGHT - 1) + ")")
                    .call(xAxis);

                chartElement.append("g")
                    .attr("class", "y axis")
                    .attr("transform", "translate(40, "+ (HEIGHT - INNER_HEIGHT) +")")
                    .call(yAxis);

            })(dataset);

            // Legend
            let legend = chartElement.selectAll(".legend")
                .data(categories)
                .enter()
                .append("g")

            legend.append("rect")
                .attr("fill", function(d, i){
                    return colors[i];
                })
                .attr("width", 20)
                .attr("height", 20)
                .attr("y", function(d, i) {
                    return i * 50 + 100;
                })
                .attr("x", function(d, i) {
                    return INNER_WIDTH;
                });

            legend.append("text")
                .attr("class", "label")
                .attr("y", function(d, i) {
                    return i * 50 + 112.5;
                })
                .attr("x", function(d, i) {
                    return INNER_WIDTH + 25;
                })
                .attr("text-anchor", "start")
                .text(function (d) {
                    return d;
                });
        }
    },
    watch: {
        chartData: function(newVal, oldVal) {
            this.drawBarChart();
        }
    }
}
</script>
