document.addEventListener('DOMContentLoaded', function () {
    // Generate random data for the line chart
    function generateRandomData() {
        var data = [];
        for (var i = 0; i < 10; i++) {
            data.push(Math.floor(Math.random() * 100));
        }
        return data;
    }

    // Generate random data for the pie chart
    function generateRandomDataForPieChart() {
        var data = [];
        for (var i = 0; i < 5; i++) {
            data.push(Math.floor(Math.random() * 100));
        }
        return data;
    }

    // Generate random data for the bar chart
    function generateRandomDataForBarChart() {
        var data = [];
        for (var i = 0; i < 5; i++) {
            data.push(Math.floor(Math.random() * 100));
        }
        return data;
    }

    // Get the canvas elements and create the charts
    var lineCanvas = document.getElementById('lineChart');
    var pieCanvas = document.getElementById('pieChart');
    var barCanvas = document.getElementById('barChart');
    var cell4Canvas = document.getElementById('cell4Chart');
    var lineCtx = lineCanvas.getContext('2d');
    var pieCtx = pieCanvas.getContext('2d');
    var barCtx = barCanvas.getContext('2d');

    function createLineChart() {
        new Chart(lineCtx, {
            type: 'line',
            data: {
                labels: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
                datasets: [
                    {
                        label: 'Random Data 1',
                        data: generateRandomData(),
                        backgroundColor: 'rgba(0, 123, 255, 0.2)',
                        borderColor: 'rgba(0, 123, 255, 1)',
                        borderWidth: 1,
                        pointRadius: 3,
                        pointBackgroundColor: 'rgba(0, 123, 255, 1)',
                        pointBorderColor: 'rgba(0, 123, 255, 1)'
                    },
                    {
                        label: 'Random Data 2',
                        data: generateRandomData(),
                        backgroundColor: 'rgba(255, 0, 0, 0.2)',
                        borderColor: 'rgba(255, 0, 0, 1)',
                        borderWidth: 1,
                        pointRadius: 3,
                        pointBackgroundColor: 'rgba(255, 0, 0, 1)',
                        pointBorderColor: 'rgba(255, 0, 0, 1)'
                    },
                    // Add more datasets for additional lines
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        display: true,
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        display: true,
                        grid: {
                            display: true
                        }
                    }
                },
                animation: {
                    duration: 0 // Disable animation
                }
            }
        });
    }

    function createPieChart() {
        new Chart(pieCtx, {
            type: 'pie',
            data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
                datasets: [{
                    label: 'Random Data',
                    data: generateRandomDataForPieChart(),
                    backgroundColor: [
                        'rgba(255, 0, 0, 0.5)',
                        'rgba(0, 0, 255, 0.5)',
                        'rgba(255, 255, 0, 0.5)',
                        'rgba(0, 255, 0, 0.5)',
                        'rgba(128, 0, 128, 0.5)'
                    ],
                    borderColor: [
                        'rgba(255, 0, 0, 1)',
                        'rgba(0, 0, 255, 1)',
                        'rgba(255, 255, 0, 1)',
                        'rgba(0, 255, 0, 1)',
                        'rgba(128, 0, 128, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    function createBarChart() {
        new Chart(barCtx, {
            type: 'bar',
            data: {
                labels: ['A', 'B', 'C', 'D', 'E'],
                datasets: [{
                    label: 'Random Data',
                    data: generateRandomDataForBarChart(),
                    backgroundColor: 'rgba(255, 0, 0, 0.5)',
                    borderColor: 'rgba(255, 0, 0, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        display: true,
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        display: true,
                        grid: {
                            display: true
                        }
                    }
                },
                animation: {
                    duration: 0 // Disable animation
                }
            }
        });
    }

    createLineChart();
    createPieChart();
    createBarChart();
});