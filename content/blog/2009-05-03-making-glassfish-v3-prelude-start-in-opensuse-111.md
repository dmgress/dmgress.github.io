---

author:
  display_name: Daniel Gressmann
  email: dmgressmann@gmail.com
  first_name: Daniel
  last_name: Gressmann
  login: dmgress
categories:
- Leisure
date: 2009-05-03 17:02:06+00:00
meta:
  _edit_last: '6246633'
parent_id: '0'
password: ''
permalink: /2009/05/03/making-glassfish-v3-prelude-start-in-opensuse-111/
published: true
status: publish
tags:
- glassfish
- opensuse
title: Making Glassfish v3 prelude start in OpenSuse 11.1
type: post
---


Hi people, Guess what? Yes I did it! At least all signs seem to indicate I did so that's good, right? :) This weekend my computer came back from repairs, long boring story so I won't tell it in this post. I specifically asked to make it as silent as possible, at the least of powering off because I think it's not on yet, and keep it free from proprietary operating systems. The whole idea was to make me switch to open source software and keep me from cursing a lot. We'll have to see about the latter, KDE 4.1 seems to freeze up pretty nice too...

The reason for installing Glassfish is twofold. First being that it's an application server, which should help me figure out how properly do Java EE. Second, version 3 of Glassfish is modular so I wanted to check that out. Many open source projects have poor documentation or you have to spent good time mining through the clutter to find what you are (exactly) looking for. Best thing is to broaden your criteria and look for your base ingredient, add some spices and use your brain to cook up something that seems to taste just fine. That's what I did.

Installing Glassfish is trivial, so won't mention it. Neither will security be mentioned, just how to start it.

I started looking for ways to start the glassfish server during booting up. I found [two](http://computingwithjasper.blogspot.com/2008/01/installing-glassfish-2-on-ubuntu-710.html) [ways](http://weblogs.java.net/blog/cayhorstmann/archive/2006/07/installing_glas.html) 8O to do it, both not quite as satisfying as I had hoped. Both blogs are written for Ubuntu and mention older versions of Glassfish. Not that my init script had to be much different from theirs, just a little. The basic thing that needs to happen is starting and stopping. I added a status and a restart possibility because I like that kind of stuff.

Starting Glassfish is well documented, use asadmin start-domain with some options or none to start the most basic default setup. So that goes in the start option.

```
start)
   echo -n "Starting $APP_NAME "
   $ASADMIN start-domain
   rc_status -v
   ;;
```

Stopping is done by asadmin stop-domain with the right parameters (or none depending how you started it).

```
stop)
   echo -n "Shutting down $APP_NAME "
   $ASADMIN stop-domain
   rc_status -v
   ;;
```

The basic idea is to start everything you want at boot, so no messing around with extra parameters to the init script. It would only complicate stuff. Restarting is like stopping and the starting again, also easy.

```
restart)
   $0 stop
   $0 start
   rc_status
   ;;
```

Glassfish doesn't have a status option, but uptime seems appropriate in this case.

```
status)
   echo -n "Checking for service $APP_NAME "
   $ASADMIN uptime
   rc_status -v
   ;;
```

Using that one for status option. And then all I have to do is wrap it up with the available commands. I tested it, it works. Just some little extra's added in the full script below. Extra 1 is the check if the asadmin command can be found, the second extra checks if the configuration file of the default domain is readable to the current user. This is only important when trying to start or stop Glassfish on a domain, since the asadmin will only try to read that file during those phases. So basically anyone is able to request the status of the Glassfish server (and in addition get to see the uptime :)), but only few have power to start it up or shut it down.

The full script:

```
#!/bin/sh
#
# Init script for Glassfish Application Server
# based on skeleton for LSB script in OpenSuse 11.1
# probably works on any other LSB supporting Linux distro
# as well.
#
# Adjust the three variables below to your liking
#

GLASSFISH_HOME=/usr/local/glassfish
APP_NAME="Glassfish v3 Prelude"
DOMAIN1="domain1"

#
# You might want to change the Description line in the block
# below, just for clarification of what the service is representing.
#
### BEGIN INIT INFO
# Provides: glassfish
# Required-Start: $remote-fs $local-fs
# Required-Stop: $remote-fs $local-fs
# Default-Start: 3 5
# Default-Stop:
# Description: Glassfish Application Server v3 Prelude
### END INIT INFO
#
# DO NOT EDIT BELOW THIS LINE
#
# Author: D.M. Gressmann
#

ASADMIN=$GLASSFISH_HOME/bin/asadmin
test -x $FOO_BIN || { echo "$ASADMIN not installed";
      if [ "$1" = "stop" ]; then exit 0;
      else exit 5; fi; }

DOMAIN1_CONFIG=$GLASSFISH_HOME/glassfish/domains/$DOMAIN1/config/domain.xml
test -r $DOMAIN1_CONFIG || {
      if [ "$1" != 'status' ];
      then echo "Can't read the configuration @ $DOMAIN1_CONFIG. Check your file permissions";
      exit 6; fi;
      }

. /etc/rc.status

# Reset status of this service
rc_reset

case "$1" in
   start)
      echo -n "Starting $APP_NAME "
      $ASADMIN start-domain
      rc_status -v
      ;;
   stop)
      echo -n "Shutting down $APP_NAME "
      $ASADMIN stop-domain
      rc_status -v
      ;;
   restart)
      $0 stop
      $0 start
      rc_status
      ;;
   status)
      echo -n "Checking for service $APP_NAME "
      $ASADMIN uptime
      rc_status -v
      ;;
   *)
      echo "Usage: $0 {start|stop|status|restart}"
      exit 1
      ;;
esac
rc_exit

```

If you're not familiar with the rc\_ commands, those put nice stuff like succes, failed, running in your console. With appropriate colors. Looks pretty pro 8) if you ask me. For your convenience I put the adjustable parts on top, that way you only have to adjust those to get it working. Any improvements are appreciated, comments more or less too.

