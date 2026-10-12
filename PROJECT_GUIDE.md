# PROJECT GUIDE (KanadaVizesi.ca)

<!-- Verification
- Status: draft
- Last verified against code: 2026-10-12
- Commit: _not available from agent environment_
-->

## Read first (for new agents)

1. **Do not assume standard Next.js 13/14 behavior.** This project runs on Next.js `16.3.5` with custom agent rules. See `next.config.ts` and the auto-generated note in `AGENTS.md`.
2. **This is a static-content-heavy marketing/education site** for Turkish speakers researching Canada visas and life in Canada. The only stateful backend feature is the **assessment form email sender** (`app/api/on-degerlendirme/route.ts`).
3. **SEO and content rules are strict.** Before changing content structure, metadata, or routes, read `docs/SEO.md`, `docs/ilk-90-gun-implementation.md`, and `lib/seo.ts`, `lib/content.ts`.
4. **Design is mostly hand-authored CSS with some shadcn/base-ui utilities.** Global layout and typography live in `app/globals.css`, `app/layout.tsx`, and `components/site-header.tsx` / `components/site-footer.tsx`.
5. **Spam protection and rate limiting are implemented manually and via Vercel BotID.** Do not bypass `checkBotId` or the per-IP/email maps in `app/api/on-degerlendirme/route.ts` without understanding risk.

Status tags used below:
- `[code-verified]` – confirmed from current repository code/config.
- `[historically reported]` – taken from existing docs (e.g., `docs/*`, `README.md`) or comments where behavior is not trivially re-verified.
- `[unverified]` – inferred intent; double-check in code or production before depending on it.

---

## 1. Project purpose, users, workflows

- **Purpose**: Inform Turkish-speaking users about ways to go to Canada (visit, study, work, permanent residence) and life in Canada, and collect details via an **"ön değerlendirme" (pre-assessment) form** for potential professional services. [code-verified from `app/page.tsx`, `components/site-footer.tsx`, `lib/content.ts`]
- **Primary users**: Individuals in Turkey planning or considering travel, study, work, or immigration to Canada, and those already in Canada planning early settlement steps. [historically reported from docs, copy]
- **Core workflows**:
  - Browse educational guides and hubs under `/rehberler` and category subtrees such as `/kanada-vizesi/*`, `/kanadada-egitim/*`, `/kanadada-calisma/*`, `/kanadada-yasam/*`. [code-verified via `app/*`, `lib/content.ts`]
  - Use the **search bar** in the header (form to `/rehberler?q=...`) to filter guides. [code-verified from `components/site-header.tsx`]
  - Submit the **pre-assessment form** at `/on-degerlendirme` which POSTs to `/api/on-degerlendirme` and sends an email via Gmail SMTP. [code-verified from `components/assessment-form.tsx`, `app/api/on-degerlendirme/route.ts`, `README.md`]
  - Read static legal and policy pages (`/gizlilik`, `/kullanim-kosullari`, `/kaynak-politikasi`, `/yasal-uyari`, etc.). [code-verified by app routes]

No user accounts, databases, or client-side authentication flows exist. [code-verified – no auth libraries or DB schemas present]

## 2. Technology stack and integrations

- **Framework & runtime**: Next.js `16.3.5` with App Router (`app/` structure) and Node.js `>=22.13.0` requirement. [code-verified from `package.json`, `app/layout.tsx`]
- **Languages**: TypeScript (project `type: module`), React `19.2.6`. [code-verified from `package.json`, `tsconfig.json`]
- **Styling**:
  - Custom global CSS in `app/globals.css` driving most page/layout design. [code-verified]
  - TailwindCSS v4 and `tw-animate-css`, shadcn UI styles via `@import 'tailwindcss'`, `@import 'shadcn/tailwind.css'` in `globals.css` and components in `components/ui/*`. [code-verified]
- **UI component libraries**:
  - `@shadcn/react`, `@base-ui/react` used via `components/ui/*`. [code-verified by dependencies and components directory]
- **Analytics & third parties**:
  - Vercel Analytics via `@vercel/analytics/next` component in `app/layout.tsx`. [code-verified]
  - Google Analytics (GA4) via `@next/third-parties/google` with hardcoded `gaId="G-2GFS7EDGN2"`. [code-verified]
