var tblhsContent = require('../call/homeStoryContent.string')

SPA.defineView('homeStoryContent',{
	html: tblhsContent,
	plugins:['delegated',{
		name:'avalon',
		options:function(vm){
			//console.log(vm)
			vm.imgsrc = "";
	        vm.title = "";
	        vm.content = "";
	        vm.audio_link="";
	        vm.cname = "";
	        vm.isShowLoading = true;
		}
	}],
	
	bindActions:{
		'back': function(){
			this.hide(); 
		}
	},
	bindEvents:{
		'show': function(){
			var vm = this.getVM();
			var list = this.param.data;
			//console.log(list)
			$.ajax({
				type:"get",
				url:'/api/gethomeStoryContent.php',
				data:{	
					id:list.id
				},
				success: function(rs){
					vm.title = rs.article.title;
					vm.imgsrc = rs.article.thumbnail;
					vm.content = rs.article.content;
					vm.audio_link = rs.article.audio_link;
					vm.cname = rs.article.cname;
				}
			});
		}
	}
	
});
