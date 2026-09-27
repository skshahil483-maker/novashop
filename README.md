# E-Commerce Landing Page

A fully responsive e-commerce landing page built with HTML5, CSS3, JavaScript, and Bootstrap 5 (via CDN), following the assignment brief exactly — no build tools required.

## Sections

- **Navbar** — Responsive Bootstrap navbar with brand name, collapsible hamburger menu on mobile, and Home / Shop / Testimonials / Contact links. Becomes sticky with a subtle background transition on scroll.
- **Hero** — Full-width banner with headline, subheading, and a "Shop Now" CTA. Two-column layout (text left, image right) that stacks on mobile, with a fade-in/slide-up entrance animation.
- **Product Cards** — Bootstrap grid (`col-lg-3` / `col-md-4`) showing 8+ products, each with image, name, price, star rating, and an Add to Cart button. Category filter buttons (All, Electronics, Clothing, Accessories, etc.) show/hide cards via `data-category` attributes. Cards lift with a shadow on hover.
- **Testimonials** — Bootstrap Carousel with customer name, photo, and quote per slide. Auto-slides, with manual prev/next controls.
- **Footer** — Multi-column layout (About, Quick Links, Contact Info, Social Icons), a newsletter signup input with a subscribe button, and a copyright bar.

## JavaScript Functionality

- **Product filtering** — clicking a category button filters cards by their `data-category` attribute
- **Add to Cart** — increments a cart counter badge in the navbar with a small bounce animation on each click
- **Newsletter validation** — basic regex check on the email input; shows inline success/error, no page reload
- **Smooth scroll** — internal nav links scroll smoothly to their section

## CSS / Animations

- CSS transitions on card hover, button hover, and nav link hover
- Fade-in/slide-up animation as sections enter the viewport, via a lightweight `IntersectionObserver` (no external animation library)
- Custom color palette and Google Fonts layered on top of Bootstrap defaults — not stock Bootstrap styling
- Responsive breakpoints tested at 992px, 768px, and 576px

## Tech Stack

- HTML5
- CSS3 (custom properties, media queries)
- JavaScript (ES6, vanilla — no frameworks)
- Bootstrap 5 (CDN — CSS + JS bundle)
- Google Fonts

## Project Structure

```
project/
├── index.html       # Markup — navbar, hero, products, testimonials, footer
├── css/
│   └── style.css    # Custom styling on top of Bootstrap
└── js/
    └── script.js    # Filtering, cart counter, newsletter validation, smooth scroll, scroll-reveal
```

## Running Locally

No dependencies or build step. Either:

1. Open `index.html` directly in a browser, or
2. Serve it locally:
   ```bash
   cd project
   python3 -m http.server 8000
   ```
   Then visit `http://localhost:8000`.

## Notes

- Cart state (item count) lives in memory only — refreshing the page resets it.
- Product images can be swapped for real photos by updating the `img` `src` attributes or the product data array in `js/script.js`, depending on implementation.
