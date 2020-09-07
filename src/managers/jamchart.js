// Grab only the jams that are on the jam chart when given an array of tracks
const jamchartFilter = (tracks) => {
  let jamChartTracks = [];
  tracks.forEach((track) => {
    track.tags.forEach((tag) => {
      if (tag.name === "Jamcharts") {
        jamChartTracks.push(track);
      }
    });
  });
  return jamChartTracks;
};

module.exports = jamchartFilter;
