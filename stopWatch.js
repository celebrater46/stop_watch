"use strict";

{
  const timer = document.getElementById("timer");
  const start = document.getElementById("start");
  const stop = document.getElementById("stop");
  const reset = document.getElementById("reset");

  function setButtonStateInitial() {
    start.classList.remove("inactive");
    stop.classList.add("inactive");
    reset.classList.add("inactive");
  }
  
  function setButtonStateRunning() {
    start.classList.add("inactive");
    stop.classList.remove("inactive");
    reset.classList.add("inactive");
  }
  
  function setButtonStateStopped() {
    start.classList.remove("inactive");
    stop.classList.add("inactive");
    reset.classList.remove("inactive");
  }

  setButtonStateInitial();

  function count() {
    // console.log(Date.now() - startTime);
    const d = new Date(Date.now() - startTime + elapsedTime); // ☓ new Dateなし
    const m = String(d.getMinutes()).padStart(2, "0"); // 正String　誤string
    const s = String(d.getSeconds()).padStart(2, "0"); // padStart(桁数, 満たなければ先頭に文字列を)
    const ms = String(d.getMilliseconds()).padStart(3, "0"); // ○ seconds  ☓ Seconds
    timer.textContent = `${m}:${s}:${ms}`;

    timeoutId = setTimeout(() => {
      count();
    }, 20);
  }

  let startTime;
  let timeoutId;
  let elapsedTime = 0;

  start.addEventListener("click", () => {
    if (start.classList.contains("inactive") === true) {
      return;
    }
    
    setButtonStateRunning();
    startTime = Date.now();
    count();
  });
  
  stop.addEventListener("click", () => {
    if (stop.classList.contains("inactive") === true) {
      return;
    }

    setButtonStateStopped();
    clearTimeout(timeoutId);
    elapsedTime += Date.now() - startTime;
  });
  
  reset.addEventListener("click", () => {
    if (reset.classList.contains("inactive") === true) {
      return;
    }

    setButtonStateInitial();
    timer.textContent = "00:00.000";
    elapsedTime = 0;
  });
}

// 07 ボタンを連打すると時刻の記録機構が狂うので、.disabledプロパティでボタンを無効化しよう
// 12 button を div に変更したことで.disabledプロパティが使えなくなる