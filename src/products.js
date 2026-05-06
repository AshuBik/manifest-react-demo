import { shopContext } from './config.js';

export const products = {
  'red-cape': {
    context: {
      pageType: 'PRODUCT',
      cacheBuster: Date.now(),
      shopContext,
      productData: {
        id: '1969',
        handle: 'red-cape',
        title: 'Red Cape',
        featured_image: 'https://images.kiwico.com/products/1969/3502-500w.jpg',
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
    },
    specialistSettings: {
      shouldShowHeader: true,
      inputHeaderText: 'Ask about Red Cape',
      showRecommendedQuestions: true,
      brandColour: '#7031da',
    },
  },
  'fire-lab': {
    context: {
      pageType: 'PRODUCT',
      cacheBuster: Date.now(),
      shopContext,
      productData: {
        id: 2164,
        handle: 'fire-lab',
        title: 'Fire Lab',
        featured_image: 'https://images.kiwico.com/products/2164/3744-500w.jpg',
        price: 89900,
        variants: [
          { id: 45821456023868, available: false, title: 'Vintage / Pink' },
          { id: 45821477290300, available: false, title: 'Vintage / Red' },
          { id: 45821456056636, available: false, title: 'Classic / Pink' },
          { id: 45821477323068, available: false, title: 'Classic / Red' },
        ],
      },
    },
    specialistSettings: {
      shouldShowHeader: true,
      inputHeaderText: 'Ask about Fire Lab',
      showRecommendedQuestions: true,
      brandColour: '#7031da',
    },
  },
};
