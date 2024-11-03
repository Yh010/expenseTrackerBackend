const { getJson } = require("serpapi");
require('dotenv').config({ path: '.env.local' })
async function fetchPrice(stockQuote, exchange ) {
   try {
        const response = await getJson({
            engine: "google_finance",
            q: `${stockQuote}:${exchange}`,
            api_key: process.env.API_KEY
        });
        return response;
    } catch (error) {
        console.error("Error in SerpAPI call:", error);
        throw error;
    }
} 

module.exports = { fetchPrice }; 