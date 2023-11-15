
let bt = document.getElementById("STOJ");


bt.addEventListener("click" , function (){

    eventSource?eventSource.close():console.log();
})
var graphData = [
    {
        x: [],
        y: [],
        name: 'y1'
    },
    {
        x: [],
        y: [],
        name: 'y2'
    }
];

var layout = {
    title:"SINUS",
    xaxis:{title: "x"},
    yaxis:{title: "y"}
}
Plotly.newPlot('sin-cos-graph', graphData, layout);


var eventSource = new EventSource('https://old.iolab.sk/evaluation/sse/sse.php');
eventSource.onmessage = function (event) {
    var newData = JSON.parse(event.data);

    // Update the plot with new data
    Plotly.extendTraces('sin-cos-graph', {
        x: [[newData.x], [newData.x]],
        y: [[newData.y1], [newData.y2]]
    }, [0, 1]);
};


