// variables 
let
    restartBtn = document.querySelector('#restart'),
    pauseBtn = document.querySelector('#pause'),
    setBtn = document.querySelector('#set'),
    hoursInput = document.querySelector('#hours'),
    minutesInput = document.querySelector('#minutes'),
    secondsInput = document.querySelector('#seconds'),
    millisecondsInput = document.querySelector('#milliseconds'),
    milliseconds = 0,
    seconds = 0,
    minutes = 0,
    hours = 0,
    stopWatchInterval,
    setTimeEl = document.querySelector('#setTimes ul'),
    setTimeArray = [],
    deleteTimes = document.querySelector('#deleteLocalStorage'),
    timesFromLocalStorage = JSON.parse(localStorage.getItem("times")),
    allParagraphs = document.querySelectorAll('#timer p');


// events
if (timesFromLocalStorage) {
    setTimeEl.innerHTML = timesFromLocalStorage
}

const startBtn = document.querySelector('#start');
// start button event
startBtn.addEventListener("click", () => {
    elementDisplay(startBtn)
    elementDisplay(restartBtn)
    elementDisplay(pauseBtn)
    elementDisplay(setBtn)

    startStopWatch()
    changeElementDisplay(secondsInput, "00")
    stopWatchInterval = setInterval(startStopWatch, 10)
})

// restart button
restartBtn.addEventListener("click", () => {
    location.reload()
})

// pause button
pauseBtn.addEventListener("click", pause)

// set button
setBtn.addEventListener("click", () => {
    setTimeEl.innerHTML += `<li> ${hours}:${minutes}:${seconds}:${milliseconds}</li>`

    setTimeArray = setTimeEl.innerHTML

    localStorage.setItem("times", JSON.stringify(setTimeArray))

    minTwoDigits(seconds, seconds)
})

// delete times 
deleteTimes.addEventListener("dblclick", () => {
    localStorage.clear()
    setTimeEl.innerHTML = ""
})

// TITLE: elementDisplay
// toggles hide class name (display:none;)
function elementDisplay(el) {
    el.classList.toggle('hide')
}

// TITLE: pause function
// paused the timer on click
function pause() {
    // if button has pause class
    if (pauseBtn.classList.contains("pause")) {
        pauseBtn.classList.remove("pause")
        pauseBtn.innerHTML = "pause"
        stopWatchInterval = setInterval(startStopWatch, 10)
    }

    // if button doesn't have pause class
    else {
        pauseBtn.classList.add("pause")
        pauseBtn.innerHTML = "resume"
        clearInterval(stopWatchInterval)
    }

}


// TITLE: start stopwatch
// if milliseconds are 1000 seconds will increase by one and milliseconds = 0
// if seconds are 60 minutes will increase by one and seconds = 0
// if minutes are 60 hours will increase by one and minutes = 0
// calls allOneDigitsFunction
function startStopWatch() {
    milliseconds += 10
    changeElementDisplay(millisecondsInput, milliseconds)
    if (milliseconds === 1000) {
        milliseconds = 0
        changeElementDisplay(millisecondsInput, milliseconds)
        seconds++
        changeElementDisplay(secondsInput, seconds)
    }

    if (seconds == 60) {
        seconds = 0
        changeElementDisplay(secondsInput, seconds)
        minutes++
        changeElementDisplay(minutesInput, minutes)
        if (minutes == 60) {
            minutes = 0
            changeElementDisplay(minutesInput, minutes)
            hours++
            changeElementDisplay(hoursInput, hours)
        }
    }

    allOneDigitsFunction()
}

// changes the display of elements
// parameters:
// element = the element that wants to be changed
// changeTo = the amount or variables that the element wants to change to
function changeElementDisplay(element, changeTo) {
    element.innerHTML = changeTo
}

// Add zero to one digit number by passing their element as argument.
const addZeroToOneDigit = (element) => {
    if (element.innerHTML.length < 2) {
        element.innerHTML = "0" + element.innerHTML.slice(-1)
    }
    element.innerHTML = element.innerHTML
}

// TITLE: all one digits
function allOneDigitsFunction() {
    addZeroToOneDigit(secondsInput)
    addZeroToOneDigit(hoursInput)
    addZeroToOneDigit(minutesInput)
    addZeroToOneDigit(millisecondsInput)
}