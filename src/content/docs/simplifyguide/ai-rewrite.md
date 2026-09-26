---
title: AI rewrite
description: Turn recorded steps into clear instructions with AI, one step at a time or the whole guide at once, using the provider and key you choose.
group: Editing
order: 230
lastUpdated: 2026-09-27
---

The recorder writes each step from what you clicked — "Click 'Settings'",
"Type in 'Site Title'". That is accurate but plain. AI rewrite turns it into
instructions a newcomer can follow, and can add a short note explaining why.

AI is optional. It uses the provider and API key you set up in
**SimplifyGuide → Settings → AI writing**; without one, the AI buttons are
disabled and hovering them says **Add an AI key in SimplifyGuide → Settings to
use this.** See [AI providers](/product/simplifyguide/docs/ai-providers/).

## Rewriting the whole guide

1. Open the guide in the [editor](/product/simplifyguide/docs/editor/).
2. Press **Rewrite all steps with AI** above the steps.
3. Wait for **Writing…** to finish. A notice tells you how many steps were
   rewritten and by which provider.
4. Read through the result, fix anything that is off, and press **Update**.

Every step's instruction is replaced and its badge changes to **AI**. Notes are
filled in only where a step has no note yet, or where the existing note was
itself written by AI — a note you wrote or edited is never overwritten.

Nothing is saved until you press **Update**, so if you do not like the result,
leave the page without saving.

## Rewriting one step

Each card's header has an **AI** menu:

| Option | What it does |
| --- | --- |
| **Write this step from the recording** | Writes a fresh instruction and note from what was recorded, the same way as the whole-guide rewrite |
| **Make clearer** | Rewrites the current text to be clearer and easier to follow |
| **Make shorter** | Shortens it, keeping the meaning |
| **Make friendlier** | Makes it friendlier and more encouraging |
| **Fix spelling & grammar** | Corrects mistakes and changes nothing else |

**Write this step from the recording** starts again from the recorded data.
The other four work on the text as it is now — including your own edits — and
rewrite both the instruction and the note, one after the other.

If a request fails, the reason is shown on that card: a rejected key, no
credits left, a rate limit at the provider, and so on.

## Rewrite on Finish

To have every new recording rewritten automatically, turn on **Rewrite on
Finish** in **Settings → AI writing**. When you press **Finish** in the
recorder, the steps are rewritten with AI before the editor opens, and saved
straight away. If the AI request fails, the recorded text is kept and the
editor tells you why.

## Language

**Write steps in**, in **Settings → AI writing**, sets the language for
**Rewrite all steps with AI**, **Write this step from the recording** and
**Rewrite on Finish**. Leave it empty to use the site language — which can
differ from the language of your admin screens.

**Make clearer**, **Make shorter**, **Make friendlier** and **Fix spelling &
grammar** always answer in the language of the text you give them.

## What is sent

Only text. Screenshots are never sent.

| Request | Sent to the provider |
| --- | --- |
| Whole guide, or **Write this step from the recording** | The guide title, and for each step: its number, action, current instruction, the label of the element used, the page path, and a little page context captured while recording (such as the element's role, the nearest heading and the page title) |
| **Make clearer**, **Make shorter**, **Make friendlier**, **Fix spelling & grammar** | The step's instruction, then its note, as two separate requests |

The model is told never to invent values that are not in the input, and never
to include passwords or personal data. The page context stays on your site: it
is never shown to readers, never included in exports, and is stripped from
[saved versions](/product/simplifyguide/docs/version-history/).

## Limits

Each person can make **60 AI requests an hour**. Past that, the editor shows
**You have reached the hourly limit for AI requests.** and how many minutes to
wait. The count is per person, not per site.

What counts as one request:

- **Rewrite all steps with AI** — one request, however many steps.
- **Write this step from the recording** — one request.
- **Make clearer** and the other rewrites — one request for the instruction,
  and one more for the note if the step has one.
- **Rewrite on Finish** — one request per recording.

Developers can change the limit with the `simplifyguide_ai_rate_limit` filter;
zero or less turns it off. See [Hooks](/product/simplifyguide/docs/hooks/).

Your provider may also have its own rate limits and costs. Those are between
you and the provider.

## Who can use it

AI writing is available to **Authors and above** — anyone with the
`publish_posts` capability. Contributors can edit their own guides but see the
AI buttons disabled.

To change who can use it, filter the capability:

```php
add_filter( 'simplifyguide_ai_capability', function () {
	return 'edit_others_posts'; // Editors and Administrators only.
} );
```

The same capability controls narration transcription. See
[Roles and capabilities](/product/simplifyguide/docs/roles-and-capabilities/).
