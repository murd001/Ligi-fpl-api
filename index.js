const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.get('/api/fantasy/:managerId', async (req, res) => {
  try {
    const { managerId } = req.params;
	console.log(`Fetching data for manager ID: ${managerId}`);
    const response = await axios.get(`https://fantasy.premierleague.com/api/entry/${managerId}/`);
    console.log('Data fetched successfully');
	res.json(response.data);
  } catch (error) {
	console.error('Error fetching data:', error.message);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});