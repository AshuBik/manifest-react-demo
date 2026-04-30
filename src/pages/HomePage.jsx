import { shopContext } from '../config.js';

export const homeContext = {
  pageType: 'HOME',
  cacheBuster: Date.now(),
  shopContext,
};

export default function HomePage() {
  return (
    <section>
      <h2>Home</h2>
      <p>Welcome to the store. The Manifest widget is loaded with HOME context.</p>
    </section>
  );
}
