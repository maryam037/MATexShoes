const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const DB_PATH = path.join(__dirname, 'db.json');

// Helper function to read the database
async function readDB() {
  const data = await fs.readFile(DB_PATH, 'utf8');
  return JSON.parse(data);
}

// Helper function to write to the database
async function writeDB(data) {
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
}

// Get all shoes
app.get('/api/shoes', async (req, res) => {
  try {
    const db = await readDB();
    res.json(db.shoes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch shoes' });
  }
});

// Update shoe status and save order
app.post('/api/orders', async (req, res) => {
  try {
    const { cart, orderDetails } = req.body;
    const db = await readDB();

    // Mark shoes as sold out
    const updatedShoes = db.shoes.map(shoe => {
      if (cart.some(cartItem => cartItem.id === shoe.id)) {
        return { ...shoe, isSoldOut: true };
      }
      return shoe;
    });

    // Save order
    const newOrder = {
      id: Date.now(),
      items: cart,
      orderDetails,
      createdAt: new Date().toISOString()
    };

    db.shoes = updatedShoes;
    db.orders.push(newOrder);
    
    await writeDB(db);
    
    res.json({ message: 'Order placed successfully', order: newOrder });
  } catch (error) {
    res.status(500).json({ error: 'Failed to place order' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});