var tblGuide = require("../call/guide.string");

SPA.defineView("guide",{
	html: tblGuide,
	
	plugins: ['delegated'],
	bindEvents : {
		show:function(){
	    	setTimeout(function(){
		      SPA.open('index');
	    	}, 2000); 
		}	
	}
})
