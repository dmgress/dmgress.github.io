---
title: Generics are weird, or I am weird
date: 2009-11-25 09:24:06.000000000 +00:00
type: post
parent_id: "0"
published: true
password: ""
status: publish
categories:
  - Software development
tags:
  - java
  - testing
  - weird
meta:
  _edit_last: "6246633"
  _wpas_done_twitter: "1"
author:
  login: dmgress
  email: dmgressmann@gmail.com
  display_name: Daniel Gressmann
  first_name: Daniel
  last_name: Gressmann
permalink: "/2009/11/25/generics-are-weird-or-i-am-weird/"
---

Yesterday, late afternoon, I stumbled across a compilation problem for one of my unit tests in Java. More specifically, compilation in Eclipse seemed to work fine but using Maven2 and the java compiler included in version 1.6.0_14 it complained about not being able to find the proper method.

Given the two classes below (modified for brevity, of course):

```java
import java.util.*;

public class Foo<t> {
   private List> children = new ArrayList  ();

   public List> getChildren() { return children; }

   public Foo addChild(Foo child) { children.add(child); }
}
```

```java {6,17}
import static org.hamcrest.Matchers.*;
import static org.junit.Assert.*;

import org.junit.*;

public class FooTest {
   Foo parent, child;

   @Before
   public void setUp (){
      parent = new Foo ();
      child = new Foo ();
      parent.addChild(child);
   }

   @Test
   public void childAdded(){
      assertThat(parent.getChildren(), hasItem(child));
   }
}
```

For some reason it seems that omitting the type for Foo at line 7 makes Java drop the type of the <code>getChildren</code> method. The compiler will infer the return type of that method as a <code>List</code> (no generics). The type of the <code>hasItem</code> method from the hamcrest matchers, in line 18, is typed as <code>Matcher</code>. The result, during compilation the compiler will complain about line 18 in the test class. My current settings in Eclipse show this unchecked invocation as a warning. Nevertheless it compiles and runs. The standard Java compiler is very strict in this matter.

The quick solution is simple, just add a type to line 7 or do a cast at line 18. Doing both is overkill, but works too. Adding the type at line 7 is the best choice, because that way there is no need to explicitly cast every call to <code>getChildren</code> where this problem occurs.

```java {6,17}
import static org.hamcrest.Matchers.*;
import static org.junit.Assert.*;
import java.util.*;
import org.junit.*;

public class FooTest {
   Foo <Object> parent, child;

   @Before
   public void setUp (){
      parent = new Foo ();
      child = new Foo ();
      parent.addChild(child);
   }

   @Test
   public void childAdded(){
      assertThat((List<Object>) parent.getChildren(), hasItem(child));
   }
}
```

There might be a way to avoid this inconvenience by some simple changes to the Foo source code, changes I haven't discovered yet. If there are any then I <strong>will</strong> find it!
