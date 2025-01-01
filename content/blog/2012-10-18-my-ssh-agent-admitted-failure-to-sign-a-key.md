---

author:
  display_name: Daniel Gressmann
  email: dmgressmann@gmail.com
  first_name: Daniel
  last_name: Gressmann
  login: dmgress
categories:
- Software development
date: 2012-10-18 12:17:19+00:00
meta:
  _edit_last: '6246633'
  _publicize_done_external: a:1:{s:7:"twitter";a:1:{i:89917968;b:1;}}
  _wpas_done_129558: '1'
  publicize_twitter_user: 123579D
parent_id: '0'
password: ''
permalink: /2012/10/18/my-ssh-agent-admitted-failure-to-sign-a-key/
published: true
status: publish
tags:
- git
- ssh
title: My ssh agent admitted failure to sign a key!
type: post
---


This morning I decided to push some commits to a git repository at Assembla.com. Unfortunately I forgot my pass phrase for the specific key I generated and ended up with:

```
Agent admitted failure to sign using the key.
Permission denied (publickey,keyboard-interactive).
fatal: The remote end hung up unexpectedly
```

Which is fine, so I just create a new ssh key using the same name and it should work... Sadly it didn't because some ssh-agent remembered that I don't remember the pass phrase, so it reported that to the server. Then the assembla server drops the connection. After some searching on the internet I learned that you should use `ssh-add [filename]` to add the key to my ssh key chain. That worked fine and I can push my commits again.

