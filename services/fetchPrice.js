const { getJson } = require("serpapi");
const { data } = require("../data");
require('dotenv').config()
async function fetchPrice(stockQuote, exchange ) {
    const response = await getJson({
                        engine: "google_finance",
                        q: `${stockQuote}:${exchange}`,
                        api_key: process.env.API_KEY
                        }, (json) => {
        console.log(json);
        return json;
    });
    return response["summary"].price
} 

module.exports = { fetchPrice }; 