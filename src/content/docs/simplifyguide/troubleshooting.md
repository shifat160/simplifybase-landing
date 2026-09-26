---
title: Troubleshooting
description: Fixes for screen sharing, missing screenshots, pages that will not load in the recorder, upload limits, Show me, AI errors and slow exports.
group: Reference
order: 730
lastUpdated: 2026-09-27
---

Each section starts with the message SimplifyGuide shows, so you can search
this page for the words on your screen.

## Recording

### "This browser cannot take screenshots. Steps will be recorded without images."

The browser does not offer screen capture to this page. The usual cause is
that the site is served over plain **HTTP**: browsers only allow screen sharing
on HTTPS pages, or on `localhost`. Move the site to HTTPS (most hosts do this
in one click), or record on a local copy at `localhost`.

Steps are still recorded; they just have no screenshots.

### "Screen sharing was declined. Steps will be recorded without screenshots."

You pressed **Cancel** in the browser's share dialog, or the browser blocked
it. Press **Exit**, open the recorder again and, when the browser asks, choose
**This tab**. If the dialog never appears, check the browser's site settings
for a blocked screen-sharing permission.

### "You shared a window or screen, where sensitive data cannot be blurred…"

You picked a window or whole screen instead of the tab. In a shared window the
recorder cannot tell where your site sits in the picture, so Smart Blur could
not pixelate anything. To keep unblurred data out of your Media Library, the
recording carries on **without screenshots**.

To get screenshots, exit, start again and choose **This tab**. Chrome, Edge,
Brave and Opera support tab sharing and crop screenshots to just your site.
Firefox and Safari always share a whole window, so record screenshots in a
Chromium browser. See [Privacy and Smart Blur](/product/simplifyguide/docs/privacy-and-smart-blur/).

### "Screen sharing stopped. New steps will have no screenshot."

The browser's **Stop sharing** bar was pressed, or the shared tab was closed.
Steps keep recording without images. To get screenshots back, finish or exit
and start a new recording, or use **Record more** on the guide later.

### Some steps have no screenshot

Screen sharing was on, but a step has no picture. Likely causes:

- **Your role cannot upload files.** Screenshots go into the Media Library,
  which needs the `upload_files` capability. Contributors do not have it by
  default. See [Roles and capabilities](/product/simplifyguide/docs/roles-and-capabilities/).
- **"Screenshot is too large."** A single screenshot is capped at 8 MB. Lower
  **Maximum screenshot width** or switch **Screenshot format** to WebP under
  **Settings → General**.
- **"Screenshots must be PNG, JPEG or WebP."** A security plugin or host rule
  rejected the file type. Allow WebP uploads, or switch the format to PNG.
- **The page changed too fast.** A click that navigates immediately can beat
  the capture. Press **Capture screen** in the recorder panel to take one by
  hand, or add one later in the editor.

### A page will not load in the recorder

The recorder shows your site inside a frame on the same site. Some setups
forbid that:

- **A security plugin or server rule sends `X-Frame-Options: DENY`** or a
  `Content-Security-Policy` with `frame-ancestors 'none'`. WordPress's own
  default (`SAMEORIGIN`) is fine; `DENY` is not. Change the setting to
  `SAMEORIGIN`, or `frame-ancestors 'self'`.
- **"That page left your site, so it cannot be recorded."** The link went to
  another domain — a payment provider, a documentation site, a different
  subdomain. Only pages on this site can be recorded.
- **"Guides can only be recorded on this site."** You typed an address on
  another domain into **Page address**.
- **A plugin redirects framed pages** to break out of frames. Record that part
  of the task by hand with **Add note** and a screenshot.

### "Microphone access was declined. Recording without narration."

The browser was refused the microphone. Allow it in the browser's site
settings, or under **Settings → Voice narration → Allow microphone access**.
**"This browser cannot record audio."** means the browser has no recording
support at all; like screen sharing, it also needs HTTPS.

