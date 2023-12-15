document.addEventListener('DOMContentLoaded', function () {
    var selectedMachineIndex = parseInt(localStorage.getItem('selectedMachineIndex'));
    var machineData = [];

    class Machine {
        constructor(name, ip, prmRightRampUp, prmRightRampDown, prmRightMinSpeed, prmRightMaxSpeed) {
            this.name = name;
            this.ip = ip;
            this.prmRightRampUp = prmRightRampUp;
            this.prmRightRampDown = prmRightRampDown;
            this.prmRightMinSpeed = prmRightMinSpeed;
            this.prmRightMaxSpeed = prmRightMaxSpeed;
        }
    }

    function setSliderValues() {
        var selectedMachine = machineData[selectedMachineIndex];
        document.getElementById('prmRightRampUpSlider').value = selectedMachine.prmRightRampUp;
        document.getElementById('prmRightRampDownSlider').value = selectedMachine.prmRightRampDown;
        document.getElementById('prmRightMinSpeedSlider').value = selectedMachine.prmRightMinSpeed;
        document.getElementById('prmRightMaxSpeedSlider').value = selectedMachine.prmRightMaxSpeed;

        document.getElementById('prmRightRampUpValue').textContent = selectedMachine.prmRightRampUp;
        document.getElementById('prmRightRampDownValue').textContent = selectedMachine.prmRightRampDown;
        document.getElementById('prmRightMinSpeedValue').textContent = selectedMachine.prmRightMinSpeed;
        document.getElementById('prmRightMaxSpeedValue').textContent = selectedMachine.prmRightMaxSpeed;
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
                updatePage(); // Call updatePage after setting operation
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
                        parseFloat(item.prmRightRampUp),
                        parseFloat(item.prmRightRampDown),
                        parseFloat(item.prmRightMinSpeed),
                        parseFloat(item.prmRightMaxSpeed)
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

    document.getElementById('prmRightRampUpSlider').addEventListener('input', function () {
        var selectedMachine = machineData[selectedMachineIndex];
        selectedMachine.prmRightRampUp = this.value;
        setMachineAPI(selectedMachine.name, 'prmRightRampUp', this.value);
    });

    document.getElementById('prmRightRampDownSlider').addEventListener('input', function () {
        var selectedMachine = machineData[selectedMachineIndex];
        selectedMachine.prmRightRampDown = this.value;
        setMachineAPI(selectedMachine.name, 'prmRightRampDown', this.value);
    });

    document.getElementById('prmRightMinSpeedSlider').addEventListener('input', function () {
        var selectedMachine = machineData[selectedMachineIndex];
        selectedMachine.prmRightMinSpeed = this.value;
        setMachineAPI(selectedMachine.name, 'prmRightMinSpeed', this.value);
    });

    document.getElementById('prmRightMaxSpeedSlider').addEventListener('input', function () {
        var selectedMachine = machineData[selectedMachineIndex];
        selectedMachine.prmRightMaxSpeed = this.value;
        setMachineAPI(selectedMachine.name, 'prmRightMaxSpeed', this.value);
    });

    updatePage();
});
