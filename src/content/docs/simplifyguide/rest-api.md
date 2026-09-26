---
title: REST API
description: Every route in the simplifyguide/v1 namespace, with its method, permission and parameters, and how to call it with an application password.
group: Developers
order: 810
lastUpdated: 2026-09-27
---

SimplifyGuide has its own REST namespace, `simplifyguide/v1`. The recorder,
editor and exports use it from the browser with a cookie and nonce; the same
routes work from outside with an **application password**, so nothing assumes
a wp-admin page is calling.

Guides are not exposed through the core `wp/v2` routes. The post type has
`show_in_rest` off and is served only here.

## Authentication

Create an application password under **Users → Profile → Application
Passwords**, then send it with HTTP Basic auth. Requests run as that user, with
that user's capabilities. WordPress only accepts application passwords over
HTTPS.

```bash
curl -u "editor:abcd efgh ijkl mnop qrst uvwx" \
  https://example.com/wp-json/simplifyguide/v1/guides?search=refund
```

Every route below needs a logged-in user; none is available anonymously.

## Guides

| Method | Path | Permission | Parameters |
| --- | --- | --- | --- |
| `GET` | `/site` | Logged in | — |
| `GET` | `/guides` | Logged in | `search` |
| `POST` | `/guides` | Can author | `title`, `start_url`, `steps`, `blur` |
| `GET` | `/guides/{id}` | Can read the guide | — |
| `POST` `PUT` `PATCH` | `/guides/{id}` | Can edit the guide | `title`, `description`, `status`, `steps`, `audience`, `blur`, `public`, `auto_title` |
| `DELETE` | `/guides/{id}` | Can delete the guide | — |
| `POST` | `/guides/{id}/steps` | Can edit the guide | `steps` (required) |
| `GET` | `/guides/{id}/history` | Can edit the guide | — |
| `POST` | `/guides/{id}/history` | Can edit the guide | `time` (required) |
| `POST` | `/guides/{id}/screenshots` | Can edit the guide, and `upload_files` | `file` (multipart), `replace` |
| `POST` | `/import` | Can author, and `upload_files` | A SimplifyGuide file as the JSON body |

"Can author" is `edit_posts` unless changed with the
[`simplifyguide_author_capability`](/product/simplifyguide/docs/hooks/) filter.
"Can read" follows the guide's audience and **Public** setting; see
[Roles and capabilities](/product/simplifyguide/docs/roles-and-capabilities/).

### GET /site

A handshake for clients. Returns the plugin version, the guide `schema`
number, the site name and home URL, the current user, and whether they can
author (`can_author`) and upload (`can_upload`). Check this first.

### GET /guides

Up to 200 guides the user can read, most recently modified first. Authors
also get their drafts, pending and private guides; everyone else gets
published ones. Each item is a summary: `id`, `title`, `description`,
`status`, `modified`, `step_count`, `edit_url`.

### POST /guides

Creates a **draft**. Without a `title`, the guide gets a placeholder name.
`start_url` is the page the guide starts on; `steps` is an array of step
objects; `blur` is a list of CSS selectors to blur in every screenshot (up to
50). New guides get the default audience from **Settings → General**. Returns
the full guide.

### GET /guides/{id}

The full guide: the summary fields plus `schema`, `start_url`, `audience`,
`public`, `narration` (`id`, `url`, `duration`, or `null`) and `steps`. Each
step includes an `image` URL. Users who cannot edit the guide do not get the
steps' `context`.

### POST /guides/{id}

Updates only what you send:

| Parameter | Effect |
| --- | --- |
| `title` | Guide title |
| `description` | The short description (stored as the excerpt) |
| `status` | `draft`, `publish` or `private`. `publish` also needs `publish_posts`. |
| `steps` | Replaces **all** steps. The previous steps are kept in version history. |
| `audience` | Array of role slugs. Empty means every logged-in user. Unknown roles are dropped. |
| `blur` | Array of CSS selectors |
| `public` | `true` or `false` |
| `auto_title` | `true` names the guide from its steps, unless the author already named it |

### DELETE /guides/{id}

Moves the guide to Trash. It is not deleted permanently.

### POST /guides/{id}/steps

Appends `steps` to the end of the guide. The recorder uses this while you
record. Returns `count` and the full `steps` list.

### History

