# Contributing to Krama

Thanks for considering a contribution.

## Getting set up

```bash
git clone https://github.com/Samudra-GITHub/Krama.git
cd Krama
npm install
npm run dev
```

No environment variables are required — the app runs on static seed data in `lib/`.

## Before opening a PR

```bash
npm run build
npm run lint
```

Both must pass with zero errors.

## Scope

- Route/page changes belong under `app/(site)/`.
- Shared UI belongs in `components/`, grouped by domain (`shop`, `product`, `checkout`, `account`, `admin`, `motion`, `3d`, `ui`).
- Motion should reuse existing GSAP timelines (`lib/gsap.ts`) or the shared `components/motion` primitives rather than introducing a new animation approach.
- Respect `useReducedMotion` — new animations must degrade gracefully when it's active.

## Reporting issues

Use the issue templates under `.github/ISSUE_TEMPLATE/`.
