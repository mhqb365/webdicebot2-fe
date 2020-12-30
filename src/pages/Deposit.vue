<template>
  <div class="row">
    <div class="col-12 mt-5 mb-5">
      <h3 class="text-primary">Deposit</h3>

      <label>Deposit address</label>
      <div class="input-group mb-3">
        <input type="text" class="form-control" v-model="user.address" />
        <div class="input-group-append">
          <button
            type="button"
            class="btn btn-secondary"
            v-clipboard="() => user.address"
            v-clipboard:success="clipboardSuccess"
            v-clipboard:error="clipboardError"
          >
            Copy
          </button>
        </div>
      </div>

      <small> ☛ Only send TRX (Tron) to this address </small>
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
        You don’t have any deposit yet
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
                <span v-else >from {{ doc.txid }}</span>
              </td>
              <td>
                {{ doc.amount }}
              </td>
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
      user: {},
      docs: [],
      page: 1,
      totalDocs: 0,
      totalPages: 0,
      hasPrevPage: false,
      hasNextPage: false,
      tronNode: TRON_NODE,
    };
  },
  mounted: function () {
    this.profile();
    this.listDeposit(this.page);
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
    listDeposit: function (page) {
      axios({
        url:
          API_URL +
          "/deposit/fetch/" +
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
  },
};
</script>

<style>
</style>