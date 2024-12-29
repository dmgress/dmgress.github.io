---

author:
  display_name: Daniel Gressmann
  email: dmgressmann@gmail.com
  first_name: Daniel
  last_name: Gressmann
  login: dmgress
categories:
- Software development
date: 2010-11-18 13:38:07+00:00
meta:
  _edit_last: '6246633'
  _wp_old_slug: ''
  _wpas_done_twitter: '1'
parent_id: '0'
password: ''
permalink: /2010/11/18/gimme-everything-you-got-slashes/
published: true
status: publish
tags:
- annoyance
- java
- xpath
title: Gimme everything you got slashes
type: post
---


Today I discovered a new bug. No, not the insect kind. It was a programming error. To be more specific, one that only showed up after fixing another one. Somehow using '//whatever' as an XPath query on any node in a Document will give you all the nodes that match from the Document root. That's because you said '//', it means 'I-don't-know-where-it-is-but-I-want-it'.

Normally I would invoke it on the root of a XML document, so no problem there. But processing a collection of parts in a collection of parts will cause some problems. If you already know about the structure , then there is no need for the gimme-everything-you-got slashes!

