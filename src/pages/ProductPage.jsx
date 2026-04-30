import AiProductSpecialistEmbed from '../components/AiProductSpecialistEmbed.jsx';
import { shopContext } from '../config.js';

export const productContext = {
  pageType: 'PRODUCT',
  cacheBuster: Date.now(),
  shopContext,
  productData: {
    id: 8373402960188,
    handle: '2-x-shampoo',
    title: '2 X Shampoo 123',
    featured_image: 'https://picsum.photos/seed/shampoo/400/400',
    price: 100,
    variants: [
      { id: 45820473835836, available: true, title: 'Small / Blue' },
      { id: 45821333569852, available: true, title: 'Small / Green' },
      { id: 45820473868604, available: true, title: 'Medium / Blue' },
      { id: 45821333602620, available: true, title: 'Medium / Green' },
      { id: 45820473901372, available: true, title: 'Large / Blue' },
      { id: 45821333635388, available: true, title: 'Large / Green' },
    ],
  },
};

const specialistSettings = {
  shouldShowHeader: true,
  inputHeaderText: 'Ask about 2 X Shampoo 123',
  showRecommendedQuestions: true,
  brandColour: '#7031da',
};

export default function ProductPage() {
  const { id, title, featured_image, price } = productContext.productData;
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
