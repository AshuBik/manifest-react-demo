# Manifest Demo — Integrating the chat widget into a React app

This is a small Vite + React app that shows how to integrate Manifest into a single-page React project. It covers the main chat widget (`bundle.js`) and the standalone AI Product Specialist embed (`aiProductSpecialistBundle.js`), and it works with React Router so the widget reacts correctly when the user navigates between pages.

If you are adding Manifest to your own React app, you only need to copy the two component files described below and adapt the contexts to match your store data.

---

## What this app shows

- `/` — Home page. Loads the main widget with `pageType: "HOME"`.
- `/product` — Product page (2 X Shampoo). Loads the main widget with `pageType: "PRODUCT"` and the product's data, and also renders the AI Product Specialist inline below the product details.
- `/product-2` — Same as above for a second product (3-6-9 Omega for Hair).

When you click between pages, the widget updates its context. There is no full page reload; React Router handles navigation client-side.

---

## Run it locally

You need Node 18 or newer.

```bash
npm install
npm run dev
```

This starts Vite on `http://localhost:5173` (or 5174 if 5173 is in use). Open that URL, click between Home / Product 1 / Product 2 in the top nav, and you should see the chat widget update to reflect each page.

There is nothing to set up beyond `npm install` — the widget bundles are loaded straight from Google Cloud Storage:

- `https://cdn.bikinfo.co/manifest/bundle.js`
- `https://cdn.bikinfo.co/manifest/aiProductSpecialistBundle.js`

---

## How the integration works

There are two pieces of Manifest in this demo, and they integrate in slightly different ways.

### 1. Main chat widget (`bundle.js`)

The main widget is a global chat that lives on every page. You load it once, give it a `bikContext` describing the current page, and call `window.initiateManifest(bikContext)`. When the user navigates to a different page in your SPA, you call `window.initiateManifest` again with the new context.

The relevant file is [src/ManifestWidget.jsx](src/ManifestWidget.jsx):

```jsx
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
      init();                // script already loaded earlier — just (re-)init
      return;
    }

    const script = document.createElement('script');
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onload = init;
    document.head.appendChild(script);
  }, [context]);

  return null;
}
```

The component is mounted once at the **layout level**, not inside individual pages — see [src/App.jsx](src/App.jsx). The widget mutates global DOM (it appends `#bik-chat-root` to `document.body`), so unmounting it during route changes causes layout breakage. Keep it mounted; pass the new `context` as the route changes.

The `context` value in this demo comes from each page module. For example [src/pages/ProductPage.jsx](src/pages/ProductPage.jsx) exports a `productContext`, and the layout picks the right one based on `useLocation()`:

```jsx
function Shell() {
  const location = useLocation();
  const context = useMemo(() => {
    if (location.pathname === '/product') return productContext;
    if (location.pathname === '/product-2') return product2Context;
    return homeContext;
  }, [location.pathname]);

  return (
    <>
      {/* nav, routes... */}
      <ManifestWidget context={context} />
    </>
  );
}
```

### 2. AI Product Specialist embed (`aiProductSpecialistBundle.js`)

The Product Specialist is a different bundle that mounts into a div *you control* on a product page. It is not global. You give it a container id, a product id, and optional settings; it renders inline.

The relevant file is [src/components/AiProductSpecialistEmbed.jsx](src/components/AiProductSpecialistEmbed.jsx):

```jsx
import { useEffect, useRef } from 'react';

const SCRIPT_SRC = 'https://cdn.bikinfo.co/manifest/aiProductSpecialistBundle.js';
const CONTAINER_ID = 'manifest-ai-product-specialist';

export default function AiProductSpecialistEmbed({ productId, settings }) {
  const containerRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    const start = () => {
      if (cancelled || !window.aiProductSpecialist?.init) return;
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
        document.head.appendChild(script);
      }
    }

    return () => {
      cancelled = true;
      window.aiProductSpecialist?.stop?.();
    };
  }, [productId, settings]);

  return <div id={CONTAINER_ID} ref={containerRef} />;
}
```

