---
title: Configuration
description: Lead times, safety stock and the settings that change what the reorder list tells you.
group: Getting started
order: 20
lastUpdated: 2026-08-05
---

Everything here lives under **WooCommerce → SimplifyStock → Settings**. The
defaults will produce a working reorder list, but two of them — lead time and
service level — change the output enough that they are worth setting properly
before you act on anything.

## Lead time

How long it takes stock to arrive after you place an order, in days.

Set a **global default**, then override it per supplier or per product. The
override chain is:

```
product lead time
  └─ falls back to supplier lead time
       └─ falls back to global default (7 days)
```

Lead time drives the reorder point directly: a product with a 30-day lead time
must be reordered far earlier than an identical product with a 3-day lead time,
even though they sell at the same rate.

Be honest rather than optimistic here. If a supplier says five days and
delivers in twelve, use twelve — the forecast cannot know about the difference
and will let you run out.

## Service level

The probability that you do **not** stock out during a lead time. Higher means
more safety stock and more capital tied up.

| Service level | Roughly means | Typical use |
| --- | --- | --- |
| 90% | Out of stock ~1 lead time in 10 | Slow movers, easy to reorder |
| 95% | Out of stock ~1 in 20 | The default. Sensible for most catalogues |
| 99% | Out of stock ~1 in 100 | Products you cannot be seen to be out of |

Set it globally and override it for the handful of products where the answer is
genuinely different. Setting 99% across the whole catalogue is a common and
expensive mistake — it inflates safety stock everywhere to protect against a
risk that only matters on a few lines.

## Safety stock

By default this is calculated from demand variance and your service level. You
can override it with a fixed quantity per product when you have a reason the
maths cannot know about — a contractual minimum, a shared component, a supplier
who ships in pallets.

A fixed override switches that product off automatic safety stock entirely. It
will not adapt to a change in demand, so revisit overrides periodically.

## Sync schedule

| Setting | Default | Notes |
| --- | --- | --- |
| Incremental sync | Hourly | Reads orders since the last run |
| Full re-forecast | Nightly | Rebuilds every model |
| History window | 12 months | Longer captures seasonality; costs sync time |

On a store doing under a thousand orders a month, the defaults are fine. Above
that, move the full re-forecast to your quietest hour.

## Alerts

Pro can push the reorder list to email or Slack. Two things to decide:

- **Threshold** — send when a product's days of cover drops below this. Default
  is the reorder point, which means "send when it needs ordering".
- **Digest or immediate** — a daily digest is right for almost everyone.
  Immediate alerts on a catalogue of any size become noise within a week, and
  noise gets muted.

## Configuring with WP-CLI

```bash
wp simplifystock config set lead_time_days 14
wp simplifystock config set service_level 0.95
wp simplifystock config get --format=table
```

Useful for staging environments and for keeping settings in a deployment
script rather than in someone's memory.
