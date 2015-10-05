<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Indexed - Examples</title>
	<style> body{font: 13px monospace;} </style>
</head>
<body>
<h1>Indexed examples</h1>

<?php
	$d = dir(".");
	while (false !== ($entry = $d->read())) {
		if (substr($entry, -4)!='html') continue;
	   echo "<a href='$entry'>$entry</a><br>";
	}
	$d->close();
?>

<br>
<a href="http://github.com/feiss/indexed">&larr; back to project</a>

</body>
</html>