var tblHome = require('../call/home.string');

SPA.defineView('home',{
	html: tblHome,
	plugins: ['delegated',{
		name:'avalon',
		options: function(vm){
			//定义一个vm空数组
			vm.homestory = [];	
		}
	}],
	init: {
		mySwiper:null,
		vm: null,
	    swiper: null,
	    sectSwiper: null,
	    homestoryArray: []
	},
	bindActions: {
	    'active': function (e) {
	    	//console.log(e)
	        // 点击切换页面
	        $(e.el).addClass('active').siblings().removeClass('active');//变色
	    	 this.sectSwiper.slideTo($(e.el).index());//切换
		},
	    'sonShow':function( e ,data ){
	    	SPA.open('homeStoryContent',{
	    		 param : {
	    		 	data:data
	    		}
	    	});
	    }
	},
	bindEvents: {
		'beforeShow': function(){
			 var that = this;

		      // 获得vm对象
		      that.vm = that.getVM();
			//调用ajax
			$.ajax({
				//url: '/kaleidoscope-story/mork/homeStory.json',
				url:'/api/gethomeStory.php',
				type:'get',//跟后端协商
				data:{
					rtype:'origin' //跟后端协商
				},
				success: function(rs){
					//让vm空数组等于json数据
					
					that.homestoryArray = rs.data;
					that.vm.homestory = rs.list;
				}
			});
		},
	    'show': function () {
	    	var that = this;
	    	//轮播
	    	that.swiper = new Swiper ('#swiper', {
				    loop: true,
				    autoplay: 3000,
				    // 分页器
				    pagination: '.swiper-pagination'
			   });  
			//滑动切换页面
		    that.sectSwiper = new Swiper('#sectSwiper', {
		        loop: false,
		        onSlideChangeStart: function (swiper) {
		          var index = swiper.activeIndex;
		          var $lis = $('.home nav li');
		          $lis.eq(index).addClass('active').siblings().removeClass('active');
		        }
		    });
  			 // 下拉刷新，上拉加载更多
      var scrollSize = 47;
      var myScroll = this.widgets.homeHotScroll;
      myScroll.scrollBy(0, -scrollSize);

      var head = $('.head img'),
          topImgHasClass = head.hasClass('up');
      var foot = $('.foot img'),
          bottomImgHasClass = head.hasClass('down');
       var loosen = $('.head b');
      myScroll.on('scroll', function () {
          var y = this.y,
              maxY = this.maxScrollY - y;
          if (y >= 0) {
              !topImgHasClass && head.addClass('up');
              loosen.text('下拉刷新...');
              return '';
          }
          if (maxY >= 0) {
              !bottomImgHasClass && foot.addClass('down');
              return '';
          }
      });

      myScroll.on('scrollEnd', function () {
          if (this.y >= -scrollSize && this.y < 0) {
              myScroll.scrollTo(0, -scrollSize);
              head.removeClass('up');
          } else if (this.y >= 0) {
              loosen.text('松开刷新...');
              // ajax下拉刷新数据

              $.ajax({
                url:'/api/gethomeStory.php',
                data: {
                  rtype: 'more'
                },
                success: function (rs) {
               		var newArray = rs.list.concat(that.vm.homestory);
	                that.vm.homestory = newArray;
	                myScroll.scrollTo(0, -scrollSize);
	                head.removeClass('up');
                }
              })

              // setTimeout(function () {
              // }, 1000);
          }

          var maxY = this.maxScrollY - this.y;
          var self = this;
          if (maxY > -scrollSize && maxY < 0) {
              myScroll.scrollTo(0, self.maxScrollY + scrollSize);
              foot.removeClass('down')
          } else if (maxY >= 0) {
			foot.addClass('down');
              // ajax上拉加载数据

              $.ajax({
                 url:'/api/gethomeStory.php',
                data: {
                  rtype: 'more'
                },
                success: function (rs) {
                	var newArray  = that.vm.homestory.concat(rs.list);
				    that.vm.homestory = newArray;
                  myScroll.scrollTo(0, self.y + scrollSize);
                  foot.removeClass('down');
                }
              });
          }
      })
	   	}
	}
	
});
