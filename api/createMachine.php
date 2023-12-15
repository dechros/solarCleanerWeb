<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $host = "localhost";
    $username = "bludsfab_dechros";
    $password = "1A2a3456789qwerty*";
    $database = "bludsfab_robot";

    $conn = new mysqli($host, $username, $password, $database);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $machineName = $conn->real_escape_string(trim($_POST['machineName']));
    $machineIp = $conn->real_escape_string(trim($_POST['machineIp']));

    if (empty($machineName) || empty($machineIp)) {
        echo json_encode(["success" => false, "message" => "Invalid or missing POST parameters"]);
        exit;
    }

    $columns = implode(',', array_keys($_POST));
    $values = implode(',', array_map(function ($value) use ($conn) {
        return "'" . $conn->real_escape_string(trim($value)) . "'";
    }, $_POST));

    $query = "INSERT INTO machine ($columns) VALUES ($values)";

    $result = $conn->query($query);

    if ($result) {
        echo json_encode(["success" => true, "message" => "Machine created successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "Error creating machine: " . $conn->error]);
    }

    $conn->close();
} else {
    echo json_encode(["success" => false, "message" => "Invalid request method"]);
}

?>
