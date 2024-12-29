---

author:
  display_name: Daniel Gressmann
  email: dmgressmann@gmail.com
  first_name: Daniel
  last_name: Gressmann
  login: dmgress
categories:
- Software development
date: 2009-10-14 16:46:03+00:00
meta:
  _edit_last: '6246633'
parent_id: '0'
password: ''
permalink: /2009/10/14/benefits-of-running-your-own-test-database/
published: true
status: publish
tags:
- continuous integration
- postgresql
- testing
- work environment
title: Benefits of running your own test database
type: post
---


Setting up your own work environment proper and suiting your needs is an important and often undervalued part of software development. One of the things is to consider where and how to test the code. In big teams you have to conform to the standards or come up with a common understanding. I happen to have more freedom in this aspect, which made me change from using the "everything works on my pc" idea to the "keep everything centralized" one and then to the current one, a mix of both.

It has been only recently that I got it the way I wanted, more about that in another post. In the current configuration there is a production database, central test database that conforms with the latest changes in the version control system and a local test instance which has any changes which have not been committed yet. The main driver being that among others the continuous integration (CI) uses the central test database for testing and I want to continue development without breaking tests run by the CI server.

The advantages of my new configuration are:

* the CI server can run its test without interference by developers
* developers can their test without outside interference
* speed, database access is less of a bottleneck

The disadvantages are:

1. developers need their own test database to prevent interference
2. 1. the developer must update his test database schema with the latest changes from the central test database schema
   2. the developer must update the central test database's schema, if necessary
3. unrealistic performance expectations

Disadvantage 1 isn't that hard to fix. For disadvantages 2.1 and 2.2 the solution is to restrict the number of developers on code that interacts with the database through a persistence subproject. And the last disadvantage might exist on several levels. The test database's server might have different performance from the production server, which will certain differ between clients.

In conclusion I think I made my world a little better through these improvements. Another night with happy dreams ahead of me.

