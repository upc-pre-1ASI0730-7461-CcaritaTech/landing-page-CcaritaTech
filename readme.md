# IoBuild - Landing Page

A modern, responsive landing page for IoBuild, a SaaS platform focused on IoT solutions for construction companies. Built with semantic HTML5, modern CSS3 and vanilla JavaScript.

## 🚀 Key Features

- **Responsive Design**: Flawless adaptation from mobile to large desktop screens
- **SEO Optimized**: Complete meta tags, Schema.org, Open Graph
- **WCAG Accessibility**: Keyboard navigation & screen reader friendly structure
- **Performance**: Native lazy loading, image optimization, lean CSS/JS
- **Conversion Focused**: Funnel optimized for three visitor profiles
- **Modern UI**: Minimal style with a primary mint accent color

## 📁 Project Structure

```
landing/
├── index.html              # Main page
├── about-us.html           # About us page
├── faq.html                # Frequently asked questions
├── readme.md               # This file
├── assets/
│   └── img/                # Images
├── styles/
│   ├── reset.css           # CSS reset
│   └── style.css           # Main styles
└── scripts/
    └── script.js           # Functional JavaScript
```

## 🎨 Design System

### Color Palette

```css
/* Primary Colors */
--color-primary: #10b981        /* Primary mint */
--color-primary-50: #ecfdf5     /* Light mint */
--color-primary-600: #059669    /* Dark mint */

/* Neutral Grays */
--color-gray-50: #f9fafb        /* Very light gray */
--color-gray-900: #111827       /* Very dark gray */

/* Surface & Text */
--color-surface: #ffffff        /* White surface */
--color-text-primary: #111827   /* Primary text */
--color-text-secondary: #6b7280 /* Secondary text */
```

### Typography

```css
/* Font Families */
--font-family-heading: 'Poppins'  /* Headings */
--font-family-body: 'Roboto'      /* Body text */

/* Sizes */
--font-size-xs: 0.75rem     /* 12px */
--font-size-base: 1rem      /* 16px */
--font-size-xl: 1.25rem     /* 20px */
--font-size-4xl: 2.25rem    /* 36px */
```

### Spacing

```css
/* Spacing scale based on 0.25rem (4px) */
--spacing-1: 0.25rem    /* 4px */
--spacing-4: 1rem       /* 16px */
--spacing-8: 2rem       /* 32px */
--spacing-16: 4rem      /* 64px */
```

## 🔧 Customization

### Change Colors

Edit CSS variables in `styles/style.css`:

```css
:root {
    --color-primary: #your-main-color;
    --color-primary-50: #your-light-color;
    --color-primary-600: #your-dark-color;
}
```

### Update Content

1. **Text**: Edit directly in the HTML files
2. **Images**: Replace files in `assets/img/`
3. **Styles**: Modify or extend CSS variables and rules

### Add New Sections

Follow this pattern:

```html
<section class="new-section">
    <div class="container">
        <div class="section__header">
            <h2 class="section__title">Section Title</h2>
            <p class="section__subtitle">Descriptive subtitle</p>
        </div>
        <!-- Section content -->
        <div class="section__cta">
            <a href="https://io-build-frontend.vercel.app" class="cta-button cta-button--primary">Call To Action</a>
        </div>
    </div>
</section>
```

## 📱 Responsive Design

Mobile-first approach with key breakpoints:

```css
/* Base: mobile up to 768px (default styles) */
/* Tablet: 768px - 1024px */
@media (max-width: 1024px) { /* Tablet styles */ }

/* Mobile: up to 768px */
@media (max-width: 768px) { /* Mobile styles */ }

/* Small mobile: up to 480px */
@media (max-width: 480px) { /* Small mobile styles */ }
```

## ⚡ Performance

### Lazy Loading

Uses native lazy loading:

```html
<img src="image.jpg" alt="Description" loading="lazy">
```

### CSS Optimizations

- Reusable CSS variables
- Efficient selectors
- Organized media queries
- Minimal visual overhead

### JavaScript Optimizations

- Event delegation
- Debounced scroll logic
- Intersection Observer for animations
- Modular, commented code

## 🎯 Conversion & SEO

### Conversion Funnel

1. **Hero Section**: For decisive visitors
2. **Benefits Section**: For emotional/solution-seeking visitors
3. **Features Section**: For analytical/logical visitors
4. **Social Proof**: Reinforces trust for all personas
5. **Final CTA**: Last conversion push

### Technical SEO

- Schema.org markup
- Open Graph tags
- Twitter Cards
- Optimized meta descriptions
- Semantic URLs & heading hierarchy

### Accessibility

- Full keyboard navigation
- Proper ARIA attributes
- WCAG AA contrast
- Alt text for images
- (Optional) skip links pattern

## 🛠 Installation

1. Clone or download the project
2. Open it in your code editor
3. Start a local static server (or just open `index.html`)
4. Navigate through the pages

## 📜 Available Scripts (script.js)

- `initMobileMenu()` – Responsive hamburger menu
- `initSmoothScrolling()` – Smooth anchor navigation
- `initFAQAccordion()` – FAQ accordion behavior
- `initLazyLoading()` – Image lazy loading enhancements
- `initScrollAnimations()` – Scroll-based animations
- `initFormHandling()` – Basic form/CTA initialization

## 🧩 Component Structure

```css
/* BEM naming convention */
.block {}
.block__element {}
.block__element--modifier {}

/* Example */
.pricing-card {}
.pricing-card__title {}
.pricing-card--featured {}
```

## 🌐 Supported Browsers

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 📈 Analytics & Tracking

Placeholders prepared for:

- Google Analytics 4
- Facebook Pixel
- Custom analytics hooks
- Error tracking
- Performance monitoring

Enable in `script.js` (example):

```javascript
// Google Analytics example
gtag('event', 'page_view', {
  page_title: document.title,
  page_location: window.location.href
});
```

## 📄 License

This project is licensed under the MIT License. See the LICENSE file for details.

---

Built with ❤️ for IoBuild

*Last update: September 2025*

# landing-page-CcaritaTech
