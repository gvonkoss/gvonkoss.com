---
layout: layouts/base.njk
title: 'CSS | The Cascade: Specificity'
description: 'This post covers how specificity works in CSS, and some of its unusual behaviour'
date: 2017-12-13
tags: ['post', 'css', 'specificity']
glossary: 'components/css-glossary.njk'
text: true
details: true
---
<span id="top"></span>
Specificity is a wonderfully powerful, wildly frustrating and weirdly mystical mechanism in the CSS-sphere. With simpler applications and pages that have few elements in the markup, declaring styling can be relatively straight forward. But as the number of elements, classes and ids begins to grow, when you begin including stylistic libraries (or maybe even start working with Sass and its `&` syntax), specificity can begin to get slightly confusing.

For starters, specificity is applied to a _ruleset_ through a _selector_. There is a wide range of selectors, which I'll dive into more deeply another time, but for now we'll be referring to three of them as we use them in CSS-namely an element (e.g. `<div></div>` ), a `.some-class` (defined in markup a `class="some-class"`) and `#some-id` (defined in markup as `id="some-id"`).

Specificity is frequently explained as a point system, where an `element` is worth 1, a `.class` worth 10, and an `#id` worth 100[*](#*).

According to that point system, the weight of specificity is placed on selectors based on an ascending value:
<script src="https://gist.github.com/gvonkoss/75cfb447a12d446b36db7072832666cb.js"></script>

Up to here, all well and good. This is a really useful way of understanding how specificity gets determined by your selectors. The higher the total of the selector combinations, the more specific your ruleset and that is how particular styling gets chosen over others. Theoretically, you could link together as many selectors as you can be bothered to type out (as long as they exist in your markup), in order to be precise about the styling you want to apply to a particular element, and to be certain that that is the style that will be applied.

But! This logic implies that if you have enough `element`s in a selector, that selector will trump the specificity of a selector that is just a single `.class`.

Let's assume we have 11 nested `<div></div>`s in our markup, and we decided (for the sake of curiosity because I can't think of a real life application of this) write the following CSS.

```
div div div div div div div div div div div div {
  height: 100px;
  width: 100px;
  background: firebrick;
}
```

This will certainly apply those styles to that last `div`. But what if our last `div` had a class called `.special-class`, and our CSS file looked like this:

```
.special-class {
  background: rebeccapurple;
}

div div div div div div div div div div div div {
  height: 100px;
  width: 100px;
  background: firebrick;
}
```

You've got 11 `div`s there, so if each `div` is worth 1 and `.special-class` is worth 10, according to the math in the table above, you would expect the specificity of the 11 `div`s to be greater than the single `.special-class`.
But, it isn't.

Suspicious? Me too. Here's the code on Codepen. 
Cycle through the HTML & the CSS tabs, and then check out the result 🤯. 

<p class="codepen" data-height="571" data-theme-id="dark" data-default-tab="html" data-user="gvonkoss" data-slug-hash="ppvRBL" style="height: 571px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Specificity">
  <span>See the Pen <a href="https://codepen.io/gvonkoss/pen/ppvRBL/">
  Specificity</a> by Gabrielle (<a href="https://codepen.io/gvonkoss">@gvonkoss</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

It turns out that specificity is determined by those points being concatenated. What this means, is that the total values are strung up sequentially, they aren’t _added_ up. So if we drew our point-system table differently, the running total would look more like this:

<script src="https://gist.github.com/gvonkoss/86fa14c0d050002a18e8cc13422884ef.js"></script>

So when we create a selector with 11 `div`s , our total specificity points are going to be `[0,0,11]`. And a single class is `[0,10,0]`, which is still more than that (because of its position in the scorecard, if you will).

Concatenation used to have a sort of memory limit. When that was reached, it would ‘spill over’ and surpass the specificity of the technically more valuable selector. But that was at the point where the specificity points rose above 255, so our scorecard of an element-only selector would have to look like `[0,0,256]` for it to be greater than `[0,1,0]`. Currently, this still seems to be the case for the Firefox and Internet Explorer rendering engines, but that memory limit is significantly higher with Chrome, Safari and Opera.

Nonetheless, as more styles and components start popping up on your page, and your selectors start looking far less simple than the examples above, it’s quite helpful to understand what the specificity _specifics_ (ha) are, and how they play into the cascade.

Go forth and style! 💪

<span id="*">*</span>_In this explanation, we’ve excluded inline styles and `!important`, which have higher specificity. An inline style `<div style="background: hotpink"></div>` is generally valued at ‘1000’, but a declaration with the `!important` attribute can be used to trump that. However, the ultimate override is an `!important` inside an inline style, but that’s a dangerous approach. Let’s try and avoid `!important` in general._

_[I’ve talked about importance, too](/writing/css-cascade-importance), if you want to know more. [↑](#top)._

#### Resources

- [Keegan Street Specificity Calculator](https://specificity.keegan.st)
- [MDN Specificity Docs](https://developer.mozilla.org/en-US/docs/Learn/CSS/Introduction_to_CSS/Cascade_and_inheritance)