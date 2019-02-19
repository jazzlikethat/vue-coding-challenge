<template>
  <div class="table-container">
    <vue-good-table
      :columns="columns"
      :rows="rows"/>
  </div>
</template>

<script>

import tickets from '../../data/sample-data.json';

export default {
  name: "TicketsTable",
  data() {
    return {
      columns: [
        {
          label: 'Requestor',
          field: 'Requestor',
          type: 'number',
        },
        {
          label: 'Requestor Seniority',
          field: 'RequestorSeniority',
          type: 'string',
        },
        {
          label: 'IT Owner',
          field: 'ITOwner',
          type: 'number',
        },
        {
          label: 'Filed Against',
          field: 'FiledAgainst',
          type: 'string',
        },
        {
          label: 'Ticket Type',
          field: 'TicketType',
          type: 'string',
        },
        {
          label: 'Severity',
          field: 'Severity',
          type: 'string',
        },
        {
          label: 'Priority',
          field: 'Priority',
          type: 'string',
        },
        {
          label: 'Days Open',
          field: 'daysOpen',
          type: 'number',
        },
        {
          label: 'Satisfaction',
          field: 'Satisfaction',
          type: 'string',
        },
        {
          label: 'Ticket Creation Date',
          field: 'Ticket Creation Date',
          type: 'string',
        },
      ],
      rows: tickets
    }
  }
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
