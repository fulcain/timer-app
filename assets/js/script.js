// variables

// all inputs
let allInputs = document.querySelectorAll('input'),
    // minute element
    minuteEl = document.querySelector("#minutes"),

    // second element
    secondEl = document.querySelector('#seconds'),

    // hour element
    hourEl = document.querySelector('#hours'),

    // pattern obj
    pattern = {
        hours: /^[0-9]{2}$/,
        minutes: /^[0-6]{2}$/,
        seconds: /^[0-6]{2}$/
    },
    // seconds
    seconds = 0,

    // start button
    startBtn = document.querySelector('#start'),

    // restart btn
    restartBtn = document.querySelector('#restart'),

    // alarm el
    alarmEl = document.querySelector('#alarm'),

    // interval function
    IntervalOnFunction,
    // backgroundCircle
    backgroundCircleEl = document.querySelector('#background-circle')


// events    

// calls a function on click event
startBtn.addEventListener("click", () => {
    startTimer()
})

// all inputs 
// calls validateForms function
allInputs.forEach(input => {
    input.addEventListener('blur', () => {
        // minutes and seconds
        if (input.attributes.id.value == 'minutes' || input.attributes.id.value == 'seconds') {
            addZeroToOneDigit(secondEl)
            addZeroToOneDigit(minuteEl)

            validateForms(input, "min is 0 and max is 60", 60)
        }

        // hours
        else if (input.attributes.id.value == 'hours') {
            addZeroToOneDigit(hourEl)
            validateForms(input, "min is 0 and max is 99", 99)
        }
    })
})
// functions

// TITLE: start the timer Function
// if the minuteEl value is not empty:
// calls the timer Function
// calls restart function
// calls decreaseByOne function
function startTimer() {

    if (minuteEl.value != '' || secondEl.value != '' || hourEl.value != '') {
        // change button style
        startBtn.style.display = 'none'
        restartBtn.style.display = 'flex'
        backgroundCircleEl.classList.add("animate")
        // restart button
        restartBtn.addEventListener("click", () => {
            restart()
        })
        // calls the function every 1 second 
        IntervalOnFunction = setInterval(timerFunction, 1000);
        timerFunction()

        validate()
    } else {
        alert("At least enter one value!")
    }
}

// TITLE: timer function
// changes the display of start button and restart button
// changes the display of minute and second elements 
// calls the decreaseByOne function
// calls changeElementDisplay function
// calls hourFunction()
// calls minuteFunction()
function timerFunction() {
    hourFunction()
    minuteFunction()
    // if the second is 0 the second wont be decreased
    if (secondEl.value != 0) {
        decreaseByOne(secondEl)
    }
    addZeroToOneDigit(secondEl)
    addZeroToOneDigit(minuteEl)
    addZeroToOneDigit(hourEl)
    timerEnd()
}

// TITLE: restart function
// calls the reload function
function restart() {
    return window.location.reload()
}


// TITLE: hour function
function hourFunction() {

    // if second and minute are 0
    if (secondEl.value == '' && minuteEl.value == '') {
        decreaseByOne(hourEl)
        changeElementDisplay(minuteEl, 59)
        changeElementDisplay(secondEl, 60)
    }

    //  if second and minute are 0 and hour still has some value
    else if (secondEl.value == 1 && minuteEl.value == 0 && hourEl.value != 0) {
        decreaseByOne(hourEl)
    }
}

// TITLE: minute function
function minuteFunction() {

    // if seconds is 0
    if (secondEl.value == 0) {
        decreaseByOne(minuteEl)
        changeElementDisplay(secondEl, 60)

        // if seconds is 0 and minute value is 0
        if (minuteEl.value == -1) {

            // set displays to 00
            changeElementDisplay(minuteEl, '00')
            changeElementDisplay(secondEl, '00')
        }
    }
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

// TITLE: play a sound on timer end
// restarts the interval on IntervalOnFunction
// calls the restart function and set 7s timeout to it
// play alarmEl with .1 volume
function timerEnd() {
    if (minuteEl.value == 0 && hourEl.value == 0 && secondEl.value == 0) {
        backgroundCircleEl.classList.remove('animate')
        setTimeout(restart, 7000)
        // clear the interval
        window.clearInterval(IntervalOnFunction)
        alarmEl.volume = .1
        alarmEl.play()
    }
}



// TITLE: validate forms 
// checks if the regex value in the pattern objs matches the input value
// if it does't match, sends an alert and sets the value to its maxed value
// parameters:
// input = input
// alertMessage = the message that is sent when the value is entered wrong
// inputMaxValue = the maximum amount of input value
function validateForms(input, alertMessage, inputMaxValue) {
    if (input.value != '') {
        if (input.value.match(pattern[input.attributes.id.value])) {
        } else {
            alert(alertMessage)
            input.value = inputMaxValue
        }
    }
}