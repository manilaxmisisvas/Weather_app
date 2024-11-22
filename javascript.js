const apikey = "API_KEY"; //GET FROM THE WEBSITE

async function getWeather() {
  try {
    await waitForDOM();
    const city = document.getElementById("city").value;
    const desc = document.getElementById("description"); // div element to display the weather description
    const main_icon = document.getElementById("main-icon"); // div element with icon which shows the type of weather
    // div cards to show specific parametrs of weather
    const temp = document.getElementById("temp");
    const humidity = document.getElementById("humidity");
    const wind = document.getElementById("wind");
    //removing  the html page data before fetching new data to display
    description.innerHTML = ``;
    wind.innerHTML = `          
    <span id="wind-speed">Wind: </span>
    <i class="material-icons">air</i>
    
    `;
    temp.innerHTML = `
    <span id="temperature">Temp: </span>
    <i class="material-icons">thermostat</i>
    `;
    humidity.innerHTML = `<span id="humidity">Humidity: </span>
    <i class="material-icons">opacity</i>
    `;
    document.getElementById("icon").src = " ";

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`
    );
    if (!response.ok) {
      // If the response is not ok, throw an error
      const errorMessage = `Error fetching weather data: ${response.statusText}`;
      throw new Error(errorMessage);
    }
    // acccessing the required data from the response json data returned by weather APi

    const data = await response.json();
    let cityname = data.name;
    let details = data.weather[0].description;
    let speed = data.wind.speed * 3.6; //converting the meters per second speed to kmph
    let temperature = data.main.temp;
    let humiditymeasure = data.main.humidity;
    //displaying the data in to html page

    description.innerHTML = `<p>${cityname}</p>
    <p> ${details}</p>`;

    wind.innerHTML = ` <i class="material-icons">air</i> 
    <span id="wind-speed">Wind : ${speed.toFixed(2)} kmph</span>`;

    temp.innerHTML = `  <i class="material-icons">thermostat</i>
    <span id="temperature">Temp: ${temperature}°</span>`;

    humidity.innerHTML = `    <i class="material-icons">opacity</i>
    <span id="humidity">Humidity: ${humiditymeasure}</span>`;

    const iconCode = data.weather[0].icon;
    const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`; // accessing the icons link based on weather description from api
    document.getElementById("icon").src = iconUrl; //updating the img src to required icon link
  } catch (err) {
    //  showing a user-friendly error message on the page
    document.getElementById("description").innerHTML =
      " Please check the city name and try again.";
  }
}
//function which holds the getweather function untill the dom elements are loaded

const waitForDOM = () => {
  return new Promise((resolve) => {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", resolve);
    } else {
      resolve();
    }
  });
};

const inputField = document.getElementById("city");
const clearButton = document.getElementById("clear-btn");

// Show/hide the clear button based on input value
inputField.addEventListener("input", function () {
  if (inputField.value) {
    clearButton.style.display = "block"; // Show button when text is entered
  } else {
    clearButton.style.display = "none"; // Hide button when input is empty
  }
});

// function to Clear the input field when the X button is clicked
clearButton.addEventListener("click", function () {
  inputField.value = ""; // Clear the input field
  clearButton.style.display = "none"; // Hide the x button
});
