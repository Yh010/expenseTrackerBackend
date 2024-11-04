const { fetchPrice } = require("./services/fetchPrice")
require('dotenv').config({ path: '.env.local' })
const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
var cors = require('cors');
const { generateUrl } = require("./services/Aws");
app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/data', async (req, res) => {
    try {
        const { stockQuote, exchange } = req.body;
        if (!stockQuote || !exchange) {
            return res.status(400).send("Missing stockQuote or exchange parameter");
        }

    const data = await fetchPrice(stockQuote, exchange);
        
      const filteredResults = processNewsResults(data.news_results);

      console.log(filteredResults)
       res.json({
            price: data.summary?.price || "N/A",
            news: filteredResults,
            graph: data.graph || []
        });
    } catch (error) {
        console.error("Error fetching price:", error);
        res.status(500).send("Error fetching price data");
    }
    
})

app.get('/filepath', async (req, res) => {
    const {filename, path} = req.query;
    const urls = await generateUrl(filename, path);

    res.send({urls});
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

function processNewsResults(newsResults) {
    return newsResults.flatMap(result => 
        result.items 
            ? result.items
                .filter(item => item.snippet && item.link && item.source && item.date)
                .map(item => ({
                    snippet: item.snippet,
                    link: item.link,
                    source: item.source,
                    date: item.date
                }))
            : result.snippet && result.link && result.source && result.date
                ? [{
                    snippet: result.snippet,
                    link: result.link,
                    source: result.source,
                    date: result.date
                }]
                : []
    );
}
