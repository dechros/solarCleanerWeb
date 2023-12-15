document.addEventListener('DOMContentLoaded', function () {
    var selectedMachineIndex = parseInt(localStorage.getItem('selectedMachineIndex'));
    var machineData = [];

    class Machine {
        constructor(name, ip, prmBrushRampUp, prmBrushRampDown, prmBrushMinSpeed, prmBrushMaxSpeed) {
            this.name = name;
            this.ip = ip;
            this.prmBrushRampUp = prmBrushRampUp;
            this.prmBrushRampDown = prmBrushRampDown;
            this.prmBrushMinSpeed = prmBrushMinSpeed;
            this.prmBrushMaxSpeed = prmBrushMaxSpeed;
        }
    }

    function setSliderValues() {
        var selectedMachine = machineData[selectedMachineIndex];
        document.getElementById('prmBrushRampUpSlider').value = selectedMachine.prmBrushRampUp;
        document.getElementById('prmBrushRampDownSlider').value = selectedMachine.prmBrushRampDown;
        document.getElementById('prmBrushMinSpeedSlider').value = selectedMachine.prmBrushMinSpeed;
        document.getElementById('prmBrushMaxSpeedSlider').value = selectedMachine.prmBrushMaxSpeed;

        document.getElementById('prmBrushRampUpValue').textContent = selectedMachine.prmBrushRampUp;
        document.getElementById('prmBrushRampDownValue').textContent = selectedMachine.prmBrushRampDown;
        document.getElementById('prmBrushMinSpeedValue').textContent = selectedMachine.prmBrushMinSpeed;
        document.getElementById('prmBrushMaxSpeedValue').textContent = selectedMachine.prmBrushMaxSpeed;
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
                        parseFloat(item.prmBrushRampUp),
                        parseFloat(item.prmBrushRampDown),
                        parseFloat(item.prmBrushMinSpeed),
                        parseFloat(item.prmBrushMaxSpeed)
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

    document.getElementById('prmBrushRampUpSlider').addEventListener('input', function () {
        var selectedMachine = machineData[selectedMachineIndex];
        selectedMachine.prmBrushRampUp = this.value;
        setMachineAPI(selectedMachine.name, 'prmBrushRampUp', this.value);
    });

    document.getElementById('prmBrushRampDownSlider').addEventListener('input', function () {
        var selectedMachine = machineData[selectedMachineIndex];
        selectedMachine.prmBrushRampDown = this.value;
        setMachineAPI(selectedMachine.name, 'prmBrushRampDown', this.value);
    });

    document.getElementById('prmBrushMinSpeedSlider').addEventListener('input', function () {
        var selectedMachine = machineData[selectedMachineIndex];
        selectedMachine.prmBrushMinSpeed = this.value;
        setMachineAPI(selectedMachine.name, 'prmBrushMinSpeed', this.value);
    });

    document.getElementById('prmBrushMaxSpeedSlider').addEventListener('input', function () {
        var selectedMachine = machineData[selectedMachineIndex];
        selectedMachine.prmBrushMaxSpeed = this.value;
        setMachineAPI(selectedMachine.name, 'prmBrushMaxSpeed', this.value);
    });

    updatePage();
});
