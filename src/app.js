const request = require("postman-request");
const path = require("path");
const express = require("express");
const hbs = require("hbs");
require("dotenv").config();
const jamchartFilter = require("../utils/jamchartFilter");

const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to the Phish app!");
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

  const jamchartVersions = jamchartFilter(allTracks);
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
