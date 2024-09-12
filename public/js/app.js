// fetch("https://puzzle.mead.io/puzzle").then((res) => {
//   res.json().then((data) => {
//     console.log(data);
//   });
// });
const url =
  "https://api.weatherstack.com/current?access_key=513315a574e34c69f8a08902c8a85c60&query=";
const fetchLocationData = (url) =>
  fetch(url)
    .then((res) => {
      res.json().then((data) => {
        if (data.error) {
          messageOne.textContent = "Error";
          messageTwo.textContent = data.error.info;
        }
        messageOne.textContent =
          "The weather in " + data.location.name + " is:";
        messageTwo.textContent = data.current.weather_descriptions[0];
      });
    })
    .catch((err) => console.error("Net error"));

const weatherForm = document.querySelector("form");
const searchElement = document.querySelector("input");
const messageOne = document.querySelector("#message1");
const messageTwo = document.querySelector("#message2");

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const location = searchElement.value;
  fetchLocationData(url + location);
});
