<?php
/* 遗留问题。判断 商品下架走不通 */
header("content-type:text/html;charset:utf-8");
include "conn.php"; //导入php文件

if(isset($_GET["sid"])){
    $sid=$_GET["sid"];
    $res=$conn->query("select * from jdgoods where sid=$sid");
    // if($res->fetch_assoc()){
        echo json_encode($res->fetch_assoc());
    // }else{
        // echo "商品已下架";
    // }
}