- **Email / SMTP**:
  - Nodemailer SMTP client configured for Gmail (`smtp.gmail.com:465` TLS) in `app/api/on-degerlendirme/route.ts`. [code-verified]
- **Bot / abuse protection**:
  - Vercel BotID via `botid` package: `withBotId(nextConfig)` wrapping `next.config.ts` and `checkBotId` called server-side in the assessment API route. [code-verified]
- **Other UI libs**: `lucide-react`, `embla-carousel-react`, `react-resizable-panels`, `cmdk`, etc., mainly surfaced under `components/ui/*` and specific guide tools (e.g., arrival/visitor guides). [code-verified]

## 3. Layout, key directories, routes, and APIs

### Top-level layout

- `app/layout.tsx` – Root layout with:
  - Global metadata (icons, `metadataBase`, robots, verification meta tags, global title/description). [code-verified]
  - Global fonts (Geist), `<SiteHeader/>`, `<SiteFooter/>`, `<Analytics/>`, and Google Analytics script. [code-verified]

- `app/globals.css` – Global CSS for:
  - Top header/nav, footer, homepage sections.
  - Article, hub, guide, visitor, arrival, legal and assessment layouts.
  - Responsive behavior via `@media` queries. [code-verified]

### Key content routing

- **Homepage**: `app/page.tsx`
  - Marketing-style editorial landing page with sections “Hızlı bağlantılar”, “En çok arananlar”, etc. [code-verified]

- **Catch-all article route**: `app/[...slug]/page.tsx` [not inspected here in detail, but present]
  - Works with `lib/content.ts` to render starter vs complete articles under various prefixes. [unverified for exact rendering details]

- **Category hubs and static pages**: multiple subdirectories:
  - `/rehberler` – guides hub (listing, filters, search). `app/rehberler/page.tsx`. [code-verified by directory listing]
  - `/kanada-vizesi`, `/kanadada-egitim`, `/kanadada-calisma`, `/kanadada-yasam`, `/guncel-bilgiler`, etc. – category landing pages and/or specific complete guides. [code-verified by `app/*` structure]
  - Legal/policy pages: `/gizlilik`, `/kullanim-kosullari`, `/kaynak-politikasi`, `/yasal-uyari`, `/hakkimizda`. [code-verified by routes]

- **Assessment page**: `app/on-degerlendirme/page.tsx`
  - Uses `components/assessment-form.tsx` and CSS module `components/assessment-form.module.css` plus global `.assessment-*` styles for layout. [code-verified by components listing]

- **Not Found**: `app/not-found.tsx` – custom 404 page. [code-verified]

- **Robots and sitemap**:
  - `app/robots.ts` – sets crawling rules; see SEO section. [code-verified presence]
  - `app/sitemap.ts` – generates sitemap including only indexable URLs. [code-verified presence]

### API endpoints

- `app/api/on-degerlendirme/route.ts` – **only API route** currently present. [code-verified]
  - Responsibilities:
    - Enforce same-origin and content-type checks.
    - Light-weight per-instance rate limits on requests/IPs and submissions (maps `requests`, `attempts`, `submissions`).
    - Enforce payload size limit (16 KB) by manually reading `ReadableStream` with a `TextDecoder`.
    - Validate JSON structure with `validateAssessment` from `lib/assessment.ts`.
    - Run BotID verification and reject suspected bots.
    - Guard against misconfiguration by checking `GMAIL_USER`, `GMAIL_APP_PASSWORD`, `ASSESSMENT_TO_EMAIL` environment variables.
    - Use Nodemailer to send plaintext email built from `assessmentEmail()` and return JSON `{ok:true}` on success.
    - Map different failures to different HTTP statuses: 400, 403, 413, 415, 429, 502, 503. [code-verified]

## 4. Design system and UX conventions

- **Global colors & tokens** (in `app/globals.css`): [code-verified]
  - `--navy`, `--navy-dark`, `--link`, `--red`, `--grey`, `--line`, `--text`.
  - These are used for headings, navigation, links, callouts, forms, and cards.

