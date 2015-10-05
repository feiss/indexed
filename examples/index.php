<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Indexed - Examples</title>
	<style> body{font: 13px monospace;} </style>
</head>
<body>
<h1>Indexed examples</h1>
<a href='$entry'>$entry</a><br>
<a href='$entry'>$entry</a><br>
<a href='$entry'>$entry</a><br>
<br>
<a href="http://github.com/feiss/indexed">back to project</a>

<?php
	$d = dir(".");
	while (false !== ($entry = $d->read())) {
	   echo "<a href='$entry'>$entry</a><br>";
	}
	$d->close();
?>
</body>
</html>