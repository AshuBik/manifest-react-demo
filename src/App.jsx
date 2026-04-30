import { BrowserRouter, Routes, Route, NavLink, Navigate, useLocation } from 'react-router-dom';
import { useMemo } from 'react';
import ManifestWidget from './ManifestWidget.jsx';
import HomePage, { homeContext } from './pages/HomePage.jsx';
import ProductPage, { productContext } from './pages/ProductPage.jsx';
import Product2Page, { product2Context } from './pages/Product2Page.jsx';

const linkStyle = ({ isActive }) => ({
  marginRight: 16,
  textDecoration: isActive ? 'underline' : 'none',
  fontWeight: isActive ? 600 : 400,
});

function Shell() {
  const location = useLocation();
  const context = useMemo(() => {
    if (location.pathname === '/product') return productContext;
    if (location.pathname === '/product-2') return product2Context;
    return homeContext;
  }, [location.pathname]);

  return (
    <>
      <header style={{ padding: 16, borderBottom: '1px solid #eee' }}>
        <h1 style={{ margin: '0 0 12px' }}>Manifest Demo</h1>
        <nav>
          <NavLink to="/" style={linkStyle} end>Home</NavLink>
          <NavLink to="/product" style={linkStyle}>Product 1</NavLink>
          <NavLink to="/product-2" style={linkStyle}>Product 2</NavLink>
        </nav>
      </header>
      <main style={{ padding: 16 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/product-2" element={<Product2Page />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <ManifestWidget context={context} />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Shell />
    </BrowserRouter>
  );
}
