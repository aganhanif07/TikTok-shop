# 🛍️ TikTok Product API (Express.js)

API ini dibuat untuk menampilkan data hasil scraping produk TikTok Shop, yang disimpan dalam file `product_list.json`. Data diambil dari endpoint internal TikTok melalui console injection dan di-host menggunakan Node.js + Express.

---

## 🚀 Fitur API

| Endpoint | Keterangan |
|----------|------------|
| `GET /` | Dokumentasi API (web-based) |
| `GET /tiktok/all` | Menampilkan semua produk |
| `GET /tiktok/search?q=keyword` | Cari produk berdasarkan judul |
| `GET /tiktok/product-detail?productId=...` | Detail produk berdasarkan ID |
| `GET /tiktok/search-by-shop?shopId=...` | Cari produk berdasarkan toko |
| `GET /tiktok/search-by-category?categoryId=...` | Cari produk berdasarkan kategori (opsional) |

---

## ⚙️ Cara Setup

1. **Clone repo / siapkan project:**

```bash
git clone <repo-url>
cd tiktok-api
