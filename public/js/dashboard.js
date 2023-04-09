"use strict";

const $ = (selector) => document.querySelector(selector);
// sets up the format for the postal code
const postalRegEx =
  /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i;

const onReset = (evt) => {
  resetErrors();
//sets up the base inputs when the fields are reset
  $("#notifications").checked = true;

  $("#eco").checked = true;
  $("#temperature").value = 21;
  $("#location").value = "L7W 4T8";

  evt.preventDefault();
};
//resets errors in any fields 
const resetErrors = () => {
  $("#temperature_error").textContent = "";
  $("#location_error").textContent = "";
  console.error("Fields Reset");
};

const onSubmit = (evt) => {
  resetErrors();
// notifications get checked either on or off
  let notificationsOn = $("#notifications").checked;

  $("#setting_notifications").textContent = notificationsOn ? "On" : "Off";


  let lightingModeOptions = document.querySelectorAll("[name='lighting_mode']");

  for (let i = 0; i < lightingModeOptions.length; i++) {
    if (lightingModeOptions[i].checked) {
      $("#setting_lighting_mode").textContent = lightingModeOptions[i].value;
    }
  }


  let location = $("#location").value;

  if (postalRegEx.test(location)) {
    $("#setting_location").textContent = location;
  } else {
    //if the postal code is not valid print that its incorrect
    $("#location_error").textContent =
      "The postal code did not match the format required.";
  }


  let temperature = $("#temperature").value;
  let temperatureError = $("#temperature_error");

  if (isNaN(temperature) || temperature == "") {
    temperatureError.textContent = "This is not a valid temperature selection.";
  } else if (temperature > 25) {
    temperatureError.textContent =
      "Max temperature is 25C, setting temperature to Max";
    $("#setting_temperature").textContent = 25;
  } else if (temperature < 10) {
    temperatureError.textContent =
      "Min temperature is 10C, setting temperature to Min";
    $("#setting_temperature").textContent = 10;
  } else {
    $("#setting_temperature").textContent = temperature;
  }

  evt.preventDefault();
};

document.addEventListener("DOMContentLoaded", () => {
  //Adds current date
  $("#date_display").textContent = new Date().toDateString();
  //resets 
  $("#reset_form").addEventListener("reset", onReset);
  //TODO:: Add Submit Form listener
  $("#update_settings").addEventListener("click", onSubmit);
});
// this code is to be used for the timer once the values have been inputted but I could not seem to make it work after bouncing between several examples and trying different things.
let timerInterval;
let originalTemp;

function startTimer() {
  const tempInput = document.getElementById("temp-input");
  const hoursInput = document.getElementById("hours-input");
  const minutesInput = document.getElementById("minutes-input");
  const timerDisplay = document.getElementById("timer-display");
  const tempDisplay = document.getElementById("temp-display");

  // this gets the starting temperature
  originalTemp = parseInt(tempDisplay.innerText);

  // finds the number time inputted into page
  const totalSeconds = (parseInt(hoursInput.value) * 60 * 60) + (parseInt(minutesInput.value) * 60);

  // set the new temperature and start the timer
  const newTemp = parseInt(tempInput.value);
  setTemperature(newTemp);
  timerDisplay.innerText = formatTime(totalSeconds);
  timerInterval = setInterval(function() {
    totalSeconds--;
    // check if the timer has run out
    if (totalSeconds === 0) {
      clearInterval(timerInterval);
      setTemperature(originalTemp);
      timerDisplay.innerText = "Timer finished.";
    } else {
      timerDisplay.innerText = formatTime(totalSeconds);
    }
  }, 1000);
}

function setTemperature(temp) {
  const tempDisplay = document.getElementById("temp-display");
  tempDisplay.innerText = temp.toString() + "°C";
}
// does the math to calculate the seconds into hours minutes and seconds
function formatTime(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}