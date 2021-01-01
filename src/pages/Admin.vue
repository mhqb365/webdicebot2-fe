<template>
  <div class="row">
    <div class="col-12 mt-5 mb-5">
      <h3 class="text-primary">Summary</h3>

      <ul class="pagination">
        <li
          class="page-item"
          v-bind:class="[state == 'ThisMonth' ? 'active' : '']"
        >
          <button class="page-link" @click="summary('ThisMonth')">
            This month
          </button>
        </li>
        <li
          class="page-item"
          v-bind:class="[state == 'LastMonth' ? 'active' : '']"
        >
          <button class="page-link" @click="summary('LastMonth')">
            Last month
          </button>
        </li>
        <li class="page-item" v-bind:class="[state == 'Total' ? 'active' : '']">
          <button class="page-link" @click="summary('Total')">Total</button>
        </li>
      </ul>

      <div class="row">
        <div class="col-md-3 mb-3">
          <div class="card p-4">
            Income
            <h4 class="text-success">{{ Number(income).toFixed(6) }} TRX</h4>
          </div>
        </div>
        <div class="col-md-3 mb-3">
          <div class="card p-4">
            License
            <h4 class="text-purple">{{ license }}</h4>
          </div>
        </div>
        <div class="col-md-3 mb-3">
          <div class="card p-4">
            Pay
            <h4 class="text-warning">{{ pay }}</h4>
          </div>
        </div>
        <div class="col-md-3 mb-3">
          <div class="card p-4">
            Free
            <h4 class="text-danger">{{ free }}</h4>
          </div>
        </div>
      </div>
    </div>

    <div class="col-12 mt-5 mb-5">
      <h3 class="text-primary">Add free license</h3>

      <div class="form-group">
        <label>Username</label>
        <input type="text" class="form-control" v-model="userName" />
      </div>

      <div class="form-group">
        <label>Limit</label>
        <input type="number" class="form-control" v-model="limit" />
      </div>

      <button type="button" class="btn btn-secondary btn-block" @click="add">
        Add
      </button>
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
      state: "ThisMonth",
      income: 0,
      license: 0,
      pay: 0,
      free: 0,
    };
  },
  mounted: function () {
    this.summary(this.state);
  },
  methods: {
    summary: function (state) {
      this.state = state;
      this.income = 0;
      this.license = 0;
      this.pay = 0;
      this.free = 0;

      this.isLoading = true;
      axios({
        url: API_URL + "/license/summary" + state,
        method: "GET",
        headers: {
          Auth: localStorage.getItem("token"),
        },
      }).then((response) => {
        this.isLoading = false;
        let res = response.data;
        console.log(res);
        if (!res.status) return this.showAlert(res.message, false);
        // window.location.reload();
        res.data.map((d) => {
          this.income += d.price;
          this.license += 1;
          d.type == "Pay" ? (this.pay += 1) : (this.free += 1);
        });
      });
    },
    add: function () {
      if (!this.userName)
        return this.showAlert("Please enter your complete information", false);
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
        window.location.reload();
      });
    },
  },
};
</script>

<style>
</style>