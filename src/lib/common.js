require('./swiper-3.4.2.jquery.min.js');
function common(){
	return {
		str:"abc",
		alertStr:function(str){
			alert(str);
		},
		swiperCarousel:function(){
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
	}
}
export default common;
// // swiper轮播图
// function swiperCarousel(){
    
// }
// function alertStr(str){
// 	alert(str)
// }