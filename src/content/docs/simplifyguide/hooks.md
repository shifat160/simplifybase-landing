---
title: Hooks
description: Every filter and action SimplifyGuide provides, with what it controls, its default and an example.
group: Developers
order: 820
lastUpdated: 2026-09-27
---

SimplifyGuide keeps its hook surface small on purpose. There are four filters
and one action. Put examples in a small plugin or a must-use plugin, so they
survive theme changes.

| Hook | Type | Default | Controls |
| --- | --- | --- | --- |
| `simplifyguide_author_capability` | Filter | `'edit_posts'` | Who can record and create guides |
| `simplifyguide_ai_capability` | Filter | `'publish_posts'` | Who can use AI writing and transcription |
| `simplifyguide_ai_rate_limit` | Filter | `60` | AI requests per user per hour |
| `simplifyguide_is_pro` | Filter | `false` | Whether the Pro add-on is active |
| `simplifyguide_help_sidebar` | Action | — | Extra cards in the Help Center's guide sidebar |

## simplifyguide_author_capability

The capability needed to record and create guides. It decides who sees
**Record a Guide**, the **Record guide** toolbar button and the **Overview**
screen, and who may create or import guides over the REST API.

**Parameters:** `string $capability` — default `'edit_posts'`.

```php
// Only Editors and Administrators may record guides.
add_filter( 'simplifyguide_author_capability', function () {
	return 'edit_others_posts';
} );
```

Editing an existing guide still follows WordPress's own post permissions
(`edit_post` on that guide), and uploading screenshots still needs
`upload_files`.

## simplifyguide_ai_capability

The capability needed to make requests to the site's AI provider: describing
and rewriting steps, and transcribing narration. AI calls cost the site owner
money, so the default is stricter than recording.

**Parameters:** `string $capability` — default `'publish_posts'` (Authors and
above).

```php
// Keep AI to Administrators.
add_filter( 'simplifyguide_ai_capability', function () {
	return 'manage_options';
} );
```

Users without it still record normally; their steps use rule-based text.

## simplifyguide_ai_rate_limit

How many AI requests one user may make per rolling hour. Each rewrite,
describe call or transcription counts as one. Zero or less disables the limit.

**Parameters:** `int $limit` — default `60`.

```php
// A tighter limit for everyone but Administrators.
add_filter( 'simplifyguide_ai_rate_limit', function ( $limit ) {
	return current_user_can( 'manage_options' ) ? 0 : 20;
} );
```

The limit is tracked per user in a transient, so it resets an hour after that
user's first request in the window.

## simplifyguide_is_pro

Whether SimplifyGuide Pro is active. The Pro add-on answers `true` through this
filter; the free plugin uses it to hide the Pro card on the **Overview**
screen.

**Parameters:** `bool $is_pro` — default `false`.

```php
// Hide the Pro card on the Overview screen.
add_filter( 'simplifyguide_is_pro', '__return_true' );
```

Returning `true` unlocks nothing — the free plugin has no locked features. It
only changes what the Overview screen shows.

## simplifyguide_help_sidebar

Fires in the sidebar of a single guide in the Help Center, between the guide's
actions and the **About this guide** card. SimplifyGuide uses it itself to add
the **Download** card.

**Parameters:** `int $guide_id` — the guide being viewed.

```php
add_action( 'simplifyguide_help_sidebar', function ( $guide_id ) {
	printf(
		'<section class="sg-side-card"><h2>%s</h2><p><a href="%s">%s</a></p></section>',
		esc_html__( 'Need more help?', 'my-plugin' ),
		esc_url( 'https://example.com/support/' ),
		esc_html__( 'Contact the support team', 'my-plugin' )
	);
} );
```

The `sg-side-card` class gives your card the same look as the built-in ones.

## Core filters that also apply

SimplifyGuide uses standard WordPress APIs, so a few core hooks reach it:

- **`shortcode_atts_simplifyguide`** — filters the attributes of the
  `[simplifyguide]` shortcode (`id`, `layout`, `title`) before a guide is
  rendered.
- **`render_block`** / **`render_block_simplifyguide/guide`** — filter the
  block's HTML, like any block.

The guide post type is `simplifyguide`. It is private (`public` false, no
front-end URLs) and uses the `post` capability type, so role editors and
capability filters for posts apply to guides too.

There are no JavaScript hooks at present.
