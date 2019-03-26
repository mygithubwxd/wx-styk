//Page 是一个页面构造器，这个构造器就生成了一个页面

//小程序遵循的是CommonJs规范  
//引入newsData.js中模拟的数据（实际应用中数据一般都是通过网络请求获得）
var newsData = require("../data/newsData.js");

Page({
//data 是页面第一次渲染使用的初始数据。
//页面加载时，data将会以JSON字符串的形式由逻辑层传至视图层，因此data中的数
//据必须是可以转成JSON的类型：字符串，数字，布尔值，对象，数组。
  data: {
    indicatorDots: "true",
    indicatorColor: "rgba(0,0,255,0.5)",
    autoplay: 'true',
    interval: "2000",
    circular: "true",
    useData: ""  //引入的数据（对象数组形式）
  },

  // 必须使用setData 函数用于逻辑层更新的数据发送到视图层（异步），这样view视图层才会根据新的数据实时的进行重绘（页面重新渲染），同时改变对应的this.data 的值（同步），实现响应的数据绑定。
  // 注意：
  // 直接修改 this.data ，而不调用 this.setData函数，只能改变this.data中的数据，是无法改变页面的状态的，还会造成数据不一致。（vue中可以直接修改this.data）
  // 仅支持设置可 JSON 化的数据。
  // 单次设置的数据不能超过1024kB，请尽量避免一次设置过多的数据。
  // 请不要把 data 中任何一项的 value 设为 undefined ，否则这一项将不被设置并可能遗留一些潜在问题。


  // 生命周期函数
  // onLoad-监听页面加载
  // 一般在这个阶段发送网络请求，获取页面需要展示的初始数据
  onLoad: function (options) {  //options为页面跳转所带来的参数
    this.setData({   
      useData: newsData.initData 
    })
  },

  //点击跳转goNewsDetail事件处理函数
  goNewsDetail: function(event) {
    // console.log(event);
    // event.currentTarget.dataset.newsid 通过事件对象获取绑定事件时设置的参数，唯一id值
    var newsId = event.currentTarget.dataset.newsid;

    //路由到详情页并携带获取的newsId
    wx.navigateTo({
      url: 'news-details/news-details?newsid=' + newsId  //小程序路由传参，查询字符串的形式
    })
  }
})


// 对于vue，路由传参有两种方式：
// （1）查询字符串的形式 <router-link to: “/user/login?name=tom$pwd = 123”>
// （2）rest风格的URL <router-link to: “/user/regist/alice/456”>
// （3）router实例方法，动态的导航到一个新的URL  this.$router.push({ path: "/", query: { alert: "用户信息添加成功!" } });  

// 接收参数(一个json对象)：
// this.$router.query
// this.$router.params