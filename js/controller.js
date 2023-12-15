document.addEventListener('DOMContentLoaded', function () {
    var selectedMachineIndex = parseInt(localStorage.getItem('selectedMachineIndex'));
    var machineData = [];

    class Machine {
        constructor(name, ip, prmJyMiddleVal, prmJyDeadZone, prmJoyMinVal, prmJoyMaxVal, prmPotMinVal, prmPotMaxVal) {
            this.name = name;
            this.ip = ip;
            this.prmJyMiddleVal = prmJyMiddleVal;
            this.prmJyDeadZone = prmJyDeadZone;
            this.prmJoyMinVal = prmJoyMinVal;
            this.prmJoyMaxVal = prmJoyMaxVal;
            this.prmPotMinVal = prmPotMinVal;
            this.prmPotMaxVal = prmPotMaxVal;
        }
    }

    function setSliderValues() {
        var selectedMachine = machineData[selectedMachineIndex];
        document.getElementById('prmJyMiddleSlider').value = selectedMachine.prmJyMiddleVal;
        document.getElementById('prmJyDeadZoneSlider').value = selectedMachine.prmJyDeadZone;
        document.getElementById('prmJyMinSlider').value = selectedMachine.prmJoyMinVal;
        document.getElementById('prmJyMaxSlider').value = selectedMachine.prmJoyMaxVal;
        document.getElementById('prmPotMinSlider').value = selectedMachine.prmPotMinVal;
        document.getElementById('prmPotMaxSlider').value = selectedMachine.prmPotMaxVal;

        document.getElementById('prmJyMiddleValue').textContent = selectedMachine.prmJyMiddleVal;
        document.getElementById('prmJyDeadZoneValue').textContent = selectedMachine.prmJyDeadZone;
        document.getElementById('prmJyMinValue').textContent = selectedMachine.prmJoyMinVal;
        document.getElementById('prmJyMaxValue').textContent = selectedMachine.prmJoyMaxVal;
        document.getElementById('prmPotMinValue').textContent = selectedMachine.prmPotMinVal;
        document.getElementById('prmPotMaxValue').textContent = selectedMachine.prmPotMaxVal;
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
                updatePage();
            })
            .catch(error => {
                console.error('Error updating machine data:', error);
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
                        parseInt(item.prmJyMiddleVal),
                        parseInt(item.prmJyDeadZone),
                        parseInt(item.prmJoyMinVal),
                        parseInt(item.prmJoyMaxVal),
                        parseInt(item.prmPotMinVal),
                        parseInt(item.prmPotMaxVal)
                    ));
                });

                return machineData;
            })
            .catch(error => {
                console.error('Error fetching machine data:', error);
            });
    }

    function updatePage() {
        fetchMachineData().then(function (data) {
            machineData = data;
            setSliderValues();
        });
    }

    document.getElementById('prmJyMiddleSlider').addEventListener('input', function () {
        var selectedMachine = machineData[selectedMachineIndex];
        selectedMachine.prmJyMiddleVal = this.value;
        setMachineAPI(selectedMachine.name, 'prmJyMiddleVal', this.value);
    });

    document.getElementById('prmJyDeadZoneSlider').addEventListener('input', function () {
        var selectedMachine = machineData[selectedMachineIndex];
        selectedMachine.prmJyDeadZone = this.value;
        setMachineAPI(selectedMachine.name, 'prmJyDeadZone', this.value);
    });

    document.getElementById('prmJyMinSlider').addEventListener('input', function () {
        var selectedMachine = machineData[selectedMachineIndex];
        selectedMachine.prmJoyMinVal = this.value;
        setMachineAPI(selectedMachine.name, 'prmJoyMinVal', this.value);
    });

    document.getElementById('prmJyMaxSlider').addEventListener('input', function () {
        var selectedMachine = machineData[selectedMachineIndex];
        selectedMachine.prmJoyMaxVal = this.value;
        setMachineAPI(selectedMachine.name, 'prmJoyMaxVal', this.value);
    });

    document.getElementById('prmPotMinSlider').addEventListener('input', function () {
        var selectedMachine = machineData[selectedMachineIndex];
        selectedMachine.prmPotMinVal = this.value;
        setMachineAPI(selectedMachine.name, 'prmPotMinVal', this.value);
    });

    document.getElementById('prmPotMaxSlider').addEventListener('input', function () {
        var selectedMachine = machineData[selectedMachineIndex];
        selectedMachine.prmPotMaxVal = this.value;
        setMachineAPI(selectedMachine.name, 'prmPotMaxVal', this.value);
    });

    updatePage();
});
