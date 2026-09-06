---
title: Inventory
description: >-
  Search, filter and sort your stock, read the Velocity and Days Left columns,
  and update quantities or thresholds in bulk.
group: Guides
order: 44
lastUpdated: 2026-09-06
---

**SimplifyStock → Inventory** is the working screen: every tracked product in
one table, with the columns that tell you which ones are in trouble and the
bulk actions to fix them without opening each product in turn.

## Finding a product

Three controls narrow the table, and all of them apply instantly:

- **Search** — live search by product title or SKU.
- **Filters** — **Stock Status** (All Statuses, In Stock, On Backorder),
  **Category**, and **Sort By** (Name A–Z, Name Z–A, Newest First, Highest
  Price).
- **Reset filters** — clears all of them at once.

If a product you expect is missing, it is almost always because **Manage stock**
is not enabled on it in WooCommerce. SimplifyStock only tracks products
WooCommerce is tracking.

## Reading the columns

| Column | What it tells you |
| --- | --- |
| Product | Title and SKU |
| Status | In stock, low, out of stock or on backorder |
| Stock | Current quantity |
| Velocity | How fast it is selling |
| Days Left | How long the current stock lasts at that velocity |
| Price | Unit price |
| Stock Value | Price × quantity — capital sitting in this product |

**Days Left is the column to sort your day by.** Stock on its own says nothing:
40 units is comfortable for a slow mover and a crisis for something selling
twenty a week. Days Left already accounts for that.

**Stock Value** answers the opposite question — not what is about to run out,
but where your money is. A high Stock Value with a high Days Left is capital
doing nothing, which is what
[Dead stock](/product/simplifystock/docs/dead-stock/) is about.

## Updating stock in bulk

Bulk actions run on selected rows only, so the order matters:

1. Filter the table down to the products you mean.
2. Tick the rows — the bulk panel stays disabled until you do, and says
   **Select rows first**.
3. Choose an **Action**: **Update Stock** or **Set Thresholds**.
4. Click **Run Action**.

Every change is written to the stock history, so a bulk edit is as traceable as
a single one.

### Update Stock or Set Thresholds?

**Update Stock** changes the quantity you hold. Use it after a delivery, a
stocktake, or a correction.

**Set Thresholds** changes the point at which a product counts as low. Use it
when a product keeps raising alerts you do not care about, or when it runs out
before you are warned. Raising a threshold is almost always a better answer
than dismissing repeated alerts, because the alert is doing its job — the
number it is measured against is wrong.

Per-product thresholds override the global one you set under
[Settings](/product/simplifystock/docs/configuration/).

## Stock history

Every change to a stock level is logged with four fields:

| Field | Meaning |
| --- | --- |
| Date | When the change happened |
| Change | The delta, in and out |
| Source | What caused it — an order, a manual edit, a bulk action |
| User | Who made it, for manual changes |

**Source** is what makes the log worth keeping. "Stock went down by six" is not
useful on its own; "stock went down by six because of an order" and "stock went
down by six because someone edited it" are two entirely different situations,
and only one of them needs investigating.

How long the log is kept is configurable — the default is 90 days. See
[Settings](/product/simplifystock/docs/configuration/).

## Where to go next

- [Alerts](/product/simplifystock/docs/alerts/) — what happens when a product
  crosses its threshold.
- [Forecasting](/product/simplifystock/docs/forecasting/) — where Velocity and
  Days Left come from.
