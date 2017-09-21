// 线上地址
// var fixed_url="https://www.uutianfu.com/";   
   
// 测试地址
var fixed_url="https://www.5ialways.cn/";

// 项目访问地址
var project_url="film-fhjy/";
var file_url=fixed_url+project_url;

require('./swiper-3.4.2.jquery.min.js');

// 封装ajax,ajaxRequest('GET', url, true, data, callback);
function ajaxRequest(method, url, async, data, callback) {
    var this_url=fixed_url+url;
    $.ajax({
        type: method,
        url: this_url,
        async:async,
        dataType: 'json',
        data:data,
        success: callback
    });
}
function ajaxRequestProject(method, url, async, data, callback) {
    var this_url=project_url+url;
    ajaxRequest(method, this_url, async, data, callback)
}

// 获取服务器系统当前时间
function getSystemTime(){
    var systemtime="";
    var url="app/mapmer/getSystemTime";
    var data={}
    ajaxRequest('GET', url, false, data, callback);
    function callback(result) {
        if(result.code==200){
            systemtime=result.data.systemtime;
        }
    }
    return systemtime;//2017-08-03 10:30:47
}
// 图片轮播
function swiperCarousel(){
	var mySwiper = new Swiper ('.swiper-container', {
        loop: true,
        pagination: '.swiper-pagination',
        autoplay : 2000,
        observer:true,//修改swiper自己或子元素时，自动初始化swiper  
        observeParents:true,//修改swiper的父元素时，自动初始化swiper  
        autoplayDisableOnInteraction : false//用户操作swiper之后，是否禁止autoplay
    });
    mySwiper.startAutoplay(); 
    $(".swiper-container").hover(function(){
        mySwiper.stopAutoplay(); 
    },function(){
        mySwiper.startAutoplay(); 
    });
}

function common(){
	return {
		'fixed_url':fixed_url,
		'project_url':project_url,
		'file_url':file_url,
		'ajaxRequest':ajaxRequest,
		'ajaxRequestProject':ajaxRequestProject,
		'getSystemTime':getSystemTime,
		'swiperCarousel':swiperCarousel
	};
}
export default common;