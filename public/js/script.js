`use strict`;
function refreshTime() {
  const timeDisplay = document.getElementById("time");
  const dateString = new Date().toLocaleString();
  const formattedString = dateString.replace(", ", " - ");
  timeDisplay.textContent = formattedString;
}
  setInterval(refreshTime, 1000);


//sets up all of the ids for the different variables
  document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('device-settings');
    const deviceNameInput = document.getElementById('device-name');
    const notificationsSelect = document.getElementById('notifications');
    const lightingModeSelect = document.getElementById('lighting-mode');
    const temperatureInput = document.getElementById('temperature');
    const currentMode = document.getElementById('current-mode');
    const currentTemperature = document.getElementById('current-temperature');
    
    // Displays the current lighting mode when changed
    lightingModeSelect.addEventListener('change', function() {
      currentMode.textContent = `Current Lighting Mode: ${lightingModeSelect.value}`;
    });
    
    // Displays the current temperature when changed
    temperatureInput.addEventListener('input', function() {
      currentTemperature.textContent = `Current Temperature: ${temperatureInput.value}°C`;
    });
    
    // Resets the form when button is pressed
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', function() {
      form.reset();
      currentMode.textContent = `Current Lighting Mode: Off`;
      currentTemperature.textContent = `Current Temperature: 10°C`;
    });
    
    //deals with the form submission
    form.addEventListener('submit', function(event) {
      event.preventDefault();
    });
  });
//sets up variables for the postal code and its errors
  const postalCodeInput = document.getElementById('postal-code');
  const postalCodeError = document.getElementById('postal-code-error');
  //validates whether it has been inpuuted as a candian code, and if not spits out an error
  function validatePostalCode() {
    const postalCodeRegex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
    if (!postalCodeRegex.test(postalCodeInput.value)) {
      postalCodeError.textContent = 'Please enter a valid Canadian postal code';
      return false;
    } else {
      postalCodeError.textContent = '';
      return true;
    }
  }
  //code to use a functional button
  const checkButton = document.getElementById('check-btn');
  checkButton.addEventListener('click', function() {
    validatePostalCode();
  });