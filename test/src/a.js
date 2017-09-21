require('./css/a.css');

import Common from './lib/common.js';

// var $ = require('jquery');
// swiperCarousel();
$("#a").html("this is a page");
// document.getElementById("a").innerHTML="this is a page";
var common=new Common();
// common.alertStr("this is a page");
common.swiperCarousel();
console.log(common.str);
