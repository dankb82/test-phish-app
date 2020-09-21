const path = require("path");
const express = require("express");
const hbs = require("hbs");
const randomShow = require("./managers/randomShow");

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

app.get("", async (req, res) => {
  // Calling the randomShow manager directly in the render instead of setting to variable first. This may beed to be refactored
  console.log(res.mp3Link);
  res.render("index", await randomShow());
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
