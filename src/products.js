import { shopContext } from './config.js';

export const products = {
  'lorem-ipsum': {
    context: {
      pageType: 'PRODUCT',
      cacheBuster: Date.now(),
      shopContext,
      productData: {
        id: '1001',
        handle: 'lorem-ipsum',
        title: 'Lorem Ipsum',
        featured_image: 'https://picsum.photos/seed/lorem/400/400',
        price: 1999,
        variants: [
          { id: 1101, available: true, title: 'Small / Sit Amet' },
          { id: 1102, available: true, title: 'Small / Consectetur' },
          { id: 1103, available: true, title: 'Medium / Sit Amet' },
          { id: 1104, available: true, title: 'Medium / Consectetur' },
          { id: 1105, available: true, title: 'Large / Sit Amet' },
          { id: 1106, available: true, title: 'Large / Consectetur' },
        ],
      },
    },
    specialistSettings: {
      shouldShowHeader: true,
      inputHeaderText: 'Ask about Lorem Ipsum',
      showRecommendedQuestions: true,
      brandColour: '#7031da',
    },
  },
  'dolor-sit-amet': {
    context: {
      pageType: 'PRODUCT',
      cacheBuster: Date.now(),
      shopContext,
      productData: {
        id: '1002',
        handle: 'dolor-sit-amet',
        title: 'Dolor Sit Amet',
        featured_image: 'https://picsum.photos/seed/dolor/400/400',
        price: 4999,
        variants: [
          { id: 1201, available: true, title: 'Adipiscing / Elit' },
          { id: 1202, available: false, title: 'Adipiscing / Tempor' },
          { id: 1203, available: true, title: 'Incididunt / Elit' },
          { id: 1204, available: false, title: 'Incididunt / Tempor' },
        ],
      },
    },
    specialistSettings: {
      shouldShowHeader: true,
      inputHeaderText: 'Ask about Dolor Sit Amet',
      showRecommendedQuestions: true,
      brandColour: '#7031da',
    },
  },
};
