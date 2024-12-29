---

author:
  display_name: Daniel Gressmann
  email: dmgressmann@gmail.com
  first_name: Daniel
  last_name: Gressmann
  login: dmgress
categories:
- M101JS Aug 2013
- MongoDB
- Software development
date: 2013-11-21 10:34:59+00:00
meta:
  _edit_last: '6246633'
  _publicize_done_external: a:1:{s:7:"twitter";a:1:{i:89917968;b:1;}}
  _wpas_done_129558: '1'
  publicize_twitter_url: http://t.co/4cOtULVZvk
  publicize_twitter_user: 123579D
parent_id: '0'
password: ''
permalink: /2013/11/21/m101js-week-7-bonus-lecture/
published: true
status: publish
tags:
- m101js
- mongodb
- mongoosejs
- nodejs
title: M101JS Week 7 bonus lecture
type: post
---


On August 12th the first M101JS (MongoDB for Node.js developers) course started. Previously I completed both the M101J (MongoDB for Java developers) and M102 (MongoDB for DBAs) courses available through 10gen's education site.

When I finish this course I will have refreshed my MongoDB knowledge and got some experience with Node.js in the form of a blog application. I decided to document my progress in (at least) weekly summaries. This will be the bonus part of week seven. You can read the final exam part [here](http://gressie.wordpress.com/2013/09/30/m101js-week-7/ "M101JS Week 7") and part six [here](http://gressie.wordpress.com/2013/09/23/m101js-week-6/ "M101JS Week 6").

After finishing the final exam I went on a trip to the Philippines. This meant I didn't have time to follow the bonus lecture or write about it. Today I can finally complete the series on M101JS, because I watched the bonus lecture on the use of Mongoose.

In the lecture [Aaron Heckmann](https://github.com/aheckmann "Aaron's GitHub page") introduces us to [Mongoose](http://mongoosejs.com/ "elegant mongodb object modeling for node.js") through an alternative take on the course's blog project. After a short introduction he steps through designing and implementing a blogging site using [Jade](http://jade-lang.com/ "Node templating engine"), an alternative to the [Swig](http://paularmstrong.github.io/swig/ "A simple, powerful, and extendable JavaScript Template Engine") library used in the course for HTML rendering, [Express](http://expressjs.com/ "web application framework for node"), Mongoose and of course MongoDB.

Unlike the course, which provides all the structure for the blogging project and only required you to add a few lines, this lecture started from scratch. In the first video we go through the basics of setting up a Node.js project with the bare structure to start a web application. Quickly the subject got passed a minimal introduction to HTML rendering with Jade and into request routing with Express.

After spending two videos on routing and error handling the lecture dove into authentication. To write a blog you need to log in, so Aaron showed how a simple authentication could be set up with all the views needed in the sixth and seventh videos. These videos gave a first introduction to Mongoose.

Mongoose is an Object-Document Mapping (ODM) framework. In other words, where you would use an Object-Relational Mapping framework for relational databases, you can use Mongoose to map between the objects you use in the application and the documents stored in the database. This means Mongoose has many helpful features that will give you an advantage over dealing directly with the [MongoDB native driver](http://mongodb.github.io/node-mongodb-native/index.html "The Node.JS MongoDB Driver Manual"). Several of these features got mentioned during the lecture.

## Automatically create indexes

The first one I like to highlight is the ability to automatically [create](http://mongoosejs.com/docs/api.html#schematype_SchemaType-index) [indexes](http://mongoosejs.com/docs/api.html#schematype_SchemaType-unique) [on](http://mongoosejs.com/docs/api.html#schematype_SchemaType-sparse) [collections](http://mongoosejs.com/docs/api.html#schema_date_SchemaDate-expires). Luckily it is possible to [switch off](http://mongoosejs.com/docs/guide.html#autoIndex "Mongoose Schema option autoIndex")  this behavior to prevent a new version of the app from hogging memory and CPU time during a roll out in production. Mongoose also comes with a lot of helper functions to do basic processing of your data before it goes into the database. Think for instance about [trimming](http://mongoosejs.com/docs/api.html#schema_string_SchemaString-trim) strings or converting them [to lowercase](http://mongoosejs.com/docs/api.html#schema_string_SchemaString-lowercase). As a demonstration the lecture showed the configuration to trim and convert an email address to lowercase before adding it to the database.

## Link data across collections

Another feature helps link data from different collections into your object model. This functionality comes through the [populate](http://mongoosejs.com/docs/populate.html "Mongoose population") method. In the lecture this helped to link an author to a blog post. There is some effort in making this possible. To retrieve the data, Aaron implemented a function that would be called after querying the database for the blog post.

Depending on your usage population certainly comes with a penalty. If you only want to know the name of the author then loading author information for each of the blogs you retrieve will generate a lot of traffic and make the application unnecessarily slower. I can imagine you would create an extra field in the blog post just to store the author's name. There is a trade-off between having to update the entire blog post collection once that name changes or the penalty for querying for the author document with each blog post retrieved. Once again, this proves that developing with MongoDB as a back-end should make you think about the best way to structure your data.

## Custom middleware

The last feature I like to highlight is the possibility to add functionality to your Mongoose model or schema. Models are objects, which means that like any JavaScript document you can add a function to it. This is a given feature because you're using JavaScript. It's more interesting to know you can add a function to your Schema, the mapping between object and document. This was demonstrated by Aaron in the video on editing blog posts. In the video he explains adding a new method called `edit` to the model. This method does some basic checking to make sure that only the author of the post can edit and update it.

Although the end of the lecture was sudden, I did enjoy this extra lecture as it presented a better way of actual developing with MongoDB than the course did. Personally I think the lecture could have ended with some elaboration on the benefits (and drawbacks) of Mongoose in comparison with direct access to the MongoDB native driver. After browsing through the documentation for Mongoose it seems anything you would like to do with MongoDB is covered.

