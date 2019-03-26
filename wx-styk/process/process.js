  //小程序开发流程

  //视图层 .wxml
  //逻辑层 .js
  //样式 .wxss
  //配置文件 .json


// 配置 .json
// 全局配置  app.json
// 页面配置

// app.js
// App() 函数用来注册一个小程序。接受一个 Object 参数
// 如果需要全局的数据可以在 App() 中设置，通过全局函数 getApp() 可以获取全局的应用实例

// 逻辑层 .js
//      -注册程序
//      -场景值
//      -注册页面
//          -初始数据
//          -生命周期回调函数
//          -页面事件处理函数
//          -组件事件处理函数
//          -route
//          -setData
//          -页面生命周期
//      -路由
//      -模块化
//      -API

// 视图层 .wxml
//      -WXML
//          -数据绑定
//          -列表渲染
//          -条件渲染
//          -模板
//          -事件
//              -WXS响应事件
//          -引用




  //组件  view - div
  //      text - span
  //      swiper  swiper-item 轮播图

  //小程序API   路由
  //           缓存
  //           交互（提示框、模态框、操作菜单）






//pages  总文件夹

//data  本地模拟的网络数据

//img  图片

//util  工具文件（公共的代码）

//index  入口页面

//news  tabBar新闻页面
//     -news-template  新闻模板  路由+参数  API
//     -news-details  每条新闻的详情页面   (1)获取路由参数  生命周期函数onLoad:functions(options){}  (2)收藏按钮的切换 storage  消息提示框wx.showToast()  （3）背景音乐 var manager = wx.getBackgroundAudioManager()

//tabBar   app.json中配置（pagePath配置每一个tab点击跳转的页面，list选项接受一个数组，只能配置最少 2 个、最多 5 个 tab，数组中的每一项都是一个对象，注意 "position":"bottom"）


//movie  tabBar电影页面
//   -movie-list-template  整行电影模板
//        -movie-template 单个电影模板
//              -star-template 星星模板

  // 注意：引入模版（.wxml和.wxss文件都要引入）
  // 引入.wxml   <import src="item.wxml" />
  // 引入.wxss文件    @import "../movie-template/movie-template.wxss";
  // 用; 表示语句结束


//more  更多页面
  //wx.showNavigationBarLoading(); 在当前页面显示导航条加载动画
  //wx.setNavigationBarTitle({})  动态的设置当前页面导航条的标题（不是固定的标题）
  //wx.setNavigationBarColor({})  动态的设置当前页面导航条的颜色
  //"enablePullDownRefresh":true 是否开启下拉刷新
  //this.setData()函数的参数必须是一个对象
  //页面事件处理函数



