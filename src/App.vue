<template>
  <div id="app">
    <Top />

    <Navbar />

    <div class="container mt-4 mb-4">
      <router-view />
    </div>

    <Bottom />
  </div>
</template>

<script>
import Top from "@/layout/Top";
import Navbar from "@/layout/Navbar";
import Bottom from "@/layout/Bottom";

export default {
  name: "App",
  components: {
    Top,
    Navbar,
    Bottom,
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap');

#app {
  font-family: 'Montserrat', sans-serif;
}

.text-purple {
  color: #581fb2;
}
</style>