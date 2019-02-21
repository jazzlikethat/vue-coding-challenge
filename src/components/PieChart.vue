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
            Object.keys(dataFromParent).forEach(function(key) {
                let entry = {};
                entry.value = dataFromParent[key];
                entry.label = key.split("-").pop().trim();
                dataset.push(entry);
            });
            let margin = {
                top: 20,
                right: 20,
                bottom: 20,
                left: 20
            };
            let width = 300 - margin.right - margin.left;
            let height = 300 - margin.bottom - margin.top;
            let radius = width / 2;

            let color = d3.scaleOrdinal()
                .range(["#BBDEFB", "#90CAF9", "#64B5F6", "#42A5F5", "#2196F3", "#1E88E5", "#1976D2"]);

            let arc = d3.arc()
                .outerRadius(radius - 10)
                .innerRadius(0);

            // arc for the labels position
            let labelArc = d3.arc()
                .outerRadius(radius - 40)
                .innerRadius(radius - 40);

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
                .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
                .attr("dy", ".35em")
                .text(function(d) { 
                    let value = d.data.value;
                    return (value === 0) ? "" : d.data.label;
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
