require('./style/a.css');
import Common from './lib/common.js';
import List from './components/list/list.js';

var common=new Common();
common.swiperCarousel();

var list = new List();
var html=list.tpl({
	data:[
		{	
			name:'apple',
			con:'this is apple'
		},
		{	
			name:'pear',
			con:'this is pear'
		}
	]
});
$("#a").html(html);

var systemtime=common.getSystemTime();
console.log(systemtime);

window.getToken=function(token){
	alert(token)
}

$("#test-jump").on("click",function(){
	var this_url=common.fixed_url+"newtrain/index.html";
	alert(this_url);
	Android.callDetail(this_url,"");
})


