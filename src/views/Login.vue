<template>
  <div class="login-container">
    <h1>Login</h1>
    <input type="text" name="username" v-model="input.username" placeholder="Username">
    <input type="password" name="password" v-model="input.password" placeholder="Password" />
    <button type="button" v-on:click="login()">Login</button>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      input: {
        username: "",
        password: ""
      }
    }
  },
  methods: {
    login() {
      if (this.input.username.trim() === "" || this.input.password.trim() === "") {
        // show an error message to the user
        return;
      }

      let mockAccounts = this.$parent.mockAccounts;
      for (let i = 0; i < mockAccounts.length; i++) {
        let account = mockAccounts[i];
        // match the credentials with mockAccounts
        if (this.input.username !== account.id || this.input.password !== account.password) {
          continue;
        }
        this.$emit("authenticated", true);
        this.$router.replace({ name: "home" });
      }
    }
  }
}
</script>

