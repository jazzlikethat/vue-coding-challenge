<script>
import * as d3 from "d3";
export default {
    name: "PieChart",
    props: ["chartData", "attrClass"],
    template: "<div></div",
    methods: {
        drawPieChart() {
            let dataset = [];
            let dataFromParent = this.chartData;
            let dataSum = 0;
            Object.keys(dataFromParent).forEach(function(key) {
                let entry = {};
                entry.value = dataFromParent[key];
                entry.label = key.split("-").pop().trim();
                dataset.push(entry);
                dataSum += entry.value;
            });

            let width = 300;
            let height = 300;
            let radius = width / 3;

            let color = d3.scaleOrdinal()
                .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

            let arc = d3.arc()
                .outerRadius(radius - 10)
                .innerRadius(0);

            // arc for the labels position
            let labelArc = d3.arc()
                .outerRadius(radius + 2)
                .innerRadius(radius + 2);

            let getAngle = function(d) {
                return (180 / Math.PI * (d.startAngle + d.endAngle) / 2 - 90);
            };

            let pie = d3.pie()
                .sort(null)
                .value(function (d) {
                    return d.value;
                });

            d3.select("." + this.attrClass).selectAll("*").remove();

            let chartElement = d3.select("." + this.attrClass)
                .append("svg")
                .attr("width", width)
                .attr("height", height)
                .append("g")
                .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

            // "g element is a container used to group other SVG elements"
            let g = chartElement.selectAll(".arc")
                .data(pie(dataset))
                .enter().append("g")
                .attr("class", "arc");

            // append path 
            g.append("path")
                .attr("d", arc)
                .style("fill", function(d) { return color(d.data.label); })
                // transition 
                .transition()
                .ease(d3.easeLinear)
                .duration(1000)
                .attrTween("d", this.tweenPie);
        
            // append text
            g.append("text")
                .transition()
                .ease(d3.easeLinear)
                .duration(1000)
                .attr("transform", function(d) {
                    let angle = getAngle(d);
                    if (d.data.value === dataSum) {
                        angle = 0;
                    }
                    else if (angle > 90) {
                        angle += 180;
                    }
                    return "translate(" + labelArc.centroid(d) + ")" +
                      "rotate(" + angle + ")";
                })
                .attr("dy", "5")
                .style("text-anchor", function(d) {
                    let anchor = "end";
                    let angle = getAngle(d);
                    if (angle > 90) {
                        anchor = "start";
                    }
                    return anchor;
                })
                .text(function(d) { 
                    let value = d.data.value;
                    return (value === 0) ? "" : d.data.label + " (" + d.data.value + ")";
                });

            function tweenPie(b) {
                b.innerRadius = 0;
                let i = d3.interpolate({startAngle: 0, endAngle: 0}, b);
                return function(t) { return arc(i(t)); };
            }
        }
    },
    watch: {
        chartData: function(newVal, oldVal) {
            this.drawPieChart();
        }
    }
}
</script>
