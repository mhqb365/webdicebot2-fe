<template>
  <div class="mt-5 mb-5">
    <p>
      ☛ This is the account only use at webdicebot.xyz. Please do not use
      accounts at dice sites. Because we don't want to have any bad thoughts
      about our project
    </p>

    <div class="form-group">
      <label>Username</label>
      <input type="text" class="form-control" v-model="userName" />
    </div>

    <div class="form-group">
      <label>Email</label>
      <input type="email" class="form-control" v-model="email" />
    </div>

    <div class="form-group">
      <label>Password</label>
      <input type="password" class="form-control" v-model="password" />
    </div>

    <div class="form-group">
      <label>Re-type password</label>
      <input type="password" class="form-control" v-model="rePassword" />
    </div>

    <button
      v-if="isLoading"
      type="button"
      class="btn btn-secondary btn-block"
      disabled
    >
      <span class="spinner-border spinner-border-sm"></span>
    </button>

    <button
      v-else
      type="button"
      class="btn btn-secondary btn-block"
      @click="register"
    >
      Register
    </button>
  </div>
</template>

<script>
import axios from "axios";
import API_URL from "@/utils/apiUrl";

export default {
  data() {
    return {
      isLoading: false,
      userName: "",
      email: "",
      password: "",
      rePassword: "",
    };
  },
  methods: {
    register: function () {
      if (!this.userName || !this.email || !this.password || !this.rePassword)
        return this.showAlert("Please enter your complete information", false);
      if (this.userName.length < 6 || this.password.length < 6)
        return this.showAlert(
          "Username and password must be over 6 characters",
          false
        );
      if (this.password != this.rePassword)
        return this.showAlert("Re-type password incorrect", false);
      this.isLoading = true;
      axios({
        url: API_URL + "/user/register",
        method: "POST",
        data: {
          userName: this.userName,
          email: this.email,
          password: this.password,
        },
      }).then((response) => {
        this.isLoading = false;
        let res = response.data;
        // console.log(res);
        if (!res.status) return this.showAlert(res.message, false);

        localStorage.setItem("userName", this.userName);
        localStorage.setItem("token", res.data.token);
        window.location.href = "/dashboard";
      });
    },
  },
};
</script>

<style>
</style>