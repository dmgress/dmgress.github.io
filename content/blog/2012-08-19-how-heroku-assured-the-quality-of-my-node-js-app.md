---
author:
  display_name: Daniel Gressmann
  email: dmgressmann@gmail.com
  first_name: Daniel
  last_name: Gressmann
  login: dmgress
categories:
  - Software development
date: 2012-08-19 10:25:14+00:00
meta:
  _edit_last: "6246633"
  _wpas_done_twitter: "1"
parent_id: "0"
password: ""
permalink: /2012/08/19/how-heroku-assured-the-quality-of-my-node-js-app/
published: true
status: publish
tags:
  - code quality
  - heroku
  - node.js
title: How Heroku assured the quality of my Node.js app
type: post
---

A while ago I was working on a proof-of-concept Node.JS app that involved using MongoDB's spatial indexing and ran into issues with the Node.JS Package Manager (NPM). Perhaps it was a coincidence, but this is apparently where using a PaaS (Platform as a Service) like Heroku actually is useful in assuring the project you push is working as expected.

While developing my app i was quite content that everything worked smoothly. Once I pushed a commit to Heroku the system would prepare, build and deploy my app in an automated build process. Output of all the steps displayed in the console, so if there was an error up to deployment I would see it instantly. I kept pushing updates and everything worked fine. Fine until suddenly one of my transitive dependencies got updated and crashed the application due to an incompatible API.

## The discovery

At first I didn't notice. There were no smoke tests or any other sort of testing for that matter, since it was just a proof of concept hacked together. In the app I happen to use mongoskin, a light wrapper arround the native node.js mongodb client, and it's dependency set to 0.9.9-7 or higher. In my case NPM downloaded version 1.0.0, which just happened to work correctly. Then Friday the 12th version 1.0.1 came out, I wasn't aware of this but during that weekend I did make some changes and pushed them to my heroku repositories.

That Sunday i actually sent a link to a coworker to review the styling of my app and give me some comments on the layout or user experience. He tried it and reported to me on Monday morning that the application had crashed. Quickly I switched on the Heroku maintenance mode. A very nice out of the box feature for which I wish to find a way to display a personal maintenance mode page, but this is perhaps nice content for another blog.

I ran my project and couldn't find any errors. So I executed `heroku logs` to get the logs of my app on Heroku. Then I started analyzing the logs, which looked somewhat like this:

```bash

2012-05-14T08:56:36+00:00 app[web.1]: node.js:201
2012-05-14T08:56:36+00:00 app[web.1]: throw e; // process.nextTick error, or 'error' event on first tick
2012-05-14T08:56:36+00:00 app[web.1]: ^
2012-05-14T08:56:36+00:00 app[web.1]: TypeError: Cannot read property '\_serverState' of undefined
2012-05-14T08:56:36+00:00 app[web.1]: at Db.state (/app/node\_modules/mongoskin/node\_modules/mongodb/lib/mongodb/db.js:1810:31)
2012-05-14T08:56:36+00:00 app[web.1]: at Object. (/app/node\_modules/mongoskin/lib/mongoskin/db.js:199:28)
2012-05-14T08:56:36+00:00 app[web.1]: at Module.\_compile (module.js:441:26)
2012-05-14T08:56:36+00:00 app[web.1]: at Module.load (module.js:348:31)
2012-05-14T08:56:36+00:00 app[web.1]: at Object..js (module.js:459:10)
2012-05-14T08:56:36+00:00 app[web.1]: at Function.\_load (module.js:308:12)
2012-05-14T08:56:36+00:00 app[web.1]: at Module.require (module.js:354:17)
2012-05-14T08:56:36+00:00 app[web.1]: at require (module.js:370:17)
2012-05-14T08:56:36+00:00 app[web.1]: at Object. (/app/node\_modules/mongoskin/lib/mongoskin/server.js:5:14)
2012-05-14T08:56:36+00:00 app[web.1]: at Module.\_compile (module.js:441:26)
```

Like any confused programmer, I did an internet search on any of the error, but I wound up finding nothing to help me at all.

## The hunt

I tried several things to fix the problem and pushed the changes, but kept getting the same errors. After a while I actually started paying attention to all the action happening when I did a push to Heroku. Then I saw it, Heroku always does a fresh install of the entire app environment! I saved the output the push gave me and started analyzing my environment.

The first thing i noticed was that only new dependencies would be downloaded locally. By using `npm list` I got an overview of all the dependencies and their versions. A second revelation came, the production environment picked up version 1.0.1. This wouldn't have been a problem if it wasn't going to break mongoskin, but it did brake. Badly...

## Ironing out the flaw

Then i did what Heroku does, a fresh install of all the dependencies. This time I got the errors from the production environment as well. Both happy and sad I started to search for a solution. This came down to working my way back through the versions of mongoskin and mongodb until I got at a point where everything "just works" again. Actually that sounds like a long process, all I did was go through the commits of both dependencies until the time the problem seemed to happen.

Version 0.3.5 of mongoskin was not something I wanted to change, since it might result in rewriting the app. Using `npm info` and examining the `package.json` file I quickly realized that somewhere between versions 0.9.9-7 and 1.0.1 of the mongo node.js driver an API change occurred and perhaps mongoskin was too dependent on code it shouldn't rely on. When I forced NPM to use 1.0.0 from the driver, the project worked again.

## A bit better

Explicitly stating the versions to use transitive dependencies can easily snow ball into adding more information about your transitive dependencies than the actual dependencies you intend to use. Thankfully there is the `npm shrinkwrap` command. What this does is make a full listing of all the versions of every module in use by your project, as it is available at that time, in your working copy. Just like you expect when you [shrinkwrap](http://www.thefreedictionary.com/shrinkwrap) a product. It creates a new file (`npm-shrinkwrap.json`) in your project which will enforce the correct versions.

What I learned is that dependency management in (server-side) javascript still has a lot pitfalls if you are not in full control. With Heroku you can at least be sure that badly configured applications will break, instead of running on pure luck.
