//获取模拟的数据（实际应用中，我们是通过网络请求获取的）
var newsData = require("../../data/newsData.js");


Page({
  /**
   * 页面的初始数据
   */
  data: {
    isPlayer: false, //默认是false 处于未播放状态
    newsid:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // options为页面跳转所带来的参数（url后面的参数）
    // console.log(options.newsid)  
    // options.newsid相当于索引,就可以取到模拟的对象数组数据中的某一条对应的对象数据，实际开发中，我们都是根据options.newsid发送网络请求，获取相应的数据


    // 根据页面跳转所带来的参数（url后面的参数），这里参数相当于索引，再选择总的数组数据中的某条数据

    //要想实现响应式的数据绑定，必须使用setData 函数，将逻辑层更新的数据发送到视图层（异步），这样view视图层才会根据新的数据实时的进行重绘（页面重新渲染），同时将 this.data 中的 useData 对应的值改变成 newsData.initData（同步）
    //该函数的参数是应该一个对象
    //newsData.initData[options.newsid]刚好就是一个对象
    this.setData(newsData.initData[options.newsid]);//这样.wxml文件中才能使用.js文件中数据，展示相应的页面


    // 将newsid存储到data中，以便onLoad函数外的其他函数使用
    this.setData({
      newsid: options.newsid  //newsid
    })
  

    // 小程序数据缓存
    // wx.setStorageSync("key", "data"); 
    // wx.setStorageSync("key1", "data1");
    // wx.removeStorageSync("key1");
    // wx.clearStorageSync();  //清除所有
    // wx.getStorageSync("key1");

    // key为newsCollect的一条缓存，记录了每一条数据的收藏图标的状态
    // var newsCollect = {
    //   0:true,
    //   1:false,
    //   2:false
    // }

    //onLoad第一次进入页面时，在缓存中获取收藏按钮的状态
    var newsCollect = wx.getStorageSync("newsCollect");
    //如果缓存中该newsCollect对象存在(说明之前收藏过)
    if (newsCollect) {
      var newCollect = newsCollect[options.newsid];
      // 将获取的状态发送给视图层，同时将数据存储到data中
      //也就是说.wxml文件中只能直接获取data中实现定义的数据，如果在逻辑层.js文件中数据发生改变，或者获取了新的数据，必须通过this.setData()函数将数据发送给视图层，视图层才层获取到新的数据，实现响应式的数据更新
      this.setData({
        collected: newCollect
      })
    } else {
      //如果缓存中该newsCollect对象不存在
      //则定义一个空{}newsCollect，newsid作为属性名，属性值默认为false
      var newsCollect = {};
      newsCollect[options.newsid] = false;
      wx.setStorageSync("newsCollect", newsCollect); //添加初始缓存
    }
  },


  //点击事件处理函数
  //如果点击了收藏按钮，就要切换收藏按钮的图片状态
  collectData: function(event) {
    // newsCollect是所有数据的集合（缓存） 
    // 取出缓存数据newsCollect
    var newsCollect = wx.getStorageSync("newsCollect");
    // newsCollect相当于一个空{} 将this.data.newsid作为空{}的属性名，
    // 如果没有这个属性名，就给空{}添加这个属性名，属性值为true/false(取反)
    // 根据this.data.newsid取出newsCollect数据集合中相应的属性值
    // 如果属性值是收藏状态true，则变成非收藏状态false（视图层切换图片）
    newsCollect[this.data.newsid] = !newsCollect[this.data.newsid];

    // 更新视图，使用this.setData()方法，将数据发送给视图层，并同步更新this.data中的数据
    this.setData({
      collected: newsCollect[this.data.newsid]
    })

    // 使用小程序数据缓存的方法，重新设置整个newsCollect缓存数据（覆盖原来的）
    wx.setStorageSync("newsCollect", newsCollect);
   

  //和vue不一样，小程序中获取data中的数据是this.data.newsid的方式
  //而vue中是this.newsid的方式

 

    //收藏状态的消息提示框
    wx.showToast({
      title: this.data.collected == true ? "收藏成功" : "取消收藏",
      icon: "success",
      duration: 800,
      mask: true
    })
  },


  //点击事件showModule
  showModule: function() {
    //显示模态框
    // wx.showModal({
    //   title: '提示',
    //   content: '这是一个模态弹窗',
    //   confirmColor: "#f5f",
    //   // showCancel:false, 是否显示取消按钮
    //   success(res) {
    //     if (res.confirm) {
    //       console.log('用户点击确定')
    //     } else if (res.cancel) {
    //       console.log('用户点击取消')
    //     }
    //   }
    // }),
    //显示操作菜单
    wx.showActionSheet({
      itemList: ['分享到微信', '分享到QQ', '分享到微博'],
      success(res) {
        console.log(res.tapIndex) //用户点击的按钮序号，从上到下的顺序，从0开始
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },


  //页面事件处理函数
  //onShareAppMessage：监听用户点击页面内转发按钮（<button> 组件 open-type="share"）或右上角菜单“转发”按钮的行为，并自定义转发内容。
  //注意：只有定义了此事件处理函数，右上角菜单才会显示“转发”按钮
  onShareAppMessage: function(res) {  //参数res是一个对象
    if (res.from === 'button') {  //转发事件来源。button：页面内转发按钮；menu：右上角转发菜单
      console.log(res.target) //如果 from 值是 button，则 target 是触发这次转发事件的 button，否则为 undefined
    }

    //此事件需要 return 一个 Object，用于自定义转发内容
    return {
      title: newsData.initData[this.data.newsid].title,//转发标题，当前小程序名称
      path: '/pages/news/news-detail/news-detail',//转发路径，当前页面 path ，必须是以 / 开头的完整路径
      // imageUrl: "../../img/1-1.png"  //自定义图片路径,不自定义转发图片的情况下，默认会取当前页面，从顶部开始，高度为 80% 屏幕宽度的图像作为转发图片
    }
  },



  //背景音乐
  //控制背景音乐的小程序API
  playMusic:function(){
    var manager = wx.getBackgroundAudioManager();
    manager.src = "newsData.initData[that.data.newsid].music.src";
    manager.title = "111";
    manager.coverImgUrl = "newsData.initData[that.data.newsid].music.coverImgUrl";
    manager.onCanplay(function(){
      this.pause();
    })
    manager.onPause(function () {
      this.play();
    })
  }


// 如何让小程序背景音乐循环播放
// onLoad: function () {
//     const backgroundAudioManager = wx.getBackgroundAudioManager()
//     player()
//     function player() {
//       backgroundAudioManager.title = '此时此刻'
//       backgroundAudioManager.src = '播放url'
//       backgroundAudioManager.onEnded(() => {
//         player()
//       })
//     }
//   }


  // playMusic: function(event) {
  //   var that = this;  //保存this,指向Page实例，以便更深层的函数使用
    //使用后台播放器播放音乐。对于微信客户端来说，只能同时有一个后台音乐在播放。       当用户离开小程序后，音乐将暂停播放；当用户在其他小程序占用了音乐播放器，原       有小程序内的音乐将停止播放。
    // wx.getBackgroundAudioPlayerState({
    //   // dataUrl:"../../心的构造.mp3"
    //   success: function(res) {
    //       //获取后台音乐播放状态。
    //       //0暂停中 1播放中 2没有音乐播放
    //     var status = res.status;
    //     //判断当前音乐是否在播放
        
    //     if (status != 1) { //如果没有播放
    //       //则开始播放
    //       wx.playBackgroundAudio({
    //         dataUrl: newsData.initData[that.data.newsid].music.src,
    //         title: newsData.initData[that.data.newsid].music.title,
    //         coverImgUrl: newsData.initData[that.data.newsid].music.coverImgUrl
    //       })
    //       //数据的修改、更新、添加必须使用this.setData()函数，才能实现视图层的响应式数据绑定
    //       that.setData({
    //         isPlayer: true //更改data中isPlayer的值，并来切换播放状态的图片
    //       })
    //     } else { //如果正在播放，点击会暂停
    //       wx.pauseBackgroundAudio();
    //       that.setData({
    //         isPlayer: false
    //       })
    //     }
    //   }
    // })
  // }


})