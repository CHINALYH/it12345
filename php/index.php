<?php
    header('Content-Type:text/json;charset=utf-8');
    $data = file_get_contents('it12345.json');/*从json文件中获取数据*/
    echo $data;
?>