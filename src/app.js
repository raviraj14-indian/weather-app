const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const port = process.env.PORT || 3000;
const app = express();

// Define paths of Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Serving Static files
app.use(express.static(publicDirectoryPath));

// Setup handlebars and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Routes
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App Home Page",
    name: "Ravi",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    name: "Ravi Raj",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Ravi Raj",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "please provide an input value",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          address: req.query.address,
          location,
          forecastData,
        });
      });
    }
  );

  // res.send({
  //   forecast: "Mist",
  //   location: "Lucknow",
  //   address: req.query.address,
  // });
});

// app.get("/products", (req, res) => {
//   console.log(req.query);
//   res.send({ product: [] });
// });

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    error: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    error: "page not found",
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
