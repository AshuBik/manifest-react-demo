import { BrowserRouter, Routes, Route, NavLink, Navigate, useLocation } from 'react-router-dom';
import { useMemo } from 'react';
import ManifestWidget from './ManifestWidget.jsx';
import HomePage, { homeContext } from './pages/HomePage.jsx';
import ProductPage from './pages/ProductPage.jsx';
import { products } from './products.js';

const linkStyle = ({ isActive }) => ({
  marginRight: 16,
  textDecoration: isActive ? 'underline' : 'none',
  fontWeight: isActive ? 600 : 400,
});

function Shell() {
  const location = useLocation();
  const context = useMemo(() => {
    const match = location.pathname.match(/^\/product\/(.+)$/);
    if (match) return products[match[1]]?.context ?? homeContext;
    return homeContext;
  }, [location.pathname]);

  return (
    <>
      <header style={{ padding: 16, borderBottom: '1px solid #eee' }}>
        <h1 style={{ margin: '0 0 12px' }}>Manifest Demo</h1>
        <nav>
          <NavLink to="/" style={linkStyle} end>Home</NavLink>
          {Object.entries(products).map(([handle, p]) => (
            <NavLink key={handle} to={`/product/${handle}`} style={linkStyle}>
              {p.context.productData.title}
            </NavLink>
          ))}
        </nav>
      </header>
      <main style={{ padding: 16 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:handle" element={<ProductPage />} />
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
