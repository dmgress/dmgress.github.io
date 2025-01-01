---

author:
  display_name: Daniel Gressmann
  email: dmgressmann@gmail.com
  first_name: Daniel
  last_name: Gressmann
  login: dmgress
categories:
- Software development
date: 2009-12-01 12:02:56+00:00
meta:
  _edit_last: '6246633'
  _wpas_done_twitter: '1'
parent_id: '0'
password: ''
permalink: /2009/12/01/stitched-modularized-and-converted/
published: true
status: publish
tags:
- awesome
- git
- stitch
- svn
title: Stitched, modularized and converted
type: post
---


Yesterday I decided to finally follow through on a promise I made to my programming team of one person, me. The promise was to get some of the repositories for sub-projects into one bigger one. It makes sense to have all of them in the same repository because they are so dependent on each other. All of those projects are on GIT repositories,  so the logical choice is to use [git-stitch-repo](http://search.cpan.org/search?query=git+stitch+repo&mode=all) and stitch it up. What that little tool does is zip up (like in zipper) several repositories. Every source repository gets stuffed in a sub directory, so it looks clean and nice as well.

After the stitch I had to rename the tags, since all tags got an uppercase letter appended - A for the first repository I wanted to stitch, B for the second, etc. Then I saw that the history wasn't completely clean. Previously there had been some branches and even a tag that pointed to a deleted branch but still persisted. Checking out that tag and suddenly you're at no branch! Strange... Luckily it was just a throw-away branch, so I threw it away and went through all source repositories, cleaning them up. Stitched them up again, removed all clutter and what was left is a clean history and a neat directory structure. Awesome!

Some people still have to depend on subversion, since there is no easy and safe way to integrate GIT into Eclipse. I tried, but every once in a while stuff gets messed up for strange reason, no joy. So at one point the stitched needs conversion, but first I modularized the Maven projects it contained. Not that hard, so that took only a few Google searches and some trial and error (first time I ever made a modularized Maven project with parent POM). The result, very nice.

Time to convert to subversion. I used a Perl script called [git2svn](http://repo.or.cz/w/git2svn.git) by Love Hörnquist Åstrand. It does the job well, except that it doesn't do tags. I guess doing tags is harder or maybe the script wasn't meant for what I used it for. I will ponder about redoing the convert with a modified script that can add tags or just add tags myself, preferring the former.

