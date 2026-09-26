---
title: Search Insights
description: >-
  What customers search your store for, what returns nothing, and how to read
  zero-result terms as a buying signal rather than a search bug.
group: Guides
order: 48
lastUpdated: 2026-09-06
---

**SimplifyStock → Search Insights** records what people type into your store's
search box. It is the only screen here that tells you about demand you are not
already meeting — everything else measures products you stock.

Tracking is **off until you turn it on**. Until then the screen says *Search
tracking is disabled* and offers **Go to Settings**.

## Turning it on

1. Go to **SimplifyStock → Settings**.
2. Tick **Track on-site product searches locally**.
3. **Save changes**.

Data starts collecting from that moment; it cannot be backfilled, so the sooner
it is on the sooner the reports are worth reading. Give it a couple of weeks
before drawing conclusions from anything except the most-searched terms.

## What is recorded, and where it goes

Searches are stored in your own WordPress database. Nothing is sent anywhere.

When anonymisation is enabled, network addresses are stored only as a one-way,
site-specific hash — it cannot be reversed, and the same visitor on another
site does not produce the same hash.

Even so, search tracking is the one feature here that observes visitor
behaviour, so **describe it in your site's privacy notice**. See
[Data and privacy](/product/simplifystock/docs/data-and-privacy/).

## The four counters

Choose a **Time Period** — Last 7, 30 or 90 days — and the counters follow it:

| Counter | What it counts |
| --- | --- |
| Total Searches | Every search in the period |
| Unique Terms | Distinct phrases searched |
| Zero Results | Searches that returned nothing |
| Conversion Rate | Share of searches that led to a purchase |

**Zero Results is the number to watch.** A high Total Searches with a high Zero
Results means people are arriving with intent and leaving without buying — the
most expensive kind of visitor you can have.

## The four reports

### Top Terms

Most frequently searched terms. Useful for navigation and merchandising: if a
term is in the top ten and is not a category or a filter on your store, it
should be.

### Searches With No Results

Terms that returned no products. Read each one as a question rather than a
fault:

- **You do not stock it.** That is a buying signal — see Product Gaps below.
- **You stock it under a different name.** The customer's word is the right one;
  add it to the product title or as a synonym.
- **It is a typo, or not a product at all.** Ignore it.

### Product Gaps

Searches for products you do not stock, marked **New Product** — the terms with
demand behind them and nothing to sell. This is the report that pays for the
feature: a ranked list of things customers have asked you for, in their own
words, that you could add to the catalogue.

### Low Stock Demand

Products customers are searching for that are low or out of stock. These are
restock signals with urgency attached: demand you can measure, against stock you
do not have.

Cross-check this against
[Restock Suggestions](/product/simplifystock/docs/dashboard/) on the Dashboard.
A product appearing in both is the clearest reorder case the plugin can make —
the forecast says it is running out, and customers are actively looking for it.

## Search Trends

Daily search volume over time. Use it to separate a genuine rise in interest
from a single busy day, and to see whether a term you acted on kept its volume
afterwards.

## Retention

Search data is kept for 90 days by default, and the period is configurable under
[Settings](/product/simplifystock/docs/configuration/). Reports never look
further back than what is retained, so if you want year-on-year comparisons,
raise it before the first year passes rather than after.

## Where to go next

- [Settings](/product/simplifystock/docs/configuration/) — the tracking
  toggle, anonymisation and retention.
- [Data and privacy](/product/simplifystock/docs/data-and-privacy/) — what is
  stored and what to put in your privacy notice.
