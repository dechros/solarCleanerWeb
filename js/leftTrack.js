document.addEventListener('DOMContentLoaded', function () {
    var selectedMachineIndex = parseInt(localStorage.getItem('selectedMachineIndex'));
    var machineData = [];

    class Machine {
        constructor(name, ip, prmLeftRampUp, prmLeftRampDown, prmLeftMinSpeed, prmLeftMaxSpeed) {
            this.name = name;
            this.ip = ip;
            this.prmLeftRampUp = prmLeftRampUp;
            this.prmLeftRampDown = prmLeftRampDown;
            this.prmLeftMinSpeed = prmLeftMinSpeed;
            this.prmLeftMaxSpeed = prmLeftMaxSpeed;
        }
    }

    function setSliderValues() {
        var selectedMachine = machineData[selectedMachineIndex];
        document.getElementById('prmLeftRampUpSlider').value = selectedMachine.prmLeftRampUp;
        document.getElementById('prmLeftRampDownSlider').value = selectedMachine.prmLeftRampDown;
        document.getElementById('prmLeftMinSpeedSlider').value = selectedMachine.prmLeftMinSpeed;
        document.getElementById('prmLeftMaxSpeedSlider').value = selectedMachine.prmLeftMaxSpeed;

        document.getElementById('prmLeftRampUpValue').textContent = selectedMachine.prmLeftRampUp;
        document.getElementById('prmLeftRampDownValue').textContent = selectedMachine.prmLeftRampDown;
        document.getElementById('prmLeftMinSpeedValue').textContent = selectedMachine.prmLeftMinSpeed;
        document.getElementById('prmLeftMaxSpeedValue').textContent = selectedMachine.prmLeftMaxSpeed;
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
                        parseFloat(item.prmLeftRampUp),
                        parseFloat(item.prmLeftRampDown),
                        parseFloat(item.prmLeftMinSpeed),
                        parseFloat(item.prmLeftMaxSpeed)
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

    document.getElementById('prmLeftRampUpSlider').addEventListener('input', function () {
        var selectedMachine = machineData[selectedMachineIndex];
        selectedMachine.prmLeftRampUp = this.value;
        setMachineAPI(selectedMachine.name, 'prmLeftRampUp', this.value);
    });

    document.getElementById('prmLeftRampDownSlider').addEventListener('input', function () {
        var selectedMachine = machineData[selectedMachineIndex];
        selectedMachine.prmLeftRampDown = this.value;
        setMachineAPI(selectedMachine.name, 'prmLeftRampDown', this.value);
    });

    document.getElementById('prmLeftMinSpeedSlider').addEventListener('input', function () {
        var selectedMachine = machineData[selectedMachineIndex];
        selectedMachine.prmLeftMinSpeed = this.value;
        setMachineAPI(selectedMachine.name, 'prmLeftMinSpeed', this.value);
    });

    document.getElementById('prmLeftMaxSpeedSlider').addEventListener('input', function () {
        var selectedMachine = machineData[selectedMachineIndex];
        selectedMachine.prmLeftMaxSpeed = this.value;
        setMachineAPI(selectedMachine.name, 'prmLeftMaxSpeed', this.value);
    });

    updatePage();
});
