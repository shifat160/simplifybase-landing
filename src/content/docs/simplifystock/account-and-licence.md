---
title: Your account and licence
description: >-
  When SimplifyStock needs an account, how to activate a site, and where to see
  what your plan allows.
group: Getting started
order: 15
lastUpdated: 2026-09-05
---

## When you need an account

You do not need one to start. The free plugin installs, syncs and forecasts
without any account at all — free forecasting runs inside your WordPress
install and never leaves it.

An account matters when you want the capabilities that run on our servers
rather than yours: hosted forecasting, the AI assistant and insights, and the
features that depend on them. Those are gated on a licence, and a licence is
what an account holds.

## Creating an account

Go to [dash.simplifybase.com](https://dash.simplifybase.com) and click
**Register**. You will need:

- **Name** — at least two characters.
- **Email** — must be unique, and you will be asked to verify it.
- **Password** — at least 8 characters, with an uppercase letter, a lowercase
  letter, a number and a special character. The same character three or more
  times in a row is rejected.

You are signed in as soon as the account is created. A verification link is
emailed separately; click it to confirm the address.

## Activating a site

1. In the dashboard, open **Licences** and copy your key. It is masked by
   default — use the eye icon to reveal it, or the copy icon to take it without
   revealing it.
2. In WordPress, go to **SimplifyStock → Settings → API & License**.
3. Paste the key and click **Activate**.

The plugin contacts the dashboard and activates itself. From then on it
re-checks periodically, so a plan change or a new capability reaches the site on
its own — there is nothing to reinstall and no update to apply.

## Sites, slots and status

A licence covers a fixed number of sites. The **Licences** list shows how many
you have used against your maximum, as `3/5`, alongside the plan and the expiry
date — or "No Expiration" for a lifetime licence.

Open a licence to see every site it has been activated on:

| Column | What it tells you |
| --- | --- |
| Site URL | The WordPress install |
| Status | Active or Inactive |
| Activated | When that site first activated |
| Last Seen | When the plugin last spoke to the dashboard |

**Last Seen** is the useful one when something looks wrong: a site that stopped
reporting has usually lost outbound access to the dashboard rather than lost
its licence.

To move a licence between sites, open the licence, find the site and click
**Deactivate**. The slot is freed immediately and can be used elsewhere.

A licence itself carries one of four states:

| Status | Meaning |
| --- | --- |
| Active | Working normally |
| Expired | Past its expiration date |
| Suspended | Temporarily paused |
| Revoked | Permanently disabled |

## What counts against your plan

Anything that runs on our servers is metered; anything that runs in WordPress is
not. The dashboard's **Usage** page shows today's counts, each against the
maximum your plan allows:

- Total requests
- Forecast requests
- Insight requests
- Chat messages, from the AI assistant
- Campaign requests
- Restock suggestions

Two charts below cover the last fourteen days — one for total requests, one
broken down by category — which is the quickest way to tell a busy week from a
misconfigured cron job hammering an endpoint.

The same page shows the rate limit you are working against right now: the
current window, how many requests remain in it, and when it resets. Rate limits
are per endpoint and separate from the daily quotas; hitting one is temporary,
and the reset time tells you when it clears.

Allowances differ by plan, and rather than reprint numbers that change with the
plans, the Usage page shows yours. **Packages** lists what each plan includes.

## Keeping the account secure

Every one of these is optional except the lockout, which is always on.

**Two-factor authentication.** Enable it under **Profile**. Sign-in then asks
for a six-digit code from your authenticator app. Keep the backup codes
somewhere other than the device running the authenticator — they are the way
back in if you lose it.

**Sessions.** **Profile → Sessions** lists every active login with its device
and location, and lets you revoke any of them. Revoke anything you do not
recognise, then change your password.

**IP whitelisting.** Restricts API access to addresses you nominate. Worth it
when your stores have static IPs; a nuisance if they do not, because a changed
IP looks exactly like a broken licence from inside WordPress.

**Lockout.** Five failed sign-in attempts locks the account for fifteen
minutes. There is nothing to configure and no way to shorten it — wait it out,
or reset the password.

**Password reset.** The emailed link is valid for one hour. Completing a reset
signs out every existing session, on purpose: if someone else had one, it ends
there.
