export default {
  methods: {
    performFilter: function() {
      let filters = this.serverParams.columnFilters;
      let keys = Object.keys(filters);
      if (keys.length === 0) {
        // meaning no filters applied
        this.filteredTickets = this.completeTickets;
        return;
      }
      this.filteredTickets = this.completeTickets.filter(function(entry) {
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
    },
    performSearch: function() {
      let searchInput = this.userSearchInput;
      if (searchInput.trim() === "") {
        return;
      }
      let keysToSearch = [
        "Requestor",
        "ITOwner",
        "daysOpen",
        "Ticket Creation Date"
      ];
      this.filteredTickets = this.filteredTickets.filter(function(entry) {
        let match = false;
        for (let i = 0; i < keysToSearch.length; i++) {
          let key = keysToSearch[i];
          if (entry[key] == searchInput) {
            match = true;
            break;
          }
        }
        return match;
      });
    },
    performSort: function() {
      let field = this.serverParams.sort.field;
      let type = this.serverParams.sort.type;
      if (field === "" || type === "") {
        return;
      }
      let columnFieldType = this.columns.filter(function(entry) {
        return entry.field === field;
      })[0].type;
      this.filteredTickets.sort(function(a, b) {
        a = a[field];
        b = b[field];
        if (columnFieldType !== "number") {
          a = a
            .split("-")
            .pop()
            .trim();
          b = b
            .split("-")
            .pop()
            .trim();
        }
        if (type === "asc") {
          return a < b ? -1 : a > b ? 1 : 0;
        } else {
          // type = "desc"
          return a > b ? -1 : a < b ? 1 : 0;
        }
      });
      // reset page number on sort
      this.serverParams.page = 1;
      this.ticketsToShow = this.filteredTickets.slice(
        0,
        this.serverParams.perPage
      );
    },
    getChartsData: function() {
      let priority = {
        "0 - Unassigned": 0,
        "1 - Low": 0,
        "2 - Medium": 0,
        "3 - High": 0
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
    },
    performFilterSearch: function() {
      // Whenever search or filter is applied, sort and page number are reset
      this.serverParams.sort = {
        field: "", // example: 'name'
        type: "" // 'asc' or 'desc'
      };
      this.serverParams.page = 1;

      this.performFilter();
      this.performSearch();
      this.performSort();
      this.getChartsData();

      this.ticketsToShow = this.filteredTickets.slice(
        0,
        this.serverParams.perPage
      );
    },
    /**
     *
     * Vue-Good-Table event handlers
     */
    onColumnFilter: function(params) {
      // event from vue-good-table
      let filters = params.columnFilters;
      let keys = Object.keys(filters);
      // If some filter is removed, delete the key from the params
      keys.forEach(function(key) {
        if (filters[key] === "") {
          delete filters[key];
        }
      });
      this.serverParams.columnFilters = filters;
      this.performFilterSearch();
    },
    onSortChange: function(params) {
      // event from vue-good-table
      params = params[0];
      let field = params.field;
      let type = params.type;
      this.serverParams.sort = {
        field: field,
        type: type
      };
      this.performSort();
    },
    onPageChange: function(params) {
      // event from vue-good-table
      this.serverParams.page = params.currentPage;
      // change page
      let start = (this.serverParams.page - 1) * this.serverParams.perPage;
      let end = this.serverParams.page * this.serverParams.perPage;
      this.ticketsToShow = this.filteredTickets.slice(start, end);
    }
  }
};
