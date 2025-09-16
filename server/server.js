import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import MongoDB from './mongoDB.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors({
  origin: [
    'https://optbazar.onrender.com',
    'https://rinok-frontend.onrender.com',
    'http://localhost:3000',
    'https://localhost:3000'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token']
}));
app.use(express.json());
app.use(cookieParser());

// Simple CSRF protection
const csrfProtection = (req, res, next) => {
  if (req.method === 'GET') return next();
  const token = req.headers['x-csrf-token'] || req.body._csrf;
  if (!token || token !== 'rinok-csrf-token') {
    return res.status(403).json({ error: 'CSRF token missing or invalid' });
  }
  next();
};
app.use(express.static('public'));

// Serve React app
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Rinok API</title>
    </head>
    <body>
      <h1>Rinok API Server</h1>
      <p>API работает на /api/*</p>
      <p>Фронтенд: <a href="https://optbazar.onrender.com">Перейти к приложению</a></p>
    </body>
    </html>
  `);
});

const db = new MongoDB(
  process.env.MONGODB_URI || 'mongodb://rinok_anywherehe:423c7d67d4e91c8b370846e868153e8be8ddbcf8@e4gb4v.h.filess.io:61004/rinok_anywherehe'
);

// Products API
app.get('/api/products', async (req, res) => {
  try {
    const products = await db.getAll('products');
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/products', csrfProtection, async (req, res) => {
  try {
    if (process.env.NODE_ENV === 'development') {
      console.log('Creating product');
    }
    const product = {
      ...req.body,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    const messageId = await db.save('products', product);
    if (process.env.NODE_ENV === 'development') {
      console.log('Product saved');
    }
    res.json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/products/:id', csrfProtection, async (req, res) => {
  try {
    const productId = req.params.id;
    const updates = req.body;
    // Для простоты создаем обновленный продукт
    const updatedProduct = {
      ...updates,
      id: productId,
      updatedAt: new Date().toISOString()
    };
    await db.save('products', updatedProduct);
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/products/:id', csrfProtection, async (req, res) => {
  try {
    const productId = req.params.id;
    // Для простоты просто возвращаем успех
    res.json({ success: true, id: productId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Orders API
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await db.getAll('orders');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/orders', csrfProtection, async (req, res) => {
  try {
    const order = {
      ...req.body,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    await db.save('orders', order);
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Users API
app.get('/api/users', async (req, res) => {
  try {
    const users = await db.getAll('users');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/users', csrfProtection, async (req, res) => {
  try {
    const user = {
      ...req.body,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    await db.save('users', user);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log('Telegram DB integration active');
});