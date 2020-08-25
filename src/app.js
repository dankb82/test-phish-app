const request = require("postman-request");

const jamchartFilter = require("../utils/jamchartFilter");
const url = ` http://phish.in/api/v1/years/1997.json`;
const options = {
  url,
  json: true,
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${PHISHIN_API_KEY}`,
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
