const axios = require("axios");
const url = `http://phish.in/api/v1/random-show`;

const randomShow = async () => {
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
    } = await axios.get(url, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${process.env.PHISHIN_API_KEY}`,
      },
    });
    const responseBody = {
      date,
      venue: venue.name,
      location: venue.location,
    };
    return responseBody;
  } catch (e) {
    return console.log(`Call to api failed: ${e.stack}`);
  }
};

module.exports = randomShow;
