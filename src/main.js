// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './plugins/v-clipboard'
import './plugins/vue-sweetalert2'
import API_URL from './utils/apiUrl'
import axios from 'axios'

Vue.config.productionTip = false

Vue.mixin({
  data() {
    return {
      isLogin: false,
      user: {}
    }
  },
  mounted: function () {
    localStorage.getItem("userName") && localStorage.getItem("token")
      ? (this.isLogin = true)
      : (this.isLogin = false)

      if (this.isLogin) {
        this.profile()
      }
  },
  methods: {
    logout: function () {
      localStorage.removeItem('userName')
      localStorage.removeItem('token')
      window.location.href = '/'
    },
    showAlert: function (message, type = true) {
      this.$swal.fire({
        icon: type ? "success" : "error",
        title: message,
        showConfirmButton: true
      });
    },
    clipboardSuccess: function ({ value }) {
      if (value == null) return this.showAlert("Empty value", false)
      this.showAlert("Copy success")
    },
    clipboardError: function () {
      this.showAlert("Copy fail", false)
    },
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
    checkDeposit: function () {
      axios({
        url: API_URL + '/deposit/check/' + localStorage.getItem('userName'),
        method: 'GET',
        headers: {
          Auth: localStorage.getItem("token"),
        },
      }).then(response => {
        let res = response.data
        // console.log(res)
        if (res.status) {
          if (res.data.change) window.location.reload()
        }
      })
    },
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})