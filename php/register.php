<?php
header("content-type:text/html;charset:utf-8");
include "conn.php"; //导入php文件
if(isset($_POST["username"])){
    $username=$_POST["username"];//先判断是否有被注册过
    $res=$conn->query("select * from user where username='$username'");
    if($res->fetch_assoc()){//如果查询有结果，表示这个用户名被注册了
        echo "用户名已被注册，请重新输入";
    }else{
        echo true;//表示没有被注册过
    }
}
