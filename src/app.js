const request = require("postman-request");
const PHISHIN_API_KEY = `4ebb30d807dfd43cfb4b3941ce4b22323accae11d0f256cc857f46f3f128d7b8f423c96ccab292bbe6715501dcd6aac6`;
const jamchartFilter = require("./utils/jamchartFilter");
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