- **Typography**:
  - Base font: `Arial, 'Helvetica Neue', sans-serif` with body font-size 18px, line-height 1.52. [code-verified]
  - H1/H2/H3 sizes defined explicitly for homepage, article, hub, guide, legal pages; not Tailwind utility-driven.
  - Geist fonts are loaded but global CSS intentionally overrides to maintain editorial design. [code-verified]

- **Layout primitives**:
  - `.container`: central width constraint (`min(1180px, 100% - 48px)`), reused across pages. [code-verified]
  - `.section`, `.intro`, `.band-grid`, `.link-grid`, `.steps`, `.two-col`, etc. provide consistent section spacing and grid layouts.
  - `.guide-layout`, `.article-layout`, `.hub-page`, `.guide-page`, `.visitor-page`, `.arrival-page` define editorial guides with table of contents, sidebars, callouts, and checklists. [code-verified]

- **Responsive behavior**:
  - Multiple breakpoints via media queries: `max-width: 1050px`, `900px`, `800px`, `767px`, `600px` with adjustments for typography, grid columns, sticky sidebars (TOC), header navigation (switches to mobile menu, `details`-based), and forms. [code-verified]
  - `@media print` rules specifically for arrival guide pages. [code-verified]

- **Accessibility patterns**:
  - `sr-only` class for visually hidden labels. [code-verified]
  - Focus-visible styles on assessment form fields and arrival page interactive components. [code-verified]
  - `docs/ilk-90-gun-implementation.md` documents axe WCAG 2 A/AA and 2.1 AA checks for arrival guide tooling. [historically reported]

- **Shared UI components**:
  - `components/site-header.tsx` and `components/site-footer.tsx` implement the main nav and footer with consistent link structure and use `Brand` logo component.
  - `components/article-template.tsx`, `guide-*` components (`guide-hub.tsx`, `turkiye-kanada-guide.tsx`, `visitor-visa-guide.tsx`, `arrival-guide.tsx`, etc.) encapsulate editorial layouts for major guides. [code-verified]
  - `components/ui/*` contains generic UI primitives; follow existing prop and naming patterns when extending.

## 5. Features, admin tools, business rules

- **Educational content system**:
  - Article metadata is generated from `lib/content.ts` (`clusters`, `articles`, `articleMap`, `contentClusters`). [code-verified]
  - Each article has `contentStatus: 'starter' | 'complete'`. Only complete articles appear as canonical, indexed, and in sitemap. [code-verified + historically reported in `docs/SEO.md`]
  - Starter content is explicitly marked `noindex` and removed from sitemap. [historically reported; verify in `app/sitemap.ts` / `app/robots.ts` before changes]

- **Pre-assessment form**:
  - Questions defined in `lib/assessment.ts::questions`: goal, age, education, language, experience, funds. [code-verified]
  - Input validation is strict; invalid or missing options cause 400 errors. [code-verified]
  - Business rule: consent checkbox must be checked (`consent === true`), otherwise submission is rejected. [code-verified]
  - The email body includes current policy version “Gizlilik politikası ve kullanım koşulları (12 Eylül 2026)” and ISO timestamp. [code-verified]

- **Admin/back office tools**: None in the repo. Any follow-up on assessment emails occurs outside the application via standard email tools. [code-verified]

## 6. Data model

- **No database**: There is no ORM or database layer; `package.json` has no Prisma/Drizzle/etc. [code-verified]

- **Domain models (TypeScript types only)**:
  - `lib/content.ts::Article` – central type for article metadata, including `path`, `title`, `category`, `description`, linking metadata, and `contentStatus`. [code-verified]
  - `lib/assessment.ts`:
    - `questions` map and `Answers` / `Assessment` types for the pre-assessment form.
    - Validation rules (`validateAssessment`) including allowed values, lengths, and regex patterns.
  - `lib/seo.ts` – no DB models, but defines `SITE_NAME`, `SOCIAL_IMAGE`, `publisher` organization, `websiteSchema`, and helper `collectionSchema`. [code-verified]