Use it inside a product page like this (from [src/pages/ProductPage.jsx](src/pages/ProductPage.jsx)):

```jsx
<AiProductSpecialistEmbed
  productId={productData.id}
  settings={{
    shouldShowHeader: true,
    inputHeaderText: 'Ask about this product',
    showRecommendedQuestions: true,
    brandColour: '#7031da',
  }}
/>
```

When the user navigates away from the product page, React unmounts the component and the cleanup function calls `window.aiProductSpecialist.stop()` to tear down the embed cleanly.

---

## Adapting this to your own React project

1. **Copy the two component files** into your project:
   - [src/ManifestWidget.jsx](src/ManifestWidget.jsx)
   - [src/components/AiProductSpecialistEmbed.jsx](src/components/AiProductSpecialistEmbed.jsx)

2. **Build a `bikContext` for each page type.** The shape depends on the page. The minimum is `pageType` and `shopContext`. Examples:

   ```js
   // Home
   const homeContext = {
     pageType: 'HOME',
     cacheBuster: Date.now(),
     shopContext: {
       shop: 'yourstore.myshopify.com',
       locale: 'en',
       currency: { active: 'USD', rate: '1.0' },
       country: 'US',
     },
   };

   // Product
   const productContext = {
     pageType: 'PRODUCT',
     cacheBuster: Date.now(),
     shopContext: { /* same as above */ },
     productData: {
       id: 12345,
       handle: 'product-handle',
       title: 'Product name',
       featured_image: 'https://...',
       price: 1999,
       variants: [
         { id: 678, available: true, title: 'Default' },
       ],
     },
   };

   // Collection
   const collectionContext = {
     pageType: 'COLLECTION',
     cacheBuster: Date.now(),
     shopContext: { /* same as above */ },
     collectionData: {
       isOnAllProductsPage: false,
       collectionInfo: {
         id: 999,
         handle: 'best-sellers',
         title: 'Best Sellers',
       },
     },
   };
   ```

3. **Mount `<ManifestWidget context={context} />` once at your layout level**, picking the right context based on the current route (use `useLocation()`, `useParams()`, or whatever your router provides).

4. **On product pages where you want the inline AI Product Specialist**, drop in `<AiProductSpecialistEmbed productId={...} settings={...} />` wherever you want it to render.

That's the whole integration.

---

## Important details (gotchas)

### Keep `ManifestWidget` mounted at layout level

Mounting it inside a page component, then unmounting on route change, causes the widget's layout to break the next time it mounts. The widget creates `<style>` and `<iframe>` elements at the document level and is not designed to be torn down and rebuilt mid-session. Keep one instance alive at the app shell, just change `context`.

### `cacheBuster` field

This is just `Date.now()` and tells Manifest to reset any per-page caches. Set it once per context object (it doesn't need to update on every render).

### `productData.price` is in minor units

Shopify convention: `1999` means `$19.99`. Don't divide by 100 yourself; Manifest handles the formatting based on `shopContext.currency`.

---

## Bundle URLs

Two bundle URLs are available; pick one and stay with it:

- `https://cdn.bikinfo.co/manifest/<file>` — recommended, served via CDN.
- `https://storage.googleapis.com/bik-assets/manifest/<file>` — direct origin, also fine.

Both are cached for up to one hour by browsers. After a Manifest release, returning users will pick up the new bundle on their next cache miss (typically within an hour).

---

## Project layout

```
src/
  App.jsx                              # router shell + the always-mounted widget
  ManifestWidget.jsx                   # main chat widget loader (bundle.js)
  main.jsx
  components/
    AiProductSpecialistEmbed.jsx       # standalone product specialist embed
  pages/
    HomePage.jsx                       # exports homeContext + page UI
    ProductPage.jsx                    # exports productContext + page UI + embed
    Product2Page.jsx                   # exports product2Context + page UI + embed
```
