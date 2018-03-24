+++
title = "more"
type = "webpage"
date = "2018-01-24T20:32:47Z"
+++

# More

This website only touches upon the details of the original paper, since it was released, some improvements have been made such as [HyperLogLog++](https://research.google.com/pubs/pub40671.html), which

* Uses 64-bit rather than 32-bit integers
* Introduces _sparse_ representation for the registers to save memory (rather than having one huge array)
* Introduces a further set of bias corrections to improve the count at lower cardinalities 

## Seen out in the wild

* Redis `PF*` [commands](https://redis.io/commands/pfcount) use HyperLogLog
* PrestoDB `approx_distinct` [SQL function](https://prestodb.io/docs/current/functions/aggregate.html#approx_distinct) uses HyperLogLog
* Github [topic page](https://github.com/topics/hyperloglog) for some implementations of HyperLogLog


## Background reading

* [Using Linear Counting, LogLog, and HyperLogLog to Estimate Cardinality](http://www.moderndescartes.com/essays/hyperloglog/index.html)
* [Damn Cool Algorithms: Cardinality estimation](http://blog.notdot.net/2012/09/Dam-Cool-Algorithms-Cardinality-Estimation)

### Previous research

HyperLogLog builds on the shoulders of:

* LogLog
  * [Durand M., Flajolet P. (2003) Loglog Counting of Large Cardinalities. In: Di Battista G., Zwick U. (eds) Algorithms - ESA 2003. ESA 2003. Lecture Notes in Computer Science, vol 2832. Springer, Berlin, Heidelberg](http://algo.inria.fr/flajolet/Publications/DuFl03-LNCS.pdf)

* LinearCount
  * [Whang, K., Vander-Zanden, B. and Taylor, H. (1990). A linear-time probabilistic counting algorithm for database applications. ACM Transactions on Database Systems, 15(2), pp.208-229.](http://dblab.kaist.ac.kr/Publication/pdf/ACM90_TODS_v15n2.pdf)

