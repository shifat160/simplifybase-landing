---
title: SimplifyStock documentation
sidebarLabel: Introduction
description: >-
  Demand forecasting and reorder management for WooCommerce. Start here for
  what it does, what it needs, and where to go next.
order: 0
lastUpdated: 2026-08-05
---

SimplifyStock reads your WooCommerce order history, builds a demand forecast
for each product, and turns that into a reorder list: what to buy, how much,
and when.

It is designed around one recurring moment — the morning stock check — and
optimised for how long that moment takes. Most stores spend under two minutes a
day in it.

## What it gives you

- **A forecast per product**, built from your own sales history rather than a
  category average.
- **A reorder point** for each product, derived from lead time, demand variance
  and the safety stock you are willing to hold.
- **Days of cover** and a risk band, so the product about to cost you revenue
  is at the top of the list instead of buried on page four.
- **Purchase orders** grouped by supplier, exportable as CSV or PDF.
- **Dead stock detection** — capital sitting still, before it becomes a
  write-off.

## What it needs

| Requirement | Minimum |
| --- | --- |
| WordPress | 6.5 |
| PHP | 7.4 — SimplifyStock Pro needs 8.0 |
| WooCommerce | Installed and activated |
| Order history | ~8 weeks for a usable forecast; 12 months for seasonality |

Stock must be managed at the WooCommerce level — that is, **Manage stock** is
enabled on the products you want forecast. Products without stock management
are listed but not forecast.

## Where to go next

- New install? Start with [Installation](/product/simplifystock/docs/installation/),
  then [Settings](/product/simplifystock/docs/configuration/).
- Upgraded, and need to activate a site? [Your account and licence](/product/simplifystock/docs/account-and-licence/)
  covers licence keys, site slots and what counts against your plan.
- Working out what a screen is telling you? Each has its own guide —
  [Dashboard](/product/simplifystock/docs/dashboard/),
  [Inventory](/product/simplifystock/docs/inventory/),
  [Alerts](/product/simplifystock/docs/alerts/),
  [Search Insights](/product/simplifystock/docs/search-insights/) and
  [Forecasting](/product/simplifystock/docs/forecasting/).
- Want to know what the numbers mean before you trust them? Read
  [How forecasting works](/product/simplifystock/docs/how-forecasting-works/).
- Something looks wrong? [Troubleshooting](/product/simplifystock/docs/troubleshooting/)
  covers the failures we see most.

## A note on your data

On the free plan, everything runs inside your WordPress install. No order data
leaves your server. Hosted forecasting is opt-in on Pro and processes order
quantities and dates only — never customer records. See
[Data and privacy](/product/simplifystock/docs/data-and-privacy/) for the
specifics.
