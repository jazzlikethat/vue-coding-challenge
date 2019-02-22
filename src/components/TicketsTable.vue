<template>
  <div class="table-container">
    <pie-chart attr-class="priority-chart" :chart-data="chartsData.priority"></pie-chart>
    <bar-chart attr-class="overall-bar-chart" :chart-data="chartsData"></bar-chart>
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
import tickets from '../../data/sample-data.json';
import PieChart from './PieChart.vue';
import BarChart from './BarChart.vue';

export default {
  name: "TicketsTable",
  components: {
    PieChart,
    BarChart
  },
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
            placeholder: 'Filter',
            filterDropdownItems: [
              { value: "1 - Junior", text: "Junior" },  
              { value: "2 - Regular", text: "Regular" },  
              { value: "3 - Senior", text: "Senior" },
              { value: "4 - Management", text: "Management" }
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
            placeholder: 'Filter',
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
            placeholder: 'Filter',
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
            placeholder: 'Filter',
            filterDropdownItems: [
              { value: "0 - Unknown", text: 'Unknown' },
              { value: "1 - Unsatisfied", text: 'Unsatisfied' },
              { value: "2 - Satisfied", text: 'Satisfied' },
              { value: "3 - Highly satisfied", text: 'Highly satisfied' }
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
        priority: {},
        severity: {},
        seniority: {},
        satisfaction: {}
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
      let severity = {
        "1 - Minor": 0,
        "2 - Normal": 0,
        "3 - Major": 0,
        "4 - Critical": 0
      };
      let seniority = {
        "1 - Junior": 0,
        "2 - Regular": 0,
        "3 - Senior": 0,
        "4 - Management": 0
      };
      let satisfaction = {
        "0 - Unknown": 0,
        "1 - Unsatisfied": 0,
        "2 - Satisfied": 0,
        "3 - Highly satisfied": 0
      };
      this.filteredTickets.forEach(function(entry) {
        priority[entry.Priority] += 1;
        severity[entry.Severity] += 1;
        seniority[entry.RequestorSeniority] += 1;
        satisfaction[entry.Satisfaction] += 1;
      });

      this.chartsData = {
        priority: priority,
        severity: severity,
        seniority: seniority,
        satisfaction: satisfaction
      };

    }
  },
  mounted: function() {
    this.filteredTickets = tickets;
    setTimeout(this.getChartsData);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.table-container {
  padding: 0 10px;
}
</style>
