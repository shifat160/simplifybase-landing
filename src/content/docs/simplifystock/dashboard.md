---
title: The Dashboard
description: >-
  What each figure on the SimplifyStock dashboard counts, and which one to act
  on first when your stock needs attention.
group: Guides
order: 42
lastUpdated: 2026-09-06
---

The Dashboard is the first screen you see under **SimplifyStock** in the
WordPress admin. It answers one question — *does anything need me today?* — with
four counters at the top and four panels below them.

## The four counters

| Counter | What it counts |
| --- | --- |
| Total Products | Every product SimplifyStock is tracking |
| Low Stock | Products at or below your low-stock threshold |
| Out of Stock | Products at zero |
| Unread Alerts | Alerts you have not opened yet |

**Low Stock** is the one to read first. Out of Stock is already costing you
sales — the decision there was made a week ago. Low Stock is the set you can
still do something about.

Only products with WooCommerce's **Manage stock** enabled are counted. A
product without stock management is not tracked, so if Total Products looks
lower than your catalogue, that is usually why.

## Stock Movement

A chart of stock level changes across the last 30 days. Its job is trend, not
detail: a line sloping steadily down while your order volume is flat means you
are selling stock faster than you are replacing it, whatever the individual
product pages say.

For the change-by-change record, use the history on
[Inventory](/product/simplifystock/docs/inventory/) instead.

## Restock Suggestions

Products that may need restocking soon, derived from local demand forecasting.
This is the shortlist the forecast produces — what to buy before the shelf is
empty rather than after.

The suggestions are generated from your own WooCommerce sales history on your
own server. See [How forecasting works](/product/simplifystock/docs/how-forecasting-works/)
for what the model is doing to get there.

## Inventory Health, Recent Alerts and Top Sellers

**Inventory Health** summarises the split between healthy, low and out-of-stock
products, so you can see the shape of the problem rather than a count of it.

**Recent Alerts** shows the latest few, with **View All Alerts** leading to the
full list. If the same product keeps appearing, raise its threshold rather than
resolving the alert repeatedly — the threshold is the thing that is wrong.

**Top Sellers** lists your best performing products this month. Read it
alongside Low Stock: a top seller in the low-stock list is the most expensive
row on the screen.

## A daily pass, in order

1. Open **SimplifyStock → Dashboard**.
2. Read **Out of Stock**. Anything there is losing money now.
3. Read **Low Stock**, then check **Top Sellers** for overlap. Order those
   first.
4. Skim **Restock Suggestions** and act on anything with a short cover.
5. Clear **Unread Alerts**, snoozing the ones you have already decided about.

That is the two-minute version. Everything else on the screen is context for
when one of those five steps raises a question.

## Where to go next

- [Inventory](/product/simplifystock/docs/inventory/) — filter, sort and edit
  stock in bulk.
- [Alerts](/product/simplifystock/docs/alerts/) — severities, snoozing and
  email.
- [Forecasting](/product/simplifystock/docs/forecasting/) — per-product
  forecasts and the horizon.
