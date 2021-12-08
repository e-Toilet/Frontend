<?php

	session_start();
	$Mail = @$_SESSION['Mail'];
	//echo $Identity;
	$role = @$_SESSION['role'];
	//echo $role;
	$Link = mysqli_connect('localhost', 'root', '1234');
	mysqli_select_db($Link,'artsa')or die($connect_error);
	$result = mysqli_query($Link,"SELECT `role` FROM `account`where `Mail` = ".$Mail);
	if(!$result)
	{
		echo ("Error: ".mysqli_error($Link));
		exit();
	}
	while ($row = mysqli_fetch_array($result)) {
		//echo 'Identity = ';
		if($row['role'] == 1)
		{
			echo "COUMSER";
		}
		if($row['role'] == 2)
		{
			echo "PHOTOGRAPHER";
		}
		//echo json_encode(array('Identity' => $row['Identity']));
	}
	
	mysqli_close($Link);
?>