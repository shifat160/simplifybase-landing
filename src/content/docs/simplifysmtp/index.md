---
title: SimplifySMTP documentation
sidebarLabel: Introduction
description: Documentation for SimplifySMTP, currently in design.
order: 0
lastUpdated: 2026-08-05
---

SimplifySMTP is in design. This page exists so the documentation URL is stable
from day one — bookmark it and it will fill in rather than move.

## What it will cover

- **Installation** — the drop-in replacement for the platform mailer, and what
  keeps working unchanged on day one.
- **Providers** — configuring Postmark, SES, Resend, SendGrid or plain SMTP,
  plus a fallback and the conditions that trigger failover.
- **The delivery log** — what is recorded per message, how long it is kept, and
  where it is stored.
- **Templates** — overriding transactional emails without touching theme files
  or losing the change on the next update.
- **Notification routing** — sending one event to email, Slack or a webhook with
  per-recipient rules.

## Shaping it

The question we keep going back and forth on is log retention defaults: long
enough to be useful in an argument with a customer, short enough not to become
a liability. If you have a view, tell us.

[Join the waitlist](/contact/?product=simplifysmtp) or read
[the product page](/product/simplifysmtp/).
