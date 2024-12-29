---

author:
  display_name: Daniel Gressmann
  email: dmgressmann@gmail.com
  first_name: Daniel
  last_name: Gressmann
  login: dmgress
categories:
- Software development
date: 2010-04-28 11:30:51+00:00
excerpt: Today I solved the annoyance of dependency on Java Commons Logging in java
  libraries my projects depend on. The solution shortens the exclusions horror in
  POM files.
meta:
  _edit_last: '6246633'
  _wpas_done_twitter: '1'
parent_id: '0'
password: ''
permalink: /2010/04/28/globally-excluding-commons-logging/
published: true
status: publish
tags:
- annoyance
- java
- JCL
- maven
- maven2
title: Globally excluding commons-logging
type: post
---


Today I solved a long-lasting annoyance of mine, that lots of Java libraries in the Maven2 repository have a (transitive) dependency on Java Commons Logging (JCL). I prefer to use SLF4J instead, using JCL over SLF4J as implementation of the JCL API. Up till now, or actually 5 minutes ago, I had to do the RSI inducing task of using exclusions on every dependency which transitively depends on JCL. Not entirely error-proof, since forgetting to exclude it on even one dependency can horribly... mess up your day :-)

Making yet another probably fruitless attempt at finding a solution to this annoyance, I happened to stumble upon a blog [post](http://jlorenzen.blogspot.com/2009/06/maven-global-excludes.html "Maven Global Excludes") of James Lorenzen. The solution there in part deals with my real problem, not wanting to use a transitive dependency at all but ignoring the bugger. The proposed, and working, solution is to use a scope of provided in your main POM which will root out the problem in sub projects as well. As mentioned, no more of that particular dependency in your distribution or whatever.

This is only part the problem in the case of JCL; I want it entirely out of the picture in my classpath. Here knowing the (dis)advantage of order in a classpath comes in. Of all classes with the same name in the same package on the classpath the classloader will load only the first one, ignoring the others. So how do we get the JCL stuff at the end of our classpath in Maven? Simply by adding it as the last "dependency" in your POM. Yes, not much to it actually.

This revelation really shortens my future POM files, especially in cases where my application consists of frameworks which are split up in many components all depending on that same logging library.

