---
author:
  display_name: Daniel Gressmann
  email: dmgressmann@gmail.com
  first_name: Daniel
  last_name: Gressmann
  login: dmgress
categories:
  - Software development
date: 2011-05-09 14:54:51+00:00
meta:
  _edit_last: "6246633"
  _wpas_done_twitter: "1"
  _wpas_skip_facebook: "1"
parent_id: "0"
password: ""
permalink: /2011/05/09/how-to-add-a-log-rotator-to-multiple-hudsonjenkins-jobs/
published: true
status: publish
tags:
  - continuous integration
  - groovy
  - jenkins
title: How to add a log rotator to multiple Hudson/Jenkins jobs
type: post
---

In my professional work environment I have used Hudson/Jenkins as a continuous integration tool and at the same time automate some tasks. Jenkins CI has become a valued part of the development track and over time others got to appreciate its usefulness.

Sadly, the more you use it, then more a need arises to maintain it. One aspect is the amount of logging and information you want to keep from past builds. This isn't just build logs, but also artifacts and reports generated in the past. Jenkins has a feature to discard old builds. This feature is enabled on some jobs, but there was no guideline on the number of builds, artifacts or the number of days that logs and artifacts were kept.

So the first thing to do is figure out which projects actually had it enabled and the settings for those projects. Pasting and running the following groovy script into the Jenkins Groovy console did the trick.

```groovy

import hudson.model.*

def jobs = Hudson.instance.items

jobs.findAll{ it.logRotator && !it.disabled }.each {
	println it.name;
	if (it.logRotator.daysToKeep >= 0){
		println "\t retains builds for ${it.logRotator.daysToKeep} day(s)"
	}
	if (it.logRotator.numToKeep >= 0){
		println "\t retains ${it.logRotator.numToKeep} build(s)"
	}
	if (it.logRotator.artifactDaysToKeep >= 0){
		println "\t retains artifacts for ${it.logRotator.artifactDaysToKeep} day(s)"
	}
	if (it.logRotator.artifactNumToKeep >= 0){
		println "\t retains artifacts of ${it.logRotator.artifactNumToKeep} builds"
	}
}
```

There is no reason to list disabled jobs, so we will ask if the job has a `logRotator` and is **not** disabled. It's important to know that the log rotator will return `-1` or null for fields that aren't set. The return values varied, but boolean operators in Groovy are null-safe. The result will be a sort of formatted overview of jobs and their settings for the log rotator.

With this overview I can decide what the default settings will be for the log rotator (just picking the longest retention time and the highest number of retained builds) and executed the following script to configure the log rotation of enabled jobs that didn't have one.

```groovy

import hudson.model.*

def jobs = Hudson.instance.items

jobs.findAll{ !it.logRotator && !it.disabled }.each { job ->
	job.logRotator = new hudson.tasks.LogRotator ( 30, 40, 30, 10) // days to keep, num to keep, artifact days to keep, num to keep
	// println "$it.name" edited and changed to statement below
	println "$job.name"
}
```

It took a while to figure out what to change, but programming the change is always more fun than going through the configuration file of each job to check if log rotation is enabled. I don't know how much time I saved, but at least the change was consistent for each job.
