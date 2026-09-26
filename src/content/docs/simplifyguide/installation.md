---
title: Installation
description: What SimplifyGuide needs, how to install it, what activation adds to your admin, and what happens when you remove it.
group: Getting started
order: 10
lastUpdated: 2026-09-27
---

SimplifyGuide is a single plugin with no external service behind it. Guides are
stored as WordPress posts, and screenshots and narration go into your Media
Library.

## Requirements

| Requirement | Why it matters |
| --- | --- |
| WordPress 6.3 or later | The minimum the plugin supports. |
| PHP 7.4 or later | The minimum the plugin supports. |
| HTTPS (or `localhost`) | Browsers only allow screen capture on secure pages. Without it, steps are still recorded, but without screenshots. |
| Upload limit of 8 MB or more | Enough for screenshots and short narration. Below 8 MB, long narration may not upload; your host can raise `upload_max_filesize`. |
| A writable uploads folder | Screenshots are saved to your Media Library. |
| Chrome, Edge or another Chromium browser for screenshots | Chromium browsers (Chrome, Edge, Brave, Opera) share the tab and crop screenshots to your site. Firefox and Safari can only share a whole window, where nothing can be blurred, so they record steps without screenshots. |

Screenshots are saved as WebP by default. If the server cannot resize WebP
images, JPEG is used instead. You can switch to JPEG or PNG in the
[setup wizard](/product/simplifyguide/docs/setup-wizard/) or under
**SimplifyGuide → Settings → General**.

AI writing is optional and needs no setup to install. See
[AI providers](/product/simplifyguide/docs/ai-providers/).

You do not have to check any of this by hand: the first step of the setup
wizard runs these checks on your site and tells you what, if anything, needs
attention.

## From the WordPress admin

Once SimplifyGuide is listed in the WordPress plugin directory:

1. Go to **Plugins → Add New**.
2. Search for `SimplifyGuide`.
3. Click **Install Now**, then **Activate**.

## From a zip file

1. Download the plugin zip.
2. Go to **Plugins → Add New → Upload Plugin**.
3. Choose the file, click **Install Now**, then **Activate**.

## What activation does

Activation registers the guide post type, stores the default settings and then
sends you to the **setup wizard** — once. It only redirects after a single,
interactive activation by an administrator who has not been through setup yet.
Bulk activations, network admin, AJAX, cron and WP-CLI never redirect.

If you skip the redirect or close the wizard, nothing breaks: the defaults are
sensible and you can run it any time. See
[Setup wizard](/product/simplifyguide/docs/setup-wizard/).

The Plugins screen also gets a **Record a guide** link next to **Deactivate**.

## What it adds to the admin menu

A top-level **SimplifyGuide** menu, with:

| Item | What it is | Who sees it |
| --- | --- | --- |
| **Overview** | The start screen: getting-started checklist and recent guides. Clicking the top-level menu opens it. | People who can record |
| **Guides** | The dashboard of every guide, with search, **Show me**, **View** and edit buttons. | Everyone with a guide to see |
| **Record a Guide** | Opens the recorder. See [Recording](/product/simplifyguide/docs/recording/). | People who can record |
| **AI agents** (marked **Soon**) | A preview of planned AI-agent (MCP) access. Not functional yet. | Administrators |
| **Settings** | General, Branding, AI writing, Voice narration and Advanced tabs. See [Settings](/product/simplifyguide/docs/settings/). | Administrators |
| **Setup Wizard** | The first-run setup, available to run again. | Administrators |

"People who can record" means users with the `edit_posts` capability — Authors
and above by default.

Users who cannot record see a **Help Center** menu instead, listing the
published guides they are allowed to see. If there are no such guides, they see
no menu at all.

When **Toolbar button** is on (the default), people who can record also get a
**Record guide** button in the WordPress toolbar, on admin screens and on the
front end.

## Uninstalling

Deactivating SimplifyGuide keeps everything. Deleting it from the Plugins
screen also keeps your guides by default — they are ordinary posts and media,
and they will be there if you install the plugin again.

To remove everything on delete, turn on **SimplifyGuide → Settings → Advanced →
Delete data on uninstall** before you delete the plugin. Then deleting the
plugin removes:

- every guide, in any status,
- the screenshots and narration files attached to those guides,
- the plugin settings and the AI settings, including stored API keys.

Other media in your library is left alone.

## Next

Go through the [setup wizard](/product/simplifyguide/docs/setup-wizard/), then
[record your first guide](/product/simplifyguide/docs/first-guide/).
