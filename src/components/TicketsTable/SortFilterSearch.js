export default {
    methods: {
        onColumnFilter(params) {
            let filters = params.columnFilters;
            let keys = Object.keys(filters);
            // If some filter is removed, delete the key from the params
            keys.forEach(function(key) {
              if (filters[key] === "") {
                delete filters[key];
              }
            });
            keys = Object.keys(filters);
            if (keys.length === 0) { // meaning no filters applied
              this.filteredTickets = this.completeTickets;
              this.getChartsData();
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
      
        },
    }
}