<template>
  <div class="row">
    <div class="col-12 mt-5 mb-5">
      <h3 class="text-primary text-center">Features</h3>
      
      <div class="row text-center">
        <div class="col-6 p-4">
          <h1 class="text-success"><i class="fas fa-globe"></i></h1>
          <h3>Multiple sites</h3>
          <p>Supports a multitude of sites dice and currencies</p>
        </div>

        <div class="col-6 p-4">
          <h1 class="text-purple"><i class="fas fa-desktop"></i></h1>
          <h3>Device friendlly</h3>
          <p>Ready to use on any desktop os have an browser</p>
        </div>

        <div class="col-6 p-4">
          <h1 class="text-warning"><i class="fas fa-code"></i></h1>
          <h3>Programmer</h3>
          <p>You can using strategy code with Lua or JavaScript</p>
        </div>

        <div class="col-6 p-4">
          <h1 class="text-success"><i class="fas fa-user-shield"></i></h1>
          <h3>Professional</h3>
          <p>Show full bet details and easy to set up and use</p>
        </div>

        <div class="col-6 p-4">
          <h1 class="text-purple"><i class="fas fa-tasks"></i></h1>
          <h3>Simple and faster</h3>
          <p>Licenses manager simple, buy license faster and easy</p>
        </div>

        <div class="col-6 p-4">
          <h1 class="text-warning"><i class="fas fa-dollar-sign"></i></h1>
          <h3>Cheap price</h3>
          <p>Use with only 0.2$ per days</p>
        </div>

        <div class="circle-img d-none d-sm-block">
          <img src="/static/circle.png" />
        </div>
      </div>
    </div>

    <div class="col-sm-12 col-md-12 mt-5 mb-5">
      <h3 class="text-primary">Terms and conditions</h3>

      <p>
        The following user agreement is to read in its entirety prior to the use
        of Web DiceBot's products and services. The agreement constitutes a
        legal binding between the user and all services found on the web domain
        webdicebot.xyz
      </p>

      <pre class="bg-light">
1. You must know what is dice/gambling
2. You must know control your money in dice/gambling
3. You have to differentiate between dice/gambling tools with strategy script/code for dice/gambling
4. You must know the Lua (v5.3) programming language or Javascript when manipulating the script/code
5. You must have license key when use Web DiceBot (buy license key in dashboard when you join system)
6. Do not share your license if you do not want anyone use bot by your money
7. Only use the installer in webdicebot.xyz if you don't want someone fake us to trick you</pre
      >
    </div>

    <div class="col-sm-12 col-md-12 mt-5 mb-5">
      <h3 class="text-primary text-center">How to use</h3>

      <div class="row text-center">
        <div class="col-sm-12 col-md-4 p-4">
          <p>Step 1</p>
          <h1 class="text-success"><i class="fas fa-user-plus"></i></h1>
          <h3>Join</h3>
          <p>Join to system via Register/Login</p>
        </div>

        <div class="col-sm-12 col-md-4 p-4">
          <p>Step 2</p>
          <h1 class="text-purple"><i class="fas fa-wallet"></i></h1>
          <h3>Buy</h3>
          <p>Deposit Tron (TRX) to system then buy license</p>
        </div>

        <div class="col-sm-12 col-md-4 p-4">
          <p>Step 3</p>
          <h1 class="text-warning"><i class="fas fa-hammer"></i></h1>
          <h3>Use</h3>
          <p>Use installer same to old version in dashboard</p>
        </div>
      </div>
    </div>

    <div class="col-sm-12 col-md-6 mt-5 mb-5">
      <h3 class="text-primary">Sample lua code</h3>

      <pre class="bg-light">
chance=49.5
bethigh=true
basebet=0.00000001
nextbet=basebet

function dobet()
    if (win) then
        nextbet=basebet
    else
        nextbet=previousbet*2
    end
end</pre
      >
    </div>

    <div class="col-sm-12 col-md-6 mt-5 mb-5">
      <h3 class="text-primary">Sample javascript code</h3>

      <pre class="bg-light">
chance=49.5
bethigh=true
basebet=0.00000001
nextbet=basebet

function dobet() {
    if (win) {
        nextbet=basebet
    } else {
        nextbet=previousbet*2
    }
}</pre
      >
    </div>

    <div class="col-sm-12 col-md-12 mt-5 mb-5">
      <h3 class="text-primary">Variables</h3>

      <pre class="bg-light">
chance | % win change
bethigh | bet side, true is over/above, false is under/below
nextbet | bet amount for next bet make
balance | current balance
profit | total profit in round
currentprofit, lastBet.profit | profit of last bet make
previousbet, lastBet.amount | amount of last bet make
lastBet.chance | win chance of last bet make
lastBet.roll | result number of last bet make
win | true is last bet make has win, false is lose
bets | bet count
wins | win count
winstreak  | streak of win count
losses | lose count
losestreak | streak of lose count
currentstreak | streak of bet count
</pre
      >
    </div>

    <div class="col-sm-12 col-md-12 mt-5 mb-5">
      <h3 class="text-primary">Functions</h3>

      <pre class="bg-light">
dobet() | loop betting
ching() | alert with sound
start() | start betting
stop() | stop betting
continuebet() | continue betting after void stop()
resetseed() | reset seed fair
resetstats() | reset stats in round
</pre
      >
    </div>
  </div>
</template>

<script>
import API_URL from "@/utils/apiUrl";

export default {};
</script>

<style>
</style>