---
title: Purchase orders
description: Turning the reorder list into orders your suppliers can act on.
group: Guides
order: 50
lastUpdated: 2026-08-05
---

<p class="text-sm text-muted">Purchase orders are a Pro feature.</p>

## Creating one

From the reorder list, select the rows you want and choose **Create purchase
order**. Selected products are grouped by supplier — one PO per supplier, since
that is how they will actually be sent.

Each line starts at the suggested quantity. Change it and the line is marked as
adjusted, which keeps your override out of the next forecast's assumptions.

## Pack sizes and minimums

Set these per supplier product:

- **Pack size** — quantities round up to a multiple. A suggestion of 17 with a
  pack size of 12 becomes 24.
- **Minimum order quantity** — the smallest line the supplier will accept.
- **Minimum order value** — a PO below this is flagged before you send it, with
  the shortfall shown, so you can pull forward the next most urgent lines rather
  than paying a small-order fee.

## Exporting

| Format | Use |
| --- | --- |
| PDF | Sending to a supplier who expects a document |
| CSV | Importing into a supplier portal or your accounting system |
| Email | Sends the PDF to the supplier contact on record |

The PDF template is overridable — put a copy of `po-template.php` in
`wp-content/themes/<your-theme>/simplifystock/` and it will be used instead of
the bundled one. Updates will not overwrite it.

## Receiving

When stock arrives, open the PO and enter received quantities. Three things
happen:

1. WooCommerce stock levels increase by the received amount.
2. The PO is marked complete, or partially received if quantities differ.
3. The actual elapsed time from order to receipt is recorded.

That third one matters more than it looks. Recorded actuals feed back into the
supplier's observed lead time, so the number driving your reorder points
converges on reality rather than on what the supplier promised. After a handful
of POs you will see the observed figure diverge from your configured one —
trust the observed figure.

## Partial deliveries

Enter what arrived. The outstanding balance stays open on the PO and is
excluded from the reorder list, so a product you are already waiting on does
not reappear as urgent every morning.

If the balance is never going to arrive, close the PO short. That releases the
product back into the reorder list immediately.

## With WP-CLI

```bash
# Everything currently below its reorder point, grouped by supplier
wp simplifystock po create --status=reorder

wp simplifystock po list --status=open
wp simplifystock po receive 42 --line=1234:24
```
