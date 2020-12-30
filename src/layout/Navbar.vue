<template>
  <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
    <router-link to="/" class="navbar-brand">
      <img
        class=""
        width="64px"
        src="/static/logo.png"
      />
    </router-link>

    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#collapsibleNavbar"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="collapsibleNavbar">
      <ul class="navbar-nav">
        <li v-if="!isLogin" class="nav-item">
          <router-link to="/register" class="nav-link">Register</router-link>
        </li>

        <li v-if="!isLogin" class="nav-item">
          <router-link to="/login" class="nav-link">Login</router-link>
        </li>

        <li v-if="isLogin" class="nav-item">
          <router-link to="/dashboard" class="nav-link">Dashboard</router-link>
        </li>

        <li v-if="isLogin" class="nav-item">
          <router-link to="/deposit" class="nav-link">Deposit</router-link>
        </li>

        <li v-if="isLogin" class="nav-item">
          <router-link to="/withdraw" class="nav-link">Withdraw</router-link>
        </li>

        <li v-if="isLogin" class="nav-item">
          <span type="button" class="nav-link" @click="logout">Logout</span>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  mounted: function () {
    if (this.isLogin) this.checkDeposit();
  },
};
</script>

<style>
</style>