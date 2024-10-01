const {fetchPrice} = require("./services/fetchPrice")
const express = require('express')
const app = express()
const port = 3000;
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/data', async (req, res) => {
    try {
        const { stockQuote, exchange } = req.body;
        if (!stockQuote || !exchange) {
            return res.status(400).send("Missing stockQuote or exchange parameter");
        }

        const data = await fetchPrice(stockQuote, exchange );
        console.log(data);
        res.json({ price: data });
    } catch (error) {
        console.error("Error fetching price:", error);
        res.status(500).send("Error fetching price data");
    }
    
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})