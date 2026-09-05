---
title: SimplifySearch documentation
sidebarLabel: Introduction
description: Documentation for SimplifySearch, currently in design.
order: 0
lastUpdated: 2026-08-06
---

SimplifySearch is in design. This page exists so the documentation URL is
stable from day one — bookmark it and it will fill in rather than move.

## What it will cover

- **Installation and indexing** — what the first pass reads, how long it takes
  on a large catalogue, and how the old search keeps serving until you switch.
- **The attribute layer** — what is extracted from titles, descriptions,
  categories, tags, variations and images; how variations are handled; and how
  to correct an attribute so the correction sticks.
- **The readability score** — what is missing, on which products, weighted by
  the traffic those products get.
- **Natural-language queries** — how a sentence resolves to attributes, and
  what happens when it cannot.
- **Guided prompts** — turning a vague query into a specific one, and the
  points at which a prompt is offered.
- **Filters and facets** — how they are generated per category, and what you
  can pin, hide or reorder.
- **Merchandising** — pinning, boosting and burying per query or store-wide;
  ranking on margin, on stock cover, or both; and reading the numbers from
  SimplifyStock when it is installed.
- **The query report** — top terms, zero-result terms, terms that return
  results nobody clicks, demand for products you do not stock, and
  search-attributed revenue.
- **Theme integration** — replacing the built-in search box and shop filters
  without touching template files.
- **Data and keys** — what is processed to build the attribute layer, and how
  to run it on your own provider key.

## Shaping it

The question we keep going back and forth on is how much correction a merchant
should have to do before the attribute layer is trustworthy — and how to make
one correction teach the pattern rather than fix a single product.

If you run a WooCommerce store where search is quietly costing you orders, tell
us what people type and what they get.

[Join the waitlist](/contact/?product=simplifysearch) or read
[the product page](/product/simplifysearch/).
