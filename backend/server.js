const express = require('express');
const cors = require('cors');
const jsonServer = require('json-server');

const app = express();
const port = process.env.PORT || 3001; // Changed from 5000 to 3001

app.use(cors());
app.use(express.json());

// Create JSON Server router
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Use JSON Server middleware
app.use(middlewares);
app.use('/api', router);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});