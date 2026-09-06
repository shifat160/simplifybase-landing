---
title: Alerts
description: >-
  Low-stock and out-of-stock alerts: the three severities, snoozing versus
  resolving, and how to stop the same warning arriving twice.
group: Guides
order: 46
lastUpdated: 2026-09-06
---

**SimplifyStock → Alerts** is where low-stock and out-of-stock warnings collect.
The screen exists so the warnings accumulate somewhere you can triage, rather
than arriving as email you archive and forget.

## The three severities

Filter with **All Severities**, or pick one:

| Severity | What it means |
| --- | --- |
| Critical | Out of stock, or about to be |
| Warning | At or below the low-stock threshold |
| Info | Worth knowing, not urgent |

Severity is derived from the thresholds, so it moves when you change them. A
product raising Critical alerts you do not consider critical usually needs its
threshold adjusted on
[Inventory](/product/simplifystock/docs/inventory/), not its alert dismissed.

## Snooze, resolve, or mark read

Three different actions that are easy to confuse:

- **Mark as read** — you have seen it. The alert stays in the list; only the
  unread count changes. **Mark All Read** clears the count in one go.
- **Snooze** — you have seen it and decided to deal with it later. It leaves the
  active list and comes back.
- **Resolve** — the situation is handled. The stock is ordered, or the product
  is being discontinued and you do not want telling again.

The counters across the top — **Unread**, **Resolved Today**, **All Alerts**,
**Snoozed**, **Resolved** — are the same list under different filters.

The distinction that matters is **snooze versus resolve**. Snoozing something
you have actually fixed means it returns and wastes your attention a second
time. Resolving something you have merely noticed means it never comes back and
you find out when a customer does.

## Why the same product does not alert twenty times

Alerts are de-duplicated over a window — by default 24 hours. One product having
a bad week raises one alert, not one per sync.

If you are getting repeated alerts for the same product across days, the
product is genuinely crossing and re-crossing its threshold. That is a
threshold set too close to your normal stock level, and the fix is on the
product, not here.

## Email alerts

Low-stock emails are sent through your site's own WordPress mail system, to the
recipients you set under [Settings](/product/simplifystock/docs/configuration/).
Nothing is routed through an external service.

To turn them on:

1. Go to **SimplifyStock → Settings**.
2. Tick **Send local low-stock emails**.
3. Put one or more addresses in **Alert recipients**, separated by commas.
4. **Save changes**.

If emails do not arrive, the cause is almost always your site's mail
configuration rather than SimplifyStock — WordPress sites on shared hosting
frequently cannot send mail without an SMTP plugin.
[Troubleshooting](/product/simplifystock/docs/troubleshooting/) covers the
usual suspects.

## A workable routine

1. Filter to **Critical** and deal with those.
2. Filter to **Warning** and either order, or raise the threshold if the alert
   was wrong.
3. **Mark All Read** on what is left.
4. Snooze only what you have genuinely deferred, and resolve only what you have
   genuinely finished.

## Where to go next

- [Inventory](/product/simplifystock/docs/inventory/) — set per-product
  thresholds in bulk.
- [Settings](/product/simplifystock/docs/configuration/) — the global
  threshold, recipients and email toggle.
