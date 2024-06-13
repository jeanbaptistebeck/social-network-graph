const width = 960;
const height = 600;

const svg = d3.select("svg")
    .attr("width", width)
    .attr("height", height);

const data = {
    nodes: [
        { id: "Alice" },
        { id: "Bob" },
        { id: "Charlie" },
        { id: "David" },
        { id: "Eve" }
    ],
    links: [
        { source: "Alice", target: "Bob", comment: "Friends since college" },
        { source: "Alice", target: "Charlie", comment: "Co-workers" },
        { source: "Bob", target: "Charlie", comment: "Neighbors" },
        { source: "Bob", target: "David", comment: "Gym buddies" },
        { source: "Charlie", target: "David", comment: "Cousins" },
        { source: "David", target: "Eve", comment: "Siblings" }
    ]
};

const simulation = d3.forceSimulation(data.nodes)
    .force("link", d3.forceLink(data.links).id(d => d.id).distance(100))
    .force("charge", d3.forceManyBody().strength(-300))
    .force("center", d3.forceCenter(width / 2, height / 2));

const link = svg.append("g")
    .attr("class", "links")
    .selectAll("line")
    .data(data.links)
    .enter().append("line")
    .attr("class", "link");

const node = svg.append("g")
    .attr("class", "nodes")
    .selectAll("g")
    .data(data.nodes)
    .enter().append("g")
    .attr("class", "node");

node.append("circle")
    .attr("r", 10);

node.append("text")
    .attr("x", 12)
    .attr("dy", ".35em")
    .text(d => d.id);

const labels = svg.append("g")
    .attr("class", "labels")
    .selectAll("text")
    .data(data.links)
    .enter().append("text")
    .attr("class", "label")
    .attr("font-size", 10)
    .attr("fill", "#555")
    .text(d => d.comment);

simulation.on("tick", () => {
    link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

    node
        .attr("transform", d => `translate(${d.x},${d.y})`);

    labels
        .attr("x", d => (d.source.x + d.target.x) / 2)
        .attr("y", d => (d.source.y + d.target.y) / 2);
});
