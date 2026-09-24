# Krama

**Luxury sneaker marketplace.**

A premium shopping experience inspired by Apple and Nike — built around storytelling, motion, and beautiful product presentation rather than a generic storefront template.

<br/>

<img src="./assets/hero-placeholder.svg" width="100%" alt="Krama hero" />

<br/>

## UI Previews

<table width="100%">
<tr>
<td width="50%"><img src="./assets/screenshot-placeholder.svg" width="100%" alt="Home" /><br/><sub align="center">Home</sub></td>
<td width="50%"><img src="./assets/screenshot-placeholder.svg" width="100%" alt="Shop" /><br/><sub align="center">Shop</sub></td>
</tr>
<tr>
<td width="50%"><img src="./assets/screenshot-placeholder.svg" width="100%" alt="Mobile layout" /><br/><sub align="center">Mobile</sub></td>
<td width="50%"><img src="./assets/screenshot-placeholder.svg" width="100%" alt="Product page" /><br/><sub align="center">Product page</sub></td>
</tr>
</table>

<br/>

## Design Philosophy

Krama treats a sneaker drop like an editorial moment, not a product listing. Layout, typography, and pacing borrow from fashion publishing — large imagery, deliberate whitespace, and motion that reveals rather than decorates.

<br/>

## Components

The app is organized around real commerce surfaces, not a single landing page:

| Route | Purpose |
|:--|:--|
| `/shop` | Catalog browsing |
| `/product/[slug]` | Individual product pages |
| `/collections` | Curated collections |
| `/checkout` | Checkout flow |
| `/account` | Customer account |
| `/admin` | Internal admin surface |
| `/lookbook` | Editorial lookbook |
| `/journal` | Brand journal / long-form content |
| `/community` | Community surface |

Component library: `components/3d`, `components/product`, `components/shop`, `components/checkout`, `components/account`, `components/admin`, `components/motion`, `components/layout`, `components/ui`.

<br/>

## Animations

Motion is driven by **GSAP** (`lib/gsap.ts`, `@gsap/react`) for scroll-linked and timeline animation, the **Motion** library for component-level transitions, and **Lenis** for smooth scrolling. A shared `useReducedMotion` hook respects the user's reduced-motion preference throughout.

<br/>

## Responsive System

Built mobile-first on Tailwind CSS 4, with a dedicated focus-trap hook (`useFocusTrap`) for accessible modal and drawer interactions across breakpoints.

<br/>

## Folder Structure

```
krama/
├── app/
│   └── (site)/
│       ├── account/
│       ├── admin/
│       ├── checkout/
│       ├── collections/
│       ├── community/
│       ├── journal/
│       ├── lookbook/
│       ├── product/
│       └── shop/
├── components/
│   ├── 3d/
│   ├── account/
│   ├── admin/
│   ├── checkout/
│   ├── layout/
│   ├── motion/
│   ├── product/
│   ├── shop/
│   └── ui/
├── lib/
│   ├── collections.ts / community.ts / drops.ts / journal.ts / orders.ts / products.ts
│   ├── gsap.ts
│   └── store/
└── scripts/
```

<br/>

## Tech Stack

`Next.js 16` · `React 19` · `TypeScript` · `Tailwind CSS 4` · `GSAP` · `Motion` · `Lenis` · `Zustand`

<br/>

## Setup

```bash
git clone https://github.com/Samudra-GITHub/Krama.git
cd Krama
npm install
npm run dev
```

No environment variables required — the app currently runs on static seed data (`lib/products.ts`, `lib/collections.ts`, `lib/drops.ts`, `lib/orders.ts`).

<br/>

## Roadmap

- [x] Editorial landing page
- [x] Shop, product, collections, and checkout flows
- [x] Account and admin surfaces
- [x] Lookbook, journal, and community pages
- [ ] Real payment processing
- [ ] Wishlist
- [ ] Live inventory backend

<br/>

## License

MIT — see [LICENSE](./LICENSE).

<br/>

<sub>Part of the Samudra OS product ecosystem. See the [profile](https://github.com/Samudra-GITHub) for the full lineup.</sub>
