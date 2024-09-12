const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Define paths for Express config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", {
    description: "Information about weather",
    name: "Alex",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    description: "We can help you",
    name: "Alex",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    description: "About our team",
    name: "Alex",
  });
});

app.get("/weather", (req, res) => {
  console.log(req.query);
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }
  geocode(req.query.address, (err, { lat, lon } = {}) => {
    if (!req.query.address) console.warn("NO LOCATION PROVIDED");
    else if (err) res.send({ error: err });
    else {
      forecast(lat, lon, (err, forecastData) => {
        if (err) {
          return res.send({ error: err });
        }
        res.send({
          weather: {
            forecast: forecastData,
            address: req.query.address,
          },
        });
      });
    }
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  console.log(req.query.search);

  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("article-not-found");
});

// Match anything that hasnt been matched before
app.get("*", (req, res) => {
  res.render("404");
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
