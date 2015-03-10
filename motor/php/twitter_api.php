<?php
require_once("twitteroauth/twitteroauth/twitteroauth.php");
require_once("twitter_connection.php");

$q = 'statuses/user_timeline.json?screen_name=kiekenfuif&count=1';
$tweets = $connection->get("https://api.twitter.com/1.1/" . $q);

echo json_encode($tweets);
?>
