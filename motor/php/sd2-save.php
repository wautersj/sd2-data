<?php
session_start();
$DEVELOPMENT = 'false';

if($DEVELOPMENT==='true'){
	$_POST["app"] = 'development';
	$_POST["type"] = 'platform';
	$_POST["file"] = 'test.json';
	$_POST["data"] = '{}';
}

$app = $_POST["app"];
$type = $_POST["type"];
	
$prefix = 'SD2';
$file = $_POST["file"];
$data = $_POST['data'];

$namespace = $prefix . '-' . $file;

$root = '../../feeds/';
$folder = $root . $app . '/';

$time = time() * 1000;


//make sure feeds directory exists.
if(!file_exists($root)){
	mkdir($root);
}

//make sure feed sub directory exists.
if(!file_exists($folder)){
	mkdir($folder);
}

if($data){
	$myfile = fopen($folder . $file, "w") or die("Unable to open file!");
	fwrite($myfile, '{"name": "' . $app . '",');
	fwrite($myfile, '"type": "' . $type . '",');
	fwrite($myfile, '"time": "' . $time . '",');
	fwrite($myfile, '"inDev": "' . $DEVELOPMENT . '",');
	fwrite($myfile, '"data": ' . $data . '}');
	fclose($myfile);
	echo 'ok';
} else {
	echo 'error: post parameter data not set.';
}