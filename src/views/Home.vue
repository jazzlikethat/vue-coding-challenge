<template>
  <div class="home">
    <TicketsTable />
  </div>
</template>

<script>
// @ is an alias to /src
import TicketsTable from "@/components/TicketsTable.vue";

export default {
  name: "home",
  components: {
    TicketsTable
  }
};
</script>
