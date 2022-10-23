;(function () {
  // 手写 apply 方法

  // apply 的特征
  // 1. apply() -> test() 相当于调用了函数
  // 2. 第二个参数只接收一个数组
  // 3. 只取到第二个参数，后面的参数忽略
  // 4. 第二个参数传原始值报错 如果传 object，null，undefined，Function 不报错，但 arguments 的 length 为 0

  Function.prototype.myApply = function (ctx, args) {
    // apply 第一个值一定要是一个引用值，普通值没有意义,所以我们把普通值也转换为一个对象
    ctx = ctx ? Object(ctx) : window
    // 一个函数谁调用它，函数的 this 指向就指向调用者
    // 保存调用者，也就是那个函数 // 示例：test.myApply({}, [1,2])
    ctx.originFn = this

    // 如果是原始值我们就报错
    if (typeof agrs !== 'object' && typeof args !== 'function') {
      throw new TypeError('CreateListFromArrayLike called on non-object')
    }

    // 如果没有参数或者参数是 object,null,undefined,Function 我们就直接执行函数
    if (!args || typeOf(args) !== 'Array') {
      return ctx.originFn()
    }

    var ret = eval('ctx.originFn(' + args + ')')
    // 调用完后我们要删除掉这个函数（引用）
    delete ctx.originFn

    // 返回这个函数的返回值
    return ret
  }

  function typeOf(value) {
    if (value === null) {
      return 'null'
    }

    // ({}).toString.call(value) -> [object Object] 其实就是对象索引取值
    return typeof value === 'object'
      ? {
          '[object Object]': 'Object',
          '[object Array]': 'Array',
          '[object Number]': 'Number',
          '[object String]': 'String',
          '[object Boolean]': 'Boolean',
        }[{}.toString.call(value)]
      : typeof value
  }

  // 测试
  function test() {
    console.log(this, arguments)
  }
  test.myApply(
    {
      a: 1,
      b: 2,
    },
    function () {}
  )
})()
