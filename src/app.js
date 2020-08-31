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

const url = `http://phish.in/api/v1/random-show`;

const options = {
  url,
  json: true,
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${process.env.PHISHIN_API_KEY}`,
  },
};

app.get("", (req, res) => {
  request(options, (error, { body }) => {
    const date = body.data.date;
    const venue = body.data.venue.name;
    const location = body.data.venue.location;
    res.render("index", {
      date,
      venue,
      location,
    });
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
