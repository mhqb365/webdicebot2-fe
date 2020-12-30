<template>
  <div class="row">
    <div class="col-12 mt-5 mb-5">
      <h3 class="text-primary">Bot installer</h3>

      <div class="card p-2">
        <div class="form-group">
          <select class="form-control" v-model="select" @change="changeBot">
            <option v-for="bot in bots" :key="bot.name" :value="bot.name">
              {{ bot.name }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <textarea class="form-control" rows="5" v-model="content"></textarea>
        </div>

        <button
          type="button"
          class="btn btn-secondary btn-block"
          v-clipboard="() => content"
          v-clipboard:success="clipboardSuccess"
          v-clipboard:error="clipboardError"
        >
          Copy
        </button>
      </div>
    </div>

    <div class="col-12 mt-5 mb-5">
      <h3 class="text-primary">User infomation</h3>

      <ul class="list-group mb-3">
        <li class="list-group-item">User: {{ user.userName }}</li>
        <li class="list-group-item">Email: {{ user.email }}</li>
        <li class="list-group-item">
          Balance: {{ Number(user.balance).toFixed(6) }} TRX
        </li>
      </ul>
    </div>

    <div class="col-12 mt-5 mb-5">
      <h3 class="text-primary">Buy license</h3>

      <div class="form-group">
        <label>How many day you wanna? (Min: 10)</label>
        <input
          type="number"
          class="form-control"
          v-model="limit"
          @change="calculator"
        />
      </div>

      <p>You will pay: {{ Number(totalTron).toFixed(6) }} TRX</p>

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
        @click="order"
      >
        Buy
      </button>
    </div>

    <div class="col-12 mt-5 mb-5">
      <h3 class="text-primary">Your licenses</h3>

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
        You don’t have any licenses yet
      </div>

      <div v-else class="table-responsive-sm">
        <table class="table table-bordered table-hover">
          <thead>
            <tr>
              <th>Status</th>
              <th>License</th>
              <th>Start</th>
              <th>End</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="doc in docs" :key="doc._id">
              <td>
                {{
                  (Date.now() - new Date(doc.time)) / 864e5 > doc.limit
                    ? "Expired"
                    : doc.locked
                    ? "Locked"
                    : "Working"
                }}
              </td>
              <td>{{ doc.value }}</td>
              <td>
                {{
                  new Date(doc.time).toLocaleString("en-GB", {
                    timeZone: "UTC",
                  })
                }}
                (GMT+0)
              </td>
              <td>
                {{
                  new Date(
                    Number(864e5 * doc.limit) + Number(new Date(doc.time))
                  ).toLocaleString("en-GB", {
                    timeZone: "UTC",
                  })
                }}
                (GMT+0)
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

export default {
  data() {
    return {
      isLoading: true,
      user: {},
      docs: [],
      page: 1,
      totalDocs: 0,
      totalPages: 0,
      hasPrevPage: false,
      hasNextPage: false,
      priceTronPerDay: 0,
      limit: 10,
      totalTron: 0,
      bots: [
        {
          name: "Select bot you need",
          value:
            "Content bot will be show in there when you choose. Copy it then paste to Console of Developer tools in your browser",
        },
        {
          name: "999dice.com",
          value: `const BOT_URL = '${API_URL}'
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL+'/bot/init/999dice'
document.body.appendChild(script)`,
        },
        {
          name: "betfury.io - dice",
          value: `const BOT_URL = '${API_URL}'
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL+'/bot/init/betfury-dice'
document.body.appendChild(script)`,
        },
        {
          name: "bitsler.com - boom",
          value: `const BOT_URL = '${API_URL}'
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL+'/bot/init/bitsler-boom'
document.body.appendChild(script)`,
        },
        {
          name: "bitsler.com - dice",
          value: `const BOT_URL = '${API_URL}'
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL+'/bot/init/bitsler-dice'
document.body.appendChild(script)`,
        },
        {
          name: "bitvest.io - dice",
          value: `const BOT_URL = '${API_URL}'
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL+'/bot/init/bitvest'
document.body.appendChild(script)`,
        },
        {
          name: "casinoroyale.bet - dice classic",
          value: `const BOT_URL = '${API_URL}'
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL+'/bot/init/casinoroyale-dice-classic'
document.body.appendChild(script)`,
        },
        {
          name: "crypto.games - dice",
          value: `const BOT_URL = '${API_URL}'
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL+'/bot/init/crypto-games-dice'
document.body.appendChild(script)`,
        },
        {
          name: "duckdice.io - faucet mode",
          value: `const BOT_URL = '${API_URL}'
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL+'/bot/init/duckdice-faucet-mode'
document.body.appendChild(script)`,
        },
        {
          name: "duckdice.io - main mode",
          value: `const BOT_URL = '${API_URL}'
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL+'/bot/init/duckdice'
document.body.appendChild(script)`,
        },
        {
          name: "duckdice.io - new year mode",
          value: `const BOT_URL = '${API_URL}'
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL+'/bot/init/duckdice-new-year-mode'
document.body.appendChild(script)`,
        },
        {
          name: "freebitco.in",
          value: `const BOT_URL = '${API_URL}'
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL+'/bot/init/freebitco'
document.body.appendChild(script)`,
        },
        {
          name: "gigabet.com - dice",
          value: `const BOT_URL = '${API_URL}'
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL+'/bot/init/gigabet-dice'
document.body.appendChild(script)`,
        },
        {
          name: "luckyfish.io - dice classic",
          value: `const BOT_URL = '${API_URL}'
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL+'/bot/init/luckyfish-dice-classic'
document.body.appendChild(script)`,
        },
        {
          name: "luckyfish.io - limbo",
          value: `const BOT_URL = '${API_URL}'
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL+'/bot/init/luckyfish-limbo'
document.body.appendChild(script)`,
        },
        {
          name: "nanogames.io - hash dice",
          value: `const BOT_URL = '${API_URL}'
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL+'/bot/init/nanogames-hash-dice'
document.body.appendChild(script)`,
        },
        {
          name: "paradice.in - dice",
          value: `const BOT_URL = '${API_URL}'
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL+'/bot/init/paradice'
document.body.appendChild(script)`,
        },
        {
          name: "primedice.com",
          value: `const BOT_URL = '${API_URL}'
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL+'/bot/init/primedice'
document.body.appendChild(script)`,
        },
        {
          name: "stake.com - dice",
          value: `const BOT_URL = '${API_URL}'
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL+'/bot/init/stake-dice'
document.body.appendChild(script)`,
        },
        {
          name: "trustdice.win - dice",
          value: `const BOT_URL = '${API_URL}'
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL+'/bot/init/trustdice-dice'
document.body.appendChild(script)`,
        },
        {
          name: "wixiplay.io - dice",
          value: `const BOT_URL = '${API_URL}'
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL+'/bot/init/wixiplay-dice'
document.body.appendChild(script)`,
        },
        {
          name: "wolf.bet - dice",
          value: `const BOT_URL = '${API_URL}'
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL+'/bot/init/wolf'
document.body.appendChild(script)`,
        },
        {
          name: "yolodice.com",
          value: `const BOT_URL = '${API_URL}'
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = BOT_URL+'/bot/init/yolodice'
document.body.appendChild(script)`,
        },
      ],
      select: "Select bot you need",
      content:
        "Content bot will be show in there when you choose. Copy it then paste to Console of Developer tools in your browser",
    };
  },
  mounted: function () {
    this.profile();
    this.license(this.page);
    this.fetchPriceTron();
    setInterval(() => this.fetchPriceTron(), 6e4);
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
    license: function (page) {
      axios({
        url:
          API_URL +
          "/license/fetch/" +
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
    fetchPriceTron: function () {
      this.isLoading = true;
      axios({
        url: "https://api.binance.com/api/v3/ticker/price?symbol=TRXUSDT",
        method: "GET",
      })
        .then((response) => {
          this.isLoading = false;
          let data = response.data;
          // console.log(data);
          this.priceTronPerDay = 2 / Number(data.price) / 1e1;
          this.calculator()
        })
        .catch((error) => {
          console.error(error);
        });
    },
    calculator: function () {
      this.totalTron = this.limit * this.priceTronPerDay;
    },
    order: function () {
      this.isLoading = true;
      axios({
        url: API_URL + "/license/order/" + localStorage.getItem("userName"),
        method: "POST",
        headers: {
          Auth: localStorage.getItem("token"),
        },
        data: {
          limit: this.limit,
          price: this.totalTron,
        },
      }).then((response) => {
        this.isLoading = false;
        let res = response.data;
        // console.log(res);
        if (!res.status) return this.showAlert(res.message, false);
        this.profile();
        this.license(this.page);
      });
    },
    changeBot: function () {
      this.bots.map((bot) => {
        if (bot.name == this.select) return (this.content = bot.value);
      });
    },
  },
};
</script>

<style>
</style>