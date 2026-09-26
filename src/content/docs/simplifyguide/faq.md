---
title: FAQ
sidebarLabel: FAQ
description: Short answers about price, where data lives, AI, multisite, languages, use outside WordPress and what Pro will add.
group: Reference
order: 740
lastUpdated: 2026-09-27
---

## Is SimplifyGuide free?

Yes. The plugin is free and open source under the GPL, with no account, no
cap on the number of guides and no licence key. Recording, the
editor, **Show me**, the Help Center, embeds and every export format are all
in the free plugin.

## Where is my data stored?

On your site. Guides are WordPress posts, screenshots and narration are files
in your Media Library, and settings are two WordPress options. There is no
SimplifyBase server involved. See
[Privacy and Smart Blur](/product/simplifyguide/docs/privacy-and-smart-blur/).

## Do I need AI?

No. Without AI, steps are written by SimplifyGuide's own rules — *In the left
menu, go to Posts → Add New* — which work well on most WordPress screens. AI
only polishes wording, rewrites single steps and transcribes narration.

If you want it, WordPress 7.0 and later can use the AI connection your site
already has under **Settings → Connectors**, so there is no extra key. Or bring
your own key for Anthropic, OpenAI, DeepSeek, OpenRouter, Groq or a server you
run yourself. See [AI providers](/product/simplifyguide/docs/ai-providers/).

## Does anything leave my site?

Only if you add an AI key, and then only to the provider you picked: step text
with a little page context, or narration audio. Screenshots never leave your
site.

## Which browsers can record?

Any current browser records steps. For screenshots cropped to just your site,
use a Chromium browser — Chrome, Edge, Brave or Opera — and share **This tab**.
Firefox and Safari can only share a whole window, where nothing can be blurred,
so they record steps without screenshots. Screen sharing also needs HTTPS (or
`localhost`).

## Does it work on multisite?

SimplifyGuide has no network-level features. Activate it on each site that
needs it: every site keeps its own guides, screenshots and settings, and
guides are not shared between sites. To copy a guide to another site, export
it as a **SimplifyGuide file** and import it there.

## Which languages is it in?

The interface ships translated into Chinese (Simplified, `zh_CN`), Spanish
(`es_ES`), Brazilian Portuguese (`pt_BR`), French (`fr_FR`) and German
(`de_DE`), as well as English. It follows each user's WordPress language.

Step text is a separate choice: AI writes in the language set under
**Settings → AI writing → Write steps in**, which defaults to the site
language. PDF exports handle any script, including Chinese, Japanese and
Korean.

## Can I record outside WordPress?

Not yet. The recorder records pages on the site it is installed on. A free
browser extension that records workflows on any website and publishes them
into the plugin is planned.

## Can I move guides between sites?

Yes. Download a guide as a **SimplifyGuide file** (`.simplifyguide.json`) and
use **Import guide** on the other site. Screenshots travel inside the file. See
[Guide format](/product/simplifyguide/docs/guide-format/).

## What will Pro add?

SimplifyGuide Pro is planned. Everything in the free plugin stays free. Pro is
planned to add AI that writes whole guides and intros with no API key needed,
cloud share links that work outside your site, and priority support.
