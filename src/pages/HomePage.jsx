import { shopContext } from '../config.js';
import AiProductSpecialistEmbed from '../components/AiProductSpecialistEmbed.jsx';

export const homeContext = {
  pageType: 'HOME',
  cacheBuster: Date.now(),
  shopContext,
};

const specialistSettings = {
  shouldShowHeader: true,
  inputHeaderText: 'Ask anything about the store',
  showRecommendedQuestions: true,
  brandColour: '#7031da',
};

export default function HomePage() {
  return (
    <section>
      <h2>Home</h2>
      <p>Welcome to the store. The Manifest widget is loaded with HOME context.</p>

      <section style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid #eee' }}>
        <h3 style={{ margin: '0 0 8px' }}>AI Product Specialist</h3>
        <AiProductSpecialistEmbed pageType="HOME" settings={specialistSettings} />
      </section>
    </section>
  );
}
