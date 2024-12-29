---

author:
  display_name: Daniel Gressmann
  email: dmgressmann@gmail.com
  first_name: Daniel
  last_name: Gressmann
  login: dmgress
categories:
- Software development
date: 2013-04-03 17:21:42+00:00
meta:
  _edit_last: '6246633'
  _publicize_done_external: a:1:{s:7:"twitter";a:1:{i:89917968;b:1;}}
  _wpas_done_129558: '1'
  publicize_twitter_user: 123579D
parent_id: '0'
password: ''
permalink: /2013/04/03/remotely-accessing-activemq-java-management-extensions-on-a-shielded-server/
published: true
status: publish
tags:
- activemq
- firewalls
- java
- jmx
- monitoring
- rmi
title: Remotely accessing ActiveMQ Java Management Extensions on a shielded server
type: post
---


In this post I will describe how I solved my problem with setting up Java Management Extensions ([JMX](http://java.sun.com/products/JavaManagement/ "Official JMX site")) on a remote ActiveMQ instance that wasn't aware of its WAN IP address and had at least one firewall to pass through. This was not just a simple matter of remotely accessing the JMX server, it got a bit more complex.

The assignment was to set up a way to set up remote monitoring on a few servers. Externally, that's over the internet, this server is known by the following fully qualified domain names (FQDN):

* web.example-server.net - a publicly known name with full access for anybody
* server-01.example-server.net - a name made up to identify the server in the network architecture, probably restricted access

Both direct to a single external IP. Then through some network configuration I am not going to make myself familiar with, traffic ends up at a server located behind a firewall. This server has an IP address in the private range, for instance `172.16.12.125`, and the loop back address `127.0.0.1`.

Remotely I am not able to connect to IP address `172.16.12.125` which is fine, so I will just connect to the external IP address instead. It works well for SSH and HTTP/HTTPS traffic, because both route properly through the outer firewall to the server.

*Side note: It's smarter to connect to the FQDN, in case of changes in IP addresses. On failure flush your DNS entries before a retry.*

In order to configure JMX with remote method invocation (RMI) to work through a firewall, you need to open certain port numbers. Then you force both the MBean server as well as the RMI server to use those ports. As a security measure you put a password on the JMX server, because you don't want some random person toying around with the settings.

Reading a few blogs shows what works best for ActiveMQ:

> ... add the broker configuration, the management context, and the rmi hostname configuration [and port forward the RMI server and JMX connector ports] -- [CodeDependents - Monitoring ActiveMQ Using JMX Over SSH](http://codedependents.com/2009/05/23/monitoring-activemq-using-jmx-over-ssh/ "Monitoring ActiveMQ Using JMX Over SSH")

In most cases that will work just fine, and if you still have trouble getting it right than the blog post ["Exposing ActiveMQ for remote monitoring through JMX"](http://kyrill007.livejournal.com/3517.html "Exposing ActiveMQ for remote monitoring through JMX") might help. In this case this didn't work. The external IP address is the only way to access the server over the internet, but it isn't tied to the server's network interface.

Without a valid IP address to bind to the server won't start. The IP address must be linked to a network interface accessible by ActiveMQ, so internal addresses would do but those are not accessible from the outside.

## The solution

My solution is to use `server-01.example-server.net` as an alias for 127.0.0.1 in the `/etc/hosts` file of the server (or an equivalent location if you're not using Linux). Any request for DNS resolution of that FQDN made by this server will loop back to itself. By using the loopback address this solution is safe from changes of the internal IP address. The next step was using the FQDN as the `rmi.host` parameter in ActiveMQ's start script.

With the proper ports opened and routing to the RMI and JMX ports, you can monitor ActiveMQ remotely on a network that's shielded behind a firewall and some other network configuration.

