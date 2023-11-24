https://stackoverflow.com/questions/15191811/forcing-orthogonal-vertical-or-horizontal-edges-with-dot
I ask because orthogonal edge routing is only available in Graphviz versions from September 28, 2010 and newer. Not all systems have more recent versions packed. On my system I had to [download](http://www.graphviz.org/Download..php) and manually install Graphviz to get a version newer than 2.26.3 (which is from January 26, 2010).
Assuming your actual graph contains more than 4 nodes, if you want the lines to have a bend and you don't want to add extra (invisible) nodes, you should try playing around with the graphs `nodesep` attribute. See code and image below.
```
digraph G {

    graph [splines=ortho, nodesep=1]
    node [shape=record]

    A -> {B, C} -> D
}
```
![[Pasted image 20231124102714.png]]