<?php 
header('Access-Control-Allow-Origin: *');
session_start();

$consumerkey = "ykT6KyN8qOZPnSvSQDJOA";
$consumersecret = "RIHxE3StucK5Jx53dBXP220lq8gXRzJaMpZiRIwBYg";
$accesstoken = "39249623-AsUqvyw8BPDXXaTjsIjwFWkuXSJh1WxTxINPvD0N6";
$accesstokensecret = "eq77PMFRPtKHVA2WvXuoBwMbqfKuoMEDTsxEgzwTisze6";
 
function getConnectionWithAccessToken($cons_key, $cons_secret, $oauth_token, $oauth_token_secret) {
  $connection = new TwitterOAuth($cons_key, $cons_secret, $oauth_token, $oauth_token_secret);
  return $connection;
}
 
$connection = getConnectionWithAccessToken($consumerkey, $consumersecret, $accesstoken, $accesstokensecret);
?>