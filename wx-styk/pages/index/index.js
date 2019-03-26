//index.js

//Page是一个页面构造器(构造函数))，这个构造器就生成了一个页面

// 类似于vue中，创建一个Vue实例
// var vm = new Vue({
//    选项参数
// })

var a = Page({

  data: {},  //data 是页面第一次渲染使用的初始数据
  
  goNews: function (event) {  
  //(1)小程序中跳转页面API可以使用<navigator url="" open-type="">
  //(2)wx.navigateTo 保留当前页面，跳转到应用内的某个页面。但是不能跳到tabbar页面
  //wx.switchTab 跳转到tabBar的页面，并关闭其他所有非tabBar页面
  //跳转时可以携带参数（查询字符串的形式）
    wx.switchTab({
      url: '../news/news', //跳转有tabBar的页面
    })
  }
})

//对于vue中，是通过路由跳转页面，有两种方式：
//(1)<router-link to=''></router-link>
//(2)路由实例方法  this.$router.push({path:"/",query:{alert:"用户删除成功!"}}); 主动跳转到主页，同样可以传参(如果是rest风格的url，使用query传参，)，该方式会在history中留下一条历史记录