---

author:
  display_name: Daniel Gressmann
  email: dmgressmann@gmail.com
  first_name: Daniel
  last_name: Gressmann
  login: dmgress
categories:
- Software development
date: 2016-03-26 12:30:33+00:00
meta:
  _publicize_done_13005036: '1'
  _publicize_done_13005054: '1'
  _publicize_done_160958: '1'
  _publicize_done_external: a:1:{s:7:"twitter";a:1:{i:129558;s:53:"https://twitter.com/123579D/status/713689599575330816";}}
  _publicize_job_id: '21145804342'
  _rest_api_client_id: '-1'
  _rest_api_published: '1'
  _wpas_done_129558: '1'
  _wpas_done_12987707: '1'
  _wpas_done_12987722: '1'
  _wpcom_is_markdown: '1'
  publicize_google_plus_url: https://plus.google.com/100987439898173204349/posts/Nfk4NskLiHt
  publicize_linkedin_url: https://www.linkedin.com/updates?discuss=&scope=413146285&stype=M&topic=6119455308587823104&type=U&a=T2OE
  publicize_twitter_user: 123579D
parent_id: '0'
password: ''
permalink: /2016/03/26/trampoline-into-aws/
published: true
status: publish
tags:
- aws
- qwiklabs
title: Trampoline into AWS
type: post
---


Amazon Web Services started up 10 years ago with the Simple Storage Service. To celebrate this QwikLABS' on-demand computer labs were free for a whole month. At the time of writing there's less than a week left, but still it might be useful to publish a curated list of labs.

Currently there are 92 labs available. There are several ways to explore them and the most appealing one is to only do the labs in a quest that will help you achieve a certain badge. That's right, you can show off that you know how to click through a step-by-step online document instruction! You can even share your board of badges. It seems all this really means is that there's a public URL people can view.

Another approach might be to work through levels. Labs come in three levels that hint and difficulty, time and complexity. In brief they are:

[Introductory level](https://qwiklabs.com/tags/Introductory/level) - A short introduction into one service. Often it's clicking through the same steps as the introductory video of a service, but with links and some theory to read through. Most labs at this level are free.

[Fundamental level](https://qwiklabs.com/tags/Fundamental/level) - Usually have the title *"Working with ..."* these labs jump a little higher. Instead of just clicking around in the AWS console, you might have to use command line tools or some API. These will be provided, but you will need to login via SSH or Remote Desktop.

[Expert level](https://qwiklabs.com/tags/expert/level) - Expect a slightly more complex lab with a combination of services. Often what you'll learn here can be used as a reference point for real-world implementations. Consider this to usually be at the security level of AWS' Developer guides and not production ready at all.

So those are the two main approaches you might take, quests or working through levels. Personally neither are appealing to me, although I did use quests to try and get lots of badges. That's why I decided to list a few labs based on categories. I've already distributed this selection internally at my place of employment, but it might be useful for more general distribution.

## Security

Amazon Web Services offers security and data protection in the cloud and can prove it.

For instance, it complies to the following sample of laws and regulations:

* [U.S. Health Insurance Portability and Accountability Act (HIPAA)](https://aws.amazon.com/compliance/hipaa-compliance/)
* [EU Data Protection Directive](https://aws.amazon.com/compliance/eu-data-protection/)
* [CS Mark [Japan]](http://jcispa.jasa.jp/cloud_security/)

The infrastructure has certain certifications, examples include:

* [Payment Card Industry (PCI) DSS Level 1](https://aws.amazon.com/compliance/pci-dss-level-1-faqs/)
* [ISO 27001 (Security Management Standard)](https://aws.amazon.com/compliance/iso-27001-faqs/)
* [ISO 27018 (Personal Data Protection)](https://aws.amazon.com/compliance/iso-27018-faqs/)

A [full list of compliance](https://aws.amazon.com/compliance/) is available, there's just too much to list.However, depending on which service you're using, you are still responsible for compliance and security of your application level, and perhaps even closer to the metal. The next few labs cover what I consider to be relevant topics on access and integration with Amazon Web Services.

* [Introduction to AWS Identity and Access Management (IAM)](https://qwiklabs.com/focuses/preview/1978)
* [Performing a Basic Audit of your AWS Environment](https://qwiklabs.com/focuses/preview/2215)
* [Auditing Your Security with AWS Trusted Advisor](https://qwiklabs.com/focuses/preview/2081)
* [Microsoft ADFS and AWS IAM](https://qwiklabs.com/focuses/preview/2174)

## Technologies

Amazon offers lots of services. I made a selection of the ones I consider interesting building blocks for cloud-based applications.

* [Working with Amazon DynamoDB](https://qwiklabs.com/focuses/preview/2074)
* [Working with AWS CodeCommit](https://qwiklabs.com/focuses/preview/2181)
* [Introduction to AWS Lambda](https://qwiklabs.com/focuses/preview/1982)
* [Deploy a Java EE Application on AWS Elastic Beanstalk Using Docker Containers](https://qwiklabs.com/focuses/preview/2213)
* [Event-driven Programming with Amazon DynamoDB Streams and AWS Lambda](https://qwiklabs.com/focuses/preview/2111)
* [Working with Amazon Redshift](https://qwiklabs.com/focuses/preview/2076)

## Apps

Going through the individual services in labs get you a basic feeling of how they work, but it is more exciting to see them work together. The following labs are examples of combining different services in to functional applications.

* [Building a Media Sharing Website - Part 1: Media Upload](https://qwiklabs.com/focuses/preview/2058)
* [Building a Media Sharing Website - Part 2: Transcoding](https://qwiklabs.com/focuses/preview/2059)
* [Deploying an HTML5 and WebSocket Game on AWS](https://qwiklabs.com/focuses/preview/2130)
* [Running a Minecraft Server on AWS](https://qwiklabs.com/focuses/preview/2095)

## DevOps

DevOps, everybody has a definition and if you're great at passing exams you can even become a AWS Certified DevOps person. The following two labs are very devops-ey and great starting points to explore more.

* [Introduction to AWS CodeDeploy](https://qwiklabs.com/focuses/preview/2007)
* [Working with AWS OpsWorks](https://qwiklabs.com/focuses/preview/2078)

Aside from these lists, you could also do the reverse. Documentation at AWS often includes links to labs at QwikLABS.

