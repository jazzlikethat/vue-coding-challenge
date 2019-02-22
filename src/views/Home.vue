<template>
  <div class="home">
    <div class="chart priority-chart"></div>
    <div class="chart severity-chart"></div>
    <div class="chart satisfaction-chart"></div>
    <div class="chart seniority-chart"></div>
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
  },
  mounted() {
    // Edge case: On reload
    if (!this.$parent.authenticated) {
      this.$router.replace({ name: "login" });
    }
  },
};
</script>

<style>
.chart {
  width: 300px;
  display: inline-block;
}
.arc text {
  font: 10px sans-serif;
  text-anchor: middle;
}

.arc path {
  stroke: #fff;
}
</style>

