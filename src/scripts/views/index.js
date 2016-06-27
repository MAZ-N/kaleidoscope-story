var tblIndex = require("../call/index.string");
SPA.defineView("index",{
	html: tblIndex,
	plugins: ['delegated'],
	bindActions: {  //点击执行的事件
	    'activeTab': function (e,data) {
	    	//console.log(e)
	        $(e.el).addClass('active').siblings().removeClass('active');
	    	this.modules.content.launch(data.tag);
		}
  },
	modules:[{
		name:'content', //子视图的名字，用作后边引用的句柄
		views:['home','classify','find','more'], //定义子视图
		defaultTag:'home', //定义默认子视图
		container: '.container' //把子视图放到容器里
	}]
	
	
})
