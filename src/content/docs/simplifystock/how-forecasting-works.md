---
title: How forecasting works
description: What the model actually does, so you can tell when it is wrong.
group: Concepts
order: 40
lastUpdated: 2026-08-05
---

A forecast you cannot interrogate is a guess with better typography. This page
describes what SimplifyStock is doing, in enough detail that you can disagree
with it.

## The shape of the problem

For each product, we want the demand rate — units per day — over the next lead
time, and how uncertain that rate is. The reorder point falls out of those two
numbers.

That is deliberately narrow. SimplifyStock does not try to predict revenue,
attribute demand to causes, or tell you what to stock that you have never sold.
It answers one question: *how much of this will I sell before the next delivery
arrives?*

## Where the numbers come from

Demand is read from **completed and processing** WooCommerce orders. Cancelled,
refunded and failed orders are excluded, as are orders you have manually marked
as non-representative.

Each product's history becomes a daily series. Days with no orders are real
zeros, not gaps — that distinction matters enormously for slow movers, and
getting it wrong is why naive averages over-forecast them.

## The model

Three components, combined per product:

**Baseline.** An exponentially weighted moving average of daily demand. Recent
weeks count for more than old ones, so a product whose demand stepped up two
months ago converges on the new level rather than averaging across the step.

**Seasonality.** With twelve months or more of history, a weekly and an annual
component are estimated and applied multiplicatively. Below that threshold the
seasonal component is held at 1.0 rather than estimated from too little data —
a fitted season from four months of history is noise wearing a costume.

**Trend.** A damped linear term. Damping matters: an undamped trend extrapolated
over a 60-day lead time turns a good month into an order you will regret.

Promotions and price changes are handled as known interventions when you record
them, and as outliers when you do not.

## Intermittent demand

Products that sell in ones and twos, days apart, break moving averages. These
are detected by their proportion of zero-demand days and switched to a
Croston-style method that models *how often* a sale happens separately from
*how big* it is when it does.

You will see these flagged as **intermittent** on the product detail view. Their
confidence bands are wide on purpose.

## Reorder point

Given demand rate `d` (units/day), lead time `L` (days), demand standard
deviation `σ`, and a service factor `z` from your service level:

```
reorder point = d × L  +  z × σ × √L
                └─┬──┘     └────┬────┘
            expected demand   safety stock
             over lead time
```

The first term is what you expect to sell while waiting. The second is the
buffer against being wrong, scaled by how variable that product actually is —
which is why a steady seller and an erratic one with the same average get very
different reorder points.

`z` comes from your service level: 1.28 at 90%, 1.65 at 95%, 2.33 at 99%.

## What it does not know

Being explicit about this is the point:

- **Demand it has never seen.** A product with no history has no forecast, only
  a category-level fallback flagged as low confidence.
- **Why demand changed.** It sees the step, not the cause. If you know the
  cause, record it — a recorded promotion is handled far better than an
  unexplained spike.
- **Your supply constraints.** It suggests what demand implies. Minimum order
  quantities, pack sizes and cash flow are yours to apply, and pack size is the
  only one it can be told about.
- **Substitution.** If A stocks out and customers buy B, the model reads that as
  genuine demand for B.

## Re-forecasting

Models rebuild nightly by default. You can force one:

```bash
wp simplifystock forecast --product=1234
wp simplifystock forecast --all
```

Do this after changing lead times, excluding orders, or importing history.
