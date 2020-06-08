<?php
header("content-type:text/html;charset:utf-8");
include "conn.php"; //导入php文件
if(isset($_POST["username"])){
    $username=$_POST["username"];//先判断是否有被注册过
    $password=$_POST["password"];//先判断是否有被注册过
    $tell=$_POST["tell"];//先判断是否有被注册过
    $conn->query("insert into user(sid,username,password,tel) values(null,'$username','$password','$tell')");
    $res=$conn->query("select * from user where username='$username'");
    if($res->fetch_assoc()){//查询有结果表示有注册成功  跳转到登入页面
        echo "<script>
            location.href='http://localhost/Starter-JD/src/login.html';
        </script>";
    }else{
       echo "<script>
       alert('未注册成功，请重新注册');
       location.href='http://localhost/Starter-JD/src/register.html';
   </script>" ;
    }
}