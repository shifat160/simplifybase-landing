---
title: Settings
sidebarLabel: Settings
description: >-
  The five controls on the SimplifyStock settings screen, what each one changes,
  and the defaults it uses behind them.
group: Getting started
order: 20
lastUpdated: 2026-09-06
---

**SimplifyStock → Settings** is one screen with five controls. As the page
itself says, your settings stay on this WordPress site and work without an
account or licence.

Each one changes what other screens show you, so it is worth setting them
deliberately once rather than leaving the defaults and wondering why a number
looks wrong.

## Low-stock threshold

The quantity at or below which a product needs attention. The default is **5**.

This single number drives the **Low Stock** counter on the
[Dashboard](/product/simplifystock/docs/dashboard/), the Warning severity on
[Alerts](/product/simplifystock/docs/alerts/), and the status shown on
[Inventory](/product/simplifystock/docs/inventory/).

One global number cannot be right for every product, which is why you can
override it per product. Set the global value for your typical item, then
override the exceptions — a fast-moving consumable needs a threshold well above
5, and a slow-moving spare part may want 1.

Per-product thresholds are set in bulk from Inventory using **Set Thresholds**.

## Alert recipients

Who receives low-stock email. **Separate multiple email addresses with commas.**

Leaving this empty while email alerts are on means the alerts are generated and
nothing is delivered — the screen will look busy and nobody will hear about it.

## Email alerts

**Send local low-stock emails**, on or off.

"Local" is the operative word: mail goes through your site's own WordPress mail
system, not through a SimplifyBase service. If your host cannot send mail —
common on shared hosting — these will not arrive until you configure SMTP at
the WordPress level.

## Forecast horizon

How many **days** ahead to forecast. The default is **14**.

Set it to your supplier lead time plus your own ordering delay. Forecasting 14
days ahead when a supplier takes three weeks tells you about problems you can no
longer prevent.

This is the store-wide default; you can override it for a single product while
looking at it on [Forecasting](/product/simplifystock/docs/forecasting/), which
also explains why longer is not better.

## Search tracking

**Track on-site product searches locally**, on or off. Off by default.

Turning it on starts recording what customers type into your store's search box
and populates [Search Insights](/product/simplifystock/docs/search-insights/).
Nothing is collected until you enable it, and nothing can be backfilled, so
turn it on before you need the data rather than when you want it.

Searches are stored in your own database. When anonymisation is enabled,
network addresses are kept only as a one-way, site-specific hash. Because this
observes visitor behaviour, describe it in your site's privacy notice — see
[Data and privacy](/product/simplifystock/docs/data-and-privacy/).

## Save changes

Nothing takes effect until you click **Save changes**. Thresholds and horizons
apply to the next calculation rather than retroactively, so a figure on another
screen may lag by one refresh.

## The defaults behind the screen

Some behaviour is not exposed as a control but is worth knowing, because it
explains things that otherwise look like bugs:

| Behaviour | Default |
| --- | --- |
| Forecast cache | 6 hours |
| Alert de-duplication window | 24 hours |
| Stock change log retention | 90 days |
| Search insight retention | 90 days |

The forecast cache is why a figure does not move the instant you change stock —
use **Refresh All** on the Forecasting screen if you need it recalculated now.
The de-duplication window is why one struggling product does not send the same
alert twenty times a day.

## Where to go next

- [The Dashboard](/product/simplifystock/docs/dashboard/) — where these
  settings show up first.
- [Alerts](/product/simplifystock/docs/alerts/) — severities and email.
