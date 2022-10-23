;(function (Function) {
  // 手写 bind 方法

  // bind 的特征
  // 1. bind() -> test bind方法执行了，test不执行
  // 2. bind() 会返回一个新的函数
  // 3. bind 的第一个参数会改变 test 的 this 指向
  // 4. bind 从第二个参数开始会依次传进 test 方法里，返回的函数可以继续接着传参数，比如 test 接收两个参数，bind 方法传入一个参数，返回的函数调用接着再传一个
  // 5. new (bind方法返回的函数)，this指向为 test 实例，实例应该继承原型上的属性和方法

  Function.prototype.myBind = function (ctx) {
    var originFn = this,
      // bind 传递的参数,删掉一个参数，拿到后面的参数
      args = [].slice.call(arguments, 1),
      _tempFn = function () {}

    var newFn = function () {
      // 新函数传递的参数
      var newArgs = [].slice.call(arguments)
      // 如果 new bind方法返回的函数，我们就判断一下，如果是 new 的，那么就是 instanceof bind方法返回的函数，如果为 true 返回 this,否则就为 bind 方法第一个参数作为 this 指向
      return originFn.apply(
        this instanceof newFn ? this : ctx,
        args.concat(newArgs)
      )
    }

    // 直接赋值共用一个原型不太好
    // newFn.prototype = this.prototype

    _tempFn.prototype = this.prototype
    newFn.prototype = new _tempFn()

    return newFn
  }

  function test(user, car) {
    console.log(user + '刚买了一辆车' + car + '车')
    console.log(this, arguments)
  }
})(Function)
