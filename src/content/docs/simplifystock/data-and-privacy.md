---
title: Data and privacy
description: What SimplifyStock reads, what it stores, and what — if anything — leaves your server.
group: Reference
order: 80
lastUpdated: 2026-08-05
---

## What it reads

From WooCommerce:

- Order line items: product ID, variation ID, quantity, order date, order status.
- Product data: SKU, name, stock quantity, stock management flag, cost price if
  set.

That is the whole list. SimplifyStock does not read customer records, billing or
shipping addresses, email addresses, payment details, or order notes.

## What it stores

Its own tables, alongside WooCommerce's:

| Table | Contents |
| --- | --- |
| `simplifystock_demand` | Daily demand per product |
| `simplifystock_forecast` | Current forecast and confidence per product |
| `simplifystock_suppliers` | Supplier records and lead times |
| `simplifystock_po` | Purchase orders and receipts |
| `simplifystock_log` | Sync and forecast run history |

All of it lives in your database. Uninstalling removes these tables if you tick
**Delete data on uninstall**; the default is to leave them, so a reinstall does
not lose your history.

## Hosted forecasting

Off by default. On the free plan it is unavailable; on Pro it is opt-in per
site.

When enabled, what is transmitted is the daily demand series — product
identifier, date, quantity — and your configuration. What is not transmitted:
customer data of any kind, order IDs, prices, product names, or SKUs. The
product identifier is a per-site hash, so the same product on two sites is not
correlatable.

Models are **per store**. Your data is never pooled into a shared model and is
not used to train anything that another customer benefits from. Turning hosted
forecasting off deletes the series within 30 days.

## GDPR

SimplifyStock processes no personal data, so it does not appear in
WooCommerce's personal data exporter or eraser — there is nothing for it to
export or erase.

If you enable hosted forecasting, SimplifyBase is a processor for the demand
series described above. A data processing agreement is available on request.

## Data retention

| Data | Default retention | Configurable |
| --- | --- | --- |
| Demand history | Indefinite | Yes |
| Forecast snapshots | 90 days | Yes |
| Sync and error logs | 30 days | Yes |
| Purchase orders | Indefinite | No — records of purchases |

## Removing everything

```bash
wp simplifystock uninstall --delete-data
```

Drops every table and deletes all options. Irreversible, and it will ask you to
confirm.
