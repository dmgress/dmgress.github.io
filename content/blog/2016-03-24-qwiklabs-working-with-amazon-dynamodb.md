---

author:
  display_name: Daniel Gressmann
  email: dmgressmann@gmail.com
  first_name: Daniel
  last_name: Gressmann
  login: dmgress
categories:
- Software development
date: 2016-03-24 23:20:00+00:00
meta:
  _publicize_done_13005036: '1'
  _publicize_done_13005054: '1'
  _publicize_done_160958: '1'
  _publicize_done_external: a:1:{s:7:"twitter";a:1:{i:129558;s:53:"https://twitter.com/123579D/status/713128259601321984";}}
  _publicize_job_id: '21099013189'
  _rest_api_client_id: '-1'
  _rest_api_published: '1'
  _wpas_done_129558: '1'
  _wpas_done_12987707: '1'
  _wpas_done_12987722: '1'
  _wpcom_is_markdown: '1'
  publicize_google_plus_url: https://plus.google.com/100987439898173204349/posts/bubeujbnjem
  publicize_linkedin_url: https://www.linkedin.com/updates?discuss=&scope=413146285&stype=M&topic=6118893962737569792&type=U&a=b1ZF
  publicize_twitter_user: 123579D
parent_id: '0'
password: ''
permalink: /2016/03/24/qwiklabs-working-with-amazon-dynamodb/
published: true
status: publish
tags:
- aws
- dynamodb
- nodejs
- qwiklabs
- socket.io
title: QwikLABS' Working with Amazon DynamoDB
type: post
---


Until the 31th of March 2016 all labs on [QwikLABS](https://qwiklabs.com/) are free, a nice opportunity to see how many badges I can get. My first try was the *"Working with Amazon DynamoDB"* course.

[DynamoDB](https://aws.amazon.com/dynamodb/) is a NoSQL database service that abstracts most of the setup, maintenance and scaling behind a less complex interface. Although there is a huge amount of [documentation](http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/), there are few ways to get a good understanding of what DynamoDB can do without starting a project.

The first professional experience I had with DynamoDB turned out to be a false start. The project wanted to use too many hip new technologies, but designed tables the way that is best practice for relational databases. It wasn't possible to run DynamoDB locally, which is something that can frustrate programmers who are uncomfortable using AWS or simply don't have enough permissions.

At the same time I wasn't sure how to configure [read and write capacity](http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.ProvisionedThroughput.html) on tables. These parameters are used by the service to provision and scale the capacity of the underlying technology.

These issues led to a decision that NoSQL wasn't something to do for that project at that time.

## The basics

The lab guides you through the basics of creating and using DynamoDB tables with the AWS console. You create tables through a wizard and learn a little about the configuration options. Then you do some queries and move on to the example.

## The example

In this lab you're using credentials from a Twitter account on an application which streams tweets to a web interface and also tries to store them in several DynamoDB tables. The rate of tweets streaming through is determined by a slider. Sliding right means tweets come in faster. Tweets that failed to be stored in DynamoDB are shown slightly transparent.

To avoid messing with my existing account, I made the effort of creating a new account specifically for this lab. The instructions mentioned at the beginning you might want to set up the account and API access before being with the AWS part, but the instructions on how to do that are very late into the lab.

The example is pretty straight forward. The steps are easy to follow. The majority of the duration should have been in getting all resources set up and waiting for Twitter API access. In my case, I got stuck trying to get the application to work.

After logging in with my Twitter account, the screen stayed blank. No tweets were coming in, but they should start shortly after the authentication with Twitter. It took me several minutes and working through the troubleshooting guide to discover an error in the application itself.

The single page app is backed by [Socket.io](http://socket.io/) running on Node. When the user logs in with his Twitter account the API credentials are used to poll for new tweets. [Redis](http://redis.io/) is used to keep track of the different users and their web sockets. When a new tweet arrives, the Node app will store it in DynamoDB and also emit the data over the web socket by calling the publish method on the publisher variable with a user id and text version of a JSON object.

For the purpose of the lab there is no need to support multiple users. This meant that hacking the Node app into a one-user solution was enough. All I needed to do is honor the publish contract and emit to the web socket of the last user signing in. In code it looks something like this:

[code lang=javascript]

var publisher = {}

socket.on("i am", function ( ... ) {

publisher.publish = function (userid, message) {

socket.emit( ... , JSON.parse(message));

}

}

[/code]

Once I fixed the Node app I could play around with the slider to see the effect of changing write and read capacity on DynamoDB.

Having a constant stream of data showed me that scaling reads and writes is a process you need to tweak and monitor. Although scaling goes quite fast, at higher speeds many of the write requests couldn't be fully processed. Depending on the application there can be a big difference in provisioning read and write capacity. In this application the write capacity was crucial, each tweet triggered a write.

---

This lab helped me understand the basics of creating and querying DynamoDB tables. The example showed the importance and impact of configuring the read and write capacity at table level to match (predicted or measured) requests to it. With capacity too low on writes (or reads) the application won't be able to handle load properly. On the other hand, provisioning too much capacity might just be a waste of cycles and coins.

