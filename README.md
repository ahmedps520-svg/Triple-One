# Triple One — Triple One | تربل وان لخدمات السيارات

Spec build: a website made for a real Jeddah business that has no site of its own, on Mamar's initiative. **Not commissioned.** Built to show the owner, not published as theirs.

**Live:** https://ahmedps520-svg.github.io/Triple-One/

| | |
|---|---|
| Business | PPF, window film, ceramic, polishing |
| District | الفيصلية — شارع سعود الفيصل، جدة |
| Google | 5.0★ · 222 reviews (checked 7 Oct 2026) |
| Phone | 055 717 8822 |
| Web presence before this | none |
| Hours | Sat–Thu 10am–10pm · Fri closed |
| Maps | https://www.google.com/maps/place/?q=place_id:ChIJQXwVA3rRwxURno5NjW_5l9E |

## The idea

A car you tap part by part — body, glass, cabin, rims — each showing what they do to it, plus a gloss / matte switch for the PPF. There's no owner description, so every service listed is one a reviewer says they had done.

**Palette:** Gallery white, jet, electric violet · **Type:** Beiruti · Anton · Geist

## Where the content came from

Everything on the page comes from the business's own Google Maps listing — the owner's description, the hours, the listed attributes, and the reviews. Nothing is invented: no prices, no staff names, no history, no claims they haven't made.

**Reviews:** 3 quoted. The others name staff or a competitor. Reviews are 5-star only, verbatim, and never ones that praise an individual employee — staff move on.

## Before it goes live for them

- **Photos.** The page is deliberately image-free — no stock, and no AI pictures pretending to be their shop. Five real photos from the owner and it's done.
- **Owner check.** Confirm hours, services and the WhatsApp number.
- **Remove** `<meta name="robots" content="noindex, nofollow">` once they adopt it. Until then it stays, so this page never competes with their own listing in search.

## Tech

Plain HTML, CSS and JavaScript — no framework, no build step. Arabic is the default and ships in the markup; English is a toggle remembered in `localStorage`. Opening hours and "open now" are computed in Jeddah time (UTC+3), wherever the visitor is.

---
Developed by [Mamar](https://mamar.site)
