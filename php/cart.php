<?php
/* 遗留问题。判断 商品下架走不通 */
header("content-type:text/html;charset:utf-8");
include "conn.php"; //导入php文件
// print_r($sid);
if(isset($_GET["sids"])){
    $sids=$_GET["sids"];
    $arr=explode(",",$sids);//json字符串转数组类型  Array ( [0] => 1 [1] => 2 [2] => 3 ) 
    /* 遍历数组 */
    $aData=array();//创建空数组
    for($i=0;$i<count($arr);$i++){
        $res=$conn->query("select * from jdgoods where sid={$arr[$i]}");
        if($row=$res->fetch_assoc()){
            $aData[]=$row;
        }
    }
    echo json_encode($aData);
}
