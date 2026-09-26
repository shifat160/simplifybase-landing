---
title: Guide format
description: The SimplifyGuide file (.simplifyguide.json) and the schema 2 step object — every field, its limits, and how importing treats it.
group: Developers
order: 830
lastUpdated: 2026-09-27
---

A **SimplifyGuide file** is a portable copy of one guide, with its screenshots
embedded, for moving guides between sites. Download it from a guide's
**Export** box or the Help Center's **Download** card (it is the **SimplifyGuide
file** option), and bring it in with **Import guide** on the guide list.

The file is plain JSON, named after the guide: `Refund an order.simplifyguide.json`.

The current schema is **2**. The REST API reports it as `schema` on
`GET /site` and on every full guide.

## The file

```json
{
  "format": "simplifyguide",
  "schema": 2,
  "exported_at": "2026-09-27T10:14:03.512Z",
  "guide": {
    "title": "Refund an order",
    "description": "Full and partial refunds from the order screen.",
    "start_url": "/wp-admin/edit.php?post_type=shop_order",
    "steps": [
      {
        "id": "8b0c4a3e-1f2d-4c5b-9a7e-3d6f2b1c0e9a",
        "action": "click",
        "title": "Click “Refund”",
        "note": "The button is under the order items.",
        "selector": "button.refund-items",
        "target": "Refund",
        "url": "/wp-admin/post.php?post=123&action=edit",
        "box": { "x": 0.6412, "y": 0.5531, "w": 0.0724, "h": 0.0302 },
        "source": "recorded",
        "annotations": [],
        "t": 4210,
        "image": "data:image/webp;base64,UklGR…"
      }
    ]
  }
}
```

| Field | Type | Notes |
| --- | --- | --- |
| `format` | string | Always `"simplifyguide"`. Anything else is rejected. |
| `schema` | integer | `2`. A file with a higher number is refused with "This file was made by a newer version of SimplifyGuide." |
| `exported_at` | string | ISO 8601 time of export. Informational. |
| `guide.title` | string | Guide title |
| `guide.description` | string | Short description |
| `guide.start_url` | string | Site-relative path the guide starts on |
| `guide.steps` | array | Step objects, in order |

The file carries the guide's content only. Its audience, **Public** setting,
blurred-element list, narration, version history and your branding are not
included; the importing site applies its own.

## The step object

This is the schema 2 step as it is stored (post meta `_simplifyguide_steps`)
and returned by `GET /guides/{id}`. Every write — recorder, editor, REST,
import — passes through the same validation, so the limits below always hold.

| Field | Type | Limits and meaning |
| --- | --- | --- |
| `id` | string | Lowercase letters, digits and hyphens, up to 40 characters. Generated (a UUID) if missing. |
| `action` | string | `click`, `input`, `select`, `check`, `uncheck`, `navigate`, `note`, `key`, `copy`, `paste` or `drag`. Anything else becomes `note`. |
| `title` | string | The instruction, up to 300 characters. Required, except on `note` steps. |
| `note` | string | Extra explanation, up to 4,000 characters |
| `selector` | string | CSS selector for the element, used by **Show me**. Up to 500 characters. |
| `target` | string | The element's visible label, up to 200 characters |
| `url` | string | Site-relative path and query of the page, up to 1,000 characters |
| `image_id` | integer | Media Library attachment ID of the screenshot, or `0` |
| `image` | string | Output only. Screenshot URL in the REST API; a `data:` URL in a SimplifyGuide file. |
| `box` | object or null | The highlighted element as fractions of the screenshot: `x`, `y`, `w`, `h`, each 0–1 |
| `source` | string | Where the title came from: `recorded`, `ai`, `voice`, `edited` or `manual`. Defaults to `recorded`. |
| `note_source` | string | Where the note came from: same values, or empty |
| `annotations` | array | Up to 30 drawings on the screenshot (below) |
| `t` | integer | Milliseconds from the start of the recording. Lines narration up with steps. |
| `context` | string | Page context for AI, up to 1,500 characters. Never rendered; omitted for users who cannot edit the guide. |

Validation rules worth knowing:

- A step with no `title` is dropped, unless it is a `note` step. A `note` step
  with no title, no note and no image is dropped too.
- A guide holds at most **200 steps**; extra steps are dropped.
- `url` must be on this site. Full URLs on the same host and port are reduced
  to their path; other hosts, `javascript:` and similar are emptied. Expired
  nonce parameters such as `_wpnonce` are removed.
- An `image_id` must be an image the guide may use — attached to this guide,
  already used by it, or editable by the current user. Otherwise it is set to
  `0` and `box` is cleared.

### Annotations

| Field | Type | Meaning |
| --- | --- | --- |
| `type` | string | `arrow`, `rect`, `text` or `marker` |
| `x1`, `y1`, `x2`, `y2` | number | Position as fractions of the screenshot, 0–1 |
| `text` | string | Label text, up to 200 characters |
| `color` | string | `#rrggbb`. Defaults to `#ff7a45`. |

## What a SimplifyGuide file includes

A file exports these step fields: `id`, `action`, `title`, `note`,
`selector`, `target`, `url`, `box`, `source`, `annotations`, `t`, plus `image`
as an embedded `data:` URL.

It leaves out `image_id` (it means nothing on another site), `note_source`,
and `context`. A screenshot that cannot be fetched at export time is exported
as an empty `image` rather than failing the whole file.

## Importing

**Import guide** sends the file to `POST /simplifyguide/v1/import`. The
importing user needs to be able to author guides and upload files.

What happens:

1. The file is checked: `format` must be `"simplifyguide"`, `guide` must be an
   object, `schema` must not be newer than the plugin's, and the body must be
   40 MB or less.
2. A new **draft** is created. If a guide with the same title exists, the new
   one gets a unique title. Without a title it is called **Imported guide**.
3. Each step's `image` is saved to the Media Library under a random name and
   attached to the new guide. Only PNG, JPEG and WebP `data:` URLs up to 8 MB
   are accepted, and the bytes must really be the type they claim. Images that
   fail are skipped; the step is kept without one.
4. Steps go through the normal validation above. Any `image_id` in the file is
   ignored.
5. The guide gets this site's default audience from **Settings → General**.

The response reports how many steps were imported and how many images were
skipped, and the editor opens on the new draft.

To create a file by hand or from another tool, only `format`, `guide` and
`guide.steps` with a `title` per step are strictly needed. Leave out `image`
for text-only steps.
