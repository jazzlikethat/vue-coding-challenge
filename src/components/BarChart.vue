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
            Object.keys(dataFromParent).forEach(function(key) {
                if (key === "priority" || key === "severity") {
                    return;
                }
                Object.keys(dataFromParent[key]).forEach(function (keyInner) {
                    let entry = {};
                    entry.value = dataFromParent[key][keyInner];
                    entry.label = keyInner.split("-").pop().trim();
                    dataset.push(entry);
                    if (entry.value > maxValue) {
                        maxValue = entry.value;
                    }
                });
                dataset.push( { label: "", value: 0 } );
            });
            dataset.pop();

            const WIDTH = 300;
            const HEIGHT = 220;
            const INNER_HEIGHT = HEIGHT - 50;
            const BAR_WIDTH = 24;
            const BAR_GAP = 2;

            const scale = d3.scaleLinear()
                .domain([0, maxValue])
                .range([0, INNER_HEIGHT]);

            function y(d) {
                return HEIGHT - scale(d.value);
            }

            function height(d) {
                return scale(d.value);
            }

            d3.select("." + this.attrClass).selectAll("*").remove();

            let chartElement = d3.select("." + this.attrClass)
                .append("svg")
                .attr("width", WIDTH)
                .attr("height", HEIGHT)
                .append("g");

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
                    .attr("transform", (d, i) => `translate(${i * (BAR_WIDTH + BAR_GAP)},${y(d)})`);
  
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
                    .attr("transform", (d, i) => `translate(${i * (BAR_WIDTH + BAR_GAP)},${INNER_HEIGHT})`);

                barEnter
                    .transition(t)
                    .attr("transform", (d, i) => `translate(${i * (BAR_WIDTH + BAR_GAP)},${y(d)})`);
  
                const rect = barEnter.append("rect")
                    .attr("x", 0)
                    .attr("y", 0)
                    .attr("width", BAR_WIDTH)
                    .attr("height", 0);
  
                rect
                    .transition(t)
                    .attr("height", height);
                
                const text = barEnter.append("text")
                    .text(d => d.value === 0 ? "" : d.label)
                    .attr("text-anchor", "start")
                    .attr("dx", BAR_WIDTH / 2)
                    .attr("dy", -2)
                    .attr("transform", "translate(20,0)rotate(270)");
            })(dataset);
        }
    },
    watch: {
        chartData: function(newVal, oldVal) {
            this.drawBarChart();
        }
    }
}
</script>
