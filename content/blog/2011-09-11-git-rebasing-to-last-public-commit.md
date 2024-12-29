---

author:
  display_name: Daniel Gressmann
  email: dmgressmann@gmail.com
  first_name: Daniel
  last_name: Gressmann
  login: dmgress
categories:
- Software development
date: 2011-09-11 21:45:13+00:00
meta:
  _edit_last: '6246633'
  _wpas_done_twitter: '1'
  _wpas_skip_fb: '1'
  tagazine-media: a:7:{s:7:"primary";s:0:"";s:6:"images";a:0:{}s:6:"videos";a:0:{}s:11:"image_count";s:1:"0";s:6:"author";s:7:"6246633";s:7:"blog_id";s:7:"6786161";s:9:"mod_stamp";s:19:"2011-09-11
    20:45:13";}
parent_id: '0'
password: ''
permalink: /2011/09/11/git-rebasing-to-last-public-commit/
published: true
status: publish
tags:
- git
- programming
- work environment
title: Git rebasing to last public commit
type: post
---


As part of my workflow I make lots of small commits which I push to a central vcs once I finished a feature or fixed a bug. Often I find the need to re-base some of my commits interactively in git.

One reason is that I tend to forget to add something in a commit, so a fix-up I made afterwards needs to be squashed or placed closer to another commit. Another one is that changing the order of my commits will offer a better or more rational train of thought. And yet another reason is that at times my attention is so scatter I have two or more branches for features, futures or wip/dev. All those branches are based on a local master branch, which in turn is based on the central vcs' master.

Before I used to type/copy/bash reverse-i-search the `git rebase --interactive HEAD~N` command. This could of course be shortened a bit to just `git rebase -i HEAD~N`, but it still left me with the task of figuring out how many commits I want to revise. Just guessing usually got me either to many or too little. Then I grew into the habit of firing up `gitk`, which in my case is an alias for `gitk --all` so I can see all branches, then count by hand how much commits I needed to revise and then use that number.

Although a slight improvement over just guessing it still left an error margin of 3 commits in the worst case. Then I noticed that I usually revise up to a branching point, so using `git rebase -i branch/tag-I-started-to-deviate` is shorter and saves time. For this to work its of course mandatory to keep feature branches short and regularly re-base all branches, including the local master branch, against its parent.

