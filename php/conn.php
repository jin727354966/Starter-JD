<?php
//连接数据库
header("content-type:text/html;charset=utf-8");//防止乱码
define("HOST","localhost");//define定义常量
define("USERNAME","root");//用户名
define("PASSWORD","root");//密码
define("DBNAME","jindong");//数据库名称
$conn=@new mysqli(HOST, USERNAME, PASSWORD, DBNAME);//连接数据库
if($conn->connect_error){
    die("数据库连接错误".$conn->connect_error);
}
$conn->query("SET NAMES UTF8");
