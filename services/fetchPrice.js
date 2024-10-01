const { getJson } = require("serpapi");

async function getPrice(stockQuote,Exchange) {
    const response = getJson({
                        engine: "google_finance",
                        q: "GOOG:NASDAQ",
                        api_key: "2ae21d2919b3c22e065a4a4e376405e734e529c9b6b92d11f75a1fe2b71ff028"
                        }, (json) => {
        console.log(json);
        return json;
    });
    
    return response;
} 

export default getPrice;