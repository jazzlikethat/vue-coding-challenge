<template>
  <div class="home">
    <div class="chart overall-bar-chart"></div>
    <div class="chart priority-chart"></div>
    <TicketsTable />
  </div>
</template>

<script>
// @ is an alias to /src
import TicketsTable from "@/components/TicketsTable/TicketsTable.vue";

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
  }
};
</script>

<style>
.chart {
  display: inline-block;
}
.arc text,
.overall-bar-chart text {
  font: 10px sans-serif;
}

.arc path {
  stroke: #fff;
}

@media screen and (max-width: 800px) {
  .priority-chart {
    display: none;
  }
}
</style>
