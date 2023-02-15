// variables

// minute element
let minuteEl = document.querySelector("#minutes"),

    // second element
    secondEl = document.querySelector('#seconds'),

    // seconds
    seconds = 0,

    // start button
    startBtn = document.querySelector('#start'),

    // restart btn
    restartBtn = document.querySelector('#restart'),

    // interval function
    IntervalOnFunction

// events    

// calls a function on click event
startBtn.addEventListener("click", () => {
    startTimer()
})

// functions

// TITLE: start the timer Function
// if the minuteEl value is not empty:
// calls the timer Function
// calls restart function
// calls decreaseByOne function
function startTimer() {

    if (minuteEl.value != '' || secondEl.value != '') {

        // change button style
        startBtn.style.display = 'none'
        restartBtn.style.display = 'flex'
        restart()
        // calls the function every 1 second 
        IntervalOnFunction = setInterval(timerFunction, 1000);
        timerFunction()
    } else {
        alert("At least enter a value!")
    }
}

// TITLE: restart function
// calls the reload function
function restart() {

    // restart button
    restartBtn.addEventListener("click", () => {
        window.location.reload()
    })
}

// TITLE: timer function
// changes the display of start button and restart button
// changes the display of minute and second elements 
// calls the decreaseByOne function
// calls changeElementDisplay function
function timerFunction() {

    if (secondEl.value == 0) {
        decreaseByOne(minuteEl)
        changeElementDisplay(secondEl, 60)
        if (minuteEl.value == -1) {
            changeElementDisplay(minuteEl, '00')
            changeElementDisplay(secondEl, '00')
            window.clearInterval(IntervalOnFunction)
        }
    }
    else if (secondEl.value == '') {
        changeElementDisplay(secondEl, 60)
    }

    // if the second is 0 the second wont be decreased
    if (secondEl.value != 0){
        decreaseByOne(secondEl)
    }
    addZeroToOneDigit(secondEl)
    addZeroToOneDigit(minuteEl)
}

// TITLE: decrease the amount by 1
// changes the element value to int and decreases it to one and puts it in the element
// parameters:
// element = the element's value that wants to be -1
function decreaseByOne(element) {
    element.value = parseInt(element.value - 1)
}

// changes the display of elements
// parameters:
// element = the element that wants to be changed
// changeTo = the amount or variables that the element wants to change to
function changeElementDisplay(element, changeTo) {
    element.value = changeTo
}

// TITLE: add a zero to one digit numbers
// parameters:
// element = the element value 
function addZeroToOneDigit(element) {
    if (element.value == 9) {
        element.value = "09"
    } else if (element.value == 8) {
        element.value = "08"
    } else if (element.value == 7) {
        element.value = "07"
    } else if (element.value == 6) {
        element.value = "06"
    } else if (element.value == 5) {
        element.value = "05"
    } else if (element.value == 4) {
        element.value = "04"
    } else if (element.value == 3) {
        element.value = "03"
    } else if (element.value == 2) {
        element.value = "02"
    } else if (element.value == 1) {
        element.value = "01"
    } else if (element.value == 0) {
        element.value = "00"
    }
}