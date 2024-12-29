---

author:
  display_name: Daniel Gressmann
  email: dmgressmann@gmail.com
  first_name: Daniel
  last_name: Gressmann
  login: dmgress
categories:
- Software development
date: 2013-11-21 18:28:32+00:00
meta:
  _edit_last: '6246633'
  _publicize_done_external: a:1:{s:7:"twitter";a:1:{i:89917968;b:1;}}
  _wpas_done_129558: '1'
  publicize_twitter_url: http://t.co/Rmdnh6RnYL
  publicize_twitter_user: 123579D
parent_id: '0'
password: ''
permalink: /2013/11/21/vagrant-up-fails-to-mount-linked-directory/
published: true
status: publish
tags:
- devops
- vagrant
- virtualbox
title: Vagrant up fails to mount linked directory
type: post
---


There are times where a system update breaks your system. Perhaps some configuration gets overwritten or something that seems unrelated suddenly breaks. In this case my vagrant setup broke, the linked /vagrant directory couldn't be mounted anymore. After some searching on Google I found [this issue](https://github.com/mitchellh/vagrant/issues/1657) on GitHub. The [comment from lenciel](https://github.com/mitchellh/vagrant/issues/1657#issuecomment-20589841) gave the solution.

> This is usually a result of the guest’s package manager upgrading the kernel without rebuilding the VirtualBox Guest Additions. Ran `sudo /etc/init.d/vboxadd setup` on the guest solved this problem for me.

What this command does is first remove and then install the kernel modules of VirtualBox. First I ran the command and then I ran the `mount -a` command which fixed my problem. It turns out the virtual machine had some kernel updates, but the VirtualBox Guest Additions weren't updated afterwards.

Remembering to run the command isn't something I like doing, hence this blog post which will serve as an external memory. Luckily there is a vagrant plugin ([vagrant-vbguest](https://github.com/dotless-de/vagrant-vbguest)) that helps in making sure the guest additions are in sync with your host's VirtualBox version. It can also be used to reinstall the guest additions to the virtual machine. Perhaps it's still necessary to mount the linked directories again but `vagrant vbguest` and `mount -a` are certainly easier to remember.

