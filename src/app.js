const request = require("postman-request");
const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();

// Define paths for Express config
const PUBLIC_DIRECTORY_PATH = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup Handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(PUBLIC_DIRECTORY_PATH));

app.get("/", (req, res) => {
  res.render("index");
});

const url = ` http://phish.in/api/v1/years/1997.json`;
const options = {
  url,
  json: true,
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${process.env.PHISHIN_API_KEY}`,
  },
};

request(options, (error, { body }) => {
  // Build an array of all the tracks from a given year.
  let allTracks = [];
  body.data.forEach((show) => {
    show.tracks.forEach((track) => {
      allTracks.push(track);
    });
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
