---

author:
  display_name: Daniel Gressmann
  email: dmgressmann@gmail.com
  first_name: Daniel
  last_name: Gressmann
  login: dmgress
categories:
- Software development
date: 2016-09-09 15:00:11+00:00
meta:
  _publicize_done_13005036: '1'
  _publicize_done_160958: '1'
  _publicize_done_external: a:1:{s:7:"twitter";a:1:{i:129558;s:53:"https://twitter.com/123579D/status/774252006684844032";}}
  _publicize_job_id: '26653058116'
  _rest_api_client_id: '-1'
  _rest_api_published: '1'
  _wpas_done_129558: '1'
  _wpas_done_12987707: '1'
  _wpcom_is_markdown: '1'
  publicize_google_plus_url: https://plus.google.com/100987439898173204349/posts/F6GnFi2e6PA
  publicize_twitter_user: 123579D
parent_id: '0'
password: ''
permalink: /2016/09/09/how-to-show-all-options-in-a-multi-select/
published: true
status: publish
tags:
- html
- javascript
- option
- select
title: How to show all options in a multi-select
type: post
---


For documentation purposes I needed to list all of the options in a multi-select. In other words, the number of lines or height of the select should be at least large enough to show every `option` in the `select` which has it's `multiple` attribute enabled.

The fast fix is to use developer options to manually modify the height of the select. This works fine if you have just one select to modify, but for multiple it becomes repetitive and boring. Let's use the JavaScript console to **automate it!**

The objective is to iterate over all the `select` tags in the current page, count the number of `option` tags and change the `size` of the `select` accordingly.

**Step 1** is to open the developer console of the browser. In case of FireFox it's called *Web developer tools* and in Chrome it's called *Developer tools*. On my current system both are activated with the shortcut `Ctrl + Shift + i`.

**Step 2** is to enter the javascript console and paste the following code:

[code lang="javascript"]

var selects = document.getElementsByTagName('select');

for(var i = 0; i &lt; selects.length; i++){

var s = selects[i];

if (s.multiple) {

var opts = s.getElementsByTagName('option');

s.size = Math.max(s.size, opts.length);

}

};

[/code]

All `select` items should now display at maximum height necessary to see all the options.

