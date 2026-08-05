---
title: Installation
description: Getting SimplifyStock onto your store and through its first sync.
group: Getting started
order: 10
lastUpdated: 2026-08-05
---

## From the WordPress admin

1. Go to **Plugins → Add New**.
2. Search for `SimplifyStock`.
3. Click **Install Now**, then **Activate**.

You will land on the setup screen. Leave it open — the first sync starts
immediately and the screen reports progress.

## From a zip file

Download the archive from your account, then **Plugins → Add New → Upload
Plugin**, choose the file and activate.

## With WP-CLI

```bash
wp plugin install simplifystock --activate
wp simplifystock sync --full
```

The `--full` flag reads all available order history rather than the default
twelve months. Use it once, on first install; the scheduled sync afterwards is
incremental.

## The first sync

The first sync reads your existing orders and products. Nothing is imported and
nothing is written to your catalogue — SimplifyStock builds its own tables
alongside WooCommerce's.

How long it takes depends on order volume:

| Orders | Typical first sync |
| --- | --- |
| Under 5,000 | Under a minute |
| 5,000–50,000 | 2–10 minutes |
| Over 50,000 | 10–40 minutes |

The sync runs in the background through WP-Cron. If your site has WP-Cron
disabled — which is common on managed hosts that run a real cron instead —
trigger it directly:

```bash
wp simplifystock sync --full
```

<blockquote>
If the progress bar has not moved after five minutes and you are not running
WP-CLI, WP-Cron is almost certainly not firing. See
<a href="/product/simplifystock/docs/troubleshooting/">Troubleshooting</a>.
</blockquote>

## Verifying the install

Once the sync completes, **WooCommerce → SimplifyStock** shows the reorder list.
Three things tell you it worked:

- The product count in the header matches your catalogue.
- Products you know sell steadily have a days-of-cover number rather than a dash.
- The **Forecast updated** timestamp is within the last hour.

A dash in the cover column means SimplifyStock has no usable history for that
product yet. That is expected for anything new; see
[Your first forecast](/product/simplifystock/docs/first-forecast/).

## Next

Set your lead times and safety stock in
[Configuration](/product/simplifystock/docs/configuration/) — the defaults are
deliberately conservative and almost certainly not right for your suppliers.
