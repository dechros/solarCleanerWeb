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

    $query = "SELECT * FROM user";

    if (isset($_POST['userName']) && !empty($_POST['userName'])) {
        $userName = $_POST['userName'];
        $query .= " WHERE userName = '$userName'";
    }

    $result = $conn->query($query);

    if ($result) {
        $data = $result->fetch_all(MYSQLI_ASSOC);
        echo json_encode($data);
    } else {
        echo "Error: " . $conn->error;
    }
    $conn->close();
}

?>
