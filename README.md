# Aurumcart - Professional Affiliate Marketing Website

🚀 A modern, fast, and scalable affiliate marketing platform for discovering and sharing the best deals across multiple product categories.

## ✨ Features

✅ **Homepage** - Hero banner with 3D effects, trending products, category showcase
✅ **Category Pages** - Browse products filtered by category
✅ **Product Details** - Comprehensive product information with ratings
✅ **Smart Redirect** - `/go/:id` route for affiliate link tracking
✅ **Admin Panel** - Full CRUD operations for products with image upload
✅ **Mobile Responsive** - Works perfectly on all devices
✅ **Fast & Optimized** - Built with React, Vite, and Tailwind CSS
✅ **Supabase Backend** - PostgreSQL database with real-time capabilities

## 🛠 Tech Stack

- **Frontend:** React 18 + Vite + Tailwind CSS
- **Backend/Database:** Supabase (PostgreSQL + Storage)
- **Hosting:** Cloudflare Pages with auto-deploy from GitHub
- **UI Components:** Lucide React Icons
- **State Management:** React Context & Hooks

## 📁 Project Structure

```
Aurumcart/
├── src/
│   ├── components/        # Reusable React components
│   ├── pages/            # Page components (Home, Category, Product, Admin)
│   ├── lib/              # API functions & utilities
│   ├── styles/           # Custom CSS & animations
│   ├── App.jsx           # Main app with routing
│   ├── main.jsx          # React entry point
│   └── index.css         # Global styles
├── public/               # Static assets
├── index.html            # HTML template
├── package.json          # Dependencies
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # Tailwind configuration
├── .env.local            # Environment variables
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- npm or yarn
- Supabase account
- GitHub account

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/akroy8549-temp/Aurumcart.git
cd Aurumcart
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup Supabase**
- Create a new Supabase project at https://supabase.com
- Go to SQL Editor and run the schema SQL (see below)
- Get your API keys from Settings → API

4. **Configure environment variables**
```bash
# Create .env.local file and add:
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
VITE_ADMIN_PASSWORD=aurumcart@admin123
```

5. **Start development server**
```bash
npm run dev
```

Open http://localhost:5173 in your browser

### Build for Production

```bash
npm run build
npm run preview
```

## 📊 Supabase Database Schema

Run these SQL queries in your Supabase dashboard (SQL Editor):

```sql
-- Create categories table
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT now()
);

-- Create products table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  image_url TEXT,
  rating DECIMAL(3, 1) DEFAULT 0,
  affiliate_link TEXT NOT NULL,
  category_id UUID NOT NULL REFERENCES categories(id),
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Create clicks tracking table
CREATE TABLE clicks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id),
  clicked_at TIMESTAMP DEFAULT now()
);

-- Insert default categories
INSERT INTO categories (name, slug) VALUES
('Women Fashion', 'women-fashion'),
('Men Fashion', 'men-fashion'),
('Electronics', 'electronics'),
('Home & Kitchen', 'home-kitchen'),
('Beauty', 'beauty'),
('Sports', 'sports'),
('Books', 'books'),
('Toys & Games', 'toys-games');

-- Create indexes for better performance
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_clicks_product ON clicks(product_id);
CREATE INDEX idx_clicks_date ON clicks(clicked_at);
```

### Setup Supabase Storage

1. Go to Storage in Supabase dashboard
2. Create a new bucket named `product-images`
3. Make it **Public** (allow public read access)

## 📍 Routes

### Public Routes
- `/` - Homepage
- `/category/:slug` - Category page (e.g., `/category/electronics`)
- `/product/:id` - Product detail page
- `/go/:id` - Affiliate redirect (with click tracking)

### Admin Routes
- `/admin/login` - Admin login page
- `/admin` - Admin dashboard (protected route)

## 🔐 Admin Access

**Email:** admin@aurumcart.com  
**Password:** aurumcart@admin123 (from .env.local)

## 📱 Features Breakdown

### Homepage
- Eye-catching hero banner with animations
- Featured categories grid
- Trending products showcase
- Responsive mobile layout

### Category Pages
- Filter products by category
- Product grid with cards
- Product count display

### Product Details
- High-quality product images
- Detailed information
- Star ratings
- One-click affiliate redirection
- Benefits section

### Admin Panel
- Secure login with password protection
- Add new products with image upload
- Edit existing products
- Delete products with confirmation
- View all products in a table
- Real-time updates

## ⚡ Performance Optimizations

✅ Code splitting with Vite
✅ Image optimization
✅ Lazy loading
✅ CSS purging with Tailwind
✅ Minification in production
✅ Optimized bundle size

## 🔒 Security Features

✅ Environment variables for sensitive data
✅ Protected admin routes
✅ Input validation on all forms
✅ CORS headers configured
✅ Password-protected admin panel

## 🌐 Deployment on Cloudflare Pages

1. **Push code to GitHub**
```bash
git add .
git commit -m "Initial Aurumcart setup"
git push origin main
```

2. **Connect to Cloudflare Pages**
   - Go to https://dash.cloudflare.com
   - Pages → Connect to Git
   - Select `akroy8549-temp/Aurumcart` repository

3. **Configure Build Settings**
   - Build command: `npm run build`
   - Build output directory: `dist`

4. **Add Environment Variables**
   - Go to Settings → Environment variables
   - Add `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_ADMIN_PASSWORD`

5. **Deploy**
   - Auto-deploys on every push to main branch

## 📖 API Functions

### Product APIs
```javascript
import { getProducts, getProductById, getProductsByCategory, getTrendingProducts } from './lib/api'

// Get all products
const products = await getProducts()

// Get product by ID
const product = await getProductById(productId)

// Get products by category
const categoryProducts = await getProductsByCategory(categoryId)

// Get trending products (rating >= 4)
const trending = await getTrendingProducts(12)
```

### Admin APIs
```javascript
import { createProduct, updateProduct, deleteProduct, getAllProductsAdmin } from './lib/api'

// Create new product
await createProduct(productData, imageFile)

// Update product
await updateProduct(productId, productData, imageFile)

// Delete product
await deleteProduct(productId)

// Get all products (admin)
const allProducts = await getAllProductsAdmin()
```

### Click Tracking
```javascript
import { logProductClick } from './lib/api'

// Log when user clicks "Get Deal" button
await logProductClick(productId)
```

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to change primary color:
```javascript
colors: {
  primary: '#FFB800', // Change this to your brand color
}
```

### Categories
Add more categories in Supabase:
1. Go to Supabase dashboard → Database → categories
2. Add new rows with name and slug

## 🐛 Troubleshooting

**Page shows blank?**
- Check console for errors (F12)
- Verify Supabase credentials in .env.local
- Make sure Supabase tables are created

**Images not uploading?**
- Check Supabase Storage bucket "product-images" exists
- Make sure bucket is public
- Verify file format is image

**Admin login not working?**
- Check email is exactly: `admin@aurumcart.com`
- Check password matches VITE_ADMIN_PASSWORD
- Clear browser cache and try again

## 📞 Support

For issues and questions:
1. Check GitHub Issues
2. Verify Supabase connection
3. Review browser console for errors

## 📄 License

This project is licensed under the MIT License.

---

**Made with ❤️ by Aurumcart Team**

For latest updates: https://github.com/akroy8549-temp/Aurumcart
