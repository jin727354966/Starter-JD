<?php
/* 数据接口 */
header("content-type:text/html;charset:utf-8");
include "conn.php"; //导入php文件
$res=$conn->query("select * from jdgoods");
$arrdata=array();
for($i=0;$i<$res->num_rows;$i++){
    $arrdata[$i]=$res->fetch_assoc();
}
echo json_encode($arrdata);
