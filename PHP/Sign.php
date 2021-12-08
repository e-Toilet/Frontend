<?php
session_start();
if(isset($_SESSION["Mail"])){
  header("Location: index.php");
}else{
  if(isset($_POST["s_mail"])){
    $data = check_id_pass($_POST["s_mail"], $_POST["s_password"], $_POST["Provider_or_not"]);
        
       if($data){
          if($data["Provider_or_not"] == 1){
              if($_POST["Provider_or_not"] == "一般登入"){
                  $data[role]=1;
                  signin_success($data);
              }else if($_POST["Provider_or_not"] == "攝影師登入"){
                  $data[role]=2;
                  signin_success($data);
              }
          }else{
              if($data["Provider_or_not"] == 0){
                 if($_POST["Provider_or_not"] == "一般登入"){
                 $data[role]=1;
                 signin_success($data);
                 }else if($_POST["Provider_or_not"] == "攝影師登入"){
                  show_html("<p><font color='white'><strong><您還未成為攝影師唷！></strong></font></p>");
              }
          }
          
      }
       }else{
          show_html("<p><font color='white'><strong>帳號或密碼錯誤！</strong></font></p>");
      }
      
  }else{
    show_html();
  }
}

function check_id_pass($Mail, $Password,$Provider_or_not){
  mysql_connect("localhost", "root", "1234");
  mysql_query("set names utf8");
  mysql_select_db("artsa");

  $sql = "SELECT * FROM account WHERE Mail = '$Mail'";

  if($result = mysql_query($sql)){
    $row = mysql_fetch_array($result);
    if($Password === $row["Password"]){
      return $row;
    }
  }

  return false;
}

function signin_success($data){
  $_SESSION[Mail] = $data[Mail];
  $_SESSION[Password] = $data[Password];
  $_SESSION[Phone] = $data[Phone];
  $_SESSION[Provider_or_not] = $data[Provider_or_not];
  $_SESSION[role]=$data[role];
    
  header("Location: index.php");
}

