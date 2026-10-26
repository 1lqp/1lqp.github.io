# NovaKeys Digital Store

A multilingual storefront for Algerian customers to browse and order digital subscriptions using manual payment methods.

## Run & Operate

- `pnpm --filter @workspace/novakeys-store run dev` — run the storefront
- `pnpm --filter @workspace/novakeys-store run typecheck` — type-check the web artifact
- `PORT=20077 BASE_PATH=/ pnpm --filter @workspace/novakeys-store run build` — build outside the managed workflow

## Where things live

- `artifacts/novakeys-store/public/site/` — imported storefront bundle, logo, favicon, and responsive style overrides
- `artifacts/novakeys-store/scripts/patch-store-bundle.mjs` — repeatable fee and order-confirmation text updates
- `artifacts/novakeys-store/vite.config.ts` — serves the imported SPA through the artifact preview

## Architecture decisions

- The supplied NovaKeys ZIP contained a production bundle, not the original editable application source.
- Preserve the existing EasySite SDK and remote `orders/orders:createOrder` flow; do not replace the order store or payment backend without explicit approval.
- The Flexy fee is updated in the client bundle. The remote order processor source was not included, so its saved-order fee and total cannot be confirmed or changed here.

## Product

Customers can browse plans, submit subscription orders, choose manual payment methods, and send an order summary and payment proof through WhatsApp.
