---
title: Dead stock
description: Finding capital that has stopped moving, before it becomes a write-off.
group: Guides
order: 60
lastUpdated: 2026-08-05
---

Stockouts are visible — someone complains. Dead stock is silent, which is why
it accumulates.

## What counts as dead

A product is flagged `DEAD` when its days of cover exceeds the dead stock
threshold, 180 days by default. At that point you are holding roughly six
months of demand, and the capital in it is doing nothing.

The threshold is configurable, and worth setting deliberately. A store selling
perishables might use 60 days; one selling spare parts for machinery might
legitimately use 730, because slow-moving inventory *is* the business.

## The dead stock view

**WooCommerce → SimplifyStock → Dead stock** sorts by capital tied up — units
on hand times cost price — rather than by days of cover. A hundred units of
something worth £2 matters less than four units of something worth £400, even
though the second has better cover.

Columns worth knowing:

- **Tied up** — units × cost. Requires cost price to be set; without it the
  view falls back to sorting by units and says so.
- **Last sold** — date of the most recent order. A product with cover of 400
  days that sold yesterday is different from one that has not moved since March.
- **Trend** — whether cover is getting worse. Rising cover on an already-dead
  product means it is still being reordered by something. That is usually a
  fixed safety stock override that nobody revisited.

## Acting on it

The view is a list of decisions, not a report to file:

**Discount.** The fastest way to recover capital. Record the promotion so the
resulting demand spike is treated as an intervention rather than as a genuine
change in demand — otherwise the model will forecast a level of demand that only
existed because of the discount, and you will reorder into it.

**Bundle.** Pairing dead stock with a fast mover moves units without a headline
discount. Bundled sales are attributed to both products.

**Delist.** Removing it from sale stops it distorting category-level fallbacks
used by new products.

**Write off.** Adjust stock to zero with a reason. The adjustment is excluded
from demand history, so a write-off does not read as a sale.

## Preventing it

Most dead stock traces back to one of three things, and all three are visible
in the product's own history:

1. **A fixed safety stock override** set during a shortage and never removed.
2. **A minimum order quantity** far above the product's real demand — you are
   buying two years of cover every time you order.
3. **A discontinued product still being reordered** because nobody marked it
   discontinued.

The dead stock view flags which of these applies where it can tell.
