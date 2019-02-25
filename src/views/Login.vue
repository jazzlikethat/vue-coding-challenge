<template>
  <div class="login-container">
    <form class="form-signin" @submit="onSubmit">
      <label for="inputEmail" class="sr-only">Username</label>
      <input
        type="text"
        id="inputEmail"
        class="form-control"
        v-model="input.username"
        placeholder="Username"
        required
        autofocus
      />
      <label for="inputPassword" class="sr-only">Password</label>
      <input
        type="password"
        id="inputPassword"
        class="form-control"
        v-model="input.password"
        placeholder="Password"
        required
      />
      <button class="btn btn-lg btn-primary btn-block" type="submit">
        Sign in
      </button>
      <div class="error-message" v-show="showErrorMessage">
        <span>Incorrect username or password. Please try again.</span>
      </div>
    </form>
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
      },
      showErrorMessage: false
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();

      let authenticated = false;
      let mockAccounts = this.$parent.mockAccounts;
      for (let i = 0; i < mockAccounts.length; i++) {
        let account = mockAccounts[i];
        // match the credentials with mockAccounts
        if (
          this.input.username !== account.id ||
          this.input.password !== account.password
        ) {
          continue;
        }
        authenticated = true;
        this.$emit("authenticated", authenticated);
        this.$router.replace({ name: "home" });
      }

      if (!this.authenticated) {
        this.showErrorMessage = true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.login-container {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;

  .error-message {
    margin-top: 15px;
    font-size: 85%;
  }
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
