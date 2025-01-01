---
author:
  display_name: Daniel Gressmann
  email: dmgressmann@gmail.com
  first_name: Daniel
  last_name: Gressmann
  login: dmgress
categories:
  - Software development
date: 2010-11-18 17:30:02+00:00
meta:
  _edit_last: "6246633"
  _wpas_done_twitter: "1"
parent_id: "0"
password: ""
permalink: /2010/11/18/sharing-comparable-properties-with-generics-in-java/
published: true
status: publish
tags:
  - generics
  - inheritance
  - java
title: Sharing Comparable properties with generics in Java
type: post
---

What if you need to develop some software to compare houses to each other? A client found a nice `Mansion` and needs to see a list of similar buildings and the idea is that if he likes a `Mansion` he won't like a `Flat`. So even if both have four rooms and a kitchen, they are not comparable at all. Then how do you implement `Comparable` in Java 5 and up?

The first thing you'd think of would be to write an explicit version for each instance, but they are all houses and all have rooms. So you might as well create an `AbstractHouse` class to create a compare function that compares the generic parts of an house. Let's just focus on the comparison on the number of rooms.

Using the following code for your `AbstractHouse` will ensure that `Mansion`s can only be compared to `Mansion`s and `Flat`s only to `Flat`s, even if you ignore the generics in your code.

```java

public abstract class AbstractHouse<T extends AbstractHouse> implements Comparable<T> {

	private int noOfRooms;

	public int compareTo (T o) {

		if (!getClass ().isInstance (o)) {
			throw new ClassCastException ("can't compare " + getClass ().getCanonicalName () + " to " + o.getClass ().getCanonicalName ());
		}
		return this.noOfRooms - other.noOfRooms;
	}
}

```

As you can see, line 1 locks in the generic part of the `Comparable` interface, but in case you aren't really using generics the `isInstance` check at line 7 will cause a `ClassCastException` to be thrown. Throwing a `ClassCastException` is conform to the `Comparable` interface which states that one can be thrown "... if the specified object's type prevents it from being compared to this object." What is left is defining the `Mansion` class as follows.

```java
public abstract class Mansion extends AbstractHouse<Mansion> implements Comparable<Mansion> {
}
```

Although I am not sure of the necessity of explicitly stating the `Comparable` in the class definition, it seems rational to do so. It's quite possible that the `Comparable` interface on a super class doesn't have to mean that all subclasses share the same feature by inheritance, the JavaDocs aren't clear on this and being explicit about it isn't harmful.
