const request = require("request");

const geocode = (location, callback) => {
  const MAPBOX_TOKEN =
    "pk.eyJ1Ijoic29tZW9uZWdyZWF0IiwiYSI6ImNrZjYwOHJhbzA5bGEycnFna2FpcWo3Y2YifQ.sCX4KcYgjCOJ7Ly3TOcNEw";

  const MAPBOX_URL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    location
  )}.json?limit=1&access_token=${MAPBOX_TOKEN}&limit=1`;

  request({ url: MAPBOX_URL, json: true }, (error, { body }) => {
    if (error) callback("Unable to reach Geocode Services", undefined);
    else if (body.features.length == 0) {
      callback("Please provide a valid Location", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
