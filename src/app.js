const axios = require("axios");
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

const randomShowRequest = async () => {
  return axios.get(url, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${process.env.PHISHIN_API_KEY}`,
    },
  });
};

app.get("", async (req, res) => {
  try {
    /*
    Destructuring API response several levels deep for now to pull out the nested values. 
    This is initially to avoid having to dig too deeply into a heavily nested object more than once, 
    but it may prove to be an unnecessary readability tradeoff. 
    */
    const {
      data: {
        data: { date },
      },
      data: {
        data: { venue },
      },
    } = await randomShowRequest();
    const responseBody = {
      date,
      venue: venue.name,
      location: venue.location,
    };
    res.render("index", responseBody);
  } catch (e) {
    console.log(e.stack);
  }
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
