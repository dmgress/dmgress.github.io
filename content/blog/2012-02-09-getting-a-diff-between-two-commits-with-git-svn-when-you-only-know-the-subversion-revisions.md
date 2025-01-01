---
author:
  display_name: Daniel Gressmann
  email: dmgressmann@gmail.com
  first_name: Daniel
  last_name: Gressmann
  login: dmgress
categories:
  - Software development
date: 2012-02-09 13:39:33+00:00
meta:
  _edit_last: "6246633"
  _wpas_done_twitter: "1"
  publicize_results: a:1:{s:7:"twitter";a:1:{i:89917968;a:2:{s:7:"user_id";s:7:"123579D";s:7:"post_id";s:18:"167588461786824706";}}}
parent_id: "0"
password: ""
permalink: /2012/02/09/getting-a-diff-between-two-commits-with-git-svn-when-you-only-know-the-subversion-revisions/
published: true
status: publish
tags: []
title:
  Getting a diff between two commits with git-svn when you only know the subversion
  revisions
type: post
---

Given you have the need for git and prefer to use it as your personal SCM for everything, but some projects will not switch from Subversion just because of you. Then how would you get a diff for a file when you only know the subversion revision numbers?

The current version of git installed on my laptop is 1.7.5.4. So far I was unable to find a way for git-svn to give me what I need, although I did find some useful information. At least useful is the fact that

```bash
log --show-commit -r <rev> --oneline | awk '{print $3}'
```

Will show the git commit for revision <rev>.

Knowing this, that led to me writing this small script, which will get you a diff between two commits of which you only know the subversion revisions.

```bash
#!/bin/sh

r2hash () {
	git svn log --show-commit -r $1 --oneline | awk '{print $3}'
}

git diff `r2hash $1` `r2hash $2` -- $3
```
