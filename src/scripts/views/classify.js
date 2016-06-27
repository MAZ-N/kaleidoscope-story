var tblClassify = require('../call/classify.string');

SPA.defineView('classify',{
	html: tblClassify,
	plugins:['delegated'],
	init: {
		mySwiper:null
	},
	bindActions: {
	    'active': function (e) {
	    	//console.log(e)
	        // 视图切换
	        $(e.el).addClass('active').siblings().removeClass('active');//变色
	    	 this.mySwiper.slideTo($(e.el).index());//切换
		}
	},
	bindEvents: {
    'show': function () {
	    this.mySwiper = new Swiper('#ifgSwiper', {
	        loop: false,
	        onSlideChangeStart: function (swiper) {
	          var index = swiper.activeIndex;
	          var $lis = $('.classify nav li');
	          $lis.eq(index).addClass('active').siblings().removeClass('active');
	        }
	      })
   		}
	}
})