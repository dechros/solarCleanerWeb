document.addEventListener('DOMContentLoaded', function () {
    function generateRandomDataForBarChart() {
        var data = [];
        for (var i = 0; i < 4; i++) {
            data.push(Math.floor(Math.random() * 100));
        }
        return data;
    }

    var barCanvas = document.getElementById('barChart');
    var barCtx = barCanvas.getContext('2d');

    function createBarChart() {
        new Chart(barCtx, {
            type: 'bar',
            data: {
                labels: ['Left Track', 'Right Track', 'Brush', 'Controller'],
                datasets: [{
                    label: 'Error Occurancies',
                    data: generateRandomDataForBarChart(),
                    backgroundColor: 'rgba(65, 66, 68, 0.5)',
                    borderColor: 'rgba(65, 66, 68, 1)',
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
                    duration: 0
                }
            }
        });
    }
    createBarChart();
});