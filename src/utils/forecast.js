const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const WEATHERSTACK_TOKEN = "7c91e72289535e28849632c6cc508712";

  const WEATHERSTACK_URL = `http://api.weatherstack.com/current?access_key=${WEATHERSTACK_TOKEN}&query=${latitude},${longitude}`;

  request({ url: WEATHERSTACK_URL, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to reach Location Services", undefined);
    } else if (body.error) {
      callback("Unable to find Location", undefined);
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees. It feels like ${body.current.feelslike} degrees`
      );
    }
  });
};

module.exports = forecast;
