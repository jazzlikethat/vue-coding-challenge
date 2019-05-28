import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import BootstrapVue from "bootstrap-vue";
import VueGoodTablePlugin from "vue-good-table";
import JsonExcel from 'vue-json-excel';

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "vue-good-table/dist/vue-good-table.css";

Vue.use(BootstrapVue);
Vue.use(VueGoodTablePlugin);
Vue.component('downloadExcel', JsonExcel);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
