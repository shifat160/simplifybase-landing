---
title: Stockouts poison your forecast
description: >-
  A product that was unavailable for three weeks shows zero demand for three
  weeks. Every naive forecast reads that as low demand and orders less — which
  causes the next stockout.
pubDate: 2026-07-14
tags: [inventory, forecasting, data]
product: simplifystock
---

Here is a failure mode that is almost invisible until you go looking for it.

A product sells out. It stays out for three weeks while you wait for a
delivery. During those three weeks, it records zero sales — not because nobody
wanted it, but because nobody could buy it.

Then the forecast runs. It reads three weeks of zeros as three weeks of no
demand, revises the demand rate downward, and lowers the reorder quantity
accordingly. You order less. You sell out sooner. The forecast reads *that* as
even lower demand.

This is a feedback loop, and it converges on zero.

## Why it is hard to spot

The numbers all look reasonable at every step. Nothing throws an error. The
product just quietly declines in the reorder list until it settles at a level
far below what it could sell, and you conclude that demand has softened.

We have seen products that spent a year at a tenth of their real demand rate
because of one badly-timed stockout, in stores where everyone involved was
competent and paying attention. The failure is structural, not careless.

## Censored demand

Statisticians call this **censored demand**: you observe sales, but sales are
not demand. They are `min(demand, availability)`. Any period where availability
bound the result carries no information about what demand actually was — only
that it was *at least* what you sold.

Treating censored periods as observations is the mistake. The fix is to exclude
them, not to average them in.

## What to do instead

**Record the stockout.** If you know a product was unavailable from the 3rd to
the 24th, exclude that window from its demand history. The forecast then reads
the surrounding weeks, which are uncensored, and holds the demand rate steady
rather than collapsing it.

**Do not backfill with zeros.** A common instinct is to fill the gap with the
prior average. That is better than zeros but still wrong — you are inventing
observations. Excluding the window is honest about what you do not know, and
every reasonable model handles a gap better than it handles fabricated data.

**Watch for partial censoring.** A product that was in stock but down to two
units for a fortnight is partially censored — some demand was met, some walked.
This is harder to detect and harder to correct. Low-stock periods are worth
flagging even when they did not become full stockouts.

## The version of this that catches everyone

Multi-variation products. The large sells out; the small does not. Sales of the
large go to zero, and if you are forecasting at the parent level you see a
modest dip rather than a censored series. Forecast per variation and the
censoring becomes visible.

## The general lesson

Every forecast is a claim about what your history means. Most forecasting
mistakes are not modelling mistakes — they are cases where the history did not
mean what the model assumed. A stockout, a data migration that backfilled
orders, a wholesale order counted as retail, a promotion nobody recorded.

The model cannot tell any of these apart from genuine demand. You can. That is
why a forecast you cannot interrogate is worth so much less than one you can.

---

SimplifyStock lets you exclude stockout periods and individual orders from a
product's demand history, then re-forecast. See
[Troubleshooting](/product/simplifystock/docs/troubleshooting/).
