---

author:
  display_name: Daniel Gressmann
  email: dmgressmann@gmail.com
  first_name: Daniel
  last_name: Gressmann
  login: dmgress
categories:
- Software development
date: 2013-01-22 11:45:11+00:00
meta:
  _edit_last: '6246633'
  _publicize_done_external: a:1:{s:7:"twitter";a:1:{i:89917968;b:1;}}
  _wpas_done_129558: '1'
  publicize_twitter_user: 123579D
parent_id: '0'
password: ''
permalink: /2013/01/22/tuning-jmeter-test-plans-with-sinatra/
published: true
status: publish
tags:
- jmeter
- ruby
- sinatra
- sinatrarb
- testing
title: Tuning JMeter test plans with Sinatra
type: post
---


A while ago I had to create a [JMeter](http://jmeter.apache.org/ "Apache JMeter site") test plan that would generate an almost constant load on servers without having a peak at the start of an interval and close to nothing for the rest of the period. To avoid unnecessary costs and have a reliable way to work on shaping the test plan it wasn't an option to use remote servers. I had to find a way to mock the behaviour of those servers on my workstation fast and easy.

Let's assume the test scenario was to generate a constant load of 2000 requests per minute over a period of two hours and graph how the system performs. The functionality to test consisted of a request to a valid URI with, among others, a variable for a language that makes the server redirect to a content page in that language or the default language. It's safe to assume that a URI will cause a redirect or will return content. In other words, only the HTTP status codes are valuable data.

In order to shape the JMeter test plan we have several options:

* A copy of the real, but untested, system;
* start a local Apache server with mod\_rewrite and a content page;
* use .Net or Java code to emulate the behaviour;
* use Python, Perl or Ruby to emulate the behaviour
* magic

I opted for using Ruby, because the day before I read about the [Sinatra framework](http://www.sinatrarb.com/ "Sinatra framework") (again) and it looked like the fastest thing to set up in a way that was very readable and intuitive.

The instructions on how to install the Sinatra framework are clearly explained on the project's website, so after going through that process once you can create a small script implementing the functionality that you want.

In my case I decided on a script I could easily execute. While test driving it I liked to have some nice content to display, so I added some markup with [HAML](http://haml.info/ "Haml"). The JMeter test will not bother about it though.

[sourcecode language="ruby" highlight="6,9,12"]

#!/usr/bin/env ruby

require 'rubygems'

require 'sinatra'

require 'haml'

get '/redirectme' do

print 'ok'

lang = params[:lang] ? params[:lang] : 'no'

redirect to("/content/#{lang}/index.html")

end

get '/content/:lang/index.html' do

msg = case params[:lang]

when 'nl'

"Vader koopt een spotlijster voor je"

when 'fi'

"Isä ostaa sinulle matkijat"

when 'en'

"Daddy's going to buy you a mockingbird"

else

"... and if that mockingbird don't sing, daddy's gonna buy you a diamond ring"

end

haml "%h1 #{msg}", :format => :html5

end

not\_found do

halt 404, 'Nothing here.'

end

error do

halt 500, 'Something broke...'

end

[/sourcecode]

The source code starts with the libraries required to get the output right. The part necessary for my scenario was to emphasize which GET requests would be made (line 6 and 12) and how to redirect from the first request to the content page (line 9). The resulting content will in this case display a text in Dutch, Finnish or English about a mockingbird with the default being that the mockingbird doesn't sin g.

For good measure I added the `not_found` and `error` parts, but I don't remember if it was mandatory. It did help when I made some mistakes in the script configuration.

Now that the script is available all I had to change where some variables for the server location and port in the JMeter plan. After which the test plan turned into something with the ability to deliver the right amount of load. Going through this experience proved me that learning new things is fun and thinking out of your comfort zone can actually cut costs while being beneficial later on.

