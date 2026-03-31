# widget-test-site

Static multi-page test website for validating an embeddable chatbot widget on a realistic auction-house style client site.

## Pages
- `index.html`
- `browse-auctions.html`
- `sell-an-item.html`
- `about.html`
- `contact.html`
- `visit-us.html`
- `items/*.html` item detail pages

## Run locally
Open `index.html` directly in a browser, or serve with a static server:

```bash
cd widget-test-site
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

## Widget integration
The widget is no longer hardcoded into each HTML page.

Each page loads:
- `assets/widget-config.js`
- `assets/script.js`

`assets/widget-config.js` contains the runtime widget settings:

```js
window.WIDGET_TEST_SITE_CONFIG = {
  scriptSrc: "https://widget.zivo.one/embed.js",
  clientId: "019cce55-bbe7-713a-aeb0-c2ad505ef931",
  apiUrl: "https://api.zivo.one",
  securityVersion: "2"
};
```

`assets/script.js` reads that object and injects the widget `<script>` tag into the page at runtime. That means the HTML files stay static, while widget settings are controlled from one place.

## How runtime config works
This is a static site, so the browser cannot read a server `.env` file directly.

Instead, this repo uses `assets/widget-config.js` as a browser-readable runtime config file. When the page loads:

1. `assets/widget-config.js` defines `window.WIDGET_TEST_SITE_CONFIG`
2. `assets/script.js` reads that config
3. `assets/script.js` creates the widget script tag with:
   - `src`
   - `data-client-id`
   - `data-api-url`
   - `data-widget-security-version`

Because of that, you only change the widget settings in one file instead of editing every page.

## Changing the client ID
To change the widget client ID, update:

- `assets/widget-config.js`

Change:

```js
clientId: "019cce55-bbe7-713a-aeb0-c2ad505ef931"
```

to the new value.

## Production note
If you want to change the client ID in production without rebuilding the site bundle, `assets/widget-config.js` must be changeable independently from the rest of the image.

Typical options:
- mount `assets/widget-config.js` as a separate file/volume in your hosting platform
- update that file directly on the server/container filesystem
- generate `assets/widget-config.js` from environment variables at container startup

If you only change a normal application `.env` file but do not regenerate `assets/widget-config.js`, the browser will keep using the old client ID.

## Quick QA checks
1. Navigate every top-level page and confirm widget availability.
2. Use Browse filters (category, era, price) and confirm item cards update.
3. Open several item pages and ask authenticity/value questions via widget.
4. Test valuation intents from `sell-an-item.html` prompts.
5. Confirm status panel shows URL and timestamp on each page.
