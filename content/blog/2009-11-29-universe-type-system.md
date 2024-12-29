---

author:
  display_name: Daniel Gressmann
  email: dmgressmann@gmail.com
  first_name: Daniel
  last_name: Gressmann
  login: dmgress
categories:
- Software development
date: 2009-11-29 21:30:41+00:00
meta:
  _edit_last: '6246633'
  _wpas_done_twitter: '1'
parent_id: '0'
password: ''
permalink: /2009/11/29/universe-type-system/
published: true
status: publish
tags:
- academic
- programming
title: Universe type system
type: post
---


It is no fun when life throws you a boring day, so what's a programmer to do but seek new knowledge? My choice was to look at this thing called [Scala](http://www.scala-lang.org) and of course I browsed through the site.  That's when I came across the [universe type system](http://www.pm.inf.ethz.ch/research/universes). It's some kind of object hierarchy system with a few simple rules. Reading the paper is easier on the dark and dull days of Autumn, since they are written by academics and therefore usually dull. I haven't taken time to read it all, these are just my conclusions for now.

In the Universe type system everything has one owner or no owner at all. The one object with no master is, obviously, the root and a unique entity in the universe. The owner of an object is the only thing that can change it. This means that if you're not the owner you can see the value but not change it directly. This seems to solve the problem of exposing the internals. Aside from that it provides some security  in making sure that objects won't change unexpectedly.

I like the simple principle from the Universe type system, only the owner can change properties of his... well properties. It's very pleasant to know that a certain object is the only one modifying properties of another and no other can. Too often I see source code, among which mine, that seems to violate the open-closed principle. This type system goes a bit further, but in a way you could say it's a heavier enforcement of that principle without need for the developer to think about it. Everything that lessens the effort to keep your code from unexpected behavior makes you more efficient. Something I like to be very much.

