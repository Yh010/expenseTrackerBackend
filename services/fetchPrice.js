const { getJson } = require("serpapi");
const { data } = require("../data");
require('dotenv').config()
async function fetchPrice() {
    const response = await getJson({
                        engine: "google_finance",
                        q: "GOOG:NASDAQ",
                        api_key: process.env.API_KEY
                        }, (json) => {
        console.log(json);
        return json;
    });
    return response["summary"].price
} 

module.exports = { fetchPrice }; 