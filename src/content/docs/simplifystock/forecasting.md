---
title: Forecasting
description: >-
  Run local demand forecasts from your WooCommerce sales history, pick a
  horizon, and read the per-product forecast without a quota or an account.
group: Guides
order: 50
lastUpdated: 2026-09-06
---

**SimplifyStock → Forecasting** turns the order history you already have into a
projection of what you will sell next. It runs on your own server, from your own
database, and it is **unlimited** — there is no daily cap and no product-count
cap, and it needs no account or licence key.

If you want to know what the model is doing rather than how to drive it, read
[How forecasting works](/product/simplifystock/docs/how-forecasting-works/)
instead.

## The four figures

| Figure | What it tells you |
| --- | --- |
| Products at Risk | Products the forecast expects to run out within the horizon |
| Avg Days to Stockout | Mean cover across everything tracked |
| Trending Up | Products whose demand is rising |
| Forecast Accuracy | How well recent forecasts matched what actually happened |

**Read Forecast Accuracy before you act on anything else.** It is the figure
that tells you how much the other three are worth. A forecast on eight weeks of
noisy data is a guess with a progress bar; the accuracy figure is the honest
label on it.

**Trending Up** is the one people miss. A product with comfortable cover but
rising demand will cross into trouble between one weekly check and the next,
and it will do it without ever appearing in Products at Risk until it is late.

## Choosing a horizon

**Forecast Horizon** offers 7, 14, 30, 60 and 90 days. The default is 14.

The right horizon is **your supplier lead time plus the time it takes you to
place an order** — not a round number you like. If a supplier takes three weeks
and you order on Mondays, forecasting 14 days ahead tells you about problems you
can no longer prevent.

Longer horizons are not better. Every extra day widens the uncertainty, and past
roughly a quarter you are reading the trend rather than a prediction.

You can set the default for the whole store under
[Settings](/product/simplifystock/docs/configuration/), and override it on this
screen while you are looking at a single product.

## Forecasting one product

1. Go to **SimplifyStock → Forecasting**.
2. In **Product Forecast**, type a product name or SKU into **Search Product**.
3. Pick the product from the results.
4. Set **Forecast Horizon** to the period you plan against.

The panel then shows projected demand, the trend, and restock guidance for that
product. Until you pick one it reads *Select a product to preview its forecast*
— that is the empty state, not an error.

## Refreshing

**Refresh All** recalculates every product's forecast. Forecasts are cached —
six hours by default — so the screen normally serves a recent result rather than
recomputing on every visit.

Use **Refresh All** after something that changes the underlying history in bulk:
importing orders, a large stock correction, or the end of a promotion whose
spike you do not want treated as the new normal. Day to day, the automatic
refresh is enough.

## What it needs to work

- **Roughly eight weeks** of orders produces a usable forecast.
- **Twelve months** lets it see seasonality.
- Products need WooCommerce's **Manage stock** enabled, or they are listed but
  not forecast.

A product with a handful of sales spread over months will produce a forecast
with wide bounds and a low accuracy figure. That is the model being honest
rather than the model failing —
[How forecasting works](/product/simplifystock/docs/how-forecasting-works/)
explains what it does with intermittent demand.

## Where to go next

- [Your first forecast](/product/simplifystock/docs/first-forecast/) — reading
  the reorder list for the first time.
- [Dashboard](/product/simplifystock/docs/dashboard/) — Restock Suggestions,
  which is this forecast as a shortlist.
