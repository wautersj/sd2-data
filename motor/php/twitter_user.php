<?php
require_once("twitteroauth/twitteroauth/twitteroauth.php");
require_once("twitter_connection.php"); 

$screen_name = $_GET["screen_name"];
$tweets = $connection->get("https://api.twitter.com/1.1/users/lookup.json?screen_name=".$screen_name);
 
echo json_encode($tweets);
?>