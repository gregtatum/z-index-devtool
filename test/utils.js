const textBits = Object.freeze({
  TEXT_MARKUP: `
  <style>
    .red {
      position: relative;
      width:600px;
      background-color: #e33;
      padding:1em;
      z-index:0;
    }
    .green-relative {
      margin: 1em;
      background-color: #3e3;
    }
    .blue {
      position: relative;
      width:600px;
      background-color: #33e;
      padding:1em;
      z-index:1;
    }
    .red-absolute {
      width: 100px;
      height: 100px;
      position: absolute;
      bottom: -75px;
      right: -75px;
      background-color: #e3e;
    }
    .absolute {
      width: 100px;
      height: 100px;
      position: absolute;
      bottom: -75px;
      right: -75px;
      background-color: #e3e;
      z-index:1000;
    }
  </style>

  <div class='red'>
    .red
    <div class="green-relative">.green-relative</div>
    <div class="green-relative">.green-relative</div>
    <div class="absolute" style='background-color:#f66;'>.absolute</div>
  </div>
  <div class='blue'>
    .blue
    <div class="green-relative">.green-relative</div>
    <div class="green-relative">.green-relative</div>
    <div class="absolute" style='background-color:#66f;'>.absolute</div>
  </div>
  `
});

module.exports = textBits;
