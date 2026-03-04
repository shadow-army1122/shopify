<?php
$host = '127.0.0.1';
$port = '5432';
$user = 'postgres';
$dbname = 'postgres';

$passwords = ['', 'postgres', 'password', 'admin', 'root', '123456'];

foreach ($passwords as $pass) {
    echo "Trying password: '$pass' ... ";
    try {
        $pdo = new PDO("pgsql:host=$host;port=$port;dbname=$dbname", $user, $pass);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        echo "Success!\n";

        $stmt = $pdo->query("SELECT 1 FROM pg_database WHERE datname = 'marketplace'");
        $exists = $stmt->fetchColumn();

        if (!$exists) {
            echo "Creating database 'marketplace'...\n";
            $pdo->exec("CREATE DATABASE marketplace");
            echo "Database created successfully.\n";
        } else {
            echo "Database 'marketplace' already exists.\n";
        }

        // Write the working password to a temp file or just output it clearly
        file_put_contents('db_password.txt', $pass);
        exit(0);

    } catch (PDOException $e) {
        // echo "Failed: " . $e->getMessage() . "\n";
        echo "Failed.\n";
        // Continue to next password
    }
}

echo "All passwords failed.\n";
exit(1);
