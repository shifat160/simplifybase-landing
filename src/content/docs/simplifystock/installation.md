---
title: Installation
description: >-
  Requirements, installing the free plugin and the Pro add-on, and what to check
  once SimplifyStock is running.
group: Getting started
order: 10
lastUpdated: 2026-09-06
---

## What it needs

| Requirement | Minimum |
| --- | --- |
| WordPress | 6.5 |
| PHP | 7.4 — SimplifyStock Pro needs 8.0 |
| WooCommerce | Installed and activated |
| Order history | ~8 weeks for a usable forecast; 12 months for seasonality |

WooCommerce is a hard requirement, not a suggestion: SimplifyStock reads its
orders and products, and refuses to activate without it. If any of the three
version requirements is unmet, the plugin says which one on activation rather
than failing quietly.

## There are two plugins

| Plugin | What it is |
| --- | --- |
| **SimplifyStock** | The free plugin. Everything it does runs on your site. |
| **SimplifyStock Pro** | A separate add-on installed alongside it. |

Pro is not a licence key that unlocks the free plugin — it is a second plugin,
and it **requires the free one to be installed and active**. Install the free
plugin first, always.

## Installing the free plugin

SimplifyStock is distributed as a zip rather than from the WordPress plugin
directory.

1. Download the zip from
   [dash.simplifybase.com/product/simplifystock](https://dash.simplifybase.com/product/simplifystock).
2. Make sure **WooCommerce** is installed and activated.
3. In WordPress, go to **Plugins → Add New → Upload Plugin**.
4. Choose the zip, click **Install Now**, then **Activate**.
5. Open **SimplifyStock** in the admin menu.

The free plugin needs **no licence key, no SimplifyBase account and no internet
connection** to do its job. It does not contact our servers on its own.

## Installing the Pro add-on

Pro delivery is manual in this first release — you receive the zip rather than
downloading it from a self-service page.

1. Install and activate the free plugin first.
2. Upload the Pro zip the same way: **Plugins → Add New → Upload Plugin**.
3. Activate **SimplifyStock Pro**.
4. Activate your licence — see
   [Your account and licence](/product/simplifystock/docs/account-and-licence/).

Pro ships signed update metadata and SHA-256 package verification, so once it is
activated its updates are authenticated rather than pulled from an open URL.

## First run

Opening **SimplifyStock** lands you on the Dashboard. Before relying on
anything, spend a minute on **SimplifyStock → Settings** and set:

- **Low-stock threshold** — the quantity at which a product needs attention.
- **Alert recipients** — who gets low-stock email.
- **Forecast horizon** — how far ahead to plan.

Those three decide what every other screen shows you.
[Settings](/product/simplifystock/docs/configuration/) covers each in full.

## Which products get tracked

Only products with WooCommerce's **Manage stock** enabled. Products without it
are listed but not forecast, because there is no stock level to project.

If your Total Products count looks lower than your catalogue, that is the
reason — turn on stock management for the products you want forecast.

## Where to go next

- [The Dashboard](/product/simplifystock/docs/dashboard/) — what each figure
  means and which to read first.
- [Settings](/product/simplifystock/docs/configuration/) — thresholds,
  recipients, horizon and search tracking.
