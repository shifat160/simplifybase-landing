---
title: Your first forecast
description: Reading the reorder list, and how to tell a good forecast from a confident-looking guess.
group: Getting started
order: 30
lastUpdated: 2026-08-05
---

The reorder list is the only screen most people use. It is one row per product,
sorted by risk.

## The columns

**Product** — name and SKU. Variable products list one row per variation,
because the XS is not selling at the same rate as the large.

**Cover** — days of stock remaining at the forecast demand rate. This is the
number to look at first. Four days of cover on a product with a fourteen-day
lead time means you are already late.

**Qty** — the suggested order quantity. It covers demand over the lead time
plus safety stock, rounded to the supplier's pack size if you have set one.

**Status** — one of:

| Status | Means |
| --- | --- |
| `REORDER` | Below the reorder point. Order now |
| `WATCH` | Approaching the reorder point within the next cycle |
| `OK` | Cover comfortably exceeds lead time |
| `DEAD` | Cover measured in months; capital sitting still |

## Confidence

Every forecast carries a confidence band, shown on the product detail view.
Low confidence is not a bug — it is the model telling you it does not have
enough signal, which happens with:

- Products with under eight weeks of history.
- Products that sell in rare, large batches rather than steadily.
- Products whose demand recently changed shape — a promotion, a price change, a
  new channel.

Treat a low-confidence suggestion as a prompt to look, not as an instruction.

## Sanity-checking it

Before you trust the list with real money, spot-check three products you know
well:

1. **A steady seller.** The forecast rate should be close to what you would
   have said off the top of your head. If it is wildly off, check that the
   product's history is not polluted by a bulk order or a data import.
2. **A seasonal product.** Look at it in and out of season. If the model has
   twelve months of history it should show a visible curve rather than a flat
   line.
3. **Something you recently discontinued.** It should be trending toward `DEAD`
   rather than suggesting a reorder.

If all three look right, the rest of the catalogue almost certainly is too.

## When it is wrong

The two most common causes, in order:

- **Lead time is wrong.** Everything downstream depends on it. See
  [Configuration](/product/simplifystock/docs/configuration/).
- **History includes something that was not normal demand** — a wholesale
  order, a migration that backfilled orders, a test order that never got
  deleted. Exclude those orders on the product detail view and re-forecast.

[How forecasting works](/product/simplifystock/docs/how-forecasting-works/)
explains what the model is actually doing, which makes both of these much
easier to spot.
