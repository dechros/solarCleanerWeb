<?php
// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $host = "localhost"; // Your database host
    $username = "bludsfab_dechros"; // Your database username
    $password = "1A2a3456789qwerty*"; // Your database password
    $database = "bludsfab_machineryList"; // Your database name

    // Create a database connection
    $conn = new mysqli($host, $username, $password, $database);

    // Check for a connection error
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Get form data
    $machineID = $_POST["machineID"];
    $machineIP = $_POST["machineIP"];

    // Prepare and execute an SQL insert statement
    $sql = "INSERT INTO exampleMachine (machineID, machineIP) VALUES (?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $machineID, $machineIP);

    if ($stmt->execute()) {
        echo "Data inserted successfully!";
    } else {
        echo "Error: " . $stmt->error;
    }

    // Close the database connection
    $stmt->close();
    $conn->close();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Insert Data</title>
</head>
<body>
    <h1>Insert Data into Database</h1>
    <form method="post" action="<?php echo $_SERVER["PHP_SELF"]; ?>">
        <label for="machineID">Machine ID:</label>
        <input type="text" name="machineID" required><br><br>

        <label for="machineIP">Machine IP:</label>
        <input type="text" name="machineIP" required><br><br>

        <input type="submit" value="Submit">
    </form>
</body>
</html>
