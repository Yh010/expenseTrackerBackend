const {fetchPrice} = require("./services/fetchPrice")
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/data', async (req, res) => {
    try {
        const data = await fetchPrice();
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