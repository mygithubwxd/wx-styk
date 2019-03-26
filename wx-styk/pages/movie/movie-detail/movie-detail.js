// pages/movie/movie-detail/movie-detail.js
var app=getApp();
var untils = require("../../until/untils.js")

Page({

  data: {
    // moviesData:{}
  },

  onLoad: function (options) {
    var publicUrl = app.globalUrl.doubanUrl;
    //获取路由跳转到当前页面时地址中携带的参数movieid
    //根据获取的参数movieid继续请求相应接口的某一条数据
    //接口是已经设计好的，不一样的接口对应不一样的功能
    var detailMovieUrl = publicUrl + "/v2/movie/subject/" + options.movieid; 
    untils.https(detailMovieUrl,this.doData)
  },

  //回调函数（处理数据）
  doData:function(resData){
    // console.log(resData)
    // 先判断一下resData中有没有信息
    if(!resData){
      return;
    }
    // 先对数据中导演的信息做一下处理
    var director = {
      avatar:"",
      name:"",
      id:""
    }
    //resData.directors是一个数组，有多个导演的信息
    if(resData.directors[0]!=null){
      if(resData.directors[0].avatars!=null){
        director.avatar = resData.directors[0].avatars.large; //导演的照片
      }
      director.name = resData.directors[0].name;
      director.id = resData.directors[0].id;
    }
    //整理出想要的数据放到一个对象中，然后挂到data中
    var temp = {
      movieImg: resData.images.large,
      country: resData.countries[0],    
      title: resData.title,
      originalTitle:resData.original_title,
      wishCount:resData.wish_count,
      commentCount: resData.comments_count,
      year:resData.year,
      genres:resData.genres,
      //使用untils文件中的方法处理数据
      stars:untils.convertToStarsArray(resData.rating.stars),
      //对星星的个数处理，返回一个带有0/1元素的数组
      score:resData.rating.average,
      //对导演的信息进行处理
      director:director,
      //对所有演员们的名字进行处理
      casts: untils.convertToCastString(resData.casts),
      //对单个演员信息处理，每一条演员信息只拿出头像+名字，放入一个对象中，再将对象放入一个数组中，最后返回一个对象数组
      castInfo: untils.convertToCastsArray(resData.casts),
      summary: resData.summary
    }
    this.setData({
      moviesData: temp
    })

    //利用方法动态设置导航条的标题和颜色
    //这里只能在onLoad中动态设置标题，因为标题是根据请求获取的数据中得到的
      wx.setNavigationBarTitle({
        //处理一下导航条的标题的长度
        title: untils.cutTitleString(this.data.moviesData.title,0,6)
    });//处理一下标题长度
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: '#4169E1',
        animation: {
          duration: 400,
          timingFunc: 'easeIn'
        }
      })
  }
    

})