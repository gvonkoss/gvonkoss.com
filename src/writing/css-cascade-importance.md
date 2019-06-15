---
layout: layouts/base.njk
title: 'CSS | The Cascade: Importance'
description: "Here we'll take an in-depth look at how importance affects our stylesheets"
date: 2017-11-08
tags: ['post', 'css', 'importance']
glossary: 'components/css-glossary.njk'
text: true
details: true
---
<span id="top"></span>
In the world of CSS, the cascade looks like so:
>Importance > Specificity > Source Order

At its core, importance determines which _declaration block_ the stylesheet will display. The basic hierarchy of importance is determined by the _selectors_ we use in our _rulesets_. From most to least important (at a basic level), we have:

`#id` > `.class` > `element`

The value of each selector is predefined by its natural specificity which also establishes the level of importance that a given selector has. And that final importance outranks the given specificity.

...

Translation: specificity and importance — despite their respective places in the hierarchy of the cascade — work hand in hand. As a _ruleset_ becomes more specific (as the selector rises in specificity), it also becomes more important. In which case it is fair to wonder why they are even separate concepts.

Turns out, there’s more to this importance business than meets the eye!

Importance involves some manoeuvring on behalf of the browser. For starters, browsers (user-agents, if you please), have to conform to a minimum number of stylistic features, defined by the CSS specs¹. Examples of that are `<div>` tags, `<a>` tags, `<p>` tags, &c.

Meaning that at the base level, browsers have to be able to display that minimum amount of styling in their default stylesheet. This means that any plain HTML file opened straight in the browser will have some styling. Blue underline for links, bold for `<strong>` elements, italics for `<em>` elements, Times New Roman (or similar) as the font family for the `<body>`, so on.

In addition to the default stylesheet, the document’s author (the developer) has sent the browser a stylesheet, and the user of the browser may have ported in their own stylesheet, for any number of reasons (a primary one being accessibility).

So how does importance get decided when there is more than one stylesheet to contend with‽ And what if there are `!important` declarations in different stylesheets?

Well, it looks a little like this:

<script src="https://gist.github.com/gvonkoss/a2deddd54b303aa344fd93305330eaef.js"></script>

The browser will parse the stylesheets in the order shown, and then reevaluate the chosen styles based on the `!important` declaration it finds in those stylesheets, and a combination of all of that (plus the bits mentioned in previous paragraphs) make up the cascade’s importance.

`!important` is a bit of an odd character. It’s not a selector, but it _is_ assigned to a declaration. Very broadly put, `!important` makes the declaration it is assigned to override all others, regardless of specificity. This causes certain declarations to be broken out of the cascade’s natural flow, and may interfere with settings that a user may need to change. It can really complicate the debugging process. **Let’s steer clear of it where possible**.

We can observe its behaviour — along with some specificity action — in this li’l gif:

//giifffff

Powerful stuff. Remember to use sparingly.

After importance and specificity have been settled, the source order comes into play. It describes the literal order that the code has been written in, so if we've got something like –

```
div {
  background: papayawhip;
}
```
```
div {
  background: lemonchiffon;
}
```

– the background colour of our div will be `lemonchiffon`, because the file containing our styles is read top to bottom, and applies them accordingly. Which means that, in addition to how we have chosen to specify our rulesets, the order in which each ruleset is written will also affect how its styles will be displayed.

There are many factors at play while the outcome of our styling is being processed, but the more we know about it, the better equipped we will be to handle increasingly complex stylesheets.

Go forth and style 💪