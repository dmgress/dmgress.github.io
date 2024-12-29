---

author:
  display_name: Daniel Gressmann
  email: dmgressmann@gmail.com
  first_name: Daniel
  last_name: Gressmann
  login: dmgress
categories:
- Software development
date: 2009-10-12 16:45:59+00:00
excerpt: A little while ago one of my colleagues was testing a p articular web application
  for a day. One of the most remarkable comments he made was that for some reason
  lots of pages were pink.
meta:
  _edit_last: '6246633'
parent_id: '0'
password: ''
permalink: /2009/10/12/what-the-hell-pink/
published: true
status: publish
tags:
- color
- colour
- web design
title: What the hell!?! Pink?
type: post
---


A little while ago one of my colleagues was testing a particular web application for a day. His intend was to report about the user experience and flaws in functionality, security and other areas.

He started by skipping the manual and just poking around in the application randomly. Try adding some data here; draw up a report there; "what does this button do?" This way of testing is best done by an outsider or another programmer who is unfamiliar with the software and aware of the basic knowledge of what the application should do.

One of the most remarkable comments he made was that for some reason lots of pages were pink. Not whole pages, just certain areas. When he took screen shots the pages looked like intended. When displayed on the screen they did not. After some back and forth communication it turned out his screen's colour depth was 16 bits. Development of the web application happened using a screen set to 32 bits of colour depth, so clearly this issue wasn't noticed before. The grayish colour outside the 16 bit spectrum which resulted in some sort of pinkish colour being displayed on screen. What's displayed on screen isn't necessarily correctly conveyed in a screen shot, so that's why it went unnoticed unless you have your screen set to 16 bits or lower. Increasing colour depth to 24 bits did the trick, it made the pages look like intended. Nevertheless, it's possible some people still use 16 bits and might get an unpleasant surprise once those happy pink colours turn out being a dull gray.

As an experiment I set my color depth to 16 bit for a day. Clearly a colour depth of at least 24 bit is common throughout the world. Most of the gray colours used in the websites I visit turned to pink. Could there be people in the world that would wonder where all the pink went once they come across a screen with higher colour depth? As far as I know 24 bit colour depth is the least you can expect from a workstation pc, but I am not fully aware of the configurations some of the clients might run.