- **Storage**:
  - In-browser `localStorage` used for arrival guide status/checklist state: keys `arrival-status-v1` and `arrival-checklist-v1` referenced from `docs/ilk-90-gun-implementation.md` and related components. [historically reported + code-verified by file listing]
  - Server-side per-instance state: in-memory Maps in assessment API (`requests`, `attempts`, `submissions`); only digested keys (SHA-256 of IP/email) are stored; no raw IP addresses or form answers persisted beyond lifetime of Node process. [code-verified]

## 7. Critical flows

### Authentication & authorization

- There is **no user authentication** or role-based authorization in this app. All pages are public, and the only POST endpoint is the assessment API. [code-verified]

### Spam/abuse protection & rate limiting

- **BotID**: `checkBotId({ advancedOptions: { checkLevel: 'basic' } })` is invoked per request; bots or failed human checks are rejected with 403. [code-verified]
- **In-memory limits** (per Node instance):
  - Request-level: IP digest in `requests` Map; up to 20 requests per 15 minutes, Map capped at 10,000 entries. [code-verified]
  - Submission-level: For each of hashed IP and lowercased email, a counter in `attempts`; max 3 accepted attempts per 15 minutes; Map size capped. [code-verified]
  - Duplicate submission prevention: JSON-stringified assessment data hashed; duplicates within 15 minutes rejected with 409. [code-verified]
  - When limits exceeded, 429 with `Retry-After: 900`. [code-verified]

### Payments

- No payment or billing flow implemented. [code-verified: no payment libs]

### Notifications

- **Email only**, via Nodemailer/Gmail as described above.
- No SMS, push, or in-app notification system. [code-verified]

## 8. Environment variables (names only)

From `README.md`, `app/layout.tsx`, API route, and SEO docs: [code-verified unless noted]

- `GMAIL_USER` – Gmail/Google Workspace sender email address for assessment emails. [code-verified]
- `GMAIL_APP_PASSWORD` – 16-character app password for Gmail SMTP. [code-verified]
- `ASSESSMENT_TO_EMAIL` – optional recipient email; defaults to `GMAIL_USER` if omitted. [code-verified]
- `GOOGLE_SITE_VERIFICATION` – optional Google Search Console verification code; surfaced as `<meta name="google-site-verification">`. [code-verified]
- `BING_SITE_VERIFICATION` – optional Bing Webmaster Tools verification value. [code-verified]
- `VERCEL` – environment flag used to choose correct forwarded IP header (`x-vercel-forwarded-for` vs `x-forwarded-for`). [code-verified]

Never commit real values or credentials. Use `.env.example` as reference and `.env.local` for local runs, as per `README.md`. [historically reported]

## 9. SEO, analytics, performance, caching

- **SEO strategy** (`docs/SEO.md`, `lib/seo.ts`, `lib/content.ts`):
  - Per-page metadata via `pageMetadata()` helper defining title, description, canonical URL, robots, Open Graph, and Twitter card. [code-verified]
  - `INDEX_ROBOTS` / `NOINDEX_ROBOTS` constants to enforce `index,follow` vs `noindex,follow`, including `googleBot` directives. [code-verified]
  - Sitemap limited to indexable URLs; starter content excluded. [historically reported]
  - `/rehberler?q=...` search pages `noindex` and canonical to `/rehberler`. [historically reported – confirm in `app/rehberler/page.tsx` before editing]
  - API routes `/api/:path*` sent `X-Robots-Tag: noindex, nofollow` from `next.config.ts::headers()`. [code-verified]
  - Canonical host is `https://www.kanadavizesi.ca` and redirect behavior for apex vs `www` handled at Vercel Domains, not in app. [historically reported + code-verified in `next.config.ts` comments]
  - Structured data: `websiteSchema` on all pages via `<JsonLd data={websiteSchema} />` and per-article JSON-LD for complete guides (see guide components). [code-verified + historically reported]

- **Analytics**:
  - Page view analytics via Vercel Analytics and GA4 (see layout). [code-verified]
  - SEO check script `scripts/check-seo.mjs` and `npm run test:seo` provide automated verification of metadata, sitemap, indexing, and responses. [code-verified from `package.json`, docs]

