---
title: Embedding a guide
sidebarLabel: Embed
description: Show a guide in any post or page with the SimplifyGuide block or the [simplifyguide] shortcode, as a full list or one step at a time.
group: Sharing
order: 510
lastUpdated: 2026-09-27
---

A guide can appear anywhere WordPress shows content: a post, a page, a
knowledge-base article, a members' area. It looks the same as in the Help
Center — title, description, steps, notes, and screenshots with their
highlights and annotations — in your brand colour.

## The block

1. In the block editor, add the **SimplifyGuide** block. Searching for
   "guide", "tutorial", "how to", "steps" or "sop" finds it.
2. Choose a guide from the **Guide** list. Drafts are marked **draft**.
3. In the block settings, choose a **Layout** and whether to **Show title and
   description**.

The block previews the guide as it will appear. It supports wide and full
alignment, and margin and padding.

## The shortcode

Anywhere shortcodes work — the classic editor, a Shortcode block, a widget,
a page builder — use:

```text
[simplifyguide id="42"]
```

The editor's **Record & share** box shows the shortcode for each guide, ready
to copy, and so does the **Shortcode** column in the classic guide list.

| Attribute | Values | Default |
| --- | --- | --- |
| `id` | The guide's ID | — (required) |
| `layout` | `list` or `slides` | `list` |
| `title` | `yes` or `no` | `yes` |

```text
[simplifyguide id="42" layout="slides" title="no"]
```

## Layouts

| Block setting | Shortcode | What readers see |
| --- | --- | --- |
| **All steps** | `layout="list"` | Every step down the page |
| **One step at a time** | `layout="slides"` | One step with **Previous** and **Next** buttons and a position counter; the left and right arrow keys also work |

**All steps** suits reference pages and anything people will print or scan.
**One step at a time** suits short guides placed beside other content, where a
long list would take over the page.

Turning off **Show title and description** (`title="no"`) hides the title, the
description and the step count — useful when the page already has its own
heading.

Clicking a screenshot opens it full size in a new tab.

## Who can see an embedded guide

An embed follows the same rules as the Help Center. The guide must be
**published**, and then:

| Viewer | Sees the guide if |
| --- | --- |
| Someone who can edit the guide | Always, even as a draft |
| A logged-in user | Their role is ticked in **Who sees this guide**, or no roles are ticked, or the guide is **Public** |
| A visitor who is not logged in | The guide is **Public** |

Anyone else sees nothing at all — the block leaves no gap and no message.

That includes most visitors to a public page. If you embed a guide on your
front end for customers who are not logged in, tick **Public — visitors can
see it where it is embedded** in the guide's **Who sees this guide** box. Read
[Public guides](/product/simplifyguide/docs/public-links/) first.

Be careful when checking your own page. You can edit the guide, so you always
see it — even when visitors see nothing. Check the page in a private window, or
logged out, before you rely on it.

Users who can edit posts but not this guide see a notice in its place on the
front end: **This guide is not public. Only you can see this notice; visitors
see nothing.** Visitors do not see it.

## Show me on embedded guides

Embeds show the guide; they do not include a **Show me** button. Logged-in
users can start the walkthrough from the Help Center, or you can link to it
directly — see [Show me](/product/simplifyguide/docs/show-me/#starting-a-walkthrough).
