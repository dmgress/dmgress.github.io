---

author:
  display_name: Daniel Gressmann
  email: dmgressmann@gmail.com
  first_name: Daniel
  last_name: Gressmann
  login: dmgress
categories:
- Software development
date: 2011-09-05 12:18:18+00:00
meta:
  _edit_last: '6246633'
  _wpas_done_twitter: '1'
parent_id: '0'
password: ''
permalink: /2011/09/05/getting-tomcat-heap-memory-to-a-sufficient-level/
published: true
status: publish
tags:
- eclipse
- memory heap
- tomcat
title: Getting Tomcat heap memory to a sufficient level
type: post
---


Just a small post this time. I ran into the "insufficient Permgen space memory" problem for the nth time again. In essence the Tomcat instance I'm running from inside of Eclipse gets too little space allocated for me to use tools like JRebel or even just the basic reloading of classes that happens when you save your edits in Eclipse.

The solution is simple, you should "just" change the allocated memory for Tomcat instances being started from inside Eclipse. Of course you will need enough memory for this, but that shouldn't really pose a problem for any modern developer workstation today.

The settings are at `Window > Preferences > Java > Installed JREs`. Here you will edit the JRE settings and put `"-Xms384m -Xmx768m -XX:MaxPermSize=768m"` as the default VM arguments for running a Tomcat instance. Why 768 Mb? Coz I can afford it and the other guy had it as his setting for the project he started. I guess if I conform to that level, then it will run without too much problems for me as well.

