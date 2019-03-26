//app.js

// App() 函数用来注册一个小程序。接受一个 Object 参数，其指定小程序的生命周期回调等。
// App() 必须在 app.js 中调用，必须调用且只能调用一次。不然会出现无法预期的后果。

//模块化：文件作用域 
// 在 JavaScript 文件中声明的变量和函数只在该文件中有效；不同的文件中可以声明相同名字的变量和函数，不会互相影响。

// 如果需要全局的数据可以在 App() 中设置，通过全局函数 getApp() 可以获取全局的应用实例
// 如：const app = getApp()
//     console.log(app.globalUrl.doubanUrl)


App({
  globalUrl: {
    doubanUrl: "https://douban.uieee.com" //设置全局的数据
  }
})