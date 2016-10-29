<?php
    header('Content-Type:text/html;charset=utf-8');
    $navTabs = file_get_contents('navTabs.json');
    echo $navTabs;
?>