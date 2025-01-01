---

author:
  display_name: Daniel Gressmann
  email: dmgressmann@gmail.com
  first_name: Daniel
  last_name: Gressmann
  login: dmgress
categories:
- M202 July 2014
date: 2014-07-30 08:21:24+00:00
meta:
  _edit_last: '6246633'
  _publicize_done_external: a:1:{s:7:"twitter";a:1:{i:89917968;b:1;}}
  _wpas_done_129558: '1'
  geo_public: '0'
  publicize_twitter_url: http://t.co/ZpZErEWacD
  publicize_twitter_user: 123579D
parent_id: '0'
password: ''
permalink: /2014/07/30/catching-up-to-week-1-videos/
published: true
status: publish
tags:
- m202
- mongodb
title: Catching up to week 1 videos
type: post
---


During week one I had trouble with a homework assignment. This meant I skipped some videos. Normally the last section you visited is where you resume, but in the rush to get the homework done I switched around too much to know where to continue with the videos. Turns out I was at the part where configuration of alerts is covered.

The videos were based on the blog post "[Five MMS Monitoring Alerts to Keep Your MongoDB Deployment on Track](http://www.mongodb.com/blog/post/five-mms-monitoring-alerts-keep-your-mongodb-deployment-track "Five MMS Monitoring Alerts to Keep Your MongoDB Deployment on Track")". The blog post is focused on the Mongo Monitoring Service, but in concept are easily applicable to just about any alert configuration. You should figure out what is "normal" behaviour, determine a warning threshold and know what condition should escalate the alert. The goal is to achieve a notification setup without noise (alerts for situations that are normal), but still able to warn on incidents and sirens going off when disaster strikes.

After the videos about alerts there was some information on properly setting up a managable overview of your configuration in MMS. For instance, you might want to split up all your servers into groups to maintain a sane overview and avoid pagination of servers. There was also advice on setting up users to those groups. This was al very useful information which I will hopefully remember once I get to the large numbers that require this kind of separation.

The final videos were about the usage of `netstat`, `iostat` and the mongo `db.serverStatus()` output. MMS is a great tool to get an overall view of your system's health and monitor it in a decent way. There is one drawback, the data is collected/sent once a minute (or less frequent in case of network problems). So during troubleshooting you need to rely on tools and information locally available on the system.

I knew a little about netstat, but never went through all the parameters. Knowing that in the case of MongoDB it's useful to keep an eye on the aggregate statistics `netstat -s` generates and in particular which fields to monitor was an excellent guide to knowing how to see network problems in progress.

Honestly I was not aware of the `iostat` command and it's possibilities. Not having any formal training in Linux administration, this command and the information giving in the video showed me that it's in general a useful troubleshooting aid for systems with bad performance. What it can do is show statistics on I/O performance which might help locate bottlenecks and see what is causing the bad performance.

The last video was about the uses of the `db.serverStatus()` command. MMS actually uses this command for lots of information, which led me to read the [serverStatus](http://docs.mongodb.org/manual/reference/command/serverStatus/ "serverStatus page") page in the MongoDB documentation. There I found what I was looking for, the explanation to the metrics I didn't quite understand during this first week's overview of MMS. I'm glad I didn't skip any of these videos.

By watching these videos I had fully completed the first week of M202 and was ready for the second week.

