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

    if (isset($_POST['machineName']) && !empty($_POST['machineName'])) {
        $machineName = $_POST['machineName'];
        $query = "DELETE FROM machine WHERE machineName = '$machineName'";
        $result = $conn->query($query);

        if ($result) {
            echo json_encode(["success" => true, "message" => "Machine deleted successfully"]);
        } else {
            echo json_encode(["success" => false, "message" => "Error deleting machine: " . $conn->error]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Invalid or missing POST parameters"]);
    }

    $conn->close();
} else {
    echo json_encode(["success" => false, "message" => "Invalid request method"]);
}

?>
