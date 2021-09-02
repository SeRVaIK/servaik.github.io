<?php

$data = [
	"name" => $_POST['name'],
	"email" => $_POST['mail'],
	"textarea" => $_POST['comment']
];

$connection = new PDO('mysql:host=localhost;dbname=honeyhunters', 'root', '');
$sql = 'INSERT INTO post (name, email, textarea) VALUES (:name, :email, :textarea)';
$statement = $connection->prepare($sql);
$result = $statement->execute($data);

$result1 = $connection->prepare("SELECT name, email, textarea FROM `post` ORDER BY id DESC LIMIT 1");
$result1->execute();
$backUp = $result1->fetch(PDO::FETCH_ASSOC);
echo json_encode($backUp, JSON_FORCE_OBJECT);
?>