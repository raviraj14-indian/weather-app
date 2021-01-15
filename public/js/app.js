const weatherForm = document.querySelector(".form");
const search = document.querySelector("input");
const message1 = document.getElementById("message-1");
const message2 = document.getElementById("message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  message1.textContent = "Loading...";
  message2.textContent = "";
  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      console.log(data);
      if (data.error) {
        return (message1.textContent = data.error);
      }
      message1.textContent = data.location;
      message2.textContent = data.forecastData;
    });
  });
});
