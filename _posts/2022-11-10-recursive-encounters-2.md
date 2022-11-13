---
layout: post
title:  Recursive Dice Roller
date: 2022-11-11 16:59:09-05:00
share: true
---
**Odds of confirmation per check**
<input id = "odds" type="number" min = "1" value="1" size="3"> in <input id = "sides" type="number" min = "1" value="6" size="3">  
_Max rolls:_ <input id = "max" type="number" min = "1" max="100" value="100" size="3">
<button onclick="roll()">Check</button> <span id="log"></span>
<script>
let log = document.getElementById("log");
let odds = document.getElementById("odds"),
sides = document.getElementById("sides"),
max = document.getElementById("max");
function prnt (s) {log.innerHTML = s;}
function test (o = 1, s = 6, m = 100, i = 1) {
let r = false;
r = (((Math.random() * s) < o) && i) || ((++i <= m) && test(o,s,m,i));
return r;
}
function roll(o=odds.value, s = sides.value, m = max.value) {
let check = test(o,s,m);
if (check) {
prnt(`Confirmed on roll ${check}.`);
} else prnt(`Could not confirm after ${m} rolls.`);
};</script>

## What is this?
This is a sequel to the [Recursive Encounter Calculator](https://todistantlands.github.io/2019/06/17/the-recursive-encounter-calculator-for.html).

Basically I realized that the Encounter Calculator method works great if you're rolling physical dice -- you use the percentage to determine whether an outcome is confirmed at all, and then a second roll to determine when.

But say you just need to roll a bunch of dice until you get a result. This will do that (up to a maximum of 100 rolls), and then tell you how many rolls it took.

That's all! Enjoy!