<?php
header("Access-Control-Allow-Origin: *");

$url = $_GET['url'];
$feed = file_get_contents($url);
echo $feed;