`GET` lists saved versions, newest first, without their steps: `time` (a Unix
timestamp, which is the version's ID), `date`, `ago`, `author`, `count`, and
the first five step `titles`. `POST` with `time` restores that version; the
current steps are saved as a version first, so a restore can itself be undone.

### POST /guides/{id}/screenshots

Uploads one screenshot as multipart field `file`: PNG, JPEG or WebP, at most
8 MB. The file is saved to the Media Library under a random name and attached
to the guide. Returns `id` and `url`; put the `id` in a step's `image_id`.

Pass `replace` with the attachment ID of one of this guide's screenshots to
swap it: every step using the old image switches to the new one, and the old
file is deleted. The editor's **Blur** tool uses this.

### POST /import

Creates a draft guide from a SimplifyGuide file sent as the request body (40 MB
maximum). Returns `id`, `steps` (how many were imported), `skipped` (images
that could not be saved) and `edit_url`. See
[Guide format](/product/simplifyguide/docs/guide-format/).

```bash
curl -u "editor:abcd efgh ijkl mnop qrst uvwx" \
  -H "Content-Type: application/json" \
  --data-binary @refund-an-order.simplifyguide.json \
  https://example.com/wp-json/simplifyguide/v1/import
```

## AI and narration

These spend the site owner's AI credits, so they need the AI capability
(`publish_posts` unless changed with `simplifyguide_ai_capability`) and count
towards the per-user hourly limit.

| Method | Path | Permission | Parameters |
| --- | --- | --- | --- |
| `POST` | `/ai/rewrite` | Can use AI | `text` (up to 4,000 characters), `mode` |
| `POST` | `/guides/{id}/describe` | Can use AI and edit the guide | `step_ids`, `steps`, `apply` |
| `POST` | `/guides/{id}/narration` | Can edit the guide, and `upload_files` | `file` (multipart), `duration`, `transcribe` |
| `DELETE` | `/guides/{id}/narration` | Can edit the guide | — |
| `POST` | `/guides/{id}/narration/transcribe` | Can use AI and edit the guide | — |

- **`/ai/rewrite`** returns `{ "text": "…" }`. `mode` is `clearer` (the
  default), `shorter`, `friendlier` or `fix` (spelling and grammar only).
- **`/describe`** writes a title and note for each step and returns
  `descriptions` (a map of step ID to `title` and `note`) and the `provider`
  label. `step_ids` limits it to some steps; `steps` describes unsaved steps
  instead of the stored ones; `apply: true` saves the result.
- **`/narration`** uploads the guide's audio (WebM, Ogg, MP4/M4A, MP3 or WAV,
  up to 25 MB), replacing any earlier narration. `duration` is in
  milliseconds. With `transcribe: true`, and a transcription provider set up,
  the speech is written into step notes and `assigned` says how many steps got
  one; a transcription failure comes back as `transcript_error` without
  failing the upload. Uploading needs `upload_files`; transcribing also needs
  the AI capability.
- **`/narration/transcribe`** re-transcribes the stored narration and returns
  `assigned` and the updated `steps`.

Rewrite one sentence:

```bash
curl -u "editor:abcd efgh ijkl mnop qrst uvwx" \
  -H "Content-Type: application/json" \
  -d '{"text":"click the save button at the bottom to save it","mode":"clearer"}' \
  https://example.com/wp-json/simplifyguide/v1/ai/rewrite
```

## Internal routes

These exist for SimplifyGuide's own admin screens. They need `manage_options`
and may change without notice; do not build on them.

| Method | Path | Used by |
| --- | --- | --- |
| `POST` | `/ai/check` | **Check key** and **Test connection** in Settings |
| `POST` | `/ai/reveal` | **Show** on a saved key in Settings |
| `POST` | `/setup` | The setup wizard, saving each step |
| `POST` | `/setup/sample` | The setup wizard's sample guide |

## Markdown and HTML downloads

The **Markdown** and **Web page** exports are not REST routes. They are served
from `wp-admin/admin-post.php?action=simplifyguide_export` with a per-guide
nonce, for a logged-in user in the browser. Other exports (PDF, Word, GIF,
video, SimplifyGuide file) are built in the browser from `GET /guides/{id}`.

## Errors

Errors use the standard WordPress REST shape, with a `simplifyguide_` code:

```json
{
  "code": "simplifyguide_ai_rate_limited",
  "message": "You have reached the hourly limit for AI requests. Try again in 12 minutes.",
  "data": { "status": 429 }
}
```

Permission failures return WordPress's usual `rest_forbidden` with status 401
or 403.
