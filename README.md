# it12345
一个导航网,使用了bootstrap,Ajax,artTemplate,json,php等技术,需要在发布在web服务器中运行.
## 1.布局bootstrap
    bootstrap的基本模板
    ```
    <nav class="navbar it12345_nav" role="navigation" data-spy="affix" data-offset-top="200">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                        data-target="#bs-example-navbar-collapse-1">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="#">
                    <h1><img src="images/it12345_logo.png" alt=""></h1>
                </a>
            </div>
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav">
                    <li class="active"><a href="#">前端</a></li>
                    <li><a href="#">Android</a></li>
                    <li><a href="#">IOS</a></li>
                    <li><a href="#">平面设计</a></li>
                    <li><a href="#">面试招聘</a></li>
                    <li><a href="#">建议提交</a></li>
                </ul>
            </div>
        </div>
    </nav>
    ```
## 2.Ajax
    通过Ajax异步请求获取后台准备的json数据文件,通过artTemplate渲染到页面上.
## 3.数据渲染
    使用的是腾讯的artTemplate渲染引擎,使用的是原生语法.
    ```
    /*navTabs页面渲染部分*/
    function navTabsRender() {

        $navTabs = $('.nav-tabs');
        // console.log($navTabs);
        $.ajax({
            type: 'get',
            url: 'php/navTabs.php',
            data: {},
            dataType: 'json',
            success: function (data) {

                $.each($navTabs, function (i, item) {
                    var tempData = data[i].data;
                    var html = template('navTab_template', {model: tempData});
                    // console.log(html);
                    $(item).append(html)
                });
            },
            error: function (data) {
            }
        });
    }
    ```
## 4.兼容性处理插件
    1. html5shiv
    2. respond.js
    ```
      <!--[if lt ie 9]>
        <script src="lib/html5shiv/html5shiv.js"></script>
        <script src="lib/respond/respond.js"></script>
        <![end if]-->
    ```
## 5.移动端端的触摸滑动事件
    使用的是swipe.js
    ```
    /*页签页的移动端左右滑动*/
    function swipeLeftRight(){
        var $parent = $('.nav-tabs-parent');

        /*包含 web前端  android  ios三个部分*/
        $.each($parent, function () {

            var $child = $(this).find('ul');
            var lis = $child.find('li');
            var width = 0;
            $.each(lis, function () {
                console.log(111);
                width += $(this).outerWidth(true);
                console.log(width);
            });
            $child.width(width);
            it12345.iScroll({
                swipeDom: $(this).get(0),
                swipeType: 'x',
                swipeDistance: 50
            });
        });
    }
    ```