# HyperLogLog

This website is designed to explore some of the concepts found in the following papers

* [HyperLogLog: the analysis of a near-optimal cardinality estimation algorithm (2007)](http://algo.inria.fr/flajolet/Publications/FlFuGaMe07.pdf)
* [ HyperLogLog in Practice: Algorithmic Engineering of a State of The Art Cardinality Estimation Algorithm (2013)](https://research.google.com/pubs/pub40671.html)
  * personally I found this paper a little easier to read

The site consists of the following sections

* A section detailing how items are [added](adding) to a HyperLogLog instance
* A section detailing how [the count is appoximated](counting) 
* A section that describes where to [go next](more) for implementations and uses

# Elevator pitch
HyperLogLog is a cardinality estimator designed to solve the [count-distinct problem](https://en.wikipedia.org/wiki/Count-distinct_problem).

It is:

* ✅ Fast 
* ✅ Memory efficient
* ✅ Parallellisable 
* ✅ Commutative

It might not:

* ⚠️ Give an accurate count - the result could be +/- the actual value by a small margin.

Possible uses:

* Seeing roughly how many unique users visited a website
* Time series data where distinct operation is required
* Database query planning
* Exploratory analysis

