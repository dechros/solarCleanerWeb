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

    $machineName = $_POST['machineName'];
    $columns = explode(',', $_POST['columns']);
    $values = explode(',', $_POST['values']);

    if (empty($machineName) || empty($columns) || empty($values)) {
        echo json_encode(["success" => false, "message" => "Invalid or missing POST parameters"]);
        exit;
    }

    $setClause = '';
    for ($i = 0; $i < count($columns); $i++) {
        $columnName = $conn->real_escape_string(trim($columns[$i]));
        $columnValue = $conn->real_escape_string(trim($values[$i]));
        $setClause .= "`$columnName` = '$columnValue', ";
    }

    $setClause = rtrim($setClause, ', ');

    $query = "UPDATE machine SET $setClause WHERE machineName = '$machineName'";

    $result = $conn->query($query);

    if ($result) {
        echo json_encode(["success" => true, "message" => "Machine updated successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "Error updating machine: " . $conn->error]);
    }

    $conn->close();
} else {
    echo json_encode(["success" => false, "message" => "Invalid request method"]);
}
?>
