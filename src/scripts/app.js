//引入类库
require('./lib/spa.min.js');
require('./lib/swiper-3.3.1.min.js');
require('./lib/jquery-1.11.0.js');
//引入文件

require('./views/guide.js');
require('./views/index.js');
require('./views/home.js');
require('./views/find.js');
require('./views/more.js');
require('./views/classify.js');
require('./views/homeStoryContent.js');


//  SPA设置 默认引导页先显示
SPA.config({
indexView: 'guide'
});