function show_html($error=''){
  ?>
  <?php
header("Content-Type:text/html; charset=utf-8");
?>


<!DOCTYPE html>
<html lang="en">
  <head>
    <title>ARTSA</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <link href="https://fonts.googleapis.com/css?family=Poppins:200,300,400,500,600,700" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Playfair+Display:400,400i,700,700i" rel="stylesheet">

    <link rel="stylesheet" href="css/open-iconic-bootstrap.min.css">
    <link rel="stylesheet" href="css/animate.css">

    <link rel="stylesheet" href="css/owl.carousel.min.css">
    <link rel="stylesheet" href="css/owl.theme.default.min.css">
    <link rel="stylesheet" href="css/magnific-popup.css">

    <link rel="stylesheet" href="css/aos.css">

    <link rel="stylesheet" href="css/ionicons.min.css">

    <link rel="stylesheet" href="css/bootstrap-datepicker.css">
    <link rel="stylesheet" href="css/jquery.timepicker.css">


    <link rel="stylesheet" href="css/flaticon.css">
    <link rel="stylesheet" href="css/icomoon.css">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/tabstyle.css">
    <link rel='stylesheet' href='https://use.fontawesome.com/releases/v5.7.0/css/all.css' integrity='sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ' crossorigin='anonymous'>
    <script src="js/jquery-3.2.1.min.js"></script>
</head>

<body>




    <!-- END nav -->
    <nav class="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
        <div class="container">
            <a>ARTSA</a>
        </div>
    </nav>


    <section class="ftco-section ftc-no-pb ftc-no-pt">
        <div class="container">



            <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div class="modal-dialog model-dialog-centered modal-lg" role="document" style="width:800px">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                                &times;
                            </button>
                        </div>
                        <div class="modal-body">
                            <tr height=50>
                                <td>Mail:</td>
                                <td><input type="text" name="name" class="lable"></td>
                            </tr>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" type="submit">傳送至信箱
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <br><br><br>
            <div class="pb-md-3">
                <div class="login-wrap">
                    <div class="login-html">
                        <input id="tab-1" type="radio" name="tab" class="sign-in" checked>
                        <label for="tab-1" class="tab">Sign In</label>
                        <input id="tab-2" type="radio" name="tab" class="sign-up">
                        <label for="tab-2" class="tab">Register</label>
                        <div class="login-form">



                            <form method="post" action="Sign.php">
                                <div class="sign-in-htm">
                                    <div class="group">
                                        <label for="user" class="label">Mail</label>
                                        <input name="s_mail" id="Mail" type="text" class="input" required="required">
                                    </div>
                                    <div class="group">
                                        <label for="pass" class="label">Password</label>
                                        <input name="s_password" id="Password" type="password" minlength="6" pattern="[A-Za-z0-9]{2,100}" class="input" data-type="password" required="required">
                                    </div><br>
                                    <div>
                                        <ul class="ftco-social d-flex">
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <li class="ftco-animate"><a href="#" style="color: aliceblue"><span class="icon-facebook"></span></a></li>
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <li class="ftco-animate"><a href="#" style="color: aliceblue"><span class="icon-google-plus"></span></a></li>
                                        </ul>
                                    </div><br>
                                    <? echo $error; ?>
                                    <div class="group">
                                            <input type="submit" class="button" value="一般登入" name="Provider_or_not">
                                            <input type="submit" class="button" value="攝影師登入" name="Provider_or_not">
                                    </div>
                                    <div>
                                        <p style="color: gainsboro">------------------------------------------------------------------------</p>
                                    </div>
                                    <div class="foot-lnk">
                                        <div style="display:inline; width: 100%" align=left>
                                            <button class="button button1" data-toggle="modal" data-target="#myModal">Forgot Password?</button>
                                        </div>

                                    </div>
                                </div>
                            </form>





                           
                            <form method="post" action="regis.php">
                               <table>
                                <div class="sign-up-htm">
                                    <div class="group">
                                        <label for="user" class="label">Mail</label>
                                        <input name="r_mail" type="text" placeholder="aaa@mail.com" class="input" required="required">
                                    </div>
                                    <div class="group">
                                        <label for="pass" class="label">Password</label>
                                        <input name="r_password" type="password" placeholder="至少六位數以上英數字組合" required pattern="[A-Za-z0-9]{6,20}" class="input" data-type="password" required="required">
                                    </div>
                                    <!---<div class="group">
<label for="pass" class="label">Repeat Password</label>
<input id="Password" type="password" minlength="6" placeholder="????????????" required pattern="(?=^[A-Za-z0-9]{6,999}$)((2=.*[a-z])(2=.*[0-9]))^.*$" class="input" data-type="password" required="required">
</div>--->
                                    <div class="group">
                                        <label for="phone" class="label">Phone</label>
                                        <input name="r_phone" type="phone" maxlength="12" placeholder="0987 654 321" pattern="09[1-8][0-9]([\-|\s]?)[0-9]{3}\1[0-9]{3}" class="input" data-type="phone" required="required">
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;&nbsp;&nbsp;&nbsp;
                                        <a href="#" style="color: aliceblue">&nbsp;&nbsp;<u>Got Verification Code</u></a>
                                    </div>
                                    <div class="group">
                                        <label for="pass" class="label">Verification Code</label>
                                        <input name="r_code" type="text" class="input">
                                    </div><br>
                                    <div>
                                        <ul class="ftco-social d-flex">
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <li class="ftco-animate"><a href="#" style="color: aliceblue"><span class="icon-facebook"></span></a></li>
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <li class="ftco-animate"><a href="#" style="color: aliceblue"><span class="icon-google-plus"></span></a></li>
                                        </ul>
                                    </div><br>
                                    <div class="group">
                                        <input type="submit" class="button" value="註冊完成">
                                    </div>
                                </div>
                                </table>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>





    <!-- loader -->



    <script src="js/jquery.min.js"></script>
    <script src="js/jquery-migrate-3.0.1.min.js"></script>
    <script src="js/popper.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/jquery.easing.1.3.js"></script>
    <script src="js/jquery.waypoints.min.js"></script>
    <script src="js/jquery.stellar.min.js"></script>
    <script src="js/owl.carousel.min.js"></script>
    <script src="js/jquery.magnific-popup.min.js"></script>
    <script src="js/aos.js"></script>
    <script src="js/jquery.animateNumber.min.js"></script>
    <script src="js/bootstrap-datepicker.js"></script>
    <script src="js/jquery.timepicker.min.js"></script>
    <script src="js/scrollax.min.js"></script>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBVWaKrjvy3MaE7SQ74_uJiULgl1JY0H2s&sensor=false"></script>
    <script src="js/google-map.js"></script>
    <script src="js/main.js"></script>


</body></html>


<style>
body{
margin:0;
font:500 16px/18px 'Open Sans',sans-serif;
}
*,:after,:before{box-sizing:border-box}
.clearfix:after,.clearfix:before{content:'';display:table}
.clearfix:after{clear:both;display:block}
a{color:inherit;text-decoration:none}
.login-wrap{
width:100%;
margin:auto;
max-width:525px;
min-height:635px;
position:relative;
    background-color: none;
box-shadow:0 12px 15px 0 rgba(0,0,0,.24),0 17px 50px 0 rgba(0,0,0,.19);
}
.login-html{
width:100%;
height:100%;
position:absolute;
padding:50px 70px 50px 70px;
background:	#007799;
    opacity:0.4;
}
.login-html .sign-in-htm,
.login-html .sign-up-htm{
top:0;
left:0;
right:0;
bottom:0;
position:absolute;
transform:rotateY(180deg);
backface-visibility:hidden;
transition:all .4s linear;
}
.login-html .sign-in,
.login-html .sign-up,
.login-form .group .check{
display:none;
}
.login-html .tab,
.login-form .group .label,
.login-form .group .button{
text-transform:uppercase;
    border-color: #007799;
}
.login-html .tab{
font-size:25px;
margin-right:15px;
padding-bottom:5px;
margin:0 15px 10px 0;
display:inline-block;
border-bottom:0px solid transparent;
}
.login-html .sign-in:checked + .tab,
.login-html .sign-up:checked + .tab{
color:#fff;
border-color:#007799;
}
.login-form{
min-height:345px;
position:relative;
perspective:1000px;
transform-style:preserve-3d;
}
.login-form .group{
margin-bottom:15px;
}
.login-form .group .label,
.login-form .group .input,
.login-form .group .button{
width:100%;
color:#fff;
display:block;
}
.login-form .group .input,
.login-form .group .button{
border:none;
padding:10px 15px;
border-radius:25px;
background:rgba(255,255,255,.3);
}
.login-form .group input[data-type="password"]{
text-security:circle;
webkit-text-security:circle;
}
.login-form .group .label{
color:#FFF0F5;
font-size:12.5px;
}
.login-form .group .button{
background:#8B4513;
}
.login-form .group label .icon{
width:15px;
height:15px;
border-radius:2px;
position:relative;
display:inline-block;
background:rgba(255,255,255,.1);
}
.login-form .group label .icon:before,
.login-form .group label .icon:after{
content:'';
width:10px;
height:2px;
background:#fff;
position:absolute;
transition:all .2s ease-in-out 0s;
}
.login-form .group label .icon:before{
left:3px;
width:5px;
bottom:6px;
transform:scale(0) rotate(0);
}
.login-form .group label .icon:after{
top:6px;
right:0;
transform:scale(0) rotate(0);
}
.login-form .group .check:checked + label{
color:#fff;
}
.login-form .group .check:checked + label .icon{
background:#1161ee;
}
.login-form .group .check:checked + label .icon:before{
transform:scale(1) rotate(45deg);
}
.login-form .group .check:checked + label .icon:after{
transform:scale(1) rotate(-45deg);
}
.login-html .sign-in:checked + .tab + .sign-up + .tab + .login-form .sign-in-htm{
transform:rotate(0);
}
.login-html .sign-up:checked + .tab + .login-form .sign-up-htm{
transform:rotate(0);
}
.hr{
height:2px;
margin:60px 0 50px 0;
background:rgba(255,255,255,.2);
}
.foot-lnk{
text-align:center;
}
    </style>
    
<style>
           /* ???? */
        .button {
            background-color: #8D703B; /* Green */
            border: none;
            border-radius: 8px;
            color: white;
            padding: 10px 28px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 16px;
            margin: 4px 2px;
            -webkit-transition-duration: 0.4s; /* Safari */
            transition-duration: 0.4s;
            cursor: pointer;
        }
        .button1 {
            background-color: white; 
            color: #8D703B; 
            border: 2px solid  #8D703B;
        }
        
          
           /* ????? */
           ul { /* ??ul???????? */
                margin: 0;
                padding: 0;
                list-style: none;
            }
            ul.drop-down-menu {
                border: #fff 0px solid;
                display: inline-block;
                font-size: 13px;
            }
            ul.drop-down-menu li {
                position: relative;
                white-space: nowrap;
                border-right: #fff 0px solid;
            }
            ul.drop-down-menu > li:last-child {
                border-right: none;
            }
            ul.drop-down-menu > li {
                float: left; /* ??????????*/
            }
             ul.drop-down-menu a {/* ????????*/
                background-color: #fff;
                color: #333;
                display: block;
                padding: 0 50px;
                text-decoration: none;
                line-height: 40px;
            }
            ul.drop-down-menu a:hover { /* ????????*/
                background-color: #8D703B;
                color: #fff;
            }
            ul.drop-down-menu ul li:last-child {
                border-bottom: none;
            }
            
          .arrow-bottom{
              display:inline-block;
              margin-left: 5px;
              border-top: 4px solid black;
              border-right: 4px solid transparent;
              border-left: 4px solid transparent;
              width: 1px;
              height: 1px;
          }
    
.modal-header {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  webkit-box-align: start;
  ms-flex-align: start;
  align-items: flex-start;
  webkit-box-pack: justify;
  ms-flex-pack: justify;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid #e9ecef;
  border-top-left-radius: 0.3rem;
  border-top-right-radius: 0.3rem; }
.modal-header .close {
    padding: 1rem;
    margin: -1rem -1rem -1rem auto; }
.modal-title {
  margin-bottom: 0;
  line-height: 1.5; }
.modal-body {
  position: relative;
  webkit-box-flex: 1;
  ms-flex: 1 1 auto;
  flex: 1 1 auto;
  padding: 1rem; }
.modal-footer {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  webkit-box-align: center;
  ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: end;
  -ms-flex-pack: end;
  justify-content: flex-end;
  padding: 1rem;
  border-top: 1px solid #e9ecef; }
  .modal-footer > :not(:first-child) {
    margin-left: .25rem; }
  .modal-footer > :not(:last-child) {
    margin-right: .25rem; }
      </style>


  
<?
}
?>