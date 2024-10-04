const { fetchPrice } = require("./services/fetchPrice")
const { data } = require("./data");
const express = require('express')
const app = express()
const port = 3000;
var cors = require('cors')
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
        res.json({ price: data["summary"].price });
    } catch (error) {
        console.error("Error fetching price:", error);
        res.status(500).send("Error fetching price data");
    }
    
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})