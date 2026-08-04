const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const prisma = require('./lib/prisma');

app.get('/inventory', async (req, res) => {
  const items = await prisma.inventoryItem.findMany();

  res.json(items);
});

app.post('/inventory', async (req, res) => {
  const { name, sku, quantity, location, minimumQuantity } = req.body;

  if (!name || !sku) {
    return res.status(400).json({
      error: 'name and sku are required',
    });
  }

  const item = await prisma.inventoryItem.create({
    data: {
      name,
      sku,
      quantity: quantity ?? 0,
      location,
      minimumQuantity: minimumQuantity ?? 0,
    },
  });

  res.status(201).json(item);
});
