---

author:
  display_name: Daniel Gressmann
  email: dmgressmann@gmail.com
  first_name: Daniel
  last_name: Gressmann
  login: dmgress
categories:
- Software development
date: 2013-06-22 17:55:46+00:00
meta:
  _edit_last: '6246633'
  _publicize_done_external: a:1:{s:7:"twitter";a:1:{i:89917968;b:1;}}
  _wpas_done_129558: '1'
  publicize_reach: a:2:{s:7:"twitter";a:1:{i:129558;i:20;}s:2:"wp";a:1:{i:0;i:0;}}
  publicize_twitter_user: 123579D
parent_id: '0'
password: ''
permalink: /2013/06/22/passed-the-m102-course/
published: true
status: publish
tags:
- dba
- mongodb
title: Passed the M102 course
type: post
---


Last April I decided to enroll in the M102 MongoDB DBA course at [education.10gen.com](http:// education.10gen.com "10gen's MongoDB education site"). In the past I wrote a [blog post](https://bitly.com/L8kD38 "Experimenting with MongoDB’s spatial indexing | iPROFS Technology Blog") about the [geospatial indexing](http://docs.mongodb.org/manual/applications/geospatial-indexes/ "Geospatial Indexes and Queries - MongoDB documentation") possibilities of MongoDB and wanted to learn more. When I saw this course was available and starting soon, I saw it as an opportunity to expand my knowledge and putting some free time to good use.

I often thought about documenting my progress, but for some reason it didn't happen until now.



The first thing I noticed was that the course would last for seven weeks. It seemed long at first, but the chosen instruction format allows you to set your own pace. This means that you get a week to work through the material, but if needed it could be rushed in a few hours time. In fact that was something I did during some weekends when the deadline was approaching.

# Getting comfortable

The first week started light. There was an introduction to the course, there was a basic overview of the product and finishing the homework was a breeze. In the end I felt a bit cheated, because the video material rarely went further than what I see at a basic conference presentation. Actually it might be more like a basic workshop where one would stop after installing the product.

That's basically what happened, I learned a bit about NoSQL databases in general and what differentiates MongoDB. At the end of the first week MongoDB was running and everything was in working order. The homework assignments were mere assertions to make sure all students would have their environment set up correctly for the course.

# A flood of CRUD

During the second week I got familiar with [the basics](http://docs.mongodb.org/manual/crud/ "CRUD | MongoDB documentation") of what the users and developers will do to database systems. These weeks mapped my knowledge of relation databases and SQL to the way to do queries and updates in MongoDB. This basic knowledge is just a foundation and not much elaborated on in this course. I expect there will be more time spent on querying and inserting during a M101 course, either the M101J for Java or the M101P for Python and other languages.

On top of this basic knowledge I got a crash course on the [aggregation framework](http://docs.mongodb.org/manual/aggregation/ "Aggregation framework | MongoDB documentation") during the third week. In SQL you use `GROUP BY` to, for instance, filter and sum people by their favorite ice cream flavor. The aggregation framework in MongoDB can do the same. There is however a difference in the way the aggregation is structured. With relational databases you would combine data from different tables with `JOIN`s and create a monolith SQL statement. When you aggregate with MongoDB you push it through several steps. Maybe this is best explained with an example.

Let's say we have a database listing all the ice cream favorites of Europeans. What we want to know is the total number of strawberry ice cream lovers in the Benelux (Belgium, The Netherlands and Luxembourg). With SQL you group by flavor from a join on country and person restricting it to strawberry. From the top of my head a possible SQL query might look like this:

[code language="sql"]

SELECT flav.description, count(\*)

FROM flavor flav

JOIN person p ON p.flavor\_id = flav.id

JOIN address ad ON p.address\_id = ad.id

WHERE flav.desc LIKE 'Strawberry'

AND ad.country IN ('Belgium', 'The Netherlands', 'Luxembourg')

GROUP BY flav.description

[/code]

In contrast, MongoDB's aggregation framework gives you all the data in a collection and an array of small steps shape it into the result. Perhaps the following list of steps is chosen.

1. Given the collection of ice cream lovers in Europe
2. restrict to the ones in Benelux who love strawberry
3. sum these

Which might look like below in the mongo shell:

[code language="javascript"]

db.icecreamlovers.aggregate([

{'$match': {

'country': {'$in': ['Belgium','The Netherlands','Luxembourg']},

'favourite': 'Strawberry'

}},

{'$group': {

'\_id': 'favourite',

'total': { '$sum': 1 }

}}

]);

[/code]

Personally the last approach seems something that is easier to debug, because you can add steps until you reach the desired result instead of adding another layer around all your earlier parts.

# Putting on the DBA hat

The emphasis of this course is on administration, which really starts off in the last four weeks. That doesn't mean the first three weeks are negligible, they gave me the basic understanding of what a non-DBA user experiences and expects.

Starting from the fourth week, the subjects are [availability](http://docs.mongodb.org/manual/replication/ "Replication | MongoDB documentation"), [performance](http://docs.mongodb.org/manual/indexes/ "Indexes | MongoDB documentation") and [scalability](http://docs.mongodb.org/manual/sharding/ " Sharding | MongoDB documentation"). The M102 course covers a broad spectrum of configuration and optimization topics. Of all the subjects I got to learn the basics. What I consider most essential is that I learned about the trade-offs you need to make on indexes and how to analyze poor performance.

Another thing mentioned during the course are the pitfalls of certain configuration choices. One of them is the usage of a [sparse index](http://docs.mongodb.org/manual/core/indexes/#index-type-sparse "more information on sparse indexes") on a collection. This isn't specifically a DBA topic because any MongoDB user should be aware of it. In short a sparse index only builds up an index for documents that contain a certain field. Since not all documents contain that particular field, the total number of indexed documents might be less than the number of documents in the collection. This can cause some nasty effects on not only the query, but might affect the result after sorting too. In the first case not all documents are considered in a query. The second case is more subtle, not all documents might be returned after sorting. To be more clear, let's assume a query that uses a sparse index *A* for sorting. The query matches *n* documents, but only *m* of those have references in sparse index *A*. This means your result will have *m* documents. It might go unnoticed but can have devastating results in aggregations.

# It can be as hard as you want

You rarely need to consult the online MongoDB documentation to finish the course successfully. The video material covers most of what you need to pass. What you get out of this course depends on how serious you go about studying the material. In my opinion anyone with patience and time to watch the videos can pass. A motivated person will benefit from experimenting with the course material and studying the documentation.

The total average of the homework assignments counted equal to the score you get on the final assignments. The lowest scores are dropped, so if you had a bad week you're still able to get a perfect grade. In order to pass you need to get a score of 65%, which is easy to achieve on your own. In my opinion there are enough aids to help someone pass the course. There is a wiki, discussion board and a bunch of other ways to communicate with fellow students, teaching assistants and course staff. To me the only way to not pass is by divine intervention or dropping out.

Should you choose to dive in a little deeper, for instance into performing read/write operations on an unavailable shard or security of mongo instances and data, then it get's a bit tougher. Maybe it should be considered more advanced stuff or too time-consuming to teach and test every possible detail. Therefore you won't find it as part of the curriculum, but it is left for the curious to read or figure out by experiment.

In case you are curious, an unavailable shard is bad because it effectively means a whole range of shard keys is unavailable for both read and write operations until the shard is back up in working order.

# Rough edges

A few times it took me a while to understand the concepts or finish a task. In most cases it was because

* I got distracted during long videos,
* annoyed by short videos with quizzes
* or just didn't read the question properly.

It's also easy to imagine that a cultural or language barrier might give somebody trouble to get through the course. It takes effort to reach [cultural competence](https://en.wikipedia.org/wiki/Cultural_competence), but it's not impossible.

During the course I made some assumptions on a data set with US Postal codes that were wrong or incomplete (which is also wrong). Looking back at it assuming that each document would list the total population of a city instead of the population in that zip code was something I should have known. Getting stuck on this kind of assumptions slowed my progress in the course. A general tip would be to always get a feeling of the structure of given documents in collections with [findOne](http://docs.mongodb.org/manual/reference/method/db.collection.findOne/), possibly using it's projection parameter to restrict the data and knowing some basic Javascript to process the cursor returned from a [find](http://docs.mongodb.org/manual/reference/method/db.collection.find/).

There are some tricky parts to MongoDB. Luckily the video material covers the most common problems you might encounter. My approach was to watch all the videos, even if I thought I knew the subject already. When something wasn't clear or sparked my interest I went over the steps of the tutor or referred to the documentation. Because I was familiar with some of the material I expected to learn few new things in the first weeks.

In the end I did learn a lot. The most valuable thing I learned from the *DBA weeks* is how to analyze a poorly performing system and fix it. Without regular practice most of this new knowledge will fade away, so I plan to steer my career towards more MongoDB jobs.



