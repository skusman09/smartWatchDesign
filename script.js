/* calculation for Analog Clock
        **hour hand calculation**
        12h = 360deg
        1h = 30deg
     
        60m = 30deg   (1hr = 60m)
        m   = 30/60deg
        m   = 1/2deg      when hour hand move, then minute hand also move so m/2 will add
     
        The final formula for hour hand
        h = 30 * h + m/2
     
        **minute hand calculation**
        m = 6deg
        60s = 6deg  (1m = 60s)
        s = 6/60
        s = 1/10
     
        60m = 360deg + s/10 <=== final formula
     
        **second hand calculation**
        60s = 360deg
        s = 6deg
        */

setInterval(() => {
  let hr = document.getElementById("hr");
  let mnt = document.getElementById("mnt");
  let sec = document.getElementById("sec");

  let time = new Date();
  let h = time.getHours();
  let m = time.getMinutes();
  let s = time.getSeconds();

  let hrotation = 30 * h + m / 2;
  let mrotation = 6 * m + s / 10;
  let srotation = 6 * s;
  hr.style.transform = `rotate(${hrotation}deg)`;
  mnt.style.transform = `rotate(${mrotation}deg)`;
  sec.style.transform = `rotate(${srotation}deg)`;
}, 1000);

// ************DIGITAL CLOCK SECTION*********

let DayName = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

setInterval(function () {
  let a = new Date();
  let h = a.getHours();
  let m = a.getMinutes();

  let day = a.getDay();
  let weekday = DayName[day];

  let d = a.getDate();
  let mnth = a.getMonth() + 1;
  let yr = a.getFullYear();
  let session = "AM";

  m = m < 10 ? "0" + m : m;
  d = d < 10 ? "0" + d : d;
  mnth = mnth < 10 ? "0" + mnth : mnth;

  let date = d + "/" + mnth + "/" + yr;

  if (h >= 12) {
    session = "PM";
  }

  if (h > 12) {
    h = h - 12;
  } else if (h === 0) {
    h = 12;
  }

  h = h < 10 ? "0" + h : h;

  document.getElementById("date").innerHTML = date;
  document.getElementById("day").innerHTML = weekday;
  document.getElementById("hour").innerHTML = h;
  document.getElementById("minute").innerHTML = m;
  document.getElementById("session").innerHTML = session;
}, 1000);

// Weather fetching function
const API_KEY = "0c579e08efc147fb866201558240510";
const city = "Mumbai";
async function getWeather(city) {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
    );
    const data = await response.json();

    const tempElement = document.getElementById("temperature");
    const temperature = data.current.temp_c; // Get temperature in Celsius
    tempElement.innerHTML = `${Math.round(temperature)}°`; // Round and display the temperature

    console.log(`Current weather in ${city}:`);
    console.log(`Temperature: ${data.current.temp_c}°C`);
    console.log(`Condition: ${data.current.condition.text}`);
    console.log(`Wind: ${data.current.wind_kph} km/h`);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

// Call getWeather immediately and set interval to update every 10 minutes
getWeather(city);
setInterval(() => getWeather(city), 600000);
