import { useEffect } from 'react';

const SCRIPT_SRC = 'https://cdn.bikinfo.co/manifest/bundle.js';

export default function ManifestWidget({ context }) {
  useEffect(() => {
    const init = () => {
      if (typeof window.initiateManifest === 'function') {
        window.initiateManifest(context);
      }
    };

    const existing = document.querySelector(`script[src="${SCRIPT_SRC}"]`);
    if (existing) {
      init();
      return;
    }

    const script = document.createElement('script');
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onload = init;
    script.onerror = () => {
      console.error('Failed to load Manifest widget script.');
    };
    document.head.appendChild(script);
  }, [context]);

  return null;
}
