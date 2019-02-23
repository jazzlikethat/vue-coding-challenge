export default {
    data: function() {
        return {
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
            ]
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
        }
    }
}
