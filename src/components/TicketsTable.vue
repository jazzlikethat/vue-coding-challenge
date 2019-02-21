<template>
  <div class="table-container">
    {{ chartsData }}
    <vue-good-table
      :columns="columns"
      :rows="rows"
      @on-column-filter="onColumnFilter"
      styleClass="vgt-table striped"
      :search-options="{
        enabled: true,
        skipDiacritics: true
      }"
      :pagination-options="{
        enabled: true,
        mode: 'pages',
        position: 'top',
        dropdownAllowAll: false
      }"
    />
  </div>
</template>

<script>
/* eslint-disable */
import * as d3 from "d3";
import tickets from '../../data/sample-data.json';

export default {
  name: "TicketsTable",
  data: function() {
    return {
      filteredTickets: [],
      columns: [
        {
          label: 'Requestor',
          field: 'Requestor',
          type: 'number',
          sortable: true
        },
        {
          label: 'Requestor Seniority',
          field: 'RequestorSeniority',
          globalSearchDisabled: true,
          sortable: true,
          sortFn: this.sortValueAfterHyphen,
          formatFn: this.showValueAfterHyphen,
          filterOptions: {
            enabled: true,
            filterDropdownItems: [
              { value: '1 - Junior', text: 'Junior' },  
              { value: '2 - Regular', text: 'Regular' },  
              { value: '3 - Senior', text: 'Senior' },
              { value: '4 - Management', text: 'Management' }
            ]
          }
        },
        {
          label: 'IT Owner',
          field: 'ITOwner',
          type: 'number',
          sortable: true
        },
        {
          label: 'Filed Against',
          field: 'FiledAgainst',
          sortable: true
        },
        {
          label: 'Ticket Type',
          field: 'TicketType',
          sortable: true
        },
        {
          label: 'Severity',
          field: 'Severity',
          globalSearchDisabled: true,
          sortable: true,
          sortFn: this.sortValueAfterHyphen,
          formatFn: this.showValueAfterHyphen,
          filterOptions: {
            enabled: true,
            filterDropdownItems: [
              { value: '1 - Minor', text: 'Minor' },
              { value: '2 - Normal', text: 'Normal' },
              { value: '3 - Major', text: 'Major' },
              { value: '4 - Critical', text: 'Critical' }
            ]
          }
        },
        {
          label: 'Priority',
          field: 'Priority',
          globalSearchDisabled: true,
          sortable: true,
          sortFn: this.sortValueAfterHyphen,
          formatFn: this.showValueAfterHyphen,
          filterOptions: {
            enabled: true,
            filterDropdownItems: [
              { value: '0 - Unassigned', text: 'Unassigned' },
              { value: '1 - Low', text: 'Low' },
              { value: '2 - Medium', text: 'Medium' },
              { value: '3 - High', text: 'High' }
            ]
          }
        },
        {
          label: 'Days Open',
          field: 'daysOpen',
          type: 'number',
          sortable: true
        },
        {
          label: 'Satisfaction',
          field: 'Satisfaction',
          globalSearchDisabled: true,
          sortable: true,
          sortFn: this.sortValueAfterHyphen,
          formatFn: this.showValueAfterHyphen,
          filterOptions: {
            enabled: true,
            filterDropdownItems: [
              { value: '0 - Unknown', text: 'Unknown' },
              { value: '1 - Unsatisfied', text: 'Unsatisfied' },
              { value: '2 - Satisfied', text: 'Satisfied' },
              { value: '3 - Highly satisfied', text: 'Highly satisfied' }
            ]
          }
        },
        {
          label: 'Ticket Creation Date',
          field: 'Ticket Creation Date',
          sortable: true
        }
      ],
      rows: tickets,
      chartsData: {
        priority: {}
      }
    }
  },
  methods: {
    sortValueAfterHyphen(x, y) {
      // x - row1 value for column
      // y - row2 value for column
      x = x.split("-").pop().trim();
      y = y.split("-").pop().trim();
      return (x < y ? -1 : (x > y ? 1 : 0));
    },
    showValueAfterHyphen(inputString) {
      return inputString.split("-").pop().trim();
    },
    onColumnFilter(params) {
      let filters = params.columnFilters;
      let keys = Object.keys(filters);
      keys.forEach(function(key) {
        if (filters[key] === "") {
          delete filters[key];
        }
      });
      keys = Object.keys(filters);
      if (keys.length === 0) {
        this.filteredTickets = tickets;
        this.getChartsData();
        return;
      }
      this.filteredTickets = tickets.filter(function(entry) {
        let match = true;
        for (let i = 0; i < keys.length; i++) {
          let key = keys[i];
          if (entry[key] !== filters[key]) {
            match = false;
            break;
          }
        }
        return match;
      });
      this.getChartsData();
    },
    getChartsData: function () {
      let priority = {
        '0 - Unassigned': 0,
        '1 - Low': 0,
        '2 - Medium': 0,
        '3 - High': 0
      };
      this.filteredTickets.forEach(function(entry) {
        priority[entry.Priority] += 1;
      });

      this.chartsData.priority = priority;

      // draw a priority pie chart
      let priorityDataSet = [];
      Object.keys(priority).forEach(function(key) {
        let entry = {};
        entry.value = priority[key];
        entry.label = key.split("-").pop().trim();
        priorityDataSet.push(entry);
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

      d3.select(".priority-chart").selectAll("*").remove();

      let priorityChart = d3.select(".priority-chart")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        // "g element is a container used to group other SVG elements"
  var g = priorityChart.selectAll(".arc")
      .data(pie(priorityDataSet))
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
      .attrTween("d", tweenPie);
        
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

      // Helper function for animation of pie chart and donut chart
      function tweenPie(b) {
        b.innerRadius = 0;
        var i = d3.interpolate({startAngle: 0, endAngle: 0}, b);
        return function(t) { return arc(i(t)); };
      }

    }
  },
  mounted: function() {
    this.filteredTickets = tickets;
    setTimeout(this.getChartsData);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
