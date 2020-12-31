<template>
  <div class="row">
    <div class="col-12 mt-5 mb-5">
      <h3 class="text-primary">Withdraw</h3>

      <div class="form-group">
        <label>Withdraw address</label>
        <input type="text" class="form-control" v-model="withdrawAddress" />
      </div>

      <div class="form-group">
        <label>Amount</label>
        <input type="number" class="form-control" v-model="withdrawAmount" />
      </div>

      <p>Balance: {{ Number(user.balance).toFixed(6) }} TRX</p>

      <button
        v-if="isLoading"
        type="button"
        class="btn btn-secondary btn-block mb-3"
        disabled
      >
        <span class="spinner-border spinner-border-sm"></span>
      </button>

      <button
        v-else
        type="button"
        class="btn btn-secondary btn-block mb-3"
        @click="request"
      >
        Withdraw
      </button>

      <small> ☛ Withdraw fee 1 TRX (Tron) </small>
    </div>

    <div class="col-12 mt-5 mb-5">
      <h3 class="text-primary">Send to user</h3>

      <div class="form-group">
        <label>Username</label>
        <input type="text" class="form-control" v-model="tipUserName" />
      </div>

      <div class="form-group">
        <label>Amount</label>
        <input type="number" class="form-control" v-model="tipAmount" />
      </div>

      <button
        v-if="isLoading"
        type="button"
        class="btn btn-secondary btn-block mb-3"
        disabled
      >
        <span class="spinner-border spinner-border-sm"></span>
      </button>

      <button
        v-else
        type="button"
        class="btn btn-secondary btn-block mb-3"
        @click="tip"
      >
        Send
      </button>
    </div>

    <div class="col-12 mt-5 mb-5">
      <h3 class="text-primary">History</h3>

      <p>Total: {{ totalDocs }} | Pages: {{ totalPages }}</p>

      <ul class="pagination">
        <li v-if="hasPrevPage" class="page-item">
          <button type="button" class="page-link" @click="license(page - 1)">
            Previous
          </button>
        </li>
        <li class="page-item active">
          <button type="button" class="page-link">{{ page }}</button>
        </li>
        <li v-if="hasNextPage" class="page-item">
          <button type="button" class="page-link" @click="license(page + 1)">
            Next
          </button>
        </li>
      </ul>

      <div v-if="docs.length == 0" class="text-center">
        ¯\_(ツ)_/¯
        <br />
        You don’t have any withdraw yet
      </div>

      <div v-else class="table-responsive-sm">
        <table class="table table-bordered table-hover">
          <thead>
            <tr>
              <th>Time</th>
              <th>Txid</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="doc in docs" :key="doc._id">
              <td>
                {{
                  new Date(doc.time).toLocaleString("en-GB", {
                    timeZone: "UTC",
                  })
                }}
                (GMT+0)
              </td>
              <td>
                <a
                  v-if="doc.txid.length == 64"
                  :href="tronNode + doc.txid"
                  target="_blank"
                  >{{ doc.txid }}</a
                >
                <span v-else>to {{ doc.txid }}</span>
              </td>
              <td>{{ doc.amount }} TRX</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import API_URL from "@/utils/apiUrl";
import TRON_NODE from "@/utils/tronNode";

export default {
  data() {
    return {
      isLoading: false,
      user: {},
      docs: [],
      page: 1,
      totalDocs: 0,
      totalPages: 0,
      hasPrevPage: false,
      hasNextPage: false,
      withdrawAddress: "",
      withdrawAmount: 0,
      tipUserName: "",
      tipAmount: 0,
      tronNode: TRON_NODE,
    };
  },
  mounted: function () {
    this.profile();
    this.listWithdraw(this.page);
  },
  methods: {
    profile: function () {
      axios({
        url: API_URL + "/user/profile/" + localStorage.getItem("userName"),
        method: "GET",
        headers: {
          Auth: localStorage.getItem("token"),
        },
      }).then((response) => {
        let res = response.data;
        // console.log(res);
        this.user = res.data;
      });
    },
    listWithdraw: function (page) {
      axios({
        url:
          API_URL +
          "/withdraw/fetch/" +
          localStorage.getItem("userName") +
          "?page=" +
          page,
        method: "GET",
        headers: {
          Auth: localStorage.getItem("token"),
        },
      }).then((response) => {
        let res = response.data;
        // console.log(res);
        this.docs = res.data.docs;
        this.page = res.data.page;
        this.totalDocs = res.data.totalDocs;
        this.totalPages = res.data.totalPages;
        this.hasPrevPage = res.data.hasPrevPage;
        this.hasNextPage = res.data.hasNextPage;
      });
    },
    request: function (page) {
      if (!this.withdrawAddress || !this.withdrawAmount)
        return this.showAlert("Please enter your complete information", false);
      if (Number(this.withdrawAmount) == 0)
        return this.showAlert("Amount must more than 0", false);
      if (this.withdrawAmount < this.user.balance)
        return this.showAlert("Balance not enough", false);
      this.isLoading = true;
      axios({
        url: API_URL + "/withdraw/request/" + localStorage.getItem("userName"),
        method: "POST",
        headers: {
          Auth: localStorage.getItem("token"),
        },
        data: {
          address: this.withdrawAddress,
          amount: this.withdrawAmount,
        },
      }).then((response) => {
        this.isLoading = false;
        let res = response.data;
        // console.log(res);
        if (res.status) {
          this.profile();
          this.listWithdraw(this.page);
        }
      });
    },
    tip: function (page) {
      if (!this.tipUserName || !this.tipAmount)
        return this.showAlert("Please enter your complete information", false);
      if (Number(this.tipAmount) == 0)
        return this.showAlert("Amount must more than 0", false);
      if (Number(this.tipAmount) > this.user.balance)
        return this.showAlert("Balance not enough", false);
      this.isLoading = true;
      axios({
        url: API_URL + "/withdraw/tip/" + localStorage.getItem("userName"),
        method: "POST",
        headers: {
          Auth: localStorage.getItem("token"),
        },
        data: {
          userName: this.tipUserName,
          amount: this.tipAmount,
        },
      }).then((response) => {
        this.isLoading = false;
        let res = response.data;
        // console.log(res);
        if (res.status) {
          this.profile();
          this.listWithdraw(this.page);
        }
      });
    },
  },
};
</script>

<style>
</style>