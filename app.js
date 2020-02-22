window.addEventListener('load', ()=> {
  let long;
  let lar;
  let temperatureDescription = document.querySelector(".temperature-description");
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  let temperatureSection = document.querySelector(".temperature");
  const temperatureSpan = document.querySelector(".temperature span");

  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `${proxy}https://api.darksky.net/forecast/258f32d1fd489ad44fe7fb41cea814db/${lat},${long}`;

      fetch(api)
          .then(response => {
            return response.json();
          })
          .then(data => {
            const {temperature, summary, icon } = data.currently;
            // set DOM Elements from the api
            temperatureDegree.textContent = temperature;
            temperatureDescription.textContent = summary;
            locationTimezone.textContent = data.timezone;
            // set Forumula for celsius
            let celsius = (temperature - 32) * (5 / 9);
             // set Icon
             setIcons(icon, document.querySelector(".icon"));

             // Change temperature to Celsius / Farenheit
             temperatureSection.addEventListener('click', () => {
               if(temperatureSpan.textContent === "F"){
                 temperatureSpan.textContent = "C";
                 temperatureDegree.textContent = Math.floor(celsius);
               }else{
                 temperatureSpan.textContent = "F";
                 temperatureDegree.textContent = temperature;
               }
            });
          });
      });
    }

    function setIcons(icon, iconID){
      const skycons = new Skycons({color: "white"});
      const currentIcon = icon.replace(/-/g, "_").toUpperCase();
      skycons.play()
      return skycons.set(iconID, Skycons[currentIcon]);
  }
});
