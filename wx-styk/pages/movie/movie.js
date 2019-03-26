// pages/movie/movie.js

var app = getApp();  //通过全局函数 getApp() 可以获取全局的应用实例
var untils = require("../until/untils.js");

Page({
  data: {
    inTheaters: [],
    comingSoon: [],
    Top250: [],
    readyData:{},
    containerShow:true,
    searchPanelShow:false,
    searchData:[]
  },

  //生命周期函数，页面初始化
  onLoad: function(options) {

    var publicUrl = app.globalUrl.doubanUrl; //公共的url部分

    //每次网络请求只获取三条数据
    var inTheaters = publicUrl + "/v2/movie/in_theaters ? start = 0 & count = 3" ; //正在上映的电影地址以及查询字符串参数
    var comingSoon = publicUrl + "/v2/movie/coming_soon ? start = 0 & count = 3"; //即将上映的电影地址以及查询字符串参数
    var Top250 = publicUrl + "/v2/movie/top250 ? start = 0 &count = 3"; //豆瓣电影Top250地址以及查询字符串参数

    //页面一加载就调用封装的https方法，请求数据
    this.https(inTheaters, this.doData, "inTheaters", "正在热映"); 
    this.https(comingSoon, this.doData, "comingSoon", "即将上映");
    this.https(Top250, this.doData, "Top250", "排行榜");

    wx.showNavigationBarLoading(); //导航栏显示加载动画
  },

  //封装wx.request()请求的方法https
  https: function(url, doData, classify, classifyNmae) {
    //vue中网络请求 vue-router和axios this.$http()
    wx.request({
      url: url, //数据接口地址
      header: {
        'content-type': 'application/text' // 将application/json改为json
      },
      //请求成功的回调函数
      success(res) {
        // console.log(res.data)
        doData(res.data, classify, classifyNmae)
      }
    })
  },

  // vue中利用vue-resource和axios插件进行网络请求时，方法返回的是一个promise对象；使用then方法来处理响应结果时，then方法有两个参数，第一个参数是响应成功时的回调函数，第二个参数是响应失败时的回调函数。


  //回调函数doData处理wx.request()请求获取的数据
  //拿出需要的数据：（1）大图
  //              （2）电影名字
  //              （3）星星数量
  //              （4）评分
  //              （5）id
  doData: function(resData, classify, classifyNmae) {
    // console.log(resData)
    // console.log(resData.subjects) 是一个数组（只有三条数据）
    // 遍历获取的数组

    var moviesData = [];  //在外面定义一个数组
    // [resData.subjects].forEach(function(ele,index){

    // })
    for (var index in resData.subjects) {
      var dataSubjects = resData.subjects[index];

       //将每次请求获取3条数据中需要的数据先分别放入一个对象，然后再将对象放入一个数组中（也就是一个数组中存在三个对象）（最后3会有个数组，每个数组中存在三个对象（三条数据），因为会分别进行三次网络请求）
      var temp = {
        //处理一下标题长度
        title: untils.cutTitleString(dataSubjects.title,0,6), 
        coverageUrl: dataSubjects.images.large,
        //处理星星的个数
        stars: untils.convertToStarsArray(dataSubjects.rating.stars),
        average: dataSubjects.rating.average,
        movieid: dataSubjects.id,
      }       
      moviesData.push(temp); //放入数组中，便于后面wx:for重复渲染模板
    }
    
    //每次请求再将数组放入一个对象readyData中
    var readyData = {};
    //在对象readyData中对数据进行分类
    //每一类classify都是一个对象，该对象里面有两条数据
    //一共3个classify
    // readyData {
    //   inTheaters:{},
    //   commingSoon:{},
    //   Top250:{},
    //   searchData:{}
    // }
    readyData[classify] = {  //对象readyData的属性classify
      classifyNmae: classifyNmae,  
      moviesData: moviesData  //数组moviesData作为属性moviesData的属性值
    };
    //每次再使用this.setData()函数将对象readyData从逻辑层发往视图层（异步），同时更新this.data.classify的数据（同步）
    //this.setData()函数的参数必须是一个对象，刚好readyData就是一个对象
    //每次传过去的都是一个展开的对象（一个类classify）
    this.setData(readyData);
    // console.log(readyData)
    wx.hideNavigationBarLoading();//当拿到数据时，停止导航栏的加载动画
  },




  //跳转到more更多页面
  movieMore: function(event) {
    // 注意这里classifyname属性是小写
    var classifyname = event.currentTarget.dataset.classifyname
    wx.navigateTo({
      url: 'movie-more/movie-more?classifyname=' + classifyname
    })
  },


  //事件：跳转到电影的详情页
  //movie-template中的事件处理函数
  //在当前页面的逻辑层获取模板中通过事件触发传过来的参数（视图层-逻辑层-路由逻辑层）
  goMovieDetail: function (event) {
    var movieid = event.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: 'movie-detail/movie-detail?movieid=' + movieid
    })
  },


  //搜索框获得焦点
  onBindFocus:function(event){
    //使用this.setData({})方法
    this.setData({
      containerShow: false,  //页面内容隐藏
      searchPanelShow: true  //清除按钮出现
    })
  },


  //搜索框失去焦点
  //发送网络请求获取搜索框中输入的电影
  onBindBlur:function(event){
    //网络请求
    var publicUrl = app.globalUrl.doubanUrl; //公共的url部分
    //获取用户在input输入框中输入的搜索信息
    var text = event.detail.value;
    //使用专用的查询电影接口
    var searchUrl = publicUrl + "/v2/movie/search?q=" + text;
    // console.log(searchUrl)
    this.https(searchUrl,this.doData,"searchData","");
    wx.showNavigationBarLoading(); //导航栏加载动画
  },


  //点击清除图标
  onCancleImgTap:function(event){
    this.setData({
      containerShow: true, //页面内容出现
      searchPanelShow: false //清除按钮隐藏
    })
  }



})