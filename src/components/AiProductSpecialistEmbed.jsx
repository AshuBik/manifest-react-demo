import { useEffect, useRef } from 'react';

const SCRIPT_SRC = 'https://cdn.bikinfo.co/manifest/aiProductSpecialistBundle.js';
const CONTAINER_ID = 'manifest-ai-product-specialist';

export default function AiProductSpecialistEmbed({ productId, settings }) {
  const containerRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    const start = () => {
      if (cancelled) return;
      if (!window.aiProductSpecialist?.init) return;
      window.aiProductSpecialist.init({
        containerId: CONTAINER_ID,
        productData: { id: productId },
        ...(settings ? { aiProductSpecialistSettings: settings } : {}),
      });
      window.aiProductSpecialist.start();
    };

    if (window.aiProductSpecialist?.init) {
      start();
    } else {
      const existing = document.querySelector(`script[src="${SCRIPT_SRC}"]`);
      if (existing) {
        existing.addEventListener('load', start, { once: true });
      } else {
        const script = document.createElement('script');
        script.src = SCRIPT_SRC;
        script.async = true;
        script.onload = start;
        script.onerror = () => console.error('Failed to load AI Product Specialist bundle.');
        document.head.appendChild(script);
      }
    }

    return () => {
      cancelled = true;
      if (window.aiProductSpecialist?.stop) {
        window.aiProductSpecialist.stop();
      }
    };
  }, [productId, settings]);

  return <div id={CONTAINER_ID} ref={containerRef} />;
}
