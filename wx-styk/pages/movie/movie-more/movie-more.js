// pages/movie/movie-more/movie-more.js
var app = getApp();  //获取全局的App实例
var untils = require("../../until/untils.js");

Page({

  data: {
    moviesData: [],
    currentTotalCount: 0,  //当前页面已经获取数据的数量
    isEmpty: true
  },


  onLoad: function(options) {
    // options为页面跳转URL后面携带的参数
    // console.log(options.classifyname);
    var classifyname = options.classifyname;
    // 与vue不一样，小程序中可以通过 this.setData()函数设置data中没有的值，
    // 也必须使用该函数将数据从逻辑层发送给视图层，视图层才能更新数据，实现响应式的数据绑定
    this.setData({
      classifyname: classifyname
    })
    var publicUrl = app.globalUrl.doubanUrl; //公共的url部分

    // 根据获取到的URL中携带的参数，再进行相应地址的网络请求
    switch (options.classifyname) {
      case "正在热映":
        var allUrl = publicUrl + "/v2/movie/in_theaters"
        break;
      case "即将上映":
        var allUrl = publicUrl + "/v2/movie/coming_soon"
        break;
      case "排行榜":
        var allUrl = publicUrl + "/v2/movie/top250"
    }
    //将allUrl挂到data中，以便后面页面上拉触底事件的处理函数中需要使用对应的allUrl
    this.setData({
      allUrl: allUrl
    })

    untils.https(allUrl, this.doData); //调用网络请求方法https

    wx.showNavigationBarLoading(); //在当前页面显示导航条加载动画

  },

  //处理请求返回数据的函数doData,这里的doData函数对数据的处理不一样
  doData: function(resData) {
    var nowMoviesData = [];
    // console.log(resData)
    for (var index in resData.subjects) {
      var dataSubjects = resData.subjects[index];
     
      //拿出所有需要的数据，放到temp中   
      var temp = {  
        //处理一下标题长度
        title: untils.cutTitleString(dataSubjects.title, 0, 6), 
        coverageUrl: dataSubjects.images.large,
        stars: untils.convertToStarsArray(dataSubjects.rating.stars),
        average: dataSubjects.rating.average,
        movieid: dataSubjects.id,
      }
      nowMoviesData.push(temp); //将对应请求的每条数据放入一个空数组moviesData中（将数据放入数组中方便后续使用）
    }

//多次上拉触底请求获取数据，数据应该累加起来，而不是覆盖
//非第一次进入该页面,moviesData需要累加合并
    var totalMoviesData = []; 
    
    if (!this.data.isEmpty) {
      totalMoviesData = this.data.moviesData.concat(nowMoviesData);
    } else {
      totalMoviesData=nowMoviesData; //否则说明是第一次进入该页面，不需要进行合并
      this.data.isEmpty = false;
    } 

    this.setData({
      moviesData: totalMoviesData //将每次上拉触底获取的数据和原来的数据合并后的总数据发送到视图层并存放到逻辑层的this.data.moviesData中
    })

    //记录下当前总共已经获取了多少条数据(每次请求最多获取20条数据)
    this.data.currentTotalCount += 20; 
    //单纯的更新this.data中totalCount的值，不需要使用this.setData({})函数

    wx.hideNavigationBarLoading(); //在当前页面隐藏导航条加载动画
  },




//生命周期函数onReady
//在页面渲染时，利用小程序API动态设置导航条的标题和颜色
  onReady: function() {
    wx.setNavigationBarTitle({
      title: this.data.classifyname
    });
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#4169E1',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })
  },


 
//监听用户下拉刷新事件。（数据不累加）
//页面事件处理函数
//先在app.json全局配置的window选项中开启当前页面下拉刷新的功能
//"enablePullDownRefresh":true 
//可配置loading的颜色："backgroundTextStyle":"dark"
  onPullDownRefresh:function(){
    var self = this;
    wx.showNavigationBarLoading(); 
    setTimeout(function () {
      var refreshUrl = self.data.allUrl;
      self.data.moviesData = [];  //清空moviesData中的数据
      self.data.isEmpty = true;
      //每次下拉刷新，都只显示第一次进入该页面时的20条数据（第一次请求）
      untils.https(refreshUrl, self.doData)
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh()
    }, 800)

  },

//监听用户上拉触底事件（数据累加）
  onReachBottom: function(event) {
    var self = this;
    wx.showNavigationBarLoading();
    // console.log(event)
    setTimeout(function(){
      var nextUrl = self.data.allUrl + "?start=" +            self.data.currentTotalCount + "&count=20";  //继续请求后面20条数据
      untils.https(nextUrl, self.doData);  //继续发送相同地址的网络请求
      // wx.showNavigationBarLoading(); //继续显示导航条加载动画
      wx.hideNavigationBarLoading();
    },800)
  },

  goMovieDetail:function(event){
    var movieid=event.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: '../movie-detail/movie-detail?movieid=' + movieid
    })

  }

})