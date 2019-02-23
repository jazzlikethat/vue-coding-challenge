<template>
  <div id="app">
    <div class="logout">
      <router-link v-if="authenticated" to="/login" v-on:click.native="logout()" replace>Logout</router-link>
    </div>
    <router-view @authenticated="setAuthenticated" />
  </div>
</template>

<script>
import usersObj from '../data/User.json';
export default {
  name: 'App',
  data() {
    return {
      authenticated: false,
      mockAccounts: usersObj
    }
  },
  mounted() {
    if (!this.authenticated) {
      this.$router.replace({ name: "login" });
    }
  },
  methods: {
    setAuthenticated(status) {
      this.authenticated = status;
    },
    logout() {
      this.authenticated = false;
    }
  }
}
</script>


<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  .logout {
    text-align: right;
    margin: 10px 15px 0 0;
  }
}
</style>
