
// Function to create an initial chart
function createChart(data) {
    const ctx = document.getElementById('lineChart').getContext('2d');
    return new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.labels,
            datasets: [
                {
                    label: 'Data over the last 20 minutes',
                    data: data.data,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 2,
                    fill: false,
                },
            ],
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Time',
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: 'Value',
                    },
                },
            },
        },
    });
}

// Function to update the chart with new data
function updateChart(chart, newData) {
    chart.data.labels = newData.labels;
    chart.data.datasets[0].data = newData.data;
    chart.update();
}

// Function to connect to SSE and update the chart
function connectToSSE() {
    const eventSource = new EventSource('/sse');
    eventSource.onmessage = function(event){
        const newData = JSON.parse(event.data);
        updateChart(lineChart, newData);
    };
}

// Initial data for the chart
const initialData = {
    labels: [],
    data: [],
};

const lineChart = createChart(initialData);
connectToSSE();

