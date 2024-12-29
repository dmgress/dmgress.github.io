---

author:
  display_name: Daniel Gressmann
  email: dmgressmann@gmail.com
  first_name: Daniel
  last_name: Gressmann
  login: dmgress
categories:
- Software development
date: 2011-10-25 14:10:32+00:00
meta:
  _edit_last: '6246633'
  _wpas_done_twitter: '1'
parent_id: '0'
password: ''
permalink: /2011/10/25/git-ting-my-branches-up-to-date/
published: true
status: publish
tags:
- git
- work environment
title: Git-ting my branches up to date
type: post
---


Once upon a time a developer created a huge number, as far as more than five is considered huge, of feature branches; each of them based on a master branch and there wasn't any significance to the actual timestamps of commits. "Soon", he vowed, "... soon, I shall integrate all features! Soon but not today." So he created a short script to update all branches to the latest and greatest of the master branch, adding some color for his own pleasure and gracefully failing the merges in case of any errors. The following piece of code was the result.

[sourcecode language="bash"]

#!/bin/sh

# Lets define some nice colours

txtbld=$(tput bold)

txtrst=$(tput sgr0)

txtred=$(tput setaf 1)

txtwht=$(tput setaf 7)

txtblu=$(tput setaf 4)

# maybe I want a list of all failed updates

fails=""

git for-each-ref 'refs/heads/\*' | \

while read rev type ref; do

branch=$(expr "$ref" : 'refs/heads/\(.\*\)' )

revs=$(git rev-list $rev..master)

if [ -n "$revs" ]; then

# Ok, so this branch isnt up to date, mention it

echo -e "${txtbld}$branch needs update${txtrst}"

git rebase master $branch

if [ -d "`git rev-parse --git-dir`/rebase-apply" ]; then

git rebase --abort # fail gracefully, so basically abort and mention it

echo -e "${txtred}rebase aborted for branch ${txtblu}${txtbld}$branch${txtrst}"

fails="$fails $branch"

fi

fi

done

[/sourcecode]

After months this turned out to be a very useful script. It saved him from tediously updating each feature branch he had and he never forgot to update them all.

