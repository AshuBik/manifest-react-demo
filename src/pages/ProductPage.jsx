import { useParams, Navigate } from 'react-router-dom';
import { products } from '../products.js';
import AiProductSpecialistEmbed from '../components/AiProductSpecialistEmbed.jsx';

export default function ProductPage() {
  const { handle } = useParams();
  const product = products[handle];
  if (!product) return <Navigate to="/" replace />;

  const { id, title, featured_image, price } = product.context.productData;
  return (
    <section>
      <h2>{title}</h2>
      <img src={featured_image} alt={title} style={{ maxWidth: 240 }} />
      <p>Price: {price}</p>
      <p>The Manifest widget is loaded with PRODUCT context.</p>

      <section style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid #eee' }}>
        <h3 style={{ margin: '0 0 8px' }}>AI Product Specialist</h3>
        <AiProductSpecialistEmbed productId={id} settings={product.specialistSettings} />
      </section>
    </section>
  );
}
