var w = 900,
    h = 400;

var circleWidth = 20;

var fontFamily = 'monospace',
    fontSizeHighlight = '1.5em',
    fontSizeNormal = '1em';

var palette = {
      "lightgray": "#819090"
  }

var nodes = [
  {"name": "Learn to code:" },
                    {"name": "Tutorials"},
                    {"name": "Class"},
                    {"name": "Collaboration"},
                    {"name": "Practice" }
  ]

var links = [
                {source: nodes[1], target: nodes[0]},
                  {source: nodes[2], target: nodes[0]},
                  {source: nodes[3], target: nodes[0]},
                  {source: nodes[4], target: nodes[0]}
]
              


var vis = d3.select("body")
    .append("svg:svg")
      .attr("class", "stage")
      .attr("width", w)
      .attr("height", h);

var force = d3.layout.force()
    .nodes(nodes)
    .links([])
    .gravity(0.1)
    .charge(-1000)
    .size([w, h]);

 var link = vis.selectAll(".link")
        .data(links)
        .enter().append("line")
          .attr("class", "link")
          .attr("stroke", "#CCC")
          .attr("fill", "none");

 var node = vis.selectAll("circle.node")
      .data(nodes)
      .enter().append("g")
      .attr("class", "node")

      //MOUSEOVER
      .on("mouseover", function(d,i) {
        if (i>0) {
          //CIRCLE
          d3.select(this).selectAll("circle")
          .transition()
          .duration(250)
          .style("cursor", "none")     
          .attr("r", circleWidth+8)
          .attr("fill",palette.black);

          //TEXT
          d3.select(this).select("text")
          .transition()
          .style("cursor", "none")     
          .duration(250)
          .style("cursor", "none")     
          .attr("font-size","1.5em")
          .attr("x", 15 )
          .attr("y", 5 )
        } else {
          //CIRCLE
          d3.select(this).selectAll("circle")
          .style("cursor", "none")     

          //TEXT
          d3.select(this).select("text")
          .style("cursor", "none")     
        }
      })

      //MOUSEOUT
      .on("mouseout", function(d,i) {
        if (i>0) {
          //CIRCLE
          d3.select(this).selectAll("circle")
          .transition()
          .duration(250)
          .attr("r", circleWidth)
          

          //TEXT
          d3.select(this).select("text")
          .transition()
          .duration(250)
          .attr("font-size","1em")
          .attr("x", 8 )
          .attr("y", 4 )
        }
      })

      .call(force.drag);


    //CIRCLE
    node.append("svg:circle")
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; })
      .attr("r", circleWidth)
    

    //TEXT
    node.append("text")
      .text(function(d, i) { return d.name; })
      .attr("x",            function(d, i) { if (i>0) { return circleWidth + 5; }   else { return -10 } })
      .attr("y",            function(d, i) { if (i>0) { return circleWidth + 0 }    else { return 8 } })
      .attr("text-anchor",  function(d, i) { if (i>0) { return  "beginning"; }      else { return "end" } })

force.on("tick", function(e) {
  node.attr("transform", function(d, i) {     
        return "translate(" + d.x + "," + d.y + ")"; 
    });
    
   link.attr("x1", function(d)   { return d.source.x; })
       .attr("y1", function(d)   { return d.source.y; })
       .attr("x2", function(d)   { return d.target.x; })
       .attr("y2", function(d)   { return d.target.y; })
});

force.start();

