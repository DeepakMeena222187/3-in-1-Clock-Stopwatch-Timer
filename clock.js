   const clockEl = document.getElementById("clock");
    const stopwatchEl = document.getElementById("stopwatch");
    const timerEl = document.getElementById("timer");
    const actionButtons = document.getElementById("action-buttons");

    function show(mode) {
      clockEl.classList.add("hidden");
      stopwatchEl.classList.add("hidden");
      timerEl.classList.add("hidden");
      actionButtons.innerHTML = "";

      if (mode === "clock") {
        clockEl.classList.remove("hidden");
        startClock();
      } else if (mode === "stopwatch") {
        stopwatchEl.classList.remove("hidden");
        addStopwatchButtons();
      } else if (mode === "timer") {
        timerEl.classList.remove("hidden");
        addTimerButtons();
      }
    }

    function setTheme(theme) {
      document.body.className = theme;
    }

    function startClock() {
      setInterval(() => {
        const now = new Date();
        document.getElementById("clk-h").innerText = String(now.getHours()).padStart(2, "0");
        document.getElementById("clk-m").innerText = String(now.getMinutes()).padStart(2, "0");
        document.getElementById("clk-s").innerText = String(now.getSeconds()).padStart(2, "0");
        document.getElementById("clk-ms").innerText = String(Math.floor(now.getMilliseconds() / 10)).padStart(2, "0");
      }, 10);
    }

    let swInterval, swTime = 0, swRunning = false;

    function addStopwatchButtons() {
      actionButtons.innerHTML = `
        <button onclick="toggleStopwatch()" id="sw-start">START</button>
        <button onclick="resetStopwatch()">RESET</button>
      `;
    }

    function toggleStopwatch() {
      const btn = document.getElementById("sw-start");
      if (!swRunning) {
        swInterval = setInterval(() => {
          swTime += 10;
          updateStopwatchDisplay();
        }, 10);
        btn.innerText = "PAUSE";
        swRunning = true;
      } else {
        clearInterval(swInterval);
        btn.innerText = "RESUME";
        swRunning = false;
      }
    }

    function resetStopwatch() {
      clearInterval(swInterval);
      swTime = 0;
      swRunning = false;
      document.getElementById("sw-start").innerText = "START";
      updateStopwatchDisplay();
    }

    function updateStopwatchDisplay() {
      let ms = Math.floor((swTime % 1000) / 10);
      let s = Math.floor((swTime / 1000) % 60);
      let m = Math.floor((swTime / (1000 * 60)) % 60);
      let h = Math.floor((swTime / (1000 * 60 * 60)) % 24);

      document.getElementById("sw-h").innerText = String(h).padStart(2, "0");
      document.getElementById("sw-m").innerText = String(m).padStart(2, "0");
      document.getElementById("sw-s").innerText = String(s).padStart(2, "0");
      document.getElementById("sw-ms").innerText = String(ms).padStart(2, "0");
    }

    let tmInterval, tmTime = 0;

    function addTimerButtons() {
      actionButtons.innerHTML = `
        <button onclick="startTimer()">START</button>
        <button onclick="resetTimer()">RESET</button>
      `;
    }

    function startTimer() {
      const seconds = parseInt(document.getElementById("timerInput").value);
      if (isNaN(seconds) || seconds <= 0) return;
      tmTime = seconds * 1000;

      tmInterval = setInterval(() => {
        tmTime -= 10;
        if (tmTime <= 0) {
          clearInterval(tmInterval);
          tmTime = 0;
        }
        updateTimerDisplay();
      }, 10);
    }

    function resetTimer() {
      clearInterval(tmInterval);
      tmTime = 0;
      updateTimerDisplay();
    }

    function updateTimerDisplay() {
      let ms = Math.floor((tmTime % 1000) / 10);
      let s = Math.floor((tmTime / 1000) % 60);
      let m = Math.floor((tmTime / (1000 * 60)) % 60);
      let h = Math.floor((tmTime / (1000 * 60 * 60)) % 24);

      document.getElementById("tm-h").innerText = String(h).padStart(2, "0");
      document.getElementById("tm-m").innerText = String(m).padStart(2, "0");
      document.getElementById("tm-s").innerText = String(s).padStart(2, "0");
      document.getElementById("tm-ms").innerText = String(ms).padStart(2, "0");
    }

    show("clock");