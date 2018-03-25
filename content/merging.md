+++
title = "merging"
type = "webpage"
date = "2018-01-24T20:32:47Z"
+++

# Merging

Imagine you have a bunch of logs with 1 billion lines in them. Your boss comes up, coffee cup in hand, and wants to find out how many unique IP addresses visited the website yesterday.

_I know this is a contrived example, but lets run with it._

The brute force approach would be to provision a `set` data-structure, and go through the records one by one until you reach the end, then return the length of the `set` to the user.

<figure class="figure" style="margin-top:10px; margin-bottom:10px;">
    <img class="figure-img img-fluid" src="/img/merge1.png" />
</figure>

As you can imagine, this has problems

* It's slow. 
* It's memory consuming
  * If you were lucky (cursed?) enough to even have 100 million unique visitors, that would consume 3.2GB of memory alone!

## Parallel 

  So to speed things up, you run your `count(distinct(ip))` operation using a parallel approach.  

  Theoretically this is the same as the serial method, each worker processes a subset of the data and builds up a `set` of IP addresses. However, there's a pinch point in the operation where you eventually need to merge all your `sets` from all the nodes into one so you can determine the unique count. 

<figure class="figure" style="margin-top:10px; margin-bottom:10px;">
    <img class="figure-img img-fluid" src="/img/merge2.png" />
</figure>

 This is a much better approach than the brute force solution above, but it suffers from

* Memory consumption 
* Bandwidth heavy 
  * Shuffling those sets between the workers is expensive, especially if they are on separate machines

## Approximation

You ask your boss, do you need _an exact count_ or just an approximate. 

With figures like number of unique IP addresses, does it really matter if you're a slight bit out from the real number? 

This is where HyperLogLog shines because as you've seen, the core is the registers is just an array of bytes. With the top precision (16) making 65,536 registers available for use, the memory used is just 512KiB[1]

<figure class="figure" style="margin-top:10px; margin-bottom:10px;">
    <img class="figure-img img-fluid" src="/img/merge3.png" />
</figure>


Merging HyperLogLog instances across nodes is simply a case of merging the registers, achieved by comparing each register and taking the max. 

Then the final merged instance can be used to perform the [count](counting).

<figure class="figure" style="margin-top:10px; margin-bottom:10px; display:block !important">
    <img class="figure-img img-fluid" style="margin-left:auto; margin-right:auto; display:block;" src="/img/merge4.png" />
</figure>



This

* Uses a lot less memory
* Uses a lot less bandwidth 
* Is much faster. 


[1] Note that some implementations of HyperLogLog use a _sparse_ representation of the registers, which saves even more memory. See HyperLogLog++