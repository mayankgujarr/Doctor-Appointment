const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get('/api/stocks', async (req, res) => {
  try {
    const alphaVantageApiKey = 'YOUR_ALPHA_VANTAGE_API_KEY';
    const response = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=1min&apikey=${alphaVantageApiKey}`);
    const data = response.data['Time Series (1min)'];

    const stockData = Object.keys(data).map(timestamp => ({
      symbol: 'MSFT',
      companyName: 'Microsoft Corporation',
      price: data[timestamp]['4. close'],
      volume: data[timestamp]['5. volume'],
    }));

    res.json(stockData);
  } catch (error) {
    console.error('Error fetching stock data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
