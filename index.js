const { fetchPrice } = require("./services/fetchPrice")
const { data } = require("./data");
const express = require('express')
const app = express()
const port = 3000;
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

      //const data = await fetchPrice(stockQuote, exchange );
      //const data = "yes you can fetch now";
      console.log(data["summary"].price);


      const filteredResults = data["news_results"].flatMap(result => 
          result.items 
          ? result.items
              .filter(item => item.snippet && item.link && item.source && item.date) 
              .map(item => ({ snippet: item.snippet, link: item.link, source: item.source, date: item.date })) 
          : result.snippet && result.link && result.source && result.date 
            ? [{ snippet: result.snippet, link: result.link, source: result.source, date: result.date }] 
            : []
          );

      console.log(filteredResults)
      res.json({
        price: data["summary"].price,
        news: filteredResults,
        graph: data["graph"]
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