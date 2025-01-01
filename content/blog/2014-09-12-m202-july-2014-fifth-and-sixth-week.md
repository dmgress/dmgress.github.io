---

author:
  display_name: Daniel Gressmann
  email: dmgressmann@gmail.com
  first_name: Daniel
  last_name: Gressmann
  login: dmgress
categories:
- Software development
date: 2014-09-12 21:48:09+00:00
meta:
  _edit_last: '6246633'
  _rest_api_client_id: '-1'
  _rest_api_published: '1'
  _wpas_skip_facebook: '1'
  _wpas_skip_google_plus: '1'
  _wpas_skip_linkedin: '1'
  _wpas_skip_path: '1'
  _wpas_skip_tumblr: '1'
  _wpas_skip_twitter: '1'
parent_id: '0'
password: ''
permalink: /2014/09/12/m202-july-2014-fifth-and-sixth-week/
published: true
status: publish
tags:
- m202
- mongodb
title: M202 July 2014 Fifth and sixth week
type: post
---


My first plan for this series was to get a blog post for each week. It didn't work out in the past and because both the fifth and sixth week cover [sharding](http://docs.mongodb.org/manual/core/sharding-introduction/ "MongoDB docs: Sharding introduction"), I decided to make one big post on sharding.

Sharding is used to scale horizontally. Instead of upgrading a MongoDB replica set with more computing or network capacity, you add more replica sets and divide the load among them. Each replica set will have a shard of the entire data. It's not mandatory to use replica sets for your shards, single servers will do. However, when you consider sharding it's very likely you want the redundancy and failover of replica sets as well. The reason for this is that once a shard fails, unreachable from any kind of perspective, the data in that shard will be unavailable for both reads and writes. With MongoDB's failover functionality this becomes less of an availability problem.

During previous courses the basic steps on sharding databases and collections in MongoDB were already explained. The M202 course assumes you won't need to dig deep for this knowledge, but if you do there's always the [tutorial](http://docs.mongodb.org/manual/tutorial/deploy-shard-cluster/ "MongoDB docs: Deploy a Sharded Cluster") in the MongoDB documentation. In my opinion sharding data got a little bit easier in version 2.6. The first step is to orchestrate all the pieces of the infrastructure, which could be simplified with configuration management tools. After that you need to explicitly enable sharding on databases and collections.

## Mongos process

The recommended way to communicate with the cluster is through one of the [`mongos`](http://docs.mongodb.org/manual/reference/program/mongos/#bin.mongos "MongoDB docs: mongos executable description") processes. These processes provide several tasks in the system. The most important task is to provide a proxy for connections made to other parts of the system. When clients query through a `mongos` process their queries will be routed to the right shards and their results will be merged before returning to the client. This makes the cluster behave as one big database, although there are limits on the amount of data a `mongos` process can reasonably sort and process.

Another important task of the `mongos` process is to provide an interface to manage the cluster. Through one of the `mongos` processes you are able to configure which databases and collections are sharded, what their shard key is and how data is distributed between shards. Once data is in the cluster, any `mongos` process is able to push it around by updating the cluster configuration and kicking off the necessary commands on the shards. In order to keep the configuration up to date these `mongos` processes communicate with the config servers.

## Config servers

[Config servers](http://docs.mongodb.org/manual/core/sharded-cluster-config-servers/#sharding-config-server "MongoDB docs: description of config servers") are separate `mongod` processes dedicated to holding metadata on the shards of a cluster. This metadata tells `mongos` processes which database and collections are sharded, how they are sharded and several other important metadata. Typical production environments will have three config servers in the cluster. This number coincidentally is similar to the recommended size of replica sets, but config servers never form a replica set. Instead they are three independent servers synchronized by `mongos` processes. All instances should be available, if one of them drops the metadata will be read-only in the cluster.

The videos put emphasis on monitoring config servers. Metadata of a cluster is kept in a special database you're never supposed to touch unless instructed to do so. The videos make this very clear, and in general it's a good idea because a mismatch in any of the data might make the data out of sync with the rest of the config servers. If the metadata can't be synchronized to all of them, then data chunks can't be balanced and the config server that's out of sync will be considered broken. Manual intervention is needed to fix a failing config server.

## Using ShardingTest

One of the most useful improvements to the Mongo shell that caught my attention was the ability to set up a sharded cluster with relative ease using a [ShardingTest object](https://github.com/mongodb/mongo/blob/master/src/mongo/shell/shardingtest.js "GitHub: code for ShardingTest object"). Of course, this is only for testing purposes because the complete cluster will be running on your current machine. During the fifth and sixth week of the course I made a habit of using `tmux` with a vertical split so that on the one side I could run the test cluster and on the other I had my connection to the `mongos` to try out commands.

First, you need to start the cluster. You'll start with invoking the mongo shell without connection to the database (`mongo --nodb`). Then do something similar to the code below, which I took from the course and formatted a bit, to start a small cluster for testing purposes.

[code language="javascript" title="A small cluster for testing" highlight="11"]

config = {

d0 : { smallfiles : "",

noprealloc : "",

nopreallocj: "" },

d1 : { smallfiles : "",

noprealloc : "",

noprealloc : "" },

d2 : { smallfiles : "",

noprealloc : "",

nopreallocj: "" } };

cluster = new ShardingTest( { shards : config } );

[/code]

Once you hit return on that last line (11) your screen will fill up with lots of logging which most of the time is just the different nodes booting and connecting into a sharded cluster system. You could wait until the stream slows down, but the `mongos` node might already be running at port 30999.

When you're done, interrupt the mongo shell where you started the cluster and it will shutdown everything. I tried scripting this and making the mongo shell execute it, but once it hits the end of the script it will shut down the cluster. I see no other way than running this while keeping the mongo shell opened.

## Shard keys and tags

The first decision when sharding a collection is on the [shard key](http://docs.mongodb.org/manual/core/sharding-shard-key/ "MongoDB docs: Shard Keys") to use. The shard key determines which field is used to split data in to [chunks](http://docs.mongodb.org/manual/reference/glossary/#term-chunk "MongoDB docs: Glossary term chunk") on the cluster. Each chunk will have data between a lower and upper bound based on the value of the shard key in the data. A `mongos` uses the shard key to determine where to send a particular request. In case the request doesn't contain the shard key it will be sent to every shard. Shard keys are immutable, that's why in every MongoDB course there's an emphasis on picking the right one. The aim in any case is to increase throughput of the whole system by distributing the load over as many shards as possible, picking the right shard key is the most important decision to make.

Starting version 2.4 of it's possible to use built-in [hash-based shard keys](http://docs.mongodb.org/manual/core/sharding-shard-key/#hashed-shard-keys "MongoDB docs: Hashed Shard Keys"). This option ensures that writes to the database are distributed evenly among all shards. Reads, however, will be sent to all shards if the shard key is not in the query. This is something to keep in mind when considering to use hash-based keys.

In some scenarios data should be tied to certain shards. One scenario is where user data from regions are tied to shards in the regional data center. You can achieve this through [tagging](http://docs.mongodb.org/manual/core/tag-aware-sharding/ "MongoDB docs: Tag Aware Sharding"). By tagging a chunk it will stored on any of the shards with the same tag, or any other tag if no shard has the tag. The videos didn't go deep into this subject, mentioning it and encouraging discussion in the forum.

## Chunk pre-splitting

Just like databases can be pre-heated to avoid the initial penalty of using them, it's a good idea to [pre-split](http://docs.mongodb.org/manual/tutorial/create-chunks-in-sharded-cluster/ "MongoDB docs: Create Chunks in a Sharded Cluster") the collection before putting data in. This will allow the cluster to divide the chunks evenly between the shards, increasing the chance of dividing the load of writing data to the cluster.

The shell provides some helper functions to split chunks at a certain value. Most of the pre-splitting work is manual, which means early on in the videos you're already encouraged to script this process.

There are a few dangers when pre-splitting: you might create chunks that are never used or chunks that will eventually grow so big they will cause problems. One of the videos mentions jumbo chunks. These are chunks so large that they can't be moved or split any more. They are the result of somehow getting too much data into a range, either through poor pre-splitting or heavy writing into the chunk.

When dealing with shards you definitely want to think ahead about the kind of data and how (fast) this data is coming in so you can create the right sharding strategies.

## MongoDB balancer

A main process in the cluster is the [balancing of chunks](http://docs.mongodb.org/manual/core/sharding-balancing/ "MongoDB docs: Sharded Collection Balancing") between shards. This is a task scheduled regularly but can also be triggered based on certain predefined parameters in MongoDB. For instance, writes to chunks are monitored and when a certain amount of documents is detected in a chunk it's eligible for splitting. Another trigger is an imbalance between the number of chunks on each shard. Through video and reading documentation you get to learn the limits.

An important fact is that the mongo balancer uses metrics based on the number of chunks to balance out data. As I mentioned, there is a trigger for number of documents but there is none for the size of the documents. In other words, even if the balancer has balanced all the chunks it might not have balanced the data. It's possible in a two shard system to have all the data on one shard, but an equal amount of chunks on each shard. Data imbalances like this were demonstrated in exercises and videos showed that chosing poor shard keys or pre-splitting on the wrong ranges can cause these kind of problems in a cluster.

## Chunk migration

The cluster has a balancer, but this is not much more than a cooperation of the different processes in the cluster. A `mongos` process notices a reason to split or balance chunks out and instructs the primary node in the shard to do so. In case of splitting the chunk it's merely some small administrative steps to update metadata, the more interesting part is the migration process between nodes.

A video showed the current steps in the migration process, but the details might change unannounced. A `mongos` process triggers the migration of a chunk. It's current owner and destination are notified of the migration. The current owner takes a few steps to migrate the data, the destination takes a few to add the data and finally the current owner finishes by deleting the data in the chunk. In general not much can go wrong, both origin and destination need to agree the chunk is migrated before queries will be routed to the destination. Until that happens they will still go to the origin shard.

## Orphaned data

Migrations can fail. A shard could contain data it isn't supposed to have according to the config database but could return in particular situations. This data is considered to be [orphaned data](http://docs.mongodb.org/manual/reference/glossary/#term-orphaned-document "MongoDB docs: Term orphaned document").

To be more specific, on the receiving end data comes in but is called orphaned until the data is successfully migrated and the receiving shard is marked as the owner of the chunk. While on the sending end data is orphaned once the shard is not the owner but the data isn't deleted by the background process that finishes the migration.

When querying a shard, the chunk manager on the primary node will filter out any data from orphaned chunks, but secondary nodes are not aware of data being in an orphaned state. Any requests to those secondary nodes might return that orphaned data. Because only the node active as primary during the migration knows which data is in it's chunks, after fail-over the new primary might not be aware of the data being orphaned. Deletion of orphaned data is not carried on by the new primary, so it will stay on the shard until explicitly removed.

As far as I could tell sharding and it's configuration metadata are still an abstraction layer and the core functionality of any `mongod` process is to return available data when queried. Only the primary of a shard has a filter that will leave out data from chunks it doesn't own, which means a secondary node might return orphaned data depending on the read preference of the client.

Recommended practice is to always connect to `mongos` processes instead of directly to any `mongod` in a sharded cluster. This will avoid most problems of orphaned data reaching the client, unless the read preference allows reading from secondary nodes. I didn't get to test if I could make orphaned data clash with data from the owner of a chunk, it seems possible in exotic scenarios. Currently there are no official tools to detect and clean orphaned data, but one unofficial mongo shell script was mentioned with precautionary warnings.

## Sharded cluster maintenance

Cluster maintenance is unavoidable, it usually means correcting an unhealthy state of the cluster or an upgrade. Adding shards also counts as maintenance, but this topic is covered in M102 and understood to be common knowledge for M202 participants. In case it was forgotten, a quick view through the sharding helper commands shows the [addShard](http://docs.mongodb.org/manual/reference/command/addShard/ "MongoDB command: addShard") function which needs an URI and uses it to call the addShard database command. Calling the database command directly will give you more control, but the helper command gives a sensible default.

### Upgrading a sharded cluster

The upgrade process of any environment usually involves reading through the documentation and trying it out before starting the upgrade in production environment. Upgrades to a new minor version, for instance 2.4 to 2.6, should definitely start with reading through the [release notes](http://docs.mongodb.org/manual/release-notes/ "MongoDB Release notes"). There is still a lot of significant change for MongoDB to simply ignore this step.

Once you read the release notes the order of upgrades in the cluster is straightforward. First you disable the balancer before you upgrade the `mongos` processes. Then you upgrade the config servers and finally the shards. Because it's recommended to use replica sets in production you can follow the steps of upgrading replica sets. To speed up the process you could upgrade multiple secondary nodes across replica sets at the same time. At the end you should enable the balancer again.

### Removing a shard

[Removing a shard from a cluster](http://docs.mongodb.org/manual/tutorial/remove-shards-from-cluster/ "MongoDB docs: Remove shards from a cluster") is harder than adding one. This is because of the steps involved in doing so. The process starts with moving all data of it. You need to ensure the balancer is enabled, because it will be used to migrate chunks to other shards. Once all sharded data is moved off the shard you need to move the rest. Sometimes you have databases and collections that aren't sharded, by telling the cluster another shard is going to be the primary shard for the data these collections will also be moved off the shard. Once all is finished you can shut down the shard.

## Log files

MongoDB logs a lot of information to it's log files. Ranging from connections and configuration to slow queries (when configured to do so). But dealing with that data is cumbersome. The videos hint that week 7 will have some graphical tools to process data. If you understand the basic Unix shell commands and some scripting languages you already got enough to set up your own analysis tools.

One of week six' homework assignments was about going through log files to identify a problem. Because some parts of the log contain JSON, I added [jq](https://stedolan.github.io/jq/ "jq is like sed for JSON data") to my library of tools to get a better overview of what's going on. Of course not everything is JSON, so I had to grep and cut a little until I got the desired input string for jq. All the cutting makes you lose context, thankfully my attention span is long enough to remember what I was looking for.

## Conclusion

During the fifth and sixth week I discovered that version 2.6 of MongoDB has more improvements than I previously thought. Updates from MongoDB reach my inbox, but clearly some aspects didn't get through until I picked up this course. Now I think there's definitely a reason to sign up again for a development course and the updated M102 DBA course. The tedious task of setting up a replica set or even a sharded cluster just for testing is greatly simplified with the ReplicaTest and ShardingTest objects in the mongo shell. Although a little foggy in documentation they have a clear advantage over doing it all by hand. Then I saw there's a [Bulk](http://docs.mongodb.org/manual/reference/method/Bulk/ "MongoDB shell command: Bulk") command in the shell. This also helps to speed things up, but there's still a need for some loops to fill up the set of commands. The technology to test and teach really has improved in the last year.

