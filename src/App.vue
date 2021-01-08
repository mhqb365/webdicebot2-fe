<template>
  <div id="app">
    <div class="modal fade" id="notify">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body">
            <h1 class="text-warning">Important warning</h1>

            <p>
              Recently, some users reported having their money stolen, and they
              blamed Web DiceBot for it. We have received many of these
              accusations since the creation of Web DiceBot two years ago. We do
              not steal your funds. In order to protect your funds, we advise
              that you keep your gambling accounts’ security up to date. Thank
              you all for trusting and using Web DiceBot. Good luck!
            </p>

            <hr />

            <p>
              ☛ If you already have a valid license before 1/1/2021, go to:
              <a href="https://old.webdicebot.xyz" target="_blank"
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