document.addEventListener('DOMContentLoaded', function () {
    var barCanvas = document.getElementById('barChart');
    var barCtx = barCanvas.getContext('2d');
    var machineData = [];
    var selectedMachineIndex = parseInt(localStorage.getItem('selectedMachineIndex'));
    class Machine {
        constructor(name, ip, errLeftCnt, errRightCnt, errBrushCnt, errControllerCnt) {
            this.name = name;
            this.ip = ip;
            this.errLeftCnt = errLeftCnt;
            this.errRightCnt = errRightCnt;
            this.errBrushCnt = errBrushCnt;
            this.errControllerCnt = errControllerCnt;
        }

        getTotalErrors() {
            return this.errLeftCnt + this.errRightCnt + this.errBrushCnt + this.errControllerCnt;
        }

        getErrorCountsArray() {
            return [this.errLeftCnt, this.errRightCnt, this.errBrushCnt, this.errControllerCnt];
        }
    }

    function updatePage() {
        fetchMachineData().then(function (data) {
            machineData = data;

            if (selectedMachineIndex >= machineData.length) {
                selectedMachineIndex = Math.max(0, machineData.length - 1);
            }

            generateMachineList();
            handleMachineClick();
            createBarChart();
        });
    }

    function setMachineAPI(machineName, columns, values) {
        var apiUrl = "../api/setMachine.php";

        return fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `machineName=${encodeURIComponent(machineName)}&columns=${encodeURIComponent(columns)}&values=${encodeURIComponent(values)}`,
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error('Error updating machine data:', error);
            });
    }

    function deleteMachineApi(machineName) {
        var apiUrl = "../api/deleteMachine.php";
    
        return fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `machineName=${encodeURIComponent(machineName)}`,
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error('Error deleting machine:', error);
            });
    }

    function fetchMachineData() {
        var apiUrl = "../api/getMachine.php";

        return fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ machineName: null }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                machineData = [];

                data.forEach(item => {
                    machineData.push(new Machine(
                        item.machineName,
                        item.machineIp,
                        parseInt(item.errLeftCnt),
                        parseInt(item.errRightCnt),
                        parseInt(item.errBrushCnt),
                        parseInt(item.errControllerCnt)
                    ));
                });

                return machineData;
            })
            .catch(error => {
                console.error('Error fetching machine data:', error);
            });
    }

    function clearErrors() {
        var confirmed = window.confirm('Are you sure you want to clear errors?');
        if (confirmed) {
            var machineToUpdate = machineData[selectedMachineIndex];
            setMachineAPI(
                machineToUpdate.name,
                'errLeftCnt,errRightCnt,errBrushCnt,errControllerCnt',
                '0,0,0,0'
            ).then(updatePage);
        }
    }
    
    function deleteMachine() {
        var confirmed = window.confirm('Are you sure you want to delete the machine?');
        if (confirmed) {
            var machineToUpdate = machineData[selectedMachineIndex];
            deleteMachineApi(machineToUpdate.name).then(updatePage);
        }
    }
    

    document.getElementById('clearErrorsBtn').addEventListener('click', clearErrors);
    document.getElementById('deleteMachineBtn').addEventListener('click', deleteMachine);

    function createBarChart() {
        var labels = ['Left Track', 'Right Track', 'Brush', 'Controller'];
        var errorCounts = machineData[selectedMachineIndex].getErrorCountsArray();

        var chartData = {
            labels: labels,
            datasets: [{
                label: 'Error Occurrences',
                data: errorCounts,
                backgroundColor: 'rgba(65, 66, 68, 0.5)',
                borderColor: 'rgba(65, 66, 68, 1)',
                borderWidth: 1
            }]
        };

        if (barCtx.chart) {
            barCtx.chart.data = chartData;
            barCtx.chart.update();
        } else {
            barCtx.chart = new Chart(barCtx, {
                type: 'bar',
                data: chartData,
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
    }

    function handleMachineClick() {
        var machineWrappers = document.querySelectorAll('.machine-list-wrapper');
        machineWrappers.forEach(function (wrapper, index) {
            if (index === selectedMachineIndex) {
                wrapper.style.color = 'var(--secondary-color)';
            } else {
                wrapper.style.color = 'var(--text-color)';
            }
        });
    }

    function generateMachineList() {
        var middleDiv = document.querySelector('.middle-div');
        middleDiv.innerHTML = '';

        machineData.forEach(function (machine, index) {
            var totalErrors = machine.getTotalErrors();

            var machineWrapper = document.createElement('div');
            machineWrapper.classList.add('machine-list-wrapper');

            var machineName = document.createElement('span');
            machineName.classList.add('machine-name');
            machineName.textContent = `${machine.name} (IP: ${machine.ip})`;

            var notificationBubble = document.createElement('div');
            notificationBubble.classList.add('notification-bubble');
            notificationBubble.textContent = totalErrors;

            machineWrapper.appendChild(machineName);
            machineWrapper.appendChild(notificationBubble);

            machineWrapper.addEventListener('click', function () {
                selectedMachineIndex = index;
                localStorage.setItem('selectedMachineIndex', selectedMachineIndex);
                handleMachineClick();
                createBarChart();
            });

            middleDiv.appendChild(machineWrapper);
        });
    }

    updatePage();
});
