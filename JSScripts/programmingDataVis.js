var customData = [
    { Skill: "C#", Value: 5 },
    { Skill: "ShaderLab", Value: 4 },
    { Skill: "ShaderGraph", Value: 4 },
    { Skill: "p5.js", Value: 4 },
    { Skill: "GLSL", Value: 3 },
    { Skill: "C++", Value: 3 },
    { Skill: "JavaScript", Value: 2 },
    { Skill: "HTML", Value: 2 },

];

// Adjust the dimensions and margins
var margin = { top: 80, right: 80, bottom: 80, left: 80 },
    width = 500 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom,
    innerRadius = 75,
    outerRadius = Math.min(width, height) / 2;

// Append the SVG object
var svg = d3.select("#programming_dataviz")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + (width / 2 + margin.left) + "," + (height / 2 + margin.top) + ")");

// Scales
var x = d3.scaleBand()
    .range([0, 2 * Math.PI])
    .align(0)
    .domain(customData.map(function(d) { return d.Skill; }));

var y = d3.scaleRadial()
    .range([innerRadius, outerRadius])
    .domain([0, d3.max(customData, function(d) { return d.Value; })]);

// Add the bars
svg.append("g")
    .selectAll("path")
    .data(customData)
    .enter()
    .append("path")
    .attr("fill", "#000000")
    .attr("stroke", "white") // Set the stroke color to white
    .attr("stroke-width", 3) // Set the stroke width as needed
    .attr("d", d3.arc()
        .innerRadius(innerRadius)
        .outerRadius(function(d) { return y(d.Value); })
        .startAngle(function(d) { return x(d.Skill); })
        .endAngle(function(d) { return x(d.Skill) + x.bandwidth(); })
        .padAngle(.1)
        .padRadius(innerRadius));

// Add the labels
svg.append("g")
    .selectAll("g")
    .data(customData)
    .enter()
    .append("g")
    .attr("text-anchor", function(d) { return (x(d.Skill) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "end" : "start"; })
    .attr("transform", function(d) { return "rotate(" + ((x(d.Skill) + x.bandwidth() / 2) * 180 / Math.PI - 90) + ")"+"translate(" + (y(d.Value)+10) + ",0)"; })
    .append("text")
    .text(function(d){return(d.Skill)})
    .attr("transform", function(d) { return (x(d.Skill) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "rotate(180)" : "rotate(0)"; })
    .style("font-size", "16px")
    .attr("alignment-baseline", "middle")
    .attr("fill", "white")

// Add text to the center
svg.append("text")
    .text("Programming")
    .attr("text-anchor", "middle") // Center the text horizontally
    .attr("alignment-baseline", "middle") // Center the text vertically
    .style("font-size", "16px") // Set the font size as needed
    .attr("fill", "white") // Set the text color to white
    .attr("dy", "0em"); // Adjust vertical positioning if needed