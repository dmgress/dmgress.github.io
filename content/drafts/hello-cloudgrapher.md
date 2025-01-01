---

author:
  display_name: Daniel Gressmann
  email: dmgressmann@gmail.com
  first_name: Daniel
  last_name: Gressmann
  login: dmgress
categories:
- Software development
date: null
meta:
  _edit_last: '6246633'
  _wpcom_is_markdown: '1'
  geo_public: '0'
parent_id: '0'
password: ''
published: false
tags: []
title: Hello CloudGrapher
type: post
---


In a professional capacity I have been using Amazon Web Services (AWS) for several years as an alternative to an on-site datacenter. One of it's services is AWS CloudFormation, an infrastructure orchestration service. Infrastructure is described in a JSON document, called a template, which allows you to easily replicate it for different environments in any of the locations AWS services from.

After a while the documents grew bigger and more complex. When your team is still in a learning process it can also be difficult to understand the big picture. So that's what CloudGrapher is for, creating the big picture from AWS CloudFormation templates.

I started the personal project in February both out of a need to understand random CloudFormation templates, have some way of visualizing it during presentations and last to exercise my programming skills.

JavaScript was the obvious choice for my first implementation, because I needed a programming language that I could easily understand and wouldn't waste time on compiling binaries. Once I get in all the features I want, I will consider experimenting and implementing with other programming languages.

I chose to make a single page application with a graphing area and an editor for quick fixes. The design needs work, but at least the functionality covers the original reasons to start the project.

The currently implemented features are:

* Dropping a template onto the graphing area or editor to load it
* Drawing a graph of the resources and their links once the JSON is valid *(**NOTE:** Valid JSON is not a valid CloudFormation template, but a valid CloudFormation template is valid JSON)*
* Saving the contents of the editor in a pretty printed format
* Exporting the graph to a PNG
* Loading a template from an URL
* Using a query parameter to start CloudGrapher with a remote template

On [insert date] AWS released their own graphic editor for CloudFormation templates. Theirs doesn't seem to go as deep with visualizing links between resources and in general I prefer my own creation for use in presentations. Although it doesn't comply to the AWS standards for displaying infrastructure with their iconography.

