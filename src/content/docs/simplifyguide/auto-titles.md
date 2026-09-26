---
title: Automatic titles
description: How SimplifyGuide names a guide from its steps when you leave the title blank, and when it will and will not rename one.
group: Recording
order: 130
lastUpdated: 2026-09-27
---

Leave the title field in the recorder blank and SimplifyGuide names the guide
from what you did when you press **Finish**. Record "Settings → type a title →
Save Changes" and the guide is called **Update General Settings**, not
"Untitled guide".

A title you type is never replaced.

## How a name is chosen

The idea is that a task is defined by its last committing action — Save,
Publish, Install — and the thing it acted on.

SimplifyGuide looks at the click steps whose button or link label starts with a
committing verb:

| Label starts with | Title uses |
| --- | --- |
| Save, Update, Apply | Update |
| Install, Activate, Publish, Add, Create | the same verb |
| Delete, Trash | Delete |
| Remove, Upload, Import, Export, Send, Submit | the same verb |
| Connect, Enable, Disable, Schedule | the same verb |
| Change, Edit, Customize, Configure | the same verb |

The rest of the label is the thing. "Publish Post" is Publish + Post; "Install
xSpeed Cache" is Install + xSpeed Cache. The thing is tidied first: anything
after a colon or dash (plugin names are often "Name: what it does"), version
numbers and trailing quotes are dropped, and it is cut at 60 characters.

The name comes from the **last** such step. Other committing steps on the same
thing join in, so a guide that installs and then activates a plugin is called
**Install and activate xSpeed Cache**. At most two verbs are used.

### When the button says nothing useful

Many buttons do not name their object: **Save Changes**, **Install Now**,
**Publish**. When the thing is empty or generic — changes, now, new, all, it,
this, settings, options, draft, post, page, item, selected, "and continue" —
SimplifyGuide uses the heading of the page the click happened on instead.

Clicking **Save Changes** on the General Settings screen therefore gives
**Update General Settings**. A leading "Add New", "Add", "Edit" or "New" is
dropped from the heading, so publishing on an "Add New Post" screen is about
the post, not the screen.

### When nothing was committed

If no step starts with a committing verb — you only looked around — the guide
is named after the screen it ends on: **Add Plugins walkthrough**. The
Dashboard is skipped, because almost every admin tour passes through it.

If there is no usable heading either, the name is the date: **Guide recorded on
27 September 2026**, in your site's date format. A guide with no steps at all
stays **Untitled guide**.

## Unique names

Automatic names are made unique among your guides by adding a number: the
second **Update General Settings** becomes **Update General Settings (2)**, the
third **(3)**, and so on. Published, draft, pending, private and scheduled
guides count; trashed ones do not.

A title you type yourself is kept exactly as you typed it, even if another
guide has the same name.

## When a guide is renamed

Naming happens when you press **Finish** in the recorder and the title field
is blank (or still shows the title the guide already had). SimplifyGuide then
renames the guide only if its title is automatic:

- it is empty or **Untitled guide**, or
- it is still exactly the name SimplifyGuide gave it last time.

If you typed a title in the recorder, or changed the title in the editor at any
point, the guide keeps your title from then on.

### Recording more steps

When you [record more steps](/product/simplifyguide/docs/recording/#recording-more-steps-into-a-guide)
into a guide that still has its automatic name, the name is worked out again
from all its steps, old and new. A guide that started as **Add Plugins
walkthrough** and gains an **Install Now** click becomes, say, **Install
Plugins**.

To stop that, give the guide a title of your own — in the recorder's title
field or in the editor.

## AI and titles

Automatic titles are rule-based. They do not use AI, so they work the same
whether or not you have an AI provider set up.