- **Performance and caching**:
  - Assessment API disables caching via `Cache-Control: no-store` for responses. [code-verified]
  - `X-Robots-Tag` for APIs prevents accidental indexing but doesn’t affect cache; no explicit Edge caching logic is used for dynamic routes. [code-verified]
  - App primarily serves static content; previous verification (Webpack build) produced 144 static pages. [historically reported in `docs/ilk-90-gun-implementation.md`]

## 10. Local setup and commands

From `README.md` and `package.json`: [code-verified]

### Prerequisites

- Node.js `>=22.13.0`. Docs note some environments default to Node 24 and npm 18, but tests were run with Node 24.20 as well. [historically reported]

### Installation

```sh
npm ci
cp .env.example .env.local
```

Fill in `GMAIL_USER`, `GMAIL_APP_PASSWORD`, `ASSESSMENT_TO_EMAIL` if you want to test real email sending.

### Development

```sh
npm run dev         # next dev
```

### Quality & tests

```sh
npm run lint        # oxlint
npm run format      # oxfmt
npm run build       # next build (Turbopack; use --webpack if your environment has Turbopack port issues)
npm run test:assessment  # node --experimental-strip-types --test tests/assessment.test.mjs
npm run test:seo         # node --experimental-strip-types scripts/check-seo.mjs
```

Docs in `docs/SEO.md` and `docs/ilk-90-gun-implementation.md` also describe **manual browser checks** and **additional scripts** (e.g., `scripts/check-domains.mjs`, `tests/arrival.browser.mjs`) that can be run ad hoc but are not wired to npm scripts. [historically reported]

### Deployment

- Target platform: **Vercel**. [historically reported from SEO docs and `vercel.json` presence]
- Vercel handles apex→www redirect at domain level; the app must not introduce inverse redirects. [code-verified comment in `next.config.ts` and SEO docs]

## 11. Previous problems and fixes

- **Apex/www redirect loop (SEO2)**:
  - **Symptom**: Production HTTP responses showed `kanadavizesi.ca` redirecting to `www.kanadavizesi.ca` via 308, while an app-level rule redirected `www` back to `apex`, forming a loop. [historically reported in `docs/SEO.md`]
  - **Cause**: Misconfigured application-level redirect that conflicted with Vercel Domains redirect. [historically reported]
  - **Fix**: Removed reverse redirect; canonical host standardized to `www.kanadavizesi.ca`, and all schema/sitemap use `SITE_URL` from `lib/content.ts`. [code-verified in `lib/content.ts`, `next.config.ts`, docs]
  - **If it recurs**: Run `node scripts/check-domains.mjs` after deployment to verify redirect chain, and ensure no new app-level host redirects are added. [historically reported]

- **Turbopack local build failure**:
  - **Symptom**: Turbopack CSS sub-process failing with `Operation not permitted` in some environments. [historically reported]
  - **Workaround**: Use Webpack fallback: `node node_modules/next/dist/bin/next build --webpack`. [historically reported]

- **Existing lint issues**:
  - Some pre-existing oxlint warnings/errors in `components/ui/*` and `hooks/use-mobile.ts` are documented as known and outside the specific SEO/arrival tasks. [historically reported]

## 12. Known limitations and open questions

- **Content completion**:
  - 6+ primary guides are `contentStatus: 'complete'` (`/rehberler/turkiyeden-kanadaya-nasil-gidilir`, visitor-visa, arrival, Express Entry, study permit, work permit). The remaining ~120+ generated articles are still `starter` and must not be treated as fully researched content. [code-verified in `lib/content.ts` + historically reported]

- **Rate limiting scope**:
  - In-memory Maps for rate-limiting are **per server instance** and not shared across Vercel instances; distributed attack resistance is limited. [code-verified from implementation and docs in `README.md`]

- **Testing coverage**:
  - Not all UI states (especially in guides and interactive tools) have automated tests; some are only documented as manually verified as of Sept 2026. [historically reported]

- **Unverified aspects**:
  - Production-specific configurations such as GA4 property behavior, Search Console/Bing Webmaster configuration, and actual email deliverability depend on secrets and external accounts not visible in this repo. [unverified]

