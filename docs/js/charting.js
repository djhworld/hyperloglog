function getLinearCountChart(m, V) {
    xLabels = [];
    yData = [];

    var b = 1;
    switch (Math.log2(m)) {
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
            b = 2;
            break;
        case 9:
        case 10:
            b = 4;
            break;
        case 11:
        case 12:
            b = 16;
            break;
        case 13:
        case 14:
            b = 64;
            break;
        case 15:
        case 16:
            b = 1024;
            break;
    };
    b = b - 1;
    console.log("b = " + b)
    for (var i = 0; i < m; i += b) {
        xLabels.push(i);
        yData.push(-m * Math.log(i / m));
    }
    return {
        type: 'line',
        data: {
            labels: xLabels,
            datasets: [
                { // one line graph
                    label: 'Estimated Cardinality (E)',
                    data: yData,
                    backgroundColor: [
                        'rgba(54,73,93,.5)' // Blue
                    ],
                    borderColor: [
                        '#36495d'
                    ],
                    borderWidth: 3,
                    pointRadius: 0.2
                }
            ]
        },
        options: {
            title: {
                display: true,
                text: "LinearCount cardinality estimation for V"
            },
            legend: {
                display: false
            },
            annotation: {
                // Defines when the annotations are drawn.
                // This allows positioning of the annotation relative to the other
                // elements of the graph.
                //
                // Should be one of: afterDraw, afterDatasetsDraw, beforeDatasetsDraw
                // See http://www.chartjs.org/docs/#advanced-usage-creating-plugins
                drawTime: 'afterDatasetsDraw', // (default)

                // Mouse events to enable on each annotation.
                // Should be an array of one or more browser-supported mouse events
                // See https://developer.mozilla.org/en-US/docs/Web/Events
                events: ['click'],

                // Double-click speed in ms used to distinguish single-clicks from 
                // double-clicks whenever you need to capture both. When listening for
                // both click and dblclick, click events will be delayed by this
                // amount.
                dblClickSpeed: 350, // ms (default)

                // Array of annotation configuration objects
                // See below for detailed descriptions of the annotation options
                annotations: [{
                    drawTime: 'afterDraw', // overrides annotation.drawTime if set
                    id: 'a-line-1', // optional
                    type: 'line',
                    mode: 'vertical',
                    scaleID: 'x-axis-0',
                    value: (b * Math.round(V / b)),
                    borderColor: 'red',
                    borderWidth: 2,
                    label: {
                        // Background color of label, default below
                        backgroundColor: 'rgba(0,0,0,0.8)',

                        // Font family of text, inherits from global
                        fontFamily: "sans-serif",

                        // Font size of text, inherits from global
                        fontSize: 10,

                        // Font style of text, default below
                        fontStyle: "bold",

                        // Font color of text, default below
                        fontColor: "#fff",

                        // Padding of label to add left/right, default below
                        xPadding: 6,

                        // Padding of label to add top/bottom, default below
                        yPadding: 6,

                        // Radius of label rectangle, default below
                        cornerRadius: 6,

                        // Anchor position of label on line, can be one of: top, bottom, left, right, center. Default below.
                        position: "top",

                        // Adjustment along x-axis (left-right) of label relative to above number (can be negative)
                        // For horizontal lines positioned left or right, negative values move
                        // the label toward the edge, and positive values toward the center.
                        xAdjust: 25,
                        // Adjustment along y-axis (top-bottom) of label relative to above number (can be negative)
                        // For vertical lines positioned top or bottom, negative values move
                        // the label toward the edge, and positive values toward the center.
                        yAdjust: 0,
                        // Whether the label is enabled and should be displayed
                        enabled: true,
                        // Text to display in label - default is null
                        content: "V = " + V
                    },

                    // Fires when the user clicks this annotation on the chart
                    // (be sure to enable the event in the events array below).
                    onClick: function (e) {
                        // `this` is bound to the annotation element
                    }
                }]
            },
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: "Estimated Cardinality (E)"
                    }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: "No. of empty registers (V)"
                    }
                }],
            }
        }
    };
}

