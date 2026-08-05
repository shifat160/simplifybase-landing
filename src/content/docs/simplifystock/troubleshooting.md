---
title: Troubleshooting
description: The failures we see most, and what actually causes them.
group: Reference
order: 70
lastUpdated: 2026-08-05
---

## The first sync never finishes

Almost always WP-Cron. Managed hosts frequently disable it in favour of a real
system cron, and if that cron is not configured the sync queue never runs.

Check:

```bash
wp cron event list --fields=hook,next_run_relative | grep simplifystock
```

If the events are listed but overdue, WP-Cron is not firing. Either fix the
system cron or run the sync directly:

```bash
wp simplifystock sync --full
```

## Every product shows a dash in the Cover column

The forecast has not run, or has no data to run on. In order of likelihood:

1. **The sync has not completed.** Check the timestamp in the header.
2. **Stock management is off.** SimplifyStock only forecasts products with
   WooCommerce's **Manage stock** enabled. Bulk-enable it from the products
   list.
3. **Order statuses are non-standard.** Demand is read from `completed` and
   `processing`. If your workflow marks fulfilled orders with a custom status,
   add it under **Settings → Advanced → Counted order statuses**.

## The forecast is far higher than reality

Something in the history is not real demand. The usual suspects:

- **A migration backfilled orders**, often all dated the same day. Exclude that
  date range on the product detail view.
- **A wholesale or bulk order** counted as retail demand. Exclude the order.
- **Test orders** that were never deleted.

After excluding, re-forecast:

```bash
wp simplifystock forecast --product=1234
```

## The forecast is far lower than reality

Usually the opposite problem: demand that happened but is not in the history.

- **Sales through another channel** — a marketplace, a physical till, a phone
  order that never became a WooCommerce order. SimplifyStock only sees what
  WooCommerce recorded.
- **Stockouts.** A product that was unavailable for three weeks shows zero
  demand for three weeks, and the model reads that as genuinely low demand.
  Record the stockout period so it is excluded rather than averaged in — this is
  the single most common cause of a persistently under-forecast product.

## Reorder quantities look far too large

Check lead time first; it multiplies straight through. A lead time entered in
weeks where the field expects days will inflate every quantity sevenfold.

Then check service level. 99% across an entire catalogue inflates safety stock
everywhere. See [Configuration](/product/simplifystock/docs/configuration/).

## Variations are not forecast separately

Variable products forecast per variation, but only when stock is managed at the
variation level. If **Manage stock** is enabled on the parent instead, there is
one stock figure and therefore one forecast.

Move stock management down to the variation level to get per-variation
forecasts.

## Performance: the admin screen is slow

On catalogues over about 20,000 variations, the default page size of 100 is too
large for some hosts. Reduce it:

```bash
wp simplifystock config set admin_page_size 25
```

If the nightly full re-forecast is what is slow, move it to a quieter hour and
shorten the history window from 12 months to 6 — you lose annual seasonality,
which many catalogues do not have anyway.

## Still stuck

Collect a diagnostic bundle and send it with your support request. It contains
configuration, sync timings and error logs — no order data or customer records:

```bash
wp simplifystock diagnostics > simplifystock-diagnostics.txt
```
