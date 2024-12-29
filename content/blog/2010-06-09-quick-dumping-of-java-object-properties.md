---

author:
  display_name: Daniel Gressmann
  email: dmgressmann@gmail.com
  first_name: Daniel
  last_name: Gressmann
  login: dmgress
categories:
- Software development
date: 2010-06-09 13:55:53+00:00
meta:
  _edit_last: '6246633'
  _wp_old_slug: ''
  _wpas_done_twitter: '1'
parent_id: '0'
password: ''
permalink: /2010/06/09/quick-dumping-of-java-object-properties/
published: true
status: publish
tags:
- datadump
- ddump
- java
- json
- yaml
title: Quick dumping of java object properties
type: post
---


When you are programming in Perl there are some nice modules like DDump and DataDump that allow you to do some inspection on your values. It's useful and probably often used during hacking. Making the transition to Java while still clinging to that way of working might give you some hurdles. For instance, how to get those values. If the toString method is insufficiently implemented to your tastes, but you can't change it, then you either have to write your own code or dig deep in the Java API. Both quite time-consuming.

The solution is to temporarily make use of either the [jYaml](http://jyaml.sourceforge.net/) library or the [java JSON implementation](http://www.json.org/java/) of json.org. The first requires your classes to confirm to the JavaBean specs, which means having a constructor without parameters, setters and getters. The latter just requires an object with getters. In both cases the information you will see is the information the object will expose to the outside, internal state is not available. Should you want internal state then making a dump of the heap seems the only possible option when you are not using an IDE's debugger.

Using jYaml to dump your object is as easy as doing `Yaml.dump(someObject)`. This will get you a String object containing a Yaml structure including line-breaks. For the JSON implementation using new `JSONObject(someObject).toString()` to get a String representation. Using `toString(int)` will give you a formatted JSON structure, with the value of the `int` being the indent width.

