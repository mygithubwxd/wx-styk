//模拟的网络请求的数据（每一条数据都是不一样的）
var initData = [
  {
   //相当于数组中对象元素的索引
    "newsid": "0",   //每一条数据都应该有一个唯一的id
  //百度联想词项目中，是手动定义了一个nowIndex,用来记录当前获取数据的某一条数据的索引值，实现按键的上下按动，输入框同步改变
    "authorIcon": 'http://img4.imgtn.bdimg.com/it/u=3551520764,1318725966&fm=26&gp=0.jpg',
    "authorName": "小希",
    "authorDate": "18/12/4",
    "title": "随遇而安",
    "articleImg": 'http://img4.imgtn.bdimg.com/it/u=3551520764,1318725966&fm=26&gp=0.jpg',
    "articleText": "基于微信小程序轻快的特点，我们拟定了小程序界面设计指南和建  议。 设计指南建立在充分尊重用户知情权与操作权的基础之上。旨在微信生态体系内，建立友好、高效、一致的用户体验，同时最大程度适应和支持不同需求，实现用户与小程序服务方的共赢。",
    "articleLikeIcon": ['../img/s-3.jpg', '../img/s-1.jpg'],
    "articleLikeText": ["12", "30"],
    "music": {
      "src": "http://fs.w.kugou.com/201903041433/e1dd6ed317668c15c2d56990a2b8c31b/G149/M02/19/1B/dZQEAFvUq8SACM8tADzjstSsVcQ141.mp3",
      "title": "光年之外",
      "singer": "邓紫棋",
      " coverImgUrl": ""
    }
  },
  {
    "newsid": "1",
    "authorIcon": 'http://img5.imgtn.bdimg.com/it/u=238039960,4175226785&fm=26&gp=0.jpg',
    "authorName": "小楠",
    "authorDate": "18/12/3",
    "title": "岁月静好", 
    "articleImg": 'http://img5.imgtn.bdimg.com/it/u=238039960,4175226785&fm=26&gp=0.jpg',
    "articleText": "基于微信小程序轻快的特点，我们拟定了小程序界面设计指南和建  议。 设计指南建立在充分尊重用户知情权与操作权的基础之上。旨在微信生态体系内，建立友好、高效、一致的用户体验，同时最大程度适应和支持不同需求，实现用户与小程序服务方的共赢。",
    "articleLikeIcon": ['../img/s-3.jpg', '../img/s-1.jpg'],
    "articleLikeText": ["15", "38"],
    "music": {
      "src": "http://fs.w.kugou.com/201903041440/5785bf1ca85759fe104e2b84036b810b/G146/M05/0A/18/cpQEAFvkx-SAUc44ADrsFckYCQg260.mp3",
      "title": "空空如也",
      "singer": "胡66",
      " coverImgUrl": ""
    }
  },
  {
    "newsid": "2",
    "authorIcon": 'http://hbimg.b0.upaiyun.com/6c5360f6f999e0d32e73f9ad1204bfead0a8a8941d2a42-LQ2oJS_fw658',
    "authorName": "小楠",
    "authorDate": "18/12/3",
    "title": "岁月静好",
    "articleImg": 'http://hbimg.b0.upaiyun.com/6c5360f6f999e0d32e73f9ad1204bfead0a8a8941d2a42-LQ2oJS_fw658',
    "articleText": "基于微信小程序轻快的特点，我们拟定了小程序界面设计指南和建  议。 设计指南建立在充分尊重用户知情权与操作权的基础之上。旨在微信生态体系内，建立友好、高效、一致的用户体验，同时最大程度适应和支持不同需求，实现用户与小程序服务方的共赢。",
    "articleLikeIcon": ['../img/s-3.jpg', '../img/s-1.jpg'],
    "articleLikeText": ["15", "38"],
    "music": {
      "src": "http://fs.w.kugou.com/201903041440/5785bf1ca85759fe104e2b84036b810b/G146/M05/0A/18/cpQEAFvkx-SAUc44ADrsFckYCQg260.mp3",
      "title": "空空如也",
      "singer": "胡66",
      " coverImgUrl": ""
    }
  },
  {
    "newsid": "3",
    "authorIcon": 'http://img3.3lian.com/2013/s1/51/d/114.jpg',
    "authorName": "小楠",
    "authorDate": "18/12/3",
    "title": "岁月静好",
    "articleImg": 'http://img3.3lian.com/2013/s1/51/d/114.jpg',
    "articleText": "基于微信小程序轻快的特点，我们拟定了小程序界面设计指南和建  议。 设计指南建立在充分尊重用户知情权与操作权的基础之上。旨在微信生态体系内，建立友好、高效、一致的用户体验，同时最大程度适应和支持不同需求，实现用户与小程序服务方的共赢。",
    "articleLikeIcon": ['../img/s-3.jpg', '../img/s-1.jpg'],
    "articleLikeText": ["15", "38"],
    "music": {
      "src": "http://fs.w.kugou.com/201903041440/5785bf1ca85759fe104e2b84036b810b/G146/M05/0A/18/cpQEAFvkx-SAUc44ADrsFckYCQg260.mp3",
      "title": "空空如也",
      "singer": "胡66",
      " coverImgUrl": ""
    }
  }
]


//CommmonJs规范 导出数据
module.exports = {
  initData: initData
}