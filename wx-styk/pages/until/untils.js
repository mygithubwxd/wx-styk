//小程序的模块化遵循的是CommonJS规范

//将需要用到的方法定义在一个单独的js文件中，module.exports导出方法

//处理星星的个数
//stars:50 > > 5颗星
//[1,1,0,0,0]
function convertToStarsArray(stars) {
  var num = stars.substring(0, 1);  //相当于slice方法，不改变原数组
  var starsArray = [];  //定义一个空数组
  //该空数组最后要放五个元素
  for (var i = 0; i < 5; i++) {
    if (i < num) {
      starsArray.push(1)
    } else {
      starsArray.push(0)
    }
  }
  return starsArray;
}


//封装wx.request()请求的方法https
function https(url, doData, classify, classifyNmae) {
  wx.request({
    url: url, //数据接口地址
    method: "GET",
    header: {
      'content-type': 'application/text' // 将application/json改为json
    },
    success(res) {
      // console.log(res.data)
      //在请求成功的回调函数中，使用数据处理函数对数据进行处理
      doData(res.data, classify, classifyNmae)
    }
  })
}


//对标题的长度进行处理
function cutTitleString(title, start, end) {
  if (title.length > end) {
    title = title.substring(start, end) + "...";
  }
  return title;
}


//对所以演员们对名字进行处理，名字之间用“/”隔开
function convertToCastString(casts) {
  var castsjoin = "";
  casts.forEach(function(ele){
    castsjoin += ele.name + " / "
  })
  //去掉最后的" / "，substring()方法不改变原字符串
  var castsfinal = castsjoin.substring(0, castsjoin.length - 3);
  return castsfinal; //返回一个字符串
}


//处理单个演员信息：只拿出头像+名字
//在获取的整个数据中，遍历每一条数据，分别取出需要的信息，先放入一个对象，再放入一个数组中，最后返回一个对象数组
function convertToCastsArray(casts) {
  var castsArray = [];
  for (var index in casts) {
    //每一个对象：头像+名字
    var cast = {
      img: casts[index].avatars ? casts[index].avatars.large : "",
      name: casts[index].name
    }
    castsArray.push(cast); //再将对象放到数组中
  }
  return castsArray; //返回一个对象数组
}


//导出方法
module.exports = {
  convertToStarsArray: convertToStarsArray,
  https: https,
  convertToCastString: convertToCastString,
  convertToCastsArray: convertToCastsArray,
  cutTitleString: cutTitleString
}