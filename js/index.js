/**
 * Created by liyingjie on 2016/9/30.

xiugai1
 */

/*搜索部分*/
$(function () {
    $(document.querySelector("#search_list")).on('click', 'li', function () {
        $(this).addClass('active').siblings().removeClass('active');
        $('#search_btn').val($(this).html()).attr('url', $(this).attr('url'));
    });

    /*点击搜索*/
    document.querySelector('#search_btn').onclick = function () {
       if($("#search_content").val()==0){
           return false;
       }else{
         var searchUrl =$(this).attr('url')+$("#search_content").val();
           console.log($("#linkTo"));
           $("#linkTo")[0].href=searchUrl;
           $("span", $("#linkTo")).click();
       }
    };

    /*使用artTemplate对页面主体部分进行数据渲染*/



    /*tabContent页面渲染部分*/
    tabContentRender()
    /*navTabs页面渲染部分*/
    navTabsRender();
    swipeLeftRight()
    getWeather();
});

/*tabContent页面渲染部分*/
function tabContentRender() {

    $tabContent = $('.tab-content');
    $.ajax({
        type: 'get',
        url: 'php/index.php',
        data: {},
        dataType: 'json',
        success: function (data) {
            /*对三个盒子的tab-content部分分别进行渲染*/
            $.each($tabContent, function (i, item) {
                var tempData = data[i].data;
                var html = template('web_template', {model: tempData});
                $(item).append(html)
            });
        },
        error: function (data) {
        }
    });
}
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

/*jsonp跨域请求获取天气信息*/
function getWeather(){
    $local =$('.localweather');
    $.ajax({
        type:'get',
        dataType:'jsonp',
        url:'http://api.map.baidu.com/telematics/v3/weather?output=json&ak=fduQblnIbNG3ttm75vsp1ijUZO0KwkzB',
        data:{
            location:$local.val()||'北京'
        },
        success:function(data){
            // console.log(data.results[0].weather_data);
            // console.log(data.result[0].currentCity);

        }


    });

}

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
