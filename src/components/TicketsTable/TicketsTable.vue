<template>
  <div class="table-container">
    <div class="search-input">
      <b-button variant="outline-secondary" v-b-modal.new-ticket-modal
        >Create ticket</b-button
      >
      <input
        type="text"
        class="form-control"
        v-model="userSearchInput"
        placeholder="Search tickets"
      />
    </div>
    <!-- Modal Component -->
    <b-modal
      id="new-ticket-modal"
      title="Create new ticket"
      ref="myModalRef"
      no-close-on-backdrop
      no-close-on-esc
      hide-footer
    >
      <new-ticket
        v-on:new-ticket-data="saveNewTicket"
        v-on:close-modal="closeModal"
        :tickets-length="ticketsLength"
      ></new-ticket>
    </b-modal>
    <pie-chart
      attr-class="priority-chart"
      :chart-data="chartsData.priority"
    ></pie-chart>
    <bar-chart
      attr-class="overall-bar-chart"
      :chart-data="chartsData"
    ></bar-chart>
    <vue-good-table
      mode="remote"
      :pagination-options="{
        enabled: true,
        mode: 'pages',
        position: 'top',
        perPage: 10,
        perPageDropdown: [10],
        dropdownAllowAll: false
      }"
      :totalRows="filteredTickets.length"
      :columns="columns"
      :rows="ticketsToShow"
      @on-column-filter="onColumnFilter"
      @on-sort-change="onSortChange"
      @on-page-change="onPageChange"
      styleClass="vgt-table striped bordered condensed"
    />
  </div>
</template>

<script>
import debounce from "lodash.debounce";
import ticketsFromJSONFile from "@/data/sample-data-2.json";
import PieChart from "../PieChart.vue";
import BarChart from "../BarChart.vue";
import NewTicket from "../NewTicket.vue";
import ColumnOptions from "./ColumnOptions.js";
import SortFilterSearch from "./SortFilterSearch.js";

export default {
  name: "TicketsTable",
  components: {
    PieChart,
    BarChart,
    NewTicket
  },
  mixins: [ColumnOptions, SortFilterSearch],
  data: function() {
    return {
      ticketsLength: 0,
      completeTickets: [],
      filteredTickets: [],
      ticketsToShow: [],
      chartsData: {
        priority: {},
        severity: {},
        seniority: {},
        satisfaction: {}
      },
      userSearchInput: "",
      serverParams: {
        // a map of column filters example: {name: 'john', age: '20'}
        columnFilters: {},
        sort: {
          field: "", // example: 'name'
          type: "" // 'asc' or 'desc'
        },

        page: 1, // what page I want to show
        perPage: 10 // how many items I'm showing per page
      }
    };
  },
  methods: {
    saveNewTicket: function(formData) {
      this.$refs.myModalRef.hide();
      this.ticketsLength += 1;
      this.completeTickets.unshift(formData);

      // reset server params
      this.serverParams.columnFilters = {};
      this.serverParams.sort = {
        field: "", // example: 'name'
        type: "" // 'asc' or 'desc'
      };
      this.serverParams.page = 1;
      this.userSearchInput = "";
    },
    closeModal: function() {
      this.$refs.myModalRef.hide();
    },
    debounceSearch: debounce(function() {
      this.performFilterSearch();
    }, 500)
  },
  mounted: function() {
    // Fetch tickets form localStorage
    let localTickets = [];
    if (localStorage.getItem("local-tickets")) {
      try {
        localTickets = JSON.parse(localStorage.getItem("local-tickets"));
      } catch (e) {
        localStorage.removeItem("local-tickets");
      }
    }
    // combine json tickets and local tickets
    this.completeTickets = localTickets.concat(ticketsFromJSONFile);

    // On first render, filteredTickets and completeTickets are same
    this.filteredTickets = this.completeTickets;
    this.ticketsToShow = this.filteredTickets.slice(0, 10); // default pagination
    this.ticketsLength = this.completeTickets.length;
    setTimeout(this.getChartsData);
  },
  watch: {
    userSearchInput: function() {
      this.debounceSearch();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.table-container {
  padding: 45px 10px;
  position: relative;

  .search-input {
    position: absolute;
    right: 20px;
    top: 5px;

    button {
      margin-bottom: 5px;
      margin-right: 5px;
    }

    input {
      display: inline-block;
      width: 250px;
      max-width: 50%;
    }
  }
}
</style>
