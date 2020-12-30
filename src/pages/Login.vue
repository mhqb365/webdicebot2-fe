<template>
  <div class="mt-5 mb-5">
    <div class="form-group">
      <label>Username</label>
      <input type="text" class="form-control" v-model="userName" />
    </div>

    <div class="form-group">
      <label>Password</label>
      <input type="password" class="form-control" v-model="password" />
    </div>

    <button type="button" class="btn btn-secondary btn-block" @click="login">
      Login
    </button>
  </div>
</template>

<script>
import axios from "axios";
import API_URL from "@/utils/apiUrl";

export default {
  data() {
    return {
      userName: "",
      password: "",
    };
  },
  methods: {
    login: function () {
      if (!this.userName || !this.password)
        return this.showAlert("Please enter your complete information", false);
      if (this.userName.length < 6 || this.password.length < 6)
        return this.showAlert(
          "Username and password must be over 6 characters",
          false
        );
      axios({
        url: API_URL + "/user/login",
        method: "POST",
        data: {
          userName: this.userName,
          password: this.password,
        },
      }).then((response) => {
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