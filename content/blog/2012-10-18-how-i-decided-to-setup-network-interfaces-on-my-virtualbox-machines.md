---

author:
  display_name: Daniel Gressmann
  email: dmgressmann@gmail.com
  first_name: Daniel
  last_name: Gressmann
  login: dmgress
categories:
- Software development
date: 2012-10-18 18:55:39+00:00
meta:
  _edit_last: '6246633'
  _publicize_done_external: a:1:{s:7:"twitter";a:1:{i:89917968;b:1;}}
  _wpas_done_129558: '1'
  publicize_twitter_user: 123579D
parent_id: '0'
password: ''
permalink: /2012/10/18/how-i-decided-to-setup-network-interfaces-on-my-virtualbox-machines/
published: true
status: publish
tags:
- network configuration
- network interface
- virtualbox
title: How I decided to setup network interfaces on my virtualbox machines
type: post
---


Sometimes you want a throw away server or perhaps even a bunch of throw away servers. Instead of using an actual machine or spending money on machines at cloud providers, you will probably tinker with virtual machines. A perfectly free solution is VirtualBox, now an Oracle product. If I need to practice installs or even orchestrating an update of a full cluster, I will create new clones of my template Ubuntu 32-bit server and I'm ready to experiment.

My preference is not to bother others and avoid being bothered by them. Which is why I prefer to configure my boxes with two interfaces. One is only accessible from my laptop, the other uses NAT so I can update or download straight from LAN or the internet. The reason why I decided on two interfaces is that I can easily switch off the NAT one and have a static IP to communicate with the virtual machine.

I didn't notice it before, but when you've got two network interfaces the routing might actually give you problems. With both interfaces switched on, then the wrong one might be used to attempt access to off-laptop systems. After a while I decided to find a permanent solution, since rebooting started to cut into my productivity.

## Researching options

So what happens? The two interfaces boot up, Ubuntu creates routes for each to their respective networks and then, I guess, picks one of the devices as default route to all other possible destinations. After some browsing on StackOverflow it turns out you can set the routes explicitly. This was known before, but I didn't know it yet. In hindsight it seems obvious enough. All I had to do is force the device without static IP as the default.

The first thing you can do is to execute `netstat -r` to see all the routes and `ip route list` to see a list of how stuff is routed and which device handles the traffic. The entry to change in the list from `ip route list` is the one saying `default`. You can use `sudo ip route change default to dev eth1 via A.B.C.D` where `eth1` would be the NAT device and `A.B.C.D` the router on that network. The response might say a file or directory is missing. I didn't bother to figure out the details, but it means you should add the entry for `default` so you replace `change` with `add`. Even if the `ip route list` already listed a `default` it still doesn't have to mean anything. Although, if you use `ip route del default` apparently deletes all entries for default, which will guarantee internet access is impossible.

## Fixing the problem

After doing the research I decided to take the following steps:

1. Remove **all** entries for default
2. Add a new entry for the correct network interface

Given the network interface open to the internet is `eth1` and it's gateway is at `192.168.4.254`, then the following commands will work.

```
sudo ip route del default
sudo ip route add default to dev eth1 via 192.168.4.254
```
## Scripting it

Obviously it would be nice if this sort of thing would happen every time the dynamically configured network interface got it's DHCP updates. The trick is to write a script that will parse the configuration `dhclient` updates, extract the last gateway and apply the previous commands. I didn't make time to work this out yet. Another reason is that most of the time I use my virtual boxes on a single network where the gateway doesn't change.

What I did do is create a script at `/etc/network/if-up.d/Z99fix_routes` with the previous commands. The name of the script will make sure it's the last one called, so any configuration other scripts might do is overridden.

