const ctx = document.getElementById('scoreChart').getContext('2d');
let scoreChart;
let fullData = [];

// Function to initialize or update the chart
function updateChart(timeLabels, davScores, charScores, davActions, charActions) {
    if (scoreChart) {
        scoreChart.destroy(); // Clear existing chart before updating
    }

    scoreChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: timeLabels,
            datasets: [
                {
                    label: 'Davidson',
                    data: davScores,
                    borderColor: 'red',
                    fill: '+1',
                    tension: 0.1
                },
                {
                    label: 'William Peace',
                    data: charScores,
                    borderColor: 'green',
                    fill: '-1',
                    tension: 0.1
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Score Over Time'
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            const index = tooltipItem.dataIndex;
                            const datasetIndex = tooltipItem.datasetIndex;
                            const tooltipLabels = [];

                            if (datasetIndex === 0) { // Davidson
                                const davScore = davScores[index];
                                const davActionArray = davActions[index];
                                tooltipLabels.push(`Davidson: ${davScore}`);
                                davActionArray.forEach(action => {
                                    tooltipLabels.push(`Davidson Action: ${action}`);
                                });
                            } else if (datasetIndex === 1) { // William Peace
                                const charScore = charScores[index];
                                const charActionArray = charActions[index];
                                tooltipLabels.push(`William Peace: ${charScore}`);
                                charActionArray.forEach(action => {
                                    tooltipLabels.push(`William Peace Action: ${action}`);
                                });
                            }

                            return tooltipLabels;
                        }
                    }
                }
            }
        }
    });
}

// Function to filter data by round
function filterDataByRound(half, round) {
    const startMinute = 20 - (round - 1) * 4; // Start from 20, decrement by 4 for each round
    const endMinute = startMinute - 4; // Each interval is 4 minutes

    const filteredData = fullData.filter(d => {
        const [minutes, seconds] = d.Time.split(':').map(Number);
        return (
            d.Half === half &&
            minutes < startMinute && // Exclude start minute
            minutes >= endMinute // Include end minute
        );
    });

    // Group data by time to handle multiple actions at the same timestamp
    const groupedData = filteredData.reduce((acc, row) => {
        const time = row.Time;
        if (!acc[time]) {
            acc[time] = {
                'Davidson Score': row['Davidson Score'],
                'William Peace Score': row['William Peace Score'],
                'Davidson': [],
                'William Peace': []
            };
        }
        if (row['Davidson']) acc[time]['Davidson'].push(row['Davidson']);
        if (row['William Peace']) acc[time]['William Peace'].push(row['William Peace']);
        return acc;
    }, {});

    const timeLabels = Object.keys(groupedData);
    const davScores = timeLabels.map(time => groupedData[time]['Davidson Score']);
    const charScores = timeLabels.map(time => groupedData[time]['William Peace Score']);
    const davActions = timeLabels.map(time => groupedData[time]['Davidson']);
    const charActions = timeLabels.map(time => groupedData[time]['William Peace']);

    // Update the chart with grouped data
    updateChart(timeLabels, davScores, charScores, davActions, charActions);
}

// Function to filter data by half
function filterDataByHalf(half) {
    const filteredData = fullData.filter(d => half === 'both' || d.Half === half);

    // Group data by time to handle multiple actions at the same timestamp
    const groupedData = filteredData.reduce((acc, row) => {
        const time = row.Time;
        if (!acc[time]) {
            acc[time] = {
                'Davidson Score': row['Davidson Score'],
                'William Peace Score': row['William Peace Score'],
                'Davidson': [],
                'William Peace': []
            };
        }
        if (row['Davidson']) acc[time]['Davidson'].push(row['Davidson']);
        if (row['William Peace']) acc[time]['William Peace'].push(row['William Peace']);
        return acc;
    }, {});

    const timeLabels = Object.keys(groupedData);
    const davScores = timeLabels.map(time => groupedData[time]['Davidson Score']);
    const charScores = timeLabels.map(time => groupedData[time]['William Peace Score']);
    const davActions = timeLabels.map(time => groupedData[time]['Davidson']);
    const charActions = timeLabels.map(time => groupedData[time]['William Peace']);

    // Update the chart with grouped data
    updateChart(timeLabels, davScores, charScores, davActions, charActions);
}

// Event listener for CSV file input
document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        Papa.parse(file, {
            header: true,
            dynamicTyping: true,
            complete: function(results) {
                fullData = results.data; // Store full data for filtering

                // Initial view with the full game
                filterDataByRound('both', 1);
            }
        });
    }
});

// Add event listeners for half and round buttons
document.getElementById('firstHalfButton').addEventListener('click', () => {
    filterDataByHalf(1);
});
document.getElementById('secondHalfButton').addEventListener('click', () => {
    filterDataByHalf(2);
});
document.getElementById('bothHalvesButton').addEventListener('click', () => {
    filterDataByHalf('both');
});

// Create and add event listeners for round buttons
const buttonContainer = document.querySelector('.button-container');
for (let i = 1; i <= 10; i++) {
    const roundButton = document.createElement('button');
    roundButton.innerText = `Round ${i}`;
    roundButton.addEventListener('click', () => {
        const half = i <= 5 ? 1 : 2;
        const round = i <= 5 ? i : i - 5;
        filterDataByRound(half, round);
    });
    buttonContainer.appendChild(roundButton);
}
