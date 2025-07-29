const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Load JSON data once saat server start
let products = [];

try {
  const data = fs.readFileSync('./product_list.json', 'utf-8');
  products = JSON.parse(data);
} catch (error) {
  console.error('Gagal membaca file JSON:', error);
}

// ✅ GET / – Dokumentasi API
app.get('/', (req, res) => {
  res.send(`
    <h1>Tiktok Product API</h1>
    <p>Berikut adalah endpoint-endpoint yang tersedia (klik untuk mencoba):</p>
    <ul>
      <li>
        <strong>GET /tiktok/all</strong><br>
        → <a href="/tiktok/all" target="_blank">Contoh: /tiktok/all</a>
      </li>
      <li>
        <strong>GET /tiktok/search?q=keyword</strong><br>
        → <a href="/tiktok/search?q=kulot" target="_blank">Contoh: /tiktok/search?q=kulot</a>
      </li>
      <li>
        <strong>GET /tiktok/product-detail?productId=PRODUCT_ID</strong><br>
        → <a href="/tiktok/product-detail?productId=1729559314914379673" target="_blank">Contoh: /tiktok/product-detail?productId=1729559314914379673</a>
      </li>
      <li>
        <strong>GET /tiktok/search-by-shop?shopId=SHOP_ID</strong><br>
        → <a href="/tiktok/search-by-shop?shopId=7494742268156152729" target="_blank">Contoh: /tiktok/search-by-shop?shopId=7494742268156152729</a>
      </li>
      <li>
        <strong>GET /tiktok/search-by-category?categoryId=CATEGORY_ID</strong><br>
        → <a href="/tiktok/search-by-category?categoryId=123" target="_blank">Contoh: /tiktok/search-by-category?categoryId=123</a>
      </li>
    </ul>
    <p><em>Semua data berasal dari hasil scrapping dalam file <code>product_list.json</code>.</em></p>
    <p style="margin-top:30px;font-size:0.9em;color:#999;">Built with Express.js</p>
  `);
});


// GET /tiktok/search-by-shop?shopId={shop_id}
app.get('/tiktok/search-by-shop', (req, res) => {
  const { shopId } = req.query;
  if (!shopId) return res.status(400).json({ error: 'shopId is required' });

  const result = products.filter(p => p.seller_info?.seller_id === shopId);
  res.json(result);
});

// GET /tiktok/search-by-category?categoryId={cat_id}
app.get('/tiktok/search-by-category', (req, res) => {
  const { categoryId } = req.query;
  if (!categoryId) return res.status(400).json({ error: 'categoryId is required' });

  const result = products.filter(p => p.category_id === categoryId);
  res.json(result);
});

// GET /tiktok/product-detail?productId={product_id}
app.get('/tiktok/product-detail', (req, res) => {
  const { productId } = req.query;
  if (!productId) return res.status(400).json({ error: 'productId is required' });

  const product = products.find(p => p.product_id === productId);
  if (!product) return res.status(404).json({ error: 'Product not found' });

  res.json(product);
});

// ✅ GET /tiktok/search?q=keyword
app.get('/tiktok/search', (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: 'q is required' });

  const keyword = q.toLowerCase();
  const result = products.filter(p => p.title.toLowerCase().includes(keyword));
  res.json(result);
});

// ✅ GET /tiktok/all – Get all data
app.get('/tiktok/all', (req, res) => {
  res.json(products);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
