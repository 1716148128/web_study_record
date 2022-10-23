;(function (Function) {
  // 手写 call 方法
  // call 的特征
  // 1. call() -> test() 相当于调用了函数
  // 2. this -> call this 函数 this 指向第一个参数
  // 3. call() 从第二个参数开始就传进了函数里面

  Function.prototype.myCall = function (ctx) {
    // call 第一个值一定要是一个引用值，普通值没有意义,所以我们把普通值也转换为一个对象
    ctx = ctx ? Object(ctx) : window
    // 一个函数谁调用它，函数的 this 指向就指向调用者
    // 保存调用者，也就是那个函数 // 示例：test.myCall({}, 1, 2)
    ctx.originFn = this

    // 保存参数的数组
    var args = []

    // 拿到 myCall 的第二个参数开始到结束的所有参数作为 test 的实参列表
    for (var i = 1; i < arguments.length; i++) {
      // 传 arguments[i] 字符串进去，然后后面传进 eval , eval 函数会将传入的字符串当做 JavaScript 代码进行执行
      args.push('arguments[' + i + ']')

      // 第二种是错误示范，方便理解
      // args.push(arguments[i])
    }
    // 执行函数，并把接受的参数传进去
    // 字符串 + 数组 数组会调用 toString() 转换成字符串
    var ret = eval('ctx.originFn(' + args + ')')

    // 这样会变成 ctx.originFn('zhangsan,lisi')
    // var ret = ctx.originFn('' + args)
    // 调用完后我们要删除掉这个函数（引用）
    delete ctx.originFn

    // 返回这个函数的返回值
    return ret
  }

  // 测试
  function test() {
    console.log(this, arguments)
  }
  test.myCall(
    {
      a: 1,
      b: 2,
    },
    'zhangsan',
    'lisi'
  )
})(Function)
