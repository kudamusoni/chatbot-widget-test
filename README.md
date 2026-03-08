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
The widget embed script is included on every page:

- `src="https://widget.95.216.145.213.nip.io/embed.js"`
- `data-client-id="019cca96-f26e-71ff-a02f-c53438a2b106"`
- `data-widget-security-version="1"`

## Quick QA checks
1. Navigate every top-level page and confirm widget availability.
2. Use Browse filters (category, era, price) and confirm item cards update.
3. Open several item pages and ask authenticity/value questions via widget.
4. Test valuation intents from `sell-an-item.html` prompts.
5. Confirm status panel shows URL and timestamp on each page.
