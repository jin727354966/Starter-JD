<?php
header("content-type:text/html;charset:utf-8");
include "conn.php"; //导入php文件
if(isset($_POST["username"]) && isset($_POST["password"])){/* 判断用户名和密码是否一致 */
    $username1=$_POST["username"];
    $password=$_POST["password"];
    $res1=$conn->query("select * from user where username='$username1' and password='$password'");
    if($res->fetch_assoc()){//前端接收到的是一个字符串 1  用户名密码一致
        echo true;
    }else{//用户名不存在
        echo "密码与用户名不一致";
    }

}else if(isset($_POST["username"])){/* 判断用户名是否存在 */
    /* 查询 */
    $username=$_POST["username"];
    $res=$conn->query("select * from user where username='$username'");
    if($res->fetch_assoc()){//前端接收到的是一个字符串 1
        echo true;
    }else{//用户名不存在
        echo "该用户名不存在";
    }
}