---
title: Writing reliable guides
sidebarLabel: Reliable guides
description: How Show me finds elements on the live screen, and how to record guides that keep working after plugins, themes and WordPress update.
group: Show me
order: 320
lastUpdated: 2026-09-27
---

A written guide that is slightly out of date is still readable. A walkthrough
that is out of date stops at the step it cannot find. This page explains how
**Show me** matches a recorded step to the live screen, and what you can do
when recording so it keeps matching.

## How an element is found

When you record, each step stores several clues about the element you used:

- **A selector** — a CSS path to the element on the page.
- **Its label** — the words on it: its text, `aria-label`, value, title or
  placeholder.
- **The kind of element** — a link, a button, a field.
- **Where it was** — the highlight box on the screenshot.
- **The screen** — the page address it was recorded on.

On the live page, [Show me](/product/simplifyguide/docs/show-me/) collects
every element the selector matches and every clickable element whose label
matches, then scores them. A selector that matches exactly one element scores
highly on its own. A matching label scores well. The right kind of element
adds a little, and so does being near where the element was in the screenshot
— that last clue is what tells the **Add New Plugin** button on a page from a
menu link with the same words.

The highest-scoring visible element wins, if it scores enough. Otherwise the
step is reported as not found.

### A mismatched label is never highlighted

One rule overrides the scores: if an element has words and they do not match
the recorded label, it is not highlighted, however well the selector fits.
"Install Now" on the wrong plugin card is not "Activate WooCommerce", even if
it sits in exactly the same spot.

The match allows for small differences — a count after a menu item
("Plugins 3"), or a label cut short. Icon-only buttons, which have no words to
compare, can match on the selector alone.

This is deliberate. A walkthrough that stops and says **We hit a roadblock** is
annoying; one that confidently points at the wrong button is dangerous.

## Keep labels stable

The label is the strongest clue that survives an update, because plugin
authors change their markup far more often than their button text.

- **Record on screens whose labels do not change with the data.** A button
  that says "Edit Hello World" only matches while that post is called Hello
  World. A list row that shows "3 orders" matches until there are four. Pick
  the screen or element with a fixed name where you can.
- **Avoid recording on search results and filtered lists** when you can reach
  the same thing from a menu. If you must, the step keeps the search in its
  address, and **Open the screen as recorded** takes the reader back to it.
- **Use the site's language.** A guide recorded in English matches English
  labels. Readers who use the admin in another language see different words.

## Leave the highlight where it belongs

The highlight on each screenshot is not only for readers — it is the position
clue. If you move it in the editor, keep it on the element the reader should
use. Removing it takes away one of the clues, which matters most on screens
with several elements of the same name. See
[Annotations](/product/simplifyguide/docs/annotations/).

## Re-record after updates

When a plugin, theme or WordPress update changes a screen, the guide's steps
for that screen may stop matching. Run the guide with **Show me** after
updates that touch the screens it covers, and when a step is not found:

1. Open the guide in the [editor](/product/simplifyguide/docs/editor/).
2. Delete the steps that no longer match.
3. Press **Record more steps** and record just that part again. New steps are
   added to the end.
4. Drag them into place and press **Update**.

If the result is worse than before, restore the previous version from
[Version history](/product/simplifyguide/docs/version-history/).

Keeping guides short helps here. A guide that covers one task on two or three
screens is quick to check and quick to fix. One that covers a whole setup
process breaks whenever any of its screens change.

## Steps that cannot be matched

Some things have nothing on the page to point at:

- **Text steps** you added by hand.
- **Keyboard shortcuts.**
- Steps whose element only appears after something the walkthrough cannot
  predict.

Show me displays these as text with **Next**. If a recorded step is unreliable
and the reader only needs to be told, delete it and add a text step with the
same instruction instead.

## Steps that are already done

Walkthroughs are often run on a site that is part-way through the task. Steps
whose element starts with **Install**, **Activate**, **Enable** or **Connect**
are recognised as already done when the finished state ("Active",
"Disconnect" and so on) shows next to the same name. Recording the real button
— "Activate WooCommerce", not a generic icon — is what makes that check work.
