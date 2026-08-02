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