## Uploads and imports

| Limit | Size | Message |
| --- | --- | --- |
| One screenshot | 8 MB | "Screenshot is too large." |
| One guide's narration | 25 MB | "The narration is longer than 25 MB. Record shorter guides or split them." |
| A SimplifyGuide file to import | 40 MB | "This file is too large to import (40 MB maximum)." |
| One embedded screenshot in an import | 8 MB | The step is imported without its image |
| Steps per guide | 200 | Steps past 200 are dropped |

Your server's own limits come first. If uploads fail with a generic error
well below these sizes, raise PHP's `upload_max_filesize` and `post_max_size`
(your host can do this).

**"This file was made by a newer version of SimplifyGuide."** Update the
plugin on this site, then import again.

## Show me

**Show me** looks for each step's element for about four and a half seconds
before it gives up. What you see next tells you why.

| Message | Meaning and fix |
| --- | --- |
| **Looking for … on this screen…** | Still searching. Pages that load slowly get a moment longer. |
| **This step happens on another screen.** | The reader is on the wrong page. **Take me there** opens it. |
| **We hit a roadblock: this item is not on the screen.** | The page is right but the element is not there. **Reload this screen** or **Open the screen as recorded**, or **Skip** the step. |
| **Looks like this is already done on your site.** | The button was not found, but its done state was — for example a step that installs a plugin, on a site where that plugin already shows **Active**. It recognises install, activate, enable and connect steps. The reader can press **Next**. |
| **This walkthrough could not be loaded.** | The guide was deleted, unpublished, or is not shown to this reader's role. |

If a step keeps failing for everyone, the screen probably changed after an
update. Open the guide, delete the step and use **Record more** to capture it
again. [Reliable guides](/product/simplifyguide/docs/reliable-guides/) explains
how to record steps that survive changes.

## AI

| Message | Fix |
| --- | --- |
| **No API key is set for this provider, so steps use plain rule-based descriptions.** | Nothing is broken. Add a key under **Settings → AI writing** to turn AI on. |
| **Add a … API key in SimplifyGuide → Settings → AI first.** | Same: the chosen provider has no key. |
| **Choose a … model in SimplifyGuide → Settings → AI.** | Press **Check key**, then pick a **Model**. |
| **… rejected the API key.** | Wrong or revoked key. Paste a new one and press **Check key**. |
| **Your … account has no credits left.** | Top up with the provider, or pick another one. |
| **… is rate-limiting requests.** | The provider's limit. Wait a minute. |
| **You have reached the hourly limit for AI requests.** | SimplifyGuide's own limit: 60 requests per user per hour. It says how long to wait. |
| **No AI provider is connected in WordPress yet.** | You chose **WordPress AI (site connection)** but nothing is connected under **Settings → Connectors**. |
| **… answered, but not in the expected format.** | Try again, or pick a larger model. |

If AI buttons do nothing for some users, check their role: AI needs
`publish_posts` (Authors and above). [AI providers](/product/simplifyguide/docs/ai-providers/)
has the full list of messages.

## Exports

### Video takes a long time

That is expected. Exports are made in your browser, and **video plays the guide
in real time**, so a guide that runs for two minutes takes about two minutes to
export, plus the title and closing cards. Keep the tab open and in front until
it finishes; browsers slow down background tabs.

Everything else — PDF, Word, GIF — is usually done in seconds. Large guides
with many full-width screenshots take longer, and a GIF with many steps can be
big.

### "This browser cannot record video."

The browser has no video recording support for canvases. Use a current Chrome,
Edge or Firefox.

### "Export failed: …"

The message after the colon comes from the browser. The most common cause is a
screenshot that no longer exists in the Media Library; restore it or replace
the step's screenshot in the editor. **"This guide has no steps yet."** means
exactly that.

## Still stuck

Collect the exact message, your browser and version, and what you were
recording, and [contact us](/contact/).
