xlet chartCreated = false;
let chart;
let width = window.innerWidth - 260;
let height = 300;
function createBarChart() {
    // Sample data for the bar chart
    const data = [
        { name: "C#", value: 10 },
        { name: "Unity", value: 10 },
        { name: "ShaderLab", value: 8 },
        { name: "C++", value: 6 },
        { name: "JavaScript", value: 6 },
        { name: "HTML", value: 6 },
    ];

    // Dimensions and margins for the chart
    
    const margin = { top: 20, right: 40, bottom: 40, left: 80 };

    // Calculate the chart dimensions without margins
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Create an SVG container
    const svg = d3.select("body")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    // Create a group element for the chart content with margins
    const g = svg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Define scales for the x and y axes
    const xScale = d3.scaleBand()
        .domain(data.map(d => d.name))
        .range([0, innerWidth])
        .padding(0.2);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.value)])
        .nice()
        .range([innerHeight, 0]);

    // Create and append the bars
    g.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", d => xScale(d.name))
        .attr("y", d => yScale(d.value))
        .attr("width", xScale.bandwidth())
        .attr("height", d => innerHeight - yScale(d.value))
        .attr("fill", "white");

    // Create and append the x-axis
    g.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0,${innerHeight})`)
        .call(d3.axisBottom(xScale).tickSize(0));

    // Add labels to the x-axis and y-axis
    g.selectAll(".x-axis text")
        .attr("text-anchor", "center");

    svg.style("overflow", "visible");

    // Remove the y-axis line
    g.append("g")
        .attr("class", "y-axis");

    svg.select(".x-axis path").remove();

    chart = svg;
}

function removeBarChart() {
    if (chart) {
        // Remove or hide the chart element
        chart.remove(); // Assuming 'chart' is a DOM element
        chart = null;
    }
}

// Intersection Observer to trigger chart creation and removal
const aboutSection = document.getElementById("about");
const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !chartCreated) {
        createBarChart();
        chartCreated = true;
    } else if (!entries[0].isIntersecting && chartCreated) {
        removeBarChart();
        chartCreated = false;
    }
});

observer.observe(aboutSection);


