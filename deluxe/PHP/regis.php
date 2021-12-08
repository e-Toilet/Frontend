<?php
    
    $link = mysql_connect("localhost", "root", "1234");
    mysql_query("set names utf8");
    mysql_select_db("artsa",$link);

    $Mail=$_POST['r_mail'];
    $Password=$_POST['r_password'];
    $Phone=$_POST['r_phone'];

    $sql = "INSERT INTO `account`(Mail, Password, Phone) VALUES ('$Mail','$Password','$Phone')";

    mysql_query($sql,$link);

  
    header("Location:Sign.php");

?>