let dataSet = Object.values(priority);
      let svgWidth = 500;
      let svgHeight = 200;
      let barPadding = 5;
      let barWidth = 40;

      let yScale = d3.scaleLinear()
          .domain([0, d3.max(dataSet)])
          .range([0, svgHeight]);

      let yAxis = d3.axisLeft().scale(yScale);
      // let xAxis = d3.axisBottom();

      d3.select(".priority-chart").selectAll("*").remove();
      d3.select(".priority-chart")
        .attr("height", "200")
        .selectAll("rect")
        .data(dataSet)
          .enter()
          .append("rect")
          .attr("y", function(d) {
            return svgHeight - yScale(d) + 10;
          })
          .attr("x", function(d, i) {
            return barWidth*i;
          })
          .attr("height", function(d) {
            return (d === 0) ? 0 : yScale(d) - 10;
          })
          .attr("width", barWidth - barPadding)
          .attr("fill", "orange");

      d3.select(".priority-chart")
        .selectAll("text")
          .data(dataSet)
          .enter()
          .append("text")
          .text(function(d) {
            return d;
          })
          .attr("y", function(d, i) {
            return (d === 0) ? svgHeight - 5 : svgHeight - yScale(d) + 8;
          })
          .attr("x", function(d, i) {
            return barWidth * i + 10;
          })
          .attr("fill", "#A64C38")
          .attr("style", "font-size: 10px");

      d3.select(".priority-chart")
        .append("g")
        .attr("transform", "translate(50, 10)")
        .call(yAxis);