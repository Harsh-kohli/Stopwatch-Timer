let inputTimer = document.getElementById("timer")
let inputField = document.getElementById("inputField")
let formField = document.getElementById("form")
let stopwatchTimer = document.getElementById("stopTimer")
let runningState;

formField.addEventListener("submit", async (e) => {
    e.preventDefault()
    let userValue = await inputField.value
    const semicircles = document.querySelectorAll(".semicircle");
    const timerCounter = document.querySelector(".timer")

    const hr = 0;
    const min = 0;
    const sec = userValue * 60;

    const hours = hr * 3600000
    const minutes = min * 60000
    const seconds = sec * 1000

    const setTime = hours + minutes + seconds;
    const startTime = Date.now();
    const futureTime = startTime + setTime;

    runningState = setInterval(CountDownTimer)
    let btnStyle = document.querySelector('#timer')
    btnStyle.disabled = true;
    inputTimer.className = "disabledBtn";
    stopwatchTimer.className = "clock1"
    stopwatchTimer.disabled = false

    function CountDownTimer() {
        const currentTime = Date.now()
        const remainingTimer = futureTime - currentTime
        const angle = (remainingTimer / setTime) * 360;
        if (remainingTimer < 0) {
            clearInterval(runningState)
            inputTimer.className = "clock1";
            btnStyle.disabled = false;
            timerCounter.innerHTML = `
  <div>00</div>
  <div> : </div>
  <div>00</div>
  <div> : </div>
  <div>00</div>    
  `
            semicircles[0].style.backgroundColor = "#088b8b";
            semicircles[1].style.backgroundColor = "#088b8b";
            timerCounter.style.color = "#088b8b";
            stopwatchTimer.className = "disabledBtn"
            stopwatchTimer.disabled = true
        } else {
            if (angle > 180) {
                semicircles[2].style.display = 'none'
                semicircles[0].style.transform = 'rotate(180deg)'
                semicircles[1].style.transform = `rotate(${angle}deg)`
            } else {
                semicircles[2].style.display = 'block'
                semicircles[0].style.transform = `rotate(${angle}deg)`
                semicircles[1].style.transform = `rotate(${angle}deg)`
            }
            const remHrs = Math.floor((remainingTimer / (1000 * 60 * 60)) % 24).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
            const remMins = Math.floor((remainingTimer / (1000 * 60)) % 60).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
            const remSec = Math.floor((remainingTimer / 1000) % 60).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });

            timerCounter.innerHTML = `
  <div>${remHrs}</div>
  <div> : </div>
  <div>${remMins}</div>
  <div> : </div>
  <div>${remSec}</div>
  `
            if (angle <= 145.0) {
                semicircles[0].style.backgroundColor = "red";
                semicircles[1].style.backgroundColor = "red";
                timerCounter.style.color = "red";
            }

        }

        stopwatchTimer.addEventListener("click",()=> {
            clearInterval(runningState)
            inputTimer.className = "clock1";
            btnStyle.disabled = false;
            timerCounter.innerHTML = `
            <div>00</div>
            <div> : </div>
            <div>00</div>
            <div> : </div>
            <div>00</div>`

            semicircles[0].style.backgroundColor = "#088b8b";
            semicircles[1].style.backgroundColor = "#088b8b";
            timerCounter.style.color = "#088b8b";
            stopwatchTimer.className = "disabledBtn"
            stopwatchTimer.disabled = true
         

        })
    }
})

