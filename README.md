# Day19 React Project

A React + Vite project with React Router, Axios API integration, Product Listing Page, Product Detail Page, Loading/Error handling, and Express backend connection.

---

# Features

✅ React Router DOM  
✅ Axios API Calls  
✅ Dynamic Routing  
✅ Product Listing Page  
✅ Product Detail Page  
✅ Loading State  
✅ Error Handling  
✅ Responsive Product Cards  
✅ Express Backend Integration  
✅ CORS Enabled  
✅ CSS Styling  

---

# Technologies Used

- React JS
- Vite
- React Router DOM
- Axios
- Express JS
- CSS

---

# Project Setup

## Step 1: Create React App

```bash
npm create vite@latest day19-react -- --template react
```

Move to project folder:

```bash
cd day19-react
```

Install dependencies:

```bash
npm install
```

Start React server:

```bash
npm run dev
```

---

# Step 2: Install Packages

```bash
npm install react-router-dom axios
```

---

# Folder Structure

```bash
src/
│
├── components/
│   └── Navbar.jsx
│
├── pages/
│   ├── HomePage.jsx
│   ├── ProductsPage.jsx
│   └── ProductDetailPage.jsx
│
├── App.jsx
├── main.jsx
└── index.css
```

---

# Routing

| Route | Component |
|---|---|
| / | HomePage |
| /products | ProductsPage |
| /products/:id | ProductDetailPage |

---

# API Endpoints

## Get All Products

```bash
GET /api/products
```

## Get Product By ID

```bash
GET /api/products/:id
```

---

# Products Page Features

- Fetch products using Axios
- useEffect Hook
- Loading State
- Error State
- Product Cards
- Navigate to Product Details

---

# Product Detail Features

- Dynamic Route
- useParams Hook
- Fetch Single Product
- Display Full Product Information

---

# Backend Setup

Install Express and CORS:

```bash
npm install express cors
```

Example CORS setup:

```javascript
app.use(cors({
  origin: "http://localhost:5173"
}));
```

Run backend server:

```bash
node server.js
```

Backend runs on:

```bash
http://localhost:5000
```

---

# Run Frontend

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# Loading State

```javascript
if (loading) {
  return <h2>Loading products...</h2>;
}
```

---

# Error State

```javascript
if (error) {
  return <h2>Failed to load. Try again.</h2>;
}
```

---

# Styling

- Responsive Grid Layout
- Product Cards
- Hover Effects
- Navbar Design
- Clean UI

---

# GitHub Commands

Initialize Git:

```bash
git init
```

Add files:

```bash
git add .
```

Commit:

```bash
git commit -m "Completed day19-react project"
```

Create GitHub repository named:

```bash
day19-react
```

Push project:

```bash
git remote add origin YOUR_REPO_LINK
git branch -M main
git push -u origin main
```

---

# Final Output

✅ Home Page  
✅ Product Listing Page  
✅ Product Detail Page  
✅ API Integration  
✅ Dynamic Routing  
✅ Error Handling  
✅ Loading State  
✅ Responsive UI  

---