## 13. Task-to-files reference and verification hints

### Content & SEO tasks

- **Add/complete a guide article** (e.g., new pillar or converting starter → complete):
  - Files: `lib/content.ts`, relevant `components/*-guide.tsx`, route under `app/*` (either static page or catch-all usage), JSON-LD component if needed.
  - Steps:
    1. Implement actual content component under `components/` or inside `app/.../page.tsx` following existing guide layouts (e.g., `turkiye-kanada-guide.tsx`, `visitor-visa-guide.tsx`, `arrival-guide.tsx`).
    2. Ensure headings and intro match `title`/`description` in `lib/content.ts` and `pageMetadata(...)` calls. [code-verified pattern]
    3. Update `contentStatus` to `'complete'` only after real content, dates, and sources are in place. [historically reported rule]
    4. Run `npm run test:seo` and a local build.

- **Change SEO metadata for a page**:
  - Files: specific `app/.../page.tsx` and `lib/seo.ts` (if global behavior) or `lib/content.ts` (article entries).
  - Verify: `npm run test:seo`, view page source/JSON-LD and `<head>` in browser.

### Design & layout changes

- **Header/footer/nav changes**:
  - Files: `components/site-header.tsx`, `components/site-footer.tsx`, `app/globals.css` (nav/footer classes).
  - Verify: Desktop and mobile views, especially `<details>` mobile nav behavior; check `aria-label` and menu focus.

- **Homepage copy or layout**:
  - Files: `app/page.tsx`, `app/globals.css` (home-page section styles).
  - Verify: Lighthouse/axe for accessibility; ensure single H1; run `npm run test:seo` to confirm metadata.

- **Guide layout changes**:
  - Files: `components/turkiye-kanada-guide.tsx`, `components/visitor-visa-guide.tsx`, `components/arrival-guide.tsx`, shared CSS in `app/globals.css` under `.guide-*`, `.visitor-page`, `.arrival-page` sections.
  - Verify: Check on breakpoint widths 375/768/1024/1440, and for arrival guide also print styles (`Print` preview) if layout touched.

### Backend/API changes

- **Assessment API behavior**:
  - Files: `app/api/on-degerlendirme/route.ts`, `lib/assessment.ts`, `components/assessment-form.tsx`, `components/assessment-form.module.css`.
  - Verify:
    - For validation changes, run `npm run test:assessment`.
    - For rate-limit or BotID changes, test edge cases with repeated submissions and intentionally invalid bot headers where possible.
    - Ensure headers `X-Robots-Tag` for `/api` remain intact via `next.config.ts`.

### SEO and infra

- **Robots/sitemap tweaks**:
  - Files: `app/robots.ts`, `app/sitemap.ts`, `lib/content.ts`, `lib/seo.ts`.
  - Verify: `npm run test:seo`, and optionally manual curl or browser check of `/robots.txt` and `/sitemap.xml`.

- **Domain/redirect-related changes**:
  - Files: `next.config.ts`, `vercel.json`, `lib/content.ts` (`SITE_URL`).
  - Verify: If touching redirect logic, run `node scripts/check-domains.mjs` (if present) and test canonical URLs in a deployed environment.

## 14. Maintaining this guide

- **Update cadence**: Any time you:
  - Add or remove major routes/pages.
  - Change SEO rules, indexing behavior, or sitemap structure.
  - Modify the assessment API, spam protection, or environment variable usage.
  - Introduce new external integrations (payments, auth, analytics, etc.).

- **How to update**:
  1. Update the **Verification block** at the top: date and, if available, commit hash.
  2. Mark new statements with correct tags: `[code-verified]`, `[historically reported]`, or `[unverified]` as appropriate.
  3. Keep descriptions concise; summarize design/architecture instead of pasting code.
  4. If you retire a feature, clearly mark it as historical and point to the new approach.

- **Coordination with other docs**:
  - When you update `docs/SEO.md` or `docs/*`, reflect any cross-cutting changes here.
  - For large feature changes, also leave notes in commit messages referencing relevant sections of `PROJECT_GUIDE.md` to keep future agents oriented.
