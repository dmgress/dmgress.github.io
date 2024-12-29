---

author:
  display_name: Daniel Gressmann
  email: dmgressmann@gmail.com
  first_name: Daniel
  last_name: Gressmann
  login: dmgress
categories:
- Software development
date: 2015-01-19 12:00:00+00:00
meta:
  _publicize_done_external: a:1:{s:7:"twitter";a:1:{i:89917968;b:1;}}
  _publicize_job_id: '21078703511'
  _rest_api_client_id: '-1'
  _rest_api_published: '1'
  _wpas_done_129558: '1'
  _wpas_skip_facebook: '1'
  _wpas_skip_google_plus: '1'
  _wpas_skip_linkedin: '1'
  _wpas_skip_path: '1'
  _wpas_skip_tumblr: '1'
  _wpcom_is_markdown: '1'
  publicize_twitter_url: http://t.co/mSaUizUcUf
  publicize_twitter_user: 123579D
parent_id: '0'
password: ''
permalink: /2015/01/19/ecs-deep-dive-webinar/
published: true
status: publish
tags:
- amazon
- aws
- container
- devops
- docker
- ecs
title: ECS deep dive webinar
type: post
---


On Wednesday 14th I attended the online webinar "Amazon EC2 Container Service Deep Dive" by Deepak Singh. Due to technical difficulties there were some outages. Over all I got a pretty good image of container technology that seems to get more popular but I didn't know much about. It's either going to be big or fade away, I'm not sure yet which.

***Update:** The webinar is now [available for viewing](https://connect.awswebcasts.com/p59n405xep5/ "Amazon EC2 Container Service Deep Dive").*

[EC2 Container Service](https://aws.amazon.com/ecs/ "EC2 Container Service") (ECS) was announced in November during AWS Re:Invent and at the moment it's invite only. Getting an invite just means mentioning you want to try and you're in. What I understood from the webinar is that it might be rolled out to production environments soon. Knowing Amazon it's probably going in stages, starting in North America followed by other sites later on.

The webinar started with a short anecdote about the reasons why the service was made available. Amazon Web Services got lots of requests related to container technology, in particular Docker, and usage on AWS of the services. As requests kept coming in, it became obvious some sort of service with AWS API and integration might be a good product.

The ECS is made up of clusters of EC2 instances running ECS tasks divided across the cluster by a scheduler. In order to participate in an ECS cluster the instance needs to run within a VPC and should have [ECS agent](https://github.com/aws/amazon-ecs-agent "Amazon EC2 Container Service Agent") and [Docker](https://www.docker.com/ "Docker website") 1.3.3 or up installed. Of course the easiest option is using one of the Amazon AMIs for your instances. Once the agent connects to ECS you'll be able to interact via API or AWS Web Console.

The concept for running something on ECS is described in an ECS task. The task describes the sources and resources needed to run an application and will allow ECS to deploy the container on the cluster. The location in the cluster is determined by a scheduler. ECS' default round-robin scheduler is fine, but it's also possible to use custom schedulers. For instance, if you're familiar with Mesos or Chronos to manage your containers then you can use those schedulers in ECS as well.

During the demo Deepak showed how to get WordPress running on ECS using Mesosphere's [Marathon](https://mesosphere.github.io/marathon/ "Marathon A cluster-wide init and control system for services") and [Chronos](https://github.com/mesos/chronos "Fault tolerant job scheduler for Mesos") to do scheduling. It was a simple example, yet showed some of the basics of ECS.

At the moment, and primarily because it's still in it's early stages, there is not much integration with other services on the AWS platform. This will likely change, leading to for instance CloudFormation or OpsWorks putting down the fundamentals of application infrastructure and CodeDeploy pushing updated software to the Elastic Container Service.

After going through the webinar I noticed it's pretty much what I might have set up, although more smart minds would have thought about the edge cases. In general it's a service on top of instances you control yourself in a VPC. It's main feature on top of what seems to be regular use of containers is the integration with AWS platform.

I didn't have any questions for Q&A, but most of the other questions seemed to be about when it's available and what it supports. It's still in an early stage, so it's likely lots of new features will be added based on requests. For more details you can read the [product details](https://aws.amazon.com/ecs/details/ "ECS Product details") page.

