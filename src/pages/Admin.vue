<template>
  <div class="row">
    <div class="col-12 mt-5 mb-5">
      <h3 class="text-primary">Add license</h3>

      <div class="form-group">
        <label>Username</label>
        <input type="text" class="form-control" v-model="userName" />
      </div>

      <div class="form-group">
        <label>Limit</label>
        <input type="number" class="form-control" v-model="limit" />
      </div>

      <button type="button" class="btn btn-secondary btn-block" @click="add">Add</button>
    </div>
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
      limit: 10,
    };
  },
  methods: {
    add: function () {
      this.isLoading = true;
      axios({
        url: API_URL + "/license/add",
        method: "POST",
        headers: {
          Auth: localStorage.getItem("token"),
        },
        data: {
          userName: this.userName,
          limit: this.limit,
        },
      }).then((response) => {
        this.isLoading = false;
        let res = response.data;
        // console.log(res);
        if (!res.status) return this.showAlert(res.message, false);
        this.$router.push({ path: "/dashboard" });
      });
    },
  },
};
</script>

<style>
</style>