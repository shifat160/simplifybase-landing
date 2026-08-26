---
title: A reorder point is not a minimum stock level
description: >-
  Treating a fixed minimum as a reorder point is the commonest inventory
  mistake we see. Only one of the two accounts for supplier lead time.
pubDate: 2026-07-28
tags: [inventory, forecasting, woocommerce]
product: simplifystock
---

Almost every store we look at has a minimum stock level set somewhere. Usually
a round number — 10, 20, 50 — chosen once, by someone who has since left, and
never revisited.

A minimum stock level answers: *how low am I comfortable going?*

A reorder point answers: *at what level must I order so that stock arrives
before I run out?*

Those are not the same question, and the gap between them is where stockouts
live.

## The thing a minimum cannot know

Consider two products that both sell 5 units a day.

- **Product A** comes from a supplier three days away.
- **Product B** comes from a supplier six weeks away.

Set both to a minimum of 20 units and Product A is fine — you will order at 20,
sell 15 while you wait, and take delivery with 5 to spare. Product B is a
disaster: you will order at 20, sell 210 units' worth of demand over the six
weeks, and be out of stock for a month and a half.

The minimum did not fail because the number was wrong. It failed because a
single number cannot encode lead time, and lead time is the variable that
matters most.

## What a reorder point actually contains

```
reorder point = demand rate × lead time  +  safety stock
```

The first term is what you expect to sell while waiting for the delivery. For
Product B that is 5 × 42 = 210 units. Your reorder point is at least 210,
whatever your comfort level says.

The second term is the buffer for being wrong. It is not a fixed percentage —
it scales with how *variable* that product's demand actually is. Two products
selling the same average can need very different buffers:

- A steady seller doing 5 a day, every day, needs almost nothing.
- An erratic one averaging 5 a day but ranging from 0 to 30 needs a lot.

A fixed minimum treats those identically. That is why it is simultaneously too
high for your steady products — tying up capital you did not need to spend —
and too low for your erratic ones.

## Why this gets worse as you grow

With 30 products, someone holds all of this in their head and the fixed
minimums are quietly overridden by judgement. With 300, nobody does. The
minimums stop being a starting point and become the whole policy, and you start
absorbing stockouts as a cost of doing business rather than as something with a
cause.

The failure is invisible in the numbers you look at. Revenue does not have a
line for the order that was never placed because the product was out of stock.

## What to do about it

You do not need software to fix this. You need three numbers per product: the
demand rate, the lead time, and some measure of how variable demand is. If you
have those in a spreadsheet, the formula above will already put you far ahead of
a fixed minimum.

What software buys you is not the formula — it is keeping all three numbers
current across a catalogue where they change every week, and noticing when the
lead time your supplier promised has quietly diverged from the one they
actually deliver.

That second one is worth more than it sounds. In most stores we look at, the
configured lead time and the observed lead time differ by enough to explain
most of the stockouts on their own.

---

SimplifyStock calculates reorder points per product from your own order history.
[See how it works](/product/simplifystock/docs/how-forecasting-works/).
