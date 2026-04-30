import AiProductSpecialistEmbed from '../components/AiProductSpecialistEmbed.jsx';
import { shopContext } from '../config.js';

export const product2Context = {
  pageType: 'PRODUCT',
  cacheBuster: Date.now(),
  shopContext,
  productData: {
    id: 8373405942076,
    handle: '3-6-9-omega-for-hair',
    title: '3-6-9 Omega for Hair',
    featured_image: 'https://picsum.photos/seed/omega/400/400',
    price: 89900,
    variants: [
      { id: 45821456023868, available: false, title: 'Vintage / Pink' },
      { id: 45821477290300, available: false, title: 'Vintage / Red' },
      { id: 45821456056636, available: false, title: 'Classic / Pink' },
      { id: 45821477323068, available: false, title: 'Classic / Red' },
    ],
  },
};

const specialistSettings = {
  shouldShowHeader: true,
  inputHeaderText: 'Ask about 3-6-9 Omega for Hair',
  showRecommendedQuestions: true,
  brandColour: '#7031da',
};

export default function Product2Page() {
  const { id, title, featured_image, price } = product2Context.productData;
  return (
    <section>
      <h2>{title}</h2>
      <img src={featured_image} alt={title} style={{ maxWidth: 240 }} />
      <p>Price: {price}</p>
      <p>The Manifest widget is loaded with PRODUCT context.</p>

      <section style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid #eee' }}>
        <h3 style={{ margin: '0 0 8px' }}>AI Product Specialist</h3>
        <AiProductSpecialistEmbed productId={id} settings={specialistSettings} />
      </section>
    </section>
  );
}
