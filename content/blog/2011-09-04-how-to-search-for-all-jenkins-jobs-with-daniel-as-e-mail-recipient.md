---
author:
  display_name: Daniel Gressmann
  email: dmgressmann@gmail.com
  first_name: Daniel
  last_name: Gressmann
  login: dmgress
categories:
  - Software development
date: 2011-09-04 20:01:34+00:00
meta:
  _edit_last: "6246633"
  _wpas_done_twitter: "1"
parent_id: "0"
password: ""
permalink: /2011/09/04/how-to-search-for-all-jenkins-jobs-with-daniel-as-e-mail-recipient/
published: true
status: publish
tags:
  - continuous integration
  - groovy
  - jenkinCI
  - jenkins
title: How to search for all Jenkins jobs with Daniel as e-mail recipient
type: post
---

In a working environment it's not uncommon that some people find new jobs and new people come in to take their places. Ideally this transition goes smoothly, but sometimes details go unnoticed or get skipped completely. One of these details is the changing of email addresses for project members. I admit, it's not a small thing and something you should do right away. In my defence, when you're rushed or too focused on your own job this is apparently something that slips through.

In this case we are talking about the email recipient(s) of a project/job in Jenkins CI when something goes awry. Coincidentally this was only discovered after builds started going red on projects I didn't get notified on, and nobody was fixing it.

The former employee took part in many projects, which meant that an equal quantity of edits would be needed to replace him as recipient in all projects he worked on. Luckily we live in times of automation, which allows us to efficiently and consistently change the old email address to the new one.

To my knowledge a suitable script wasn't available back then, so I needed to write one myself. Creating a script for the first time takes some rewriting and debugging which often exceeds the time of changing all configurations by hand. Nevertheless it is worth to write a script, since the number of projects to check for the old address might get too dull to complete successfully. Another reason, which didn't have any merit at that time, is the possibility to already include the new address during a time of transition.

The first step was to successfully find all projects that have a specific email address among the recipients. It took some puzzling, as I wasn't too familiar with the Groovy Console of Jenkins yet.

```groovy

import hudson.model.*
import hudson.maven.reporters.MavenMailer

Hudson.instance.items.findAll { job ->
	job.metaClass.hasProperty (job, 'reporters') &&
		job.reporters?.findAll{ it instanceof MavenMailer}.any{ reporter ->
			reporter.recipients =~ 'daniel@example.com'
		}
	}.each { job ->
		if (job)
			println "${job?.name} has Daniel as a recipient"
	}
```

The next step was to actually change the recipient to me.

```groovy

import hudson.model.*
import hudson.maven.reporters.MavenMailer

def from = 'oldguy@example.com'
def mine = 'me@example.com'
def mvnmailer = { job -> (job.metaClass.hasProperty (job, 'reporters')) ? job.reporters?.findAll { it instanceof MavenMailer } : [] }

def projects = Hudson.instance.items.findAll { job ->
	job.metaClass.hasProperty (job, 'reporters') &&
		mvnmailer(job).any{ reporter -> reporter.recipients =~ from }
}

println "$projects.size project(s) found"

if (projects?.size() > 0)
	projects.each { job ->
		mvnmailer (job).each {it.recipients = it.recipients.replaceAll(from, mine) }
	job.save() // pretty useless if you change it but you don't save it
}
```

On line 6 you can see a closure, basically I needed a tasteful way to find all the MavenMailer instances of a job. At line 10 I'm using it to filter for the old recipient and at line 15 replace the old recipient with the new one. Finally it's mandatory to actually persist your changes, otherwise it was just another futile exercise in wasting computing cycles.

The script did it's job, though there is still room for optimizations. For instance, there is no need to cycle to the found jobs twice and probably in time there will come a moment where some clever use of Groovy makes the code even more elegant.
