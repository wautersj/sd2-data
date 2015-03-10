<?php
$DEVELOPMENT = 'false';

require_once("twitteroauth/twitteroauth/twitteroauth.php");

header('Access-Control-Allow-Origin: *');
session_start();

if($DEVELOPMENT==='true'){
	$_POST["consumerKey"] = 'ykT6KyN8qOZPnSvSQDJOA';
	$_POST["consumerSecret"] = 'RIHxE3StucK5Jx53dBXP220lq8gXRzJaMpZiRIwBYg';
	$_POST["accessToken"] = '39249623-AsUqvyw8BPDXXaTjsIjwFWkuXSJh1WxTxINPvD0N6';
	$_POST["accessTokenSecret"] = 'eq77PMFRPtKHVA2WvXuoBwMbqfKuoMEDTsxEgzwTisze6';

	$_POST["q"] = 'wautersj';
	$_POST["count"] = 10;
}

$consumerKey = $_POST["consumerKey"];
$consumerSecret = $_POST["consumerSecret"];
$accessToken = $_POST["accessToken"];
$accessTokenSecret = $_POST["accessTokenSecret"];
 
function getConnectionWithAccessToken($cons_key, $cons_secret, $oauth_token, $oauth_token_secret) {
  $connection = new TwitterOAuth($cons_key, $cons_secret, $oauth_token, $oauth_token_secret);
  return $connection;
}
 
$connection = getConnectionWithAccessToken($consumerKey, $consumerSecret, $accessToken, $accessTokenSecret);


$q = $_POST["q"];
$count = $_POST["count"];

$tweets = $connection->get("https://api.twitter.com/1.1/search/tweets.json?q=".$q."&count=".$count);
 
echo json_encode($tweets);
?>