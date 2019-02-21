<template>
  <div class="home">
    <svg class="priority-chart"></svg>
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

<style>
.arc text {
  font: 10px sans-serif;
  text-anchor: middle;
}

.arc path {
  stroke: #fff;
}
</style>

