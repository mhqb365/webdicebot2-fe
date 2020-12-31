<template>
  <div id="app">
    <div class="modal fade" id="notify">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body text-center">
            <h1 class="text-primary">Happy New Year 2021</h1>

            <hr>

            <p>
              ☛ If you already have a valid license before 1/1/2021, go to old
              version:
              <a href="https://old.webdicebot.xyz"
                >https://old.webdicebot.xyz</a
              >
            </p>
          </div>

          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>

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
  mounted: function () {
    $("#notify").modal();
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap");

#app {
  font-family: "Montserrat", sans-serif;
}

.bg-top {
  padding: 3rem 0;
  background: linear-gradient(165deg, #f8f9fa 50%, #fff 50%);
}

.text-purple {
  color: #581fb2;
}

.text-shadow {
  text-shadow: 0 0 15px #17a2b8;
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}

.circle-img {
  position: absolute;
  left: 0;
  top: 10%;
  z-index: -1;
  right: 0;
  margin: 0 auto;
  animation: rotation 6s infinite linear;
}
</style>