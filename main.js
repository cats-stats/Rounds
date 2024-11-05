const ctx = document.getElementById('scoreChart').getContext('2d');

// Sample data from your input (replace with your processed data)
const data = [
    { time: "20:00", davScore: 0, charScore: 0, davAction: "", charAction: "SUB OUT by FOLKES,ISAIAH" },
    { time: "20:00", davScore: 0, charScore: 0, davAction: "", charAction: "SUB OUT by BERRY,DAYLEN"},
    { time: "20:00", davScore: 0, charScore: 0, davAction: "", charAction: "SUB IN by GRAVES,NIK"},
    { time: "20:00", davScore: 0, charScore: 0, davAction: "", charAction: "SUB IN by PATTERSON,LU'CYE" },
    { time: "20:00", davScore: 0, charScore: 0, davAction: "SUB OUT by DURKIN,BOBBY", charAction: "REBOUND DEF by GRAVES,NIK"},
    { time: "20:00", davScore: 0, charScore: 0 },
    { time: "20:00", davScore: 0, charScore: 0 },
    { time: "20:00", davScore: 0, charScore: 0 },
    { time: "19:50", davScore: 0, charScore: 0 },
    { time: "19:47", davScore: 0, charScore: 0 },
    { time: "19:31", davScore: 33, charScore: 35 },
    { time: "19:31", davScore: 33, charScore: 35 },
    { time: "19:11", davScore: 35, charScore: 35 },
    { time: "19:11", davScore: 35, charScore: 35 },
    { time: "19:11", davScore: 36, charScore: 35 },
    { time: "18:50", davScore: 36, charScore: 37 },
    { time: "18:50", davScore: 36, charScore: 37 },
    { time: "18:37", davScore: 39, charScore: 37 },
    { time: "18:37", davScore: 39, charScore: 37 },
    { time: "18:11", davScore: 39, charScore: 37 },
    { time: "18:08", davScore: 39, charScore: 37 },
    { time: "18:07", davScore: 39, charScore: 37 },
    { time: "18:05", davScore: 39, charScore: 37 },
    { time: "18:02", davScore: 41, charScore: 37 },
    { time: "17:44", davScore: 41, charScore: 39 },
    { time: "17:44", davScore: 41, charScore: 39 },
    { time: "17:18", davScore: 41, charScore: 39 },
    { time: "17:16", davScore: 41, charScore: 39 },
    { time: "17:06", davScore: 41, charScore: 39 },
    { time: "17:03", davScore: 41, charScore: 39 },
    { time: "16:39", davScore: 44, charScore: 39 },
    { time: "16:39", davScore: 44, charScore: 39 },
    { time: "16:12", davScore: 44, charScore: 41 },
    { time: "16:12", davScore: 44, charScore: 41 },
    { time: "16:03", davScore: 46, charScore: 41 },
    { time: "16:03", davScore: 46, charScore: 41 },
    { time: "16:00", davScore: 46, charScore: 41 },
    { time: "16:00", davScore: 46, charScore: 41 },
    { time: "16:00", davScore: 46, charScore: 41 },
    { time: "16:00", davScore: 46, charScore: 41 },
    { time: "16:00", davScore: 46, charScore: 41 },
    { time: "15:47", davScore: 46, charScore: 44 },
    { time: "15:47", davScore: 46, charScore: 44 },
    { time: "15:34", davScore: 46, charScore: 44 },
    { time: "15:32", davScore: 46, charScore: 44 },
    { time: "15:22", davScore: 46, charScore: 46 },
    { time: "15:22", davScore: 46, charScore: 46 },
    { time: "15:13", davScore: 46, charScore: 46 },
    { time: "15:11", davScore: 46, charScore: 46 },
    { time: "15:11", davScore: 46, charScore: 46 },
    { time: "15:11", davScore: 46, charScore: 46 },
    { time: "14:55", davScore: 46, charScore: 46 },
    { time: "14:51", davScore: 46, charScore: 46 },
    { time: "14:46", davScore: 46, charScore: 46 },
    { time: "14:43", davScore: 46, charScore: 46 },
    { time: "14:32", davScore: 49, charScore: 46 },
    { time: "14:32", davScore: 49, charScore: 46 },
    { time: "14:14", davScore: 49, charScore: 46 },
    { time: "14:10", davScore: 49, charScore: 46 },
    { time: "14:03", davScore: 49, charScore: 46 },
    { time: "14:03", davScore: 49, charScore: 46 },
    { time: "13:59", davScore: 49, charScore: 46 },
    { time: "13:55", davScore: 49, charScore: 46 },
    { time: "13:55", davScore: 49, charScore: 46 },
    { time: "13:31", davScore: 52, charScore: 46 },
    { time: "13:31", davScore: 52, charScore: 46 },
    { time: "13:17", davScore: 52, charScore: 46 },
    { time: "13:17", davScore: 52, charScore: 46 },
    { time: "13:17", davScore: 52, charScore: 46 },
    { time: "13:17", davScore: 52, charScore: 46 },
    { time: "13:17", davScore: 52, charScore: 46 },
    { time: "13:17", davScore: 52, charScore: 46 },
    { time: "13:02", davScore: 52, charScore: 46 },
    { time: "13:00", davScore: 52, charScore: 46 },
    { time: "12:59", davScore: 54, charScore: 46 },
    { time: "12:51", davScore: 54, charScore: 48 },
    { time: "12:32", davScore: 57, charScore: 48 },
    { time: "12:32", davScore: 57, charScore: 48 },
    { time: "12:00", davScore: 57, charScore: 50 },
    { time: "12:00", davScore: 57, charScore: 50 },
    { time: "12:00", davScore: 57, charScore: 50 },
    { time: "12:00", davScore: 57, charScore: 50 },
    { time: "12:00", davScore: 57, charScore: 50 },
    { time: "12:00", davScore: 57, charScore: 50 },
    { time: "12:00", davScore: 57, charScore: 50 },
    { time: "12:00", davScore: 57, charScore: 50 },
    { time: "12:00", davScore: 57, charScore: 51 },
    { time: "11:42", davScore: 57, charScore: 51 },
    { time: "11:38", davScore: 57, charScore: 51 },
    { time: "11:33", davScore: 57, charScore: 51 },
    { time: "11:30", davScore: 57, charScore: 51 },
    { time: "11:25", davScore: 57, charScore: 53 },
    { time: "11:25", davScore: 57, charScore: 53 },
    { time: "11:05", davScore: 59, charScore: 53 },
    { time: "11:05", davScore: 59, charScore: 53 },
    { time: "10:43", davScore: 59, charScore: 55 },
    { time: "10:43", davScore: 59, charScore: 55 },
    { time: "10:22", davScore: 62, charScore: 55 },
    { time: "10:22", davScore: 62, charScore: 55 },
    { time: "09:55", davScore: 62, charScore: 55 },
    { time: "09:42", davScore: 62, charScore: 55 },
    { time: "09:38", davScore: 62, charScore: 55 },
    { time: "08:10", davScore: 68, charScore: 65 },
    { time: "08:05", davScore: 68, charScore: 65 },
    { time: "08:01", davScore: 68, charScore: 65 },
    // Add more data points as needed
];

// Extracting time labels and scores for both teams
const timeLabels = data.map(d => d.time);
const davScores = data.map(d => d.davScore);
const charScores = data.map(d => d.charScore);
const davActions = data.map(d => d.davAction);
const charActions = data.map(d => d.charAction);

const scoreChart = new Chart(ctx, {
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
                label: 'Charlotte',
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
                        const index = tooltipItem.dataIndex; // Get the index of the hovered item
                        const datasetIndex = tooltipItem.datasetIndex; // Get the dataset index (0 for Davidson, 1 for Charlotte)
                        const tooltipLabels = [];

                        if (datasetIndex === 0) { // Davidson
                            const davScore = davScores[index];
                            const davAction = davActions[index];
                            
                            tooltipLabels.push(`Davidson: ${davScore}`);
                            if (davAction) {
                                tooltipLabels.push(`Davidson Action: ${davAction}`);
                            }
                        } else if (datasetIndex === 1) { // Charlotte
                            const charScore = charScores[index];
                            const charAction = charActions[index];
                            
                            tooltipLabels.push(`Charlotte: ${charScore}`);
                            if (charAction) {
                                tooltipLabels.push(`Charlotte Action: ${charAction}`);
                            }
                        }

                        return tooltipLabels;
                    }
                }
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Time'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Score'
                },
                min: 0
            }
        }
    }
});
