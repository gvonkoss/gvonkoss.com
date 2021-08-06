---
layout: layouts/post.njk
title: 'ARIA Live Regions | aria-live, aria-atomic & aria-relevant'
description: "Breaking down live regions"
date: 2021-08-06
tags: ['post', 'aria', 'accessibility', 'a11y']
glossary: 'components/a11y-glossary.njk'
---

In the big, beaufitul, messy world that is the web we have the ability to do some incredible things. We can add, remove or update content without having to reload a whole page, making our **visual** experience of the web smooth and intuitive. We *see* a search result list getting updated, an animated notification or a change in colour somewhere on our screen.

However, screen readers don't *see* the page in the same way. In fact, they have a tendency to put the page together in a way that is different to a _visual_ perception of it.

Once a page is loaded, the AT will process the content in a linear format—it will read the HTML document from top to bottom and file recognisable elements away in a virtual buffer, or list, which it will then read from as it reacts to different keystrokes. This is where semantic HTML and ARIA attributes shine, because they help define these elements and inform the structure of this virtual list. (There's more to it, but broad strokes will do for now.)

So why are we talking about how a screen reader composes a page?

## Live Region and its attributes

A live region is a formal description of what we mentioned earlier; a section, element or widget on a web page that can be dynamically updated without a full page reload: it is a *region* on the page where the changes are coming to you *live*.

>**Note**: The changes we refer to are content changes. These are a result of an external event, which includes, but is not exclusive to, user interaction. Live regions should not be assigned to containers with interactive elements.

The existence of live regions makes a lot of modern web development possible, but doesn't translate quite as easily into the AT's virtual buffer. The main reason being that the screen reader has already proccessed the document into the list it reads from. It is focussed on one particular item on that list and isn't aware of changes that can happen on other parts of the page.

Fortunately, there are a couple of ways to declare a live region for a screen reader to pay attention to; One of them is setting `aria-live`, and another is by applying a specific `role`, which creates an *implicit* live region (there will be a follow up post about [roles associated with live regions](role=alert).

## `aria-live`
This ARIA attribute tells the screen reader to keep an eye on the element it is assigned to, because it is a candidate for change. In order for the AT to register an element as a live region when it is buffering the page, this attribute needs to be present *before* the page is rendered, as part of the markup. The AT won't recognise the live region if the attribute is added dynamically with JavaScript. 

> ⚠️ Adding `aria-live` to the `<body>` element might be a tempting idea, but it would make every change on the page one that the screen reader will try to communicate, which is going to create confusion and an unnecessary wave of announcements (imagine a single page app changing its main content on click—the screen reader is going to want to tell you aaaaaaall about it).

A screen reader will only read out the content of the live region when that content actually changes. Note that that's all it will do, read out the change. It won't change the screen reader's focus point, nor should we try to manipulate it to.

So we denote a live region by adding the `aria-live` attribute to specific sections which will have content changes that are relevant to the user, and that do **not** have interactive elements.

The `aria-live` attribute accepts a 'politeness setting', and there are three options: `off`, `polite`, and `assertive`. The default is `off`.

In a nutshell, `polite` and `assertive` dictate *when* the changed content will be communicated to the user through the screen reader. 

To get a better idea of this, imagine you are navigating a page with your keyboard. Every keystroke will take you to a different element, and the screen reader will read that element out to you—it builds up a queue of announcements, which it will be continuously read out until you stop navigating and it catches up with you (which actually happens a lot faster than we tend to imagine it does).

The `polite` setting will add the notification of the changed content to that queue, and the change be announced when it is its turn in line. The regions that should receive this setting are the ones that have important, but not crucial, information.

The `assertive` setting is downright rude. When its content changes, it will interrupt whatever the screen reader has queued up to read out, and *potentially* erase the queue entirely. For that reason, it should be used sparsely, in situations where critical and time-sensitive information needs the users *immediate* attention.

Finally, if the attribute is  `off`, it removes the indication that the element is a live region. Generally, we don't need to set this option.

### More live region attributes

There are two more attributes that are companion attributes to `aria-live`; namely
`aria-atomic` and `aria-relevant`, both of which are optional to add—meaning `aria-live` will work even if you don't set the other attributes explicitly.

#### `aria-atomic`

This attribute decides whether the content of the live region should be read out as a whole every time there is a change (`aria-atomic='true'`), or whether only the change should be read out (`aria-atomic='false'`). The default is `false`.

Consider a common pattern with text fields—you have a character limit. It is represented in a visual format, and—because we're accessibility-conscious—registered as a `polite` live region. 

```
<input type=text/>
<p aria-live="polite">Characters available: <span>250</span></p>
```

As you type, the number of characters available to you decreases, and because `aria-atomic` is `false` by default (it is there, you just can't see it!), the screen reader will only announce the count, e.g. `249`, `248`, `247` —forgoing context entirely.

When we change `aria-atomic` to `true`, the screen reader will start reading out `Characters available: 249`, `Characters available: 248`. This could be overkill, but screen readers are _fast_. The AT will read out every letter that's typed, and will pepper the typing with live region notifications in any free interval it finds, so extra context can't hurt!

#### `aria-relevant`

In a simple sense, these tokens are semantic descriptions of the behaviour of this attribute:

The `additions` token tells the AT to watch for element nodes that are added to the live region in question and the `text` token watches for changed or added text.

The `removals` should be used in the rarer cases where content (text or element node) being removed from a live region is particularly relevant to a user (e.g. an item being removed from a list based on the users interaction). By relation, that makes the `all` token one to use sparingly, too, only because it includes `removals`.



References:
- [`aria-live` spec](https://www.w3.org/TR/wai-aria-1.1/#aria-live)
- [`aria-atomic` spec](https://www.w3.org/TR/wai-aria-1.1/#aria-atomic)
- [`aria-relevant` spec](https://www.w3.org/TR/wai-aria-1.1/#aria-relevant)
- [Live Region definition (WAI-ARIA)](https://www.w3.org/TR/wai-aria-1.1/#dfn-live-region)
- [Live Region definition (MDN)](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions)
- [Accessibility support for `aria-live`](https://a11ysupport.io/tech/aria/aria-live_attribute)