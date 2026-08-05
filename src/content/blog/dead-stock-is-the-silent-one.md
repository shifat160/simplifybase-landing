---
title: Dead stock is the silent one
description: >-
  Stockouts get noticed because someone complains. Dead stock just sits there
  earning nothing, and nothing in your reporting is designed to surface it.
pubDate: 2026-06-12
tags: [inventory, cash-flow, woocommerce]
product: simplifystock
---

Ask an operations lead what went wrong last quarter and you will hear about
stockouts. Ask what capital is doing nothing and you will usually get a pause.

Both are inventory failures. Only one of them generates a complaint.

## Why it accumulates

Dead stock has no natural alarm. Nobody emails to say a product is *still in the
warehouse*. It does not appear in a sales report, because its defining property
is the absence of sales. Most stock dashboards sort by units on hand, which
buries it — the dead lines are frequently the ones with modest quantities and
high unit cost, which is the worst combination and the least visible one.

So it grows quietly, and it is discovered during a stock count, at which point
the conversation is about writing it off rather than about selling it.

## Sort by capital, not by cover

The single most useful change is the sort order. Most dead stock views sort by
days of cover, which surfaces the products with the most extreme numbers.
Extreme cover is not the same as expensive.

- 400 units of a £2 accessory with 900 days of cover: **£800 tied up.**
- 6 units of a £480 machine with 200 days of cover: **£2,880 tied up.**

The first looks far worse by cover and matters far less. Sort by units × cost
and the list reorders into something you can act on.

This requires cost price to be set, which is the usual reason it does not
happen. If your catalogue has no cost prices, fixing that is the highest-value
inventory work available to you, and it is data entry rather than software.

## The three causes

Almost all dead stock traces to one of three things, and all three are visible
in the product's own history:

**A safety stock override nobody removed.** Set during a shortage, when holding
extra made sense. The shortage ended; the override did not. The product has been
reordering to an inflated level ever since.

**A minimum order quantity far above real demand.** The supplier ships in
cases of 48; you sell 3 a month. Every order buys sixteen months of cover, and
the reorder logic dutifully places it. This one is not a mistake so much as a
constraint nobody costed.

**A discontinued product that was never marked discontinued.** It stopped being
promoted, it stopped selling, and it kept being ordered because nothing told the
system to stop.

Notice that none of these are forecasting failures. The forecast was fine. The
policy around it was stale.

## Acting, not reporting

The mistake after finding dead stock is producing a report about it. The list is
a set of decisions, one per line:

- **Discount** to recover capital — but record the promotion, or the resulting
  spike gets read as genuine demand and you will reorder into it. We have
  watched a clearance sale cause a restock of the exact product being cleared.
- **Bundle** with a fast mover to move units without a headline discount.
- **Delist** so it stops distorting category-level estimates for new products.
- **Write off** with a reason, and make sure the adjustment is excluded from
  demand history so it does not read as a sale.

## The number worth tracking

One metric, reviewed monthly: **capital in products with cover over your
threshold**, as a percentage of total inventory value.

It is unglamorous, it will be higher than you expect the first time you
calculate it, and watching it move is the only reliable way to know whether any
of the above is working.

---

SimplifyStock's dead stock view sorts by capital tied up and flags which of the
three causes applies where it can tell.
[Read the guide](/product/simplifystock/docs/dead-stock